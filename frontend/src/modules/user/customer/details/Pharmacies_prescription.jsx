import React, { useState } from "react";
import "./details.css";
//animation
import { motion } from "framer-motion";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pharmacies_prescription = ({ isOpen, onClose, pharmacyId }) => {
  //validation
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null,
      note: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Required")
        .test(
          "fileType",
          "Only JPG, PNG, or PDF files allowed",
          (value) =>
            value &&
            ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
        )
        .test(
          "fileSize",
          "File size must be less than 5MB",
          (value) => value && value.size <= 5 * 1024 * 1024
        ),
      note: Yup.string().max(200, "Note cannot exceed 200 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("customerToken");

        if (!token) {
          toast.error("You must be logged in");
          return;
        }

        let customer_id;
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          customer_id = payload.customerId;
        } catch (err) {
          toast.error("Invalid token format");
          return;
        }

        if (!pharmacyId || !selectedFile) {
          toast.error(
            "Please select a pharmacy and upload a prescription image"
          );
          return;
        }

        const formData = new FormData();
        formData.append("files", selectedFile);

        const uploadResponse = await fetch(
          "http://localhost:5000/api/files/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const { urls } = await uploadResponse.json();
        const image = urls[0];
        const response = await fetch(
          "http://localhost:5000/api/pharmacies/prescription/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_id,
              product_id: pharmacyId,
              productType: "Pharmacy",
              image,
              description: values.note.trim(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Prescription saving failed");
        }

        toast.success("Prescription uploaded successfully !");
        resetForm();
        setSelectedFile(null);
      } catch (error) {
        console.error("Error submitting prescription:", error);
        toast.error(error.message || "Upload failed");
      } finally {
        setIsLoading(false);
      }
      setTimeout(() => {
        onClose(true);
      }, 4000);
    },
  });

  //popup close
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <ToastContainer position="top-center" autoClose={3500} theme="dark" />
      <motion.div
        className="prescription-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="prescription-popup-close">
          <h3 onClick={onClose}>&times;</h3>
        </div>
        <h3>Request Medicines</h3>
        <form
          className="prescription-popup-upload-form"
          onSubmit={(e) => {
            e.preventDefault();
            setHasSubmitted(true);
            formik.handleSubmit(e);
          }}
        >
          <div className="prescription-popup-upload-form-content">
            <label className="prescription-file-upload">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  formik.setFieldValue("file", file);
                  setSelectedFile(file);
                }}
              />
              <h2>
                <i className="bi bi-cloud-arrow-up-fill"></i>
              </h2>
              <div style={{ overflowWrap: "anywhere" }}>
                {formik.values.file
                  ? formik.values.file.name
                  : "Browse Prescription File to Upload"}
              </div>
            </label>
            <div className="prescription-popup-error">
              <p>{hasSubmitted && formik.errors.file && formik.errors.file}</p>
            </div>
            <textarea
              name="note"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.note}
              placeholder="Enter additional notes..."
              maxLength={200}
            ></textarea>
            <div className="prescription-popup-error">
              <p>
                {formik.values.note.length > 0 && (
                  <span>{formik.values.note.length}/200 </span>
                )}
                {formik.errors.note}
              </p>
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing" : "Request"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Pharmacies_prescription;
