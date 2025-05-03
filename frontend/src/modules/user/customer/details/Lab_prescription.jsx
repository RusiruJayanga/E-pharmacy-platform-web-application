import React, { useState } from "react";
import "./details.css";
//animation
import { motion } from "framer-motion";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";

const Lab_prescription = ({ isOpen, onClose }) => {
  //validation
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    onSubmit: (values) => {
      console.log("Prescription uploaded:", values);
    },
  });

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("file", file);
  };

  //popup close
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
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
        <h3>Channel Lab Test</h3>
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
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
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
              placeholder="Note (optional)"
              value={formik.values.note}
              maxLength={200}
              onChange={formik.handleChange}
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
          <button type="submit">Request</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Lab_prescription;
