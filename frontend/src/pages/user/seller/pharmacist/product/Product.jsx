import React, { useState } from "react";
import "./product.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//react select
import Select from "react-select";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Medicines");
  const categories = ["Medicines", "Accessories"];
  //select style
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "50px",
      borderRadius: "var(--border_radius_2)",
      border: `1px solid var(--primary_color)`,
      padding: "0 8px",
      fontSize: "16px",
      fontWeight: 300,
      marginTop: "15px",
      boxShadow: state.isFocused ? "0 0 0 1px var(--primary_color)" : "none",
      "&:hover": {
        borderColor: "var(--primary_color)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: 300,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: 300,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
  };
  //medicine select
  const medicineCategoryOptions = [
    { label: "Asthma", value: "Asthma" },
    { label: "Anti-Histamine", value: "Anti-Histamine" },
    { label: "Antibiotics", value: "Antibiotics" },
    { label: "Cardiovascular", value: "Cardiovascular" },
    { label: "Oncology Drugs", value: "Oncology Drugs" },
    { label: "Constipation Reliever", value: "Constipation Reliever" },
    { label: "Diabetics", value: "Diabetics" },
    { label: "Eye Drops & Ear Drops", value: "Eye Drops & Ear Drops" },
    { label: "Gastrointestinal", value: "Gastrointestinal" },
    { label: "Hormones", value: "Hormones" },
    { label: "Neurological", value: "Neurological" },
    { label: "Pain Killers", value: "Pain Killers" },
    { label: "Antivirals", value: "Antivirals" },
    { label: "Urinary", value: "Urinary" },
    { label: "Veterinary", value: "Veterinary" },
    { label: "Vitamins", value: "Vitamins" },
    { label: "Worm Treatments", value: "Worm Treatments" },
  ];
  const legalityOptions = [
    { label: "Need Prescription", value: "Need Prescription" },
    { label: "Don't Need Prescription", value: "Don't Need Prescription" },
  ];
  //accessories select
  const healthProductOptions = [
    { label: "Adult Care", value: "Adult Care" },
    { label: "Ayurveda", value: "Ayurveda" },
    { label: "Beverages", value: "Beverages" },
    { label: "Cosmetics", value: "Cosmetics" },
    { label: "Dairy Products", value: "Dairy Products" },
    { label: "Diabetic Care", value: "Diabetic Care" },
    { label: "Food Items", value: "Food Items" },
    { label: "Hair Care", value: "Hair Care" },
    { label: "Household Remedies", value: "Household Remedies" },
    { label: "Kids", value: "Kids" },
    { label: "Mother & Baby Care", value: "Mother & Baby_Care" },
    { label: "Personal Care", value: "Personal Care" },
    { label: "Pet Care", value: "Pet Care" },
    { label: "Skin Care", value: "Skin Care" },
    { label: "Surgical Items", value: "Surgical Items" },
    { label: "Vitamins", value: "Vitamins" },
    { label: "Medical Devices", value: "Medical Devices" },
  ];

  //validation
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const medicineValidationSchema = Yup.object().shape({
    Name: Yup.string().required("Required"),
    Quantity: Yup.number()
      .required("Required")
      .min(0, "Quantity cannot be negative"),
    Option1: Yup.string().required("At least one option is required"),
    Price1: Yup.number()
      .required("Required")
      .min(0, "Price cannot be negative"),
    description: Yup.string()
      .required("Required")
      .max(100, "Description must be 100 characters or less"),
    medicineCategory: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .required("Required"),
    legality: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .required("Required"),
    registrationCertificate: Yup.mixed()
      .required("At least one image is required")
      .test(
        "fileCount",
        "Maximum 5 images allowed",
        (value) => value && value.length <= 5
      ),
    Discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100")
      .nullable(),
  });

  const accessoryValidationSchema = Yup.object().shape({
    Name: Yup.string().required("Required"),
    Quantity: Yup.number()
      .required("Required")
      .min(0, "Quantity cannot be negative"),
    Option1: Yup.string().required("At least one option is required"),
    Price1: Yup.number()
      .required("Required")
      .min(0, "Price cannot be negative"),
    description: Yup.string()
      .required("Required")
      .max(100, "Description must be 100 characters or less"),
    healthCategory: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .required("Required"),
    registrationCertificate: Yup.mixed()
      .required("At least one image is required")
      .test(
        "fileCount",
        "Maximum 5 images allowed",
        (value) => value && value.length <= 5
      ),
    Discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100")
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Quantity: "",
      Option1: "",
      Option2: "",
      Option3: "",
      Option4: "",
      Option5: "",
      Price1: "",
      Price2: "",
      Price3: "",
      Price4: "",
      Price5: "",
      description: "",
      medicineCategory: null,
      legality: null,
      healthCategory: null,
      Discount: "",
      registrationCertificate: null,
    },
    validationSchema:
      selectedCategory === "Medicines"
        ? medicineValidationSchema
        : accessoryValidationSchema,

    //form submit
    onSubmit: async (values, { resetForm }) => {
      try {
        const raw = localStorage.getItem("pharmacistToken");
        if (!raw) {
          toast.error("You must be logged in");
          return;
        }

        const parsed = JSON.parse(raw);
        const token = parsed.token;

        let seller_id;
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          seller_id = payload.pharmacistId;
        } catch (err) {
          toast.error("Invalid token format");
          return;
        }

        const formData = new FormData();
        if (values.registrationCertificate) {
          for (let i = 0; i < values.registrationCertificate.length; i++) {
            formData.append("files", values.registrationCertificate[i]);
          }
        }

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

        const options = [];
        for (let i = 1; i <= 5; i++) {
          const name = values[`Option${i}`];
          const price = values[`Price${i}`];
          if (name && price) {
            options.push({ name: name.trim(), price: parseFloat(price) });
          }
        }

        const productPayload = {
          seller_id,
          name: values.Name.trim(),
          quantity: parseInt(values.Quantity),
          options,
          description: values.description.trim(),
          category:
            selectedCategory === "Medicines"
              ? values.medicineCategory?.value
              : values.healthCategory?.value,
          discount: parseFloat(values.Discount) || 0,
          images: urls,
          type: selectedCategory === "Medicines" ? "Medicine" : "Accessory",
          ...(selectedCategory === "Medicines" && {
            legality: values.legality?.value,
          }),
        };

        const saveResponse = await fetch(
          "http://localhost:5000/api/product/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productPayload),
          }
        );

        if (!saveResponse.ok) {
          throw new Error("Product saving failed");
        }

        toast.success("Product added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error submitting product:", error);
        toast.error(error.message || "Failed to add product");
      }
    },
  });

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="product-head">
        <h2>Add Products</h2>
      </div>
      {}
      {/* product add form section */}
      <div className="product-form">
        {/* chategory section */}
        <h6>Select Product Category</h6>
        <div className="product-option-box">
          {categories.map((category, index) => (
            <h4
              key={index}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        {selectedCategory === "Medicines" && (
          <form
            onSubmit={(e) => {
              setHasSubmitted(true);
              formik.handleSubmit(e);
            }}
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formik.values.Name}
              onChange={formik.handleChange}
            />
            <p>
              {formik.touched.Name && formik.errors.Name
                ? formik.errors.Name
                : " "}
            </p>

            <input
              type="number"
              min={0}
              name="Quantity"
              placeholder="Quantity"
              value={formik.values.Quantity}
              onChange={formik.handleChange}
            />
            <p>
              {formik.touched.Quantity && formik.errors.Quantity
                ? formik.errors.Quantity
                : " "}
            </p>

            <h6>Product Options</h6>
            <div className="option-container">
              <div className="option-field">
                <label>Option</label>
                <input
                  type="text"
                  name="Option1"
                  placeholder="Option1"
                  value={formik.values.Option1}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option2"
                  placeholder="Option2"
                  value={formik.values.Option2}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option3"
                  placeholder="Option3"
                  value={formik.values.Option3}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option4"
                  placeholder="Option4"
                  value={formik.values.Option4}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option5"
                  placeholder="Option5"
                  value={formik.values.Option5}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="option-field">
                <label>Price</label>
                <input
                  type="number"
                  name="Price1"
                  min={0}
                  placeholder="Price1 (Rs/)"
                  value={formik.values.Price1}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price2"
                  min={0}
                  placeholder="Price2 (Rs/)"
                  value={formik.values.Price2}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price3"
                  min={0}
                  placeholder="Price3 (Rs/)"
                  value={formik.values.Price3}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price4"
                  min={0}
                  placeholder="Price4 (Rs/)"
                  value={formik.values.Price4}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price5"
                  min={0}
                  placeholder="Price5 (Rs/)"
                  value={formik.values.Price5}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <p>
              {(formik.touched.Option1 && formik.errors.Option1) ||
              (formik.touched.Price1 && formik.errors.Price1)
                ? formik.errors.Option1 || formik.errors.Price1
                : " "}
            </p>

            <textarea
              className="textinput input-element"
              placeholder="description"
              maxLength={100}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
            <p>
              {formik.values.description.length > 0 && (
                <span>{formik.values.description.length}/100</span>
              )}
              {formik.touched.description && formik.errors.description
                ? formik.errors.description
                : " "}
            </p>

            <Select
              options={medicineCategoryOptions}
              placeholder="Select medicine category"
              name="medicineCategory"
              styles={customSelectStyles}
              value={formik.values.medicineCategory}
              onChange={(option) =>
                formik.setFieldValue("medicineCategory", option)
              }
            />
            <p>
              {formik.touched.medicineCategory && formik.errors.medicineCategory
                ? formik.errors.medicineCategory
                : " "}
            </p>

            <Select
              options={legalityOptions}
              placeholder="Legality"
              name="legality"
              styles={customSelectStyles}
              value={formik.values.legality}
              onChange={(option) => formik.setFieldValue("legality", option)}
            />
            <p>
              {" "}
              {formik.touched.legality && formik.errors.legality
                ? formik.errors.legality
                : " "}
            </p>

            <input
              type="number"
              name="Discount"
              min={0}
              placeholder="Discounts (optional)"
              value={formik.values.Discount}
              onChange={formik.handleChange}
            />

            <h6>Upload Product Images (Maximum 4)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 4) {
                    alert("You can upload a maximum of 4 images.");
                    e.target.value = "";
                  } else {
                    formik.setFieldValue(
                      "registrationCertificate",
                      e.target.files
                    );
                  }
                }}
              />
              Choose Files
            </label>
            <p>
              {formik.touched.registrationCertificate &&
              formik.errors.registrationCertificate
                ? formik.errors.registrationCertificate
                : " "}
            </p>

            <button type="submit">Add</button>
          </form>
        )}
        {selectedCategory === "Accessories" && (
          <form
            onSubmit={(e) => {
              setHasSubmitted(true);
              formik.handleSubmit(e);
            }}
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formik.values.Name}
              onChange={formik.handleChange}
            />
            <p>
              {formik.touched.Name && formik.errors.Name
                ? formik.errors.Name
                : " "}
            </p>

            <input
              type="number"
              min={0}
              name="Quantity"
              placeholder="Quantity"
              value={formik.values.Quantity}
              onChange={formik.handleChange}
            />
            <p>
              {formik.touched.Quantity && formik.errors.Quantity
                ? formik.errors.Quantity
                : " "}
            </p>

            <h6>Product Options</h6>
            <div className="option-container">
              <div className="option-field">
                <label>Option</label>
                <input
                  type="text"
                  name="Option1"
                  placeholder="Option1"
                  value={formik.values.Option1}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option2"
                  placeholder="Option2"
                  value={formik.values.Option2}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option3"
                  placeholder="Option3"
                  value={formik.values.Option3}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option4"
                  placeholder="Option4"
                  value={formik.values.Option4}
                  onChange={formik.handleChange}
                />
                <input
                  type="text"
                  name="Option5"
                  placeholder="Option5"
                  value={formik.values.Option5}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="option-field">
                <label>Price</label>
                <input
                  type="number"
                  name="Price1"
                  min={0}
                  placeholder="Price1 (Rs/)"
                  value={formik.values.Price1}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price2"
                  min={0}
                  placeholder="Price2 (Rs/)"
                  value={formik.values.Price2}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price3"
                  min={0}
                  placeholder="Price3 (Rs/)"
                  value={formik.values.Price3}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price4"
                  min={0}
                  placeholder="Price4 (Rs/)"
                  value={formik.values.Price4}
                  onChange={formik.handleChange}
                />
                <input
                  type="number"
                  name="Price5"
                  min={0}
                  placeholder="Price5 (Rs/)"
                  value={formik.values.Price5}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <p>
              {" "}
              {(formik.touched.Option1 && formik.errors.Option1) ||
              (formik.touched.Price1 && formik.errors.Price1)
                ? formik.errors.Option1 || formik.errors.Price1
                : " "}
            </p>

            <textarea
              className="textinput input-element"
              placeholder="description"
              name="description"
              maxLength={100}
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
            <p>
              {formik.values.description.length > 0 && (
                <span>{formik.values.description.length}/100</span>
              )}
              {formik.touched.description && formik.errors.description
                ? formik.errors.description
                : " "}
            </p>

            <Select
              options={healthProductOptions}
              placeholder="Select health product categories"
              name="medicineCategory"
              styles={customSelectStyles}
              value={formik.values.healthCategory}
              onChange={(option) =>
                formik.setFieldValue("healthCategory", option)
              }
            />
            <p>
              {formik.touched.healthCategory && formik.errors.healthCategory
                ? formik.errors.healthCategory
                : " "}
            </p>

            <input
              type="number"
              name="Discount"
              min={0}
              placeholder="Discounts (optional)"
              value={formik.values.Discount}
              onChange={formik.handleChange}
            />
            {/* File Uploads */}
            <h6>Upload Product Images (Maximum 4)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 4) {
                    alert("You can upload a maximum of 4 images.");
                    e.target.value = "";
                  } else {
                    formik.setFieldValue(
                      "registrationCertificate",
                      e.target.files
                    );
                  }
                }}
              />
              Choose Files
            </label>
            <p>
              {formik.touched.registrationCertificate &&
              formik.errors.registrationCertificate
                ? formik.errors.registrationCertificate
                : " "}
            </p>

            <button type="submit">Add</button>
          </form>
        )}
      </div>
      {}
    </div>
  );
};

export default Product;
