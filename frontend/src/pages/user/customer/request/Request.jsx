import React, { useState } from "react";
import "./request.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//google map config
import LocationMap from "../../../../config/LocationMap";
//react select
import Select from "react-select";

const Request = () => {
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
          <div>
            <input name="Owner name" placeholder="Owner name" />
            <p>console.error</p>
            <input name="Pharmacy name" placeholder="Pharmacy name" />
            <p>console.error</p>
            <input
              name="Owner's national ID number"
              placeholder="Owner's national ID number"
            />
            <p>console.error</p>
            <input
              name="SLMC pharmacist registration number"
              placeholder="SLMC pharmacist registration number"
            />
            <p>console.error</p>
            <Select
              options={groupedFilterOptions}
              placeholder="Select Your District"
            />
            <p>console.error</p>
            <input name="Address" placeholder="Address" />
            <p>console.error</p>
            <input name="Postal code" placeholder="Postal code" />
            <p>console.error</p>
            <input name="Phone number" placeholder="Phone number" />
            <p>console.error</p>
            <h6>Working Hours</h6>
            <div className="working-hours-container">
              <div className="working-hour-field">
                <label>Opens At</label>
                <input type="time" name="openingTime" />
              </div>
              <div className="working-hour-field">
                <label>Closes At</label>
                <input type="time" name="closingTime" />
              </div>
            </div>
            <p>console.error</p>

            {/* File Uploads */}
            <h6>Upload Pharmacy Registration Certificate</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <h6>Upload Government-Issued ID (NIC/Passport)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="idDocument"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <input name="Email" placeholder="Email" />
            <p>console.error</p>
            <input name="Password" placeholder="Password" type="password" />
            <p>console.error</p>
            <h6>Enter Your Shop Location</h6>
            <div className="request-location-map">
              <LocationMap
                location={sellerLocation}
                onLocationChange={handleLocationChange}
                editable={true}
              />
            </div>
            <p>console.error</p>
            <button>Request</button>
          </div>
        )}
        {selectedCategory === "Doctor" && (
          <div>
            <input name="Name" placeholder="Name"></input>
            <p>console.error</p>
            <input
              name="SLMC registration number"
              placeholder="SLMC registration number"
            ></input>
            <p>console.error</p>
            <input name="National ID number" placeholder="National ID number" />
            <p>console.error</p>
            <Select
              options={specialistOptions}
              placeholder="Select Your Speciality"
              name="specialist"
            />
            <p>console.error</p>
            <Select
              options={groupedFilterOptions}
              placeholder="Select Your District"
            />
            <p>console.error</p>
            <input name="Address" placeholder="Address"></input>
            <p>console.error</p>
            <input name="Phone number" placeholder="Phone number"></input>
            <p>console.error</p>
            <input name="Email" placeholder="Email"></input>
            <p>console.error</p>
            <input name="Password" placeholder="Password"></input>
            <p>console.error</p>
            {/* File Uploads */}
            <h6>Upload Medical License / SLMC ID Card</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <h6>Upload Profile Picture</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="idDocument"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <button>Request</button>
          </div>
        )}
        {selectedCategory === "Lab Owner" && (
          <div>
            <input
              name="Responsible pathologist's name"
              placeholder="Responsible pathologist's name"
            />
            <p>console.error</p>
            <input name="Lab name" placeholder="Lab name" />
            <p>console.error</p>
            <input
              name="Owner's national ID number"
              placeholder="Owner's national ID number"
            />
            <p>console.error</p>
            <Select
              options={labTestOptions}
              isMulti
              placeholder="Select Lab Tests Offered"
              name="labTests"
            />
            <p>console.error</p>
            <input
              name="Business registration number"
              placeholder="Business registration number"
            />
            <p>console.error</p>
            <Select
              options={groupedFilterOptions}
              placeholder="Select Your District"
            />
            <p>console.error</p>
            <input name="Address" placeholder="Address" />
            <p>console.error</p>
            <input name="Postal code" placeholder="Postal code" />
            <p>console.error</p>
            <input name="Phone number" placeholder="Phone number" />
            <p>console.error</p>
            <h6>Working Hours</h6>
            <div className="working-hours-container">
              <div className="working-hour-field">
                <label>Opens At</label>
                <input type="time" name="openingTime" />
              </div>
              <div className="working-hour-field">
                <label>Closes At</label>
                <input type="time" name="closingTime" />
              </div>
            </div>
            <p>console.error</p>
            {/* File Uploads */}
            <h6>Upload NMRA/Ministry of Health Certification</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <h6>Upload License to Operate a Diagnostic Lab</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="idDocument"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              Choose File
            </label>
            <p>console.error</p>
            <input name="Email" placeholder="Email" />
            <p>console.error</p>
            <input name="Password" placeholder="Password" type="password" />
            <p>console.error</p>
            <h6>Enter Your Lab Location</h6>
            <div className="request-location-map">
              <LocationMap
                location={sellerLocation}
                onLocationChange={handleLocationChange}
                editable={true}
              />
            </div>
            <p>console.error</p>
            <button>Request</button>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Request;
