import React, { useState } from "react";
import "./product.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//react select
import Select from "react-select";

const Product = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Medicines");
  const categories = ["Medicines", "Accessories"];
  //medicine select
  const medicineCategoryOptions = [
    { label: "Asthma", value: "asthma" },
    { label: "Anti-Histamine", value: "anti_histamine" },
    { label: "Antibiotics", value: "antibiotics" },
    { label: "Cardiovascular", value: "cardiovascular" },
    { label: "Oncology Drugs", value: "oncology" },
    { label: "Constipation Reliever", value: "constipation_reliever" },
    { label: "Diabetics", value: "diabetics" },
    { label: "Eye Drops & Ear Drops", value: "eye_ear_drops" },
    { label: "Gastrointestinal", value: "gastrointestinal" },
    { label: "Hormones", value: "hormones" },
    { label: "Neurological", value: "neurological" },
    { label: "Pain Killers", value: "pain_killers" },
    { label: "Antivirals", value: "antivirals" },
    { label: "Urinary", value: "urinary" },
    { label: "Veterinary", value: "veterinary" },
    { label: "Vitamins", value: "vitamins" },
    { label: "Worm Treatments", value: "worm_treatments" },
  ];
  const legalityOptions = [
    { label: "Need Prescription", value: "Need_Prescription" },
    { label: "Dont Need Prescription", value: "Dont_Need_Prescription" },
  ];
  //accessories select
  const healthProductOptions = [
    { label: "Adult Care", value: "Adult_Care" },
    { label: "Ayurveda", value: "Ayurveda" },
    { label: "Beverages", value: "Beverages" },
    { label: "Cosmetics", value: "Cosmetics" },
    { label: "Dairy Products", value: "Dairy_Products" },
    { label: "Diabetic Care", value: "Diabetic_Care" },
    { label: "Food Items", value: "Food_Items" },
    { label: "Hair Care", value: "Hair_Care" },
    { label: "Household Remedies", value: "Household_Remedies" },
    { label: "Kids", value: "Kids" },
    { label: "Mother & Baby Care", value: "Mother_&_Baby_Care" },
    { label: "Personal Care", value: "Personal_Care" },
    { label: "Pet Care", value: "Pet_Care" },
    { label: "Skin Care", value: "Skin_Care" },
    { label: "Surgical Items", value: "Surgical_Items" },
    { label: "Vitamins", value: "Vitamins" },
    { label: "Medical Devices", value: "Medical_Devices" },
  ];

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
          <div>
            <input name="Name" placeholder="Name" />
            <p>console.error</p>
            <input
              type="number"
              min={0}
              name="Quantity"
              placeholder="Quantity"
            />
            <p>console.error</p>
            <h6>Product Options</h6>
            <div className="option-container">
              <div className="option-field">
                <label>Option</label>
                <input type="text" name="Option1" placeholder="Option1" />
                <input type="text" name="Option2" placeholder="Option2" />
                <input type="text" name="Option3" placeholder="Option3" />
                <input type="text" name="Option4" placeholder="Option4" />
                <input type="text" name="Option5" placeholder="Option5" />
              </div>
              <div className="option-field">
                <label>Price</label>
                <input
                  type="number"
                  name="Price1"
                  min={0}
                  placeholder="Price1 (Rs/)"
                />
                <input
                  type="number"
                  name="Price2"
                  min={0}
                  placeholder="Price2 (Rs/)"
                />
                <input
                  type="number"
                  name="Price3"
                  min={0}
                  placeholder="Price3 (Rs/)"
                />
                <input
                  type="number"
                  name="Price4"
                  min={0}
                  placeholder="Price4 (Rs/)"
                />
                <input
                  type="number"
                  name="Price5"
                  min={0}
                  placeholder="Price5 (Rs/)"
                />
              </div>
            </div>
            <p>console.error</p>
            <textarea
              className="textinput input-element"
              placeholder="description"
            ></textarea>
            <p>
              console.error <span> 100/100</span>
            </p>
            <Select
              options={medicineCategoryOptions}
              placeholder="Select Medicine Category"
              name="medicineCategory"
            />
            <p>console.error</p>
            <Select
              options={legalityOptions}
              placeholder="Legality"
              name="medicineCategory"
            />
            <p>console.error</p>
            <input name="Discount" placeholder="Discounts (optional)" />
            {/* File Uploads */}
            <h6>Upload Product Images (Maximum 5)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 5) {
                    alert("You can upload a maximum of 5 images.");
                    e.target.value = "";
                  }
                }}
              />
              Choose Files
            </label>
            <p>console.error</p>
            <button>Add</button>
          </div>
        )}
        {selectedCategory === "Accessories" && (
          <div>
            <input name="Name" placeholder="Name" />
            <p>console.error</p>
            <input
              type="number"
              min={0}
              name="Quantity"
              placeholder="Quantity"
            />
            <p>console.error</p>
            <h6>Product Options</h6>
            <div className="option-container">
              <div className="option-field">
                <label>Option</label>
                <input type="text" name="Option1" placeholder="Option1" />
                <input type="text" name="Option2" placeholder="Option2" />
                <input type="text" name="Option3" placeholder="Option3" />
                <input type="text" name="Option4" placeholder="Option4" />
                <input type="text" name="Option5" placeholder="Option5" />
              </div>
              <div className="option-field">
                <label>Price</label>
                <input
                  type="number"
                  name="Price1"
                  min={0}
                  placeholder="Price1 (Rs/)"
                />
                <input
                  type="number"
                  name="Price2"
                  min={0}
                  placeholder="Price2 (Rs/)"
                />
                <input
                  type="number"
                  name="Price3"
                  min={0}
                  placeholder="Price3 (Rs/)"
                />
                <input
                  type="number"
                  name="Price4"
                  min={0}
                  placeholder="Price4 (Rs/)"
                />
                <input
                  type="number"
                  name="Price5"
                  min={0}
                  placeholder="Price5 (Rs/)"
                />
              </div>
            </div>
            <p>console.error</p>
            <textarea
              className="textinput input-element"
              placeholder="description"
            ></textarea>
            <p>
              console.error <span> 100/100</span>
            </p>
            <Select
              options={healthProductOptions}
              placeholder="Select health product categories"
              name="medicineCategory"
            />
            <p>console.error</p>
            <input name="Discount" placeholder="Discounts (optional)" />
            {/* File Uploads */}
            <h6>Upload Product Images (Maximum 5)</h6>
            <label className="custom-file-upload">
              <input
                type="file"
                name="registrationCertificate"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  if (e.target.files.length > 5) {
                    alert("You can upload a maximum of 5 images.");
                    e.target.value = "";
                  }
                }}
              />
              Choose Files
            </label>
            <p>console.error</p>
            <button>Add</button>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Product;
