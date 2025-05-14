import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./request.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//google map config
import LocationMap from "../../../../config/LocationMap";
//react select
import Select from "react-select";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Request = () => {
  //redirect
  const navigate = useNavigate();
  //add location
  const defaultLocation = {
    lat: 6.9271,
    lng: 79.8612,
  };
  const [sellerLocation, setSellerLocation] = useState(defaultLocation);
  const handleLocationChange = (newLocation) => {
    setSellerLocation(newLocation);
  };
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Pharmacist");
  const categories = ["Pharmacist", "Doctor", "Lab Owner"];
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
  //doctor select
  const specialistOptions = [
    { label: "General Practitioner", value: "General_Practitioner" },
    { label: "Endocrinologist", value: "Endocrinologist" },
    { label: "Cardiologist", value: "Cardiologist" },
    { label: "Nephrologist", value: "Nephrologist" },
    { label: "Rheumatologist", value: "Rheumatologist" },
    { label: "Neurologist", value: "Neurologist" },
    { label: "Hepatologist", value: "Hepatologist" },
    { label: "Pulmonologist", value: "Pulmonologist" },
    { label: "Dermatologist", value: "Dermatologist" },
    { label: "Psychologist", value: "Psychologist" },
    { label: "Urologist", value: "Urologist" },
    { label: "Otolaryngologist", value: "Otolaryngologist" },
    { label: "Ophthalmologist", value: "Ophthalmologist" },
    { label: "Pediatrician", value: "Pediatrician" },
    { label: "Oncologist", value: "Oncologist" },
    { label: "Plastic Surgeon", value: "Plastic_Surgeon" },
    { label: "Allergist", value: "Allergist" },
  ];
  //lab test select
  const labTestOptions = [
    { label: "Complete Blood Count (CBC)", value: "cbc" },
    { label: "Basic Metabolic Panel (BMP)", value: "bmp" },
    { label: "Fasting Blood Sugar (FBS)", value: "fbs" },
    { label: "Glycated Hemoglobin Test", value: "glycated_hemoglobin" },
    { label: "Cholesterol Test", value: "cholesterol" },
    { label: "hs-CRP", value: "hs_crp" },
    { label: "Troponin Test", value: "troponin" },
    { label: "Serum Creatinine Test", value: "creatinine" },
    { label: "Blood Urea Nitrogen (BUN)", value: "bun" },
    { label: "Urinalysis", value: "urinalysis" },
    { label: "Prothrombin Time Test", value: "prothrombin_time" },
    { label: "HIV Test", value: "hiv" },
    { label: "Prolactin Test", value: "prolactin" },
    { label: "Syphilis Test (VDRL Test)", value: "vdrl" },
    { label: "Vitamin D Test", value: "vitamin_d" },
    { label: "CA-125 Test", value: "ca_125" },
    { label: "Hepatitis B & C Test", value: "hepatitis_b_c" },
  ];
  //district select
  const Southern = [
    { value: "Matara", label: "Matara" },
    { value: "Galle", label: "Galle" },
    { value: "Hambantota", label: "Hambantota" },
  ];
  const Western = [
    { value: "Colombo", label: "Colombo" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Kalutara", label: "Kalutara" },
  ];
  const Central = [
    { value: "Kandy", label: "Kandy" },
    { value: "Matale", label: "Matale" },
    { value: "Nuwara Eliya", label: "Nuwara Eliya" },
  ];
  const Sabaragamuwa = [
    { value: "Kegalle", label: "Kegalle" },
    { value: "Ratnapura", label: "Ratnapura" },
  ];
  const Uva = [
    { value: "Badulla", label: "Badulla" },
    { value: "Moneragala", label: "Moneragala" },
  ];
  const Eastern = [
    { value: "Ampara", label: "Ampara" },
    { value: "Batticaloa", label: "Batticaloa" },
    { value: "Trincomalee", label: "Trincomalee" },
  ];
  const Northern = [
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Mannar", label: "Mannar" },
    { value: "Vavuniya", label: "Vavuniya" },
    { value: "Mullaitivu", label: "Mullaitivu" },
  ];
  const NorthCentral = [
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
  ];
  const NorthWestern = [
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Puttalam", label: "Puttalam" },
  ];
  const groupedFilterOptions = [
    {
      label: "Southern Province",
      options: Southern,
    },
    {
      label: "Western Province",
      options: Western,
    },
    {
      label: "Central Province",
      options: Central,
    },
    {
      label: "Sabaragamuwa Province",
      options: Sabaragamuwa,
    },
    {
      label: "Uva Province",
      options: Uva,
    },
    {
      label: "Eastern Province",
      options: Eastern,
    },
    {
      label: "Northern Province",
      options: Northern,
    },
    {
      label: "North Central Province",
      options: NorthCentral,
    },
    {
      label: "North Western Province",
      options: NorthWestern,
    },
  ];

  //validation
  const baseSchema = {
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?]/,
        "Must contain at least one symbol (!@#$%^&*(),.?)"
      )
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Invalid phone number format"
      )
      .required("Required"),
    address: Yup.string().required("Required"),
    description: Yup.string()
      .max(100, "Description must be at most 100 characters")
      .required("Required"),
  };

  const pharmacistSchema = Yup.object().shape({
    ...baseSchema,
    ownerName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Required"),
    pharmacyName: Yup.string()
      .min(3, "Pharmacy name must be at least 3 characters")
      .required("Required"),
    nationalId: Yup.string()
      .matches(/^[0-9]{9}[vVxX]?$/, "Invalid National ID format")
      .required("Required"),
    slmcNumber: Yup.string().required("Required"),
    district: Yup.object().required("Required"),
    openingTime: Yup.string().required("Required"),
    closingTime: Yup.string().required("Required"),
    registrationCertificate: Yup.mixed()
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .required("Required"),
    governmentId: Yup.mixed()
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .required("Required"),
    location: Yup.object().required("Required"),
    postalCode: Yup.string()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid postal code format")
      .required("Required"),
    profilePicture: Yup.mixed()
      .test("fileType", "Only images are allowed", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png"].includes(value.type);
      })
      .required("Required"),
  });

  const doctorSchema = Yup.object().shape({
    ...baseSchema,
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Required"),
    slmcRegistration: Yup.string().required("Required"),
    nationalId: Yup.string()
      .matches(/^[0-9]{9}[vVxX]?$/, "Invalid National ID format")
      .required("Required"),
    specialty: Yup.object().required("Required"),
    district: Yup.object().required("Required"),
    medicalLicense: Yup.mixed()
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .required("Required"),
    profilePicture: Yup.mixed()
      .test("fileType", "Only images are allowed", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png"].includes(value.type);
      })
      .required("Required"),
  });

  const labOwnerSchema = Yup.object().shape({
    ...baseSchema,
    pathologistName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Required"),
    labName: Yup.string()
      .min(3, "Lab name must be at least 3 characters")
      .required("Required"),
    nationalId: Yup.string()
      .matches(/^[0-9]{9}[vVxX]?$/, "Invalid National ID format")
      .required("Required"),
    labTests: Yup.array()
      .min(1, "Select at least one lab test")
      .required("Required"),
    businessRegNumber: Yup.string().required("Required"),
    district: Yup.object().required("Required"),
    openingTime: Yup.string().required("Required"),
    closingTime: Yup.string().required("Required"),
    nmraCertification: Yup.mixed()
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .required("Required"),
    labLicense: Yup.mixed()
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .required("Required"),
    location: Yup.object().required("Required"),
    profilePicture: Yup.mixed()
      .test("fileType", "Only images are allowed", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png"].includes(value.type);
      })
      .required("Required"),
    postalCode: Yup.string()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid postal code format")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      //common fields
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      description: "",

      //pharmacist fields
      ownerName: "",
      pharmacyName: "",
      nationalId: "",
      slmcNumber: "",
      district: null,
      openingTime: "",
      closingTime: "",
      registrationCertificate: null,
      governmentId: null,
      location: null,
      //doctor fields
      name: "",
      slmcRegistration: "",
      specialty: null,
      medicalLicense: null,
      profilePicture: null,
      //lab Owner fields
      pathologistName: "",
      labName: "",
      labTests: [],
      businessRegNumber: "",
      nmraCertification: null,
      labLicense: null,
      postalCode: "",
    },
    validationSchema:
      selectedCategory === "Pharmacist"
        ? pharmacistSchema
        : selectedCategory === "Doctor"
        ? doctorSchema
        : labOwnerSchema,

    onSubmit: async (values, { resetForm }) => {
      const role = selectedCategory;
      let formattedValues = { ...values, role };

      try {
        // Upload files first
        let fileUrls = {};

        if (role === "Pharmacist") {
          const [registrationCertUrl, governmentIdUrl, profilePictureUrl] =
            await uploadFiles([
              values.registrationCertificate,
              values.governmentId,
              values.profilePicture,
            ]);
          fileUrls = {
            registrationCertUrl,
            governmentIdUrl,
            profilePictureUrl,
          };
        } else if (role === "Doctor") {
          const [medicalLicenseUrl, profilePictureUrl] = await uploadFiles([
            values.medicalLicense,
            values.profilePicture,
          ]);
          fileUrls = { medicalLicenseUrl, profilePictureUrl };
        } else if (role === "Lab Owner") {
          const [nmraCertUrl, labLicenseUrl, profilePictureUrl] =
            await uploadFiles([
              values.nmraCertification,
              values.labLicense,
              values.profilePicture,
            ]);
          fileUrls = { nmraCertUrl, labLicenseUrl, profilePictureUrl };
        }

        if (role === "Pharmacist") {
          formattedValues = {
            role,
            owner_name: values.ownerName,
            pharmacy_name: values.pharmacyName,
            national_id: values.nationalId,
            slmc_number: values.slmcNumber,
            district: values.district?.value || "",
            address: values.address,
            postal_code: values.postalCode,
            phone_number: values.phoneNumber,
            email: values.email,
            password: values.password,
            working_hours: {
              open: values.openingTime,
              close: values.closingTime,
            },
            registration_certificate: fileUrls.registrationCertUrl,
            government_id: fileUrls.governmentIdUrl,
            profile_picture: fileUrls.profilePictureUrl,
            description: values.description,
            location: values.location || {},
          };
        } else if (role === "Doctor") {
          formattedValues = {
            role,
            name: values.name,
            slmc_number: values.slmcRegistration,
            national_id: values.nationalId,
            specialty: values.specialty?.value || "",
            district: values.district?.value || "",
            address: values.address,
            phone_number: values.phoneNumber,
            email: values.email,
            password: values.password,
            license_file: fileUrls.medicalLicenseUrl,
            profile_picture: fileUrls.profilePictureUrl,
            description: values.description,
          };
        } else if (role === "Lab Owner") {
          formattedValues = {
            role,
            pathologist_name: values.pathologistName,
            lab_name: values.labName,
            national_id: values.nationalId,
            lab_tests: values.labTests?.map((test) => test.value) || [],
            business_reg_number: values.businessRegNumber,
            district: values.district?.value || "",
            address: values.address,
            postal_code: values.postalCode,
            phone_number: values.phoneNumber,
            email: values.email,
            password: values.password,
            working_hours: {
              open: values.openingTime,
              close: values.closingTime,
            },
            nmra_cert: fileUrls.nmraCertUrl,
            diagnostic_license: fileUrls.labLicenseUrl,
            profile_picture: fileUrls.profilePictureUrl,
            location: values.location || {},
            description: values.description,
          };
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/request-seller-role",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedValues),
          }
        );

        const result = await response.json();

        if (!response.ok) throw new Error(result.message);

        toast.success(result.message);
        resetForm();
        navigate("/Account");
      } catch (error) {
        toast.error(error.message || "Request failed. Try again.");
      }
    },
  });

  //token
  const token = localStorage.getItem("customerToken");

  //file upload
  const uploadFiles = async (files) => {
    try {
      const formData = new FormData();
      files.filter(Boolean).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error("File upload failed");
      return result.urls;
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="request-head">
        <h2>Join With Us</h2>
      </div>
      {}
      {/* request form section */}
      <div className="request-form">
        {/* chategory section */}
        <h6>Select Your Role</h6>
        <div className="request-option-box">
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

        {selectedCategory === "Pharmacist" && (
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="ownerName"
              placeholder="Owner name"
              onChange={formik.handleChange}
              value={formik.values.ownerName}
            />
            <p>
              {formik.touched.ownerName && formik.errors.ownerName
                ? formik.errors.ownerName
                : " "}
            </p>

            <input
              type="text"
              name="pharmacyName"
              placeholder="Pharmacy name"
              onChange={formik.handleChange}
              value={formik.values.pharmacyName}
            />
            <p>
              {formik.touched.pharmacyName && formik.errors.pharmacyName
                ? formik.errors.pharmacyName
                : " "}
            </p>

            <input
              type="text"
              name="nationalId"
              placeholder="Owner's national ID number"
              onChange={formik.handleChange}
              value={formik.values.nationalId}
            />
            <p>
              {" "}
              {formik.touched.nationalId && formik.errors.nationalId
                ? formik.errors.nationalId
                : " "}
            </p>

            <input
              type="text"
              name="slmcNumber"
              placeholder="SLMC pharmacist registration number"
              onChange={formik.handleChange}
              value={formik.values.slmcNumber}
            />
            <p>
              {formik.touched.slmcNumber && formik.errors.slmcNumber
                ? formik.errors.slmcNumber
                : " "}
            </p>

            <Select
              name="district"
              options={groupedFilterOptions}
              placeholder="Select Your district"
              onChange={(value) => formik.setFieldValue("district", value)}
              styles={customSelectStyles}
              value={formik.values.district}
            />
            <p>
              {formik.touched.district && formik.errors.district
                ? formik.errors.district
                : " "}
            </p>

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <p>
              {formik.touched.address && formik.errors.address
                ? formik.errors.address
                : " "}
            </p>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            />
            <p>
              {formik.touched.postalCode && formik.errors.postalCode
                ? formik.errors.postalCode
                : " "}
            </p>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            <p>
              {formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : " "}
            </p>

            <h6>Working Hours</h6>
            <div className="working-hours-container">
              <div className="working-hour-field">
                <label>Opens At</label>
                <input
                  type="time"
                  name="openingTime"
                  onChange={formik.handleChange}
                  value={formik.values.openingTime}
                />
              </div>
              <div className="working-hour-field">
                <label>Closes At</label>
                <input
                  type="time"
                  name="closingTime"
                  onChange={formik.handleChange}
                  value={formik.values.closingTime}
                />
              </div>
            </div>
            <p>
              {(formik.touched.openingTime && formik.errors.openingTime) ||
              (formik.touched.closingTime && formik.errors.closingTime)
                ? formik.errors.openingTime || formik.errors.closingTime
                : " "}
            </p>

            <h6>Upload Pharmacy Registration Certificate</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "registrationCertificate",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.registrationCertificate &&
              formik.errors.registrationCertificate
                ? formik.errors.registrationCertificate
                : " "}
            </p>

            <h6>Upload Government-Issued ID (NIC/Passport)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue("governmentId", e.currentTarget.files[0])
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.governmentId && formik.errors.governmentId
                ? formik.errors.governmentId
                : " "}
            </p>

            <h6>Upload Profile Picture</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="profilePicture"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "profilePicture",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.profilePicture && formik.errors.profilePicture
                ? formik.errors.profilePicture
                : " "}
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>
              {" "}
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : " "}
            </p>

            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : " "}
            </p>

            <h6>Description</h6>
            <textarea
              className="textinput input-element"
              placeholder="Description about your pharmacy"
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

            <h6>Enter Your Shop Location</h6>
            <div className="request-location-map">
              <LocationMap
                location={sellerLocation}
                onLocationChange={(loc) => {
                  formik.setFieldValue("location", loc);
                  setSellerLocation(loc);
                }}
                editable={true}
              />
            </div>
            <p>
              {" "}
              {formik.touched.location && formik.errors.location
                ? formik.errors.location
                : " "}
            </p>

            <button type="submit">Request</button>
          </form>
        )}
        {selectedCategory === "Doctor" && (
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p>
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : " "}
            </p>

            <input
              type="text"
              name="slmcRegistration"
              placeholder="SLMC registration number"
              onChange={formik.handleChange}
              value={formik.values.slmcRegistration}
            />
            <p>
              {formik.touched.slmcRegistration && formik.errors.slmcRegistration
                ? formik.errors.slmcRegistration
                : " "}
            </p>

            <input
              type="text"
              name="nationalId"
              placeholder="National ID number"
              onChange={formik.handleChange}
              value={formik.values.nationalId}
            />
            <p>
              {formik.touched.nationalId && formik.errors.nationalId
                ? formik.errors.nationalId
                : " "}
            </p>

            <Select
              name="specialty"
              options={specialistOptions}
              placeholder="Select your speciality"
              onChange={(value) => formik.setFieldValue("specialty", value)}
              styles={customSelectStyles}
              value={formik.values.specialty}
            />
            <p>
              {formik.touched.specialty && formik.errors.specialty
                ? formik.errors.specialty
                : " "}
            </p>

            <Select
              name="district"
              options={groupedFilterOptions}
              placeholder="Select your district"
              onChange={(value) => formik.setFieldValue("district", value)}
              styles={customSelectStyles}
              value={formik.values.district}
            />
            <p>
              {formik.touched.district && formik.errors.district
                ? formik.errors.district
                : " "}
            </p>

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <p>
              {formik.touched.address && formik.errors.address
                ? formik.errors.address
                : " "}
            </p>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            <p>
              {formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : " "}
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>
              {" "}
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : " "}
            </p>

            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : " "}
            </p>

            <h6>Description</h6>
            <textarea
              className="textinput input-element"
              placeholder="Description about your practice"
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

            <h6>Upload Medical License / SLMC ID Card</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "medicalLicense",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.medicalLicense && formik.errors.medicalLicense
                ? formik.errors.medicalLicense
                : " "}
            </p>

            <h6>Upload Profile Picture</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "profilePicture",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {" "}
              {formik.touched.profilePicture && formik.errors.profilePicture
                ? formik.errors.profilePicture
                : " "}
            </p>

            <button type="submit">Request</button>
          </form>
        )}
        {selectedCategory === "Lab Owner" && (
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="pathologistName"
              placeholder="Responsible pathologist's name"
              onChange={formik.handleChange}
              value={formik.values.pathologistName}
            />
            <p>
              {formik.touched.pathologistName && formik.errors.pathologistName
                ? formik.errors.pathologistName
                : " "}
            </p>

            <input
              type="text"
              name="labName"
              placeholder="Lab name"
              onChange={formik.handleChange}
              value={formik.values.labName}
            />
            <p>
              {formik.touched.labName && formik.errors.labName
                ? formik.errors.labName
                : " "}
            </p>

            <input
              type="text"
              name="nationalId"
              placeholder="Owner's national ID number"
              onChange={formik.handleChange}
              value={formik.values.nationalId}
            />
            <p>
              {formik.touched.nationalId && formik.errors.nationalId
                ? formik.errors.nationalId
                : " "}
            </p>

            <Select
              isMulti
              name="labTests"
              options={labTestOptions}
              placeholder="Select lab tests offered"
              onChange={(value) => formik.setFieldValue("labTests", value)}
              styles={customSelectStyles}
              value={formik.values.labTests}
            />
            <p>
              {formik.touched.labTests && formik.errors.labTests
                ? formik.errors.labTests
                : " "}
            </p>

            <input
              type="text"
              name="businessRegNumber"
              placeholder="Business registration number"
              onChange={formik.handleChange}
              value={formik.values.businessRegNumber}
            />
            <p>
              {formik.touched.businessRegNumber &&
              formik.errors.businessRegNumber
                ? formik.errors.businessRegNumber
                : " "}
            </p>

            <Select
              name="district"
              options={groupedFilterOptions}
              placeholder="Select your district"
              onChange={(value) => formik.setFieldValue("district", value)}
              styles={customSelectStyles}
              value={formik.values.district}
            />
            <p>
              {formik.touched.district && formik.errors.district
                ? formik.errors.district
                : " "}
            </p>

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <p>
              {formik.touched.address && formik.errors.address
                ? formik.errors.address
                : " "}
            </p>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            />
            <p>
              {formik.touched.postalCode && formik.errors.postalCode
                ? formik.errors.postalCode
                : " "}
            </p>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            <p>
              {formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : " "}
            </p>

            <h6>Working Hours</h6>
            <div className="working-hours-container">
              <div className="working-hour-field">
                <label>Opens At</label>
                <input
                  type="time"
                  name="openingTime"
                  onChange={formik.handleChange}
                  value={formik.values.openingTime}
                />
              </div>
              <div className="working-hour-field">
                <label>Closes At</label>
                <input
                  type="time"
                  name="closingTime"
                  onChange={formik.handleChange}
                  value={formik.values.closingTime}
                />
              </div>
            </div>
            <p>
              {(formik.touched.openingTime && formik.errors.openingTime) ||
              (formik.touched.closingTime && formik.errors.closingTime)
                ? formik.errors.openingTime || formik.errors.closingTime
                : " "}
            </p>

            <h6>Upload NMRA Certification</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "nmraCertification",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.nmraCertification &&
              formik.errors.nmraCertification
                ? formik.errors.nmraCertification
                : " "}
            </p>

            <h6>Upload Diagnostic Lab License</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue("labLicense", e.currentTarget.files[0])
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.labLicense && formik.errors.labLicense
                ? formik.errors.labLicense
                : " "}
            </p>

            <h6>Upload Profile Picture</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  formik.setFieldValue(
                    "profilePicture",
                    e.currentTarget.files[0]
                  )
                }
              />
              Choose File
            </label>
            <p>
              {formik.touched.profilePicture && formik.errors.profilePicture
                ? formik.errors.profilePicture
                : " "}
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : " "}
            </p>

            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p>
              {" "}
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : " "}
            </p>

            <h6>Description</h6>
            <textarea
              className="textinput input-element"
              placeholder="Description about your lab"
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

            <h6>Enter Your Lab Location</h6>
            <div className="request-location-map">
              <LocationMap
                location={sellerLocation}
                onLocationChange={(loc) => {
                  formik.setFieldValue("location", loc);
                  setSellerLocation(loc);
                }}
                editable={true}
              />
            </div>
            <p>
              {formik.touched.location && formik.errors.location
                ? formik.errors.location
                : " "}
            </p>

            <button type="submit">Request</button>
          </form>
        )}
      </div>
      {}
    </div>
  );
};

export default Request;
