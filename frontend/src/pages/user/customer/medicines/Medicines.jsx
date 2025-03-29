import React, { useState } from "react";
//filter css
import "../../../../components/user/customer/filter/filter.css";

const Medicines = () => {
  //filter checkbox
  const [selectedcategoryCheckbox, setSelectedcategoryCheckbox] =
    useState("All");
  const handlectedcategoryCheckboxChange = (id) => {
    setSelectedcategoryCheckbox(id);
  };
  const [selectedlocationCheckbox, setSelectedlocationCheckbox] =
    useState(null);
  const handlectedlocationCheckboxChange = (id) => {
    setSelectedlocationCheckbox(id);
  };

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Medicines-section1">
        <div className="margin-section-content">
          <h1>Medicines</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div className="product-filter-container">
        <h3>
          Filter Medicine By <i class="bi bi-arrow-down"></i>
        </h3>
      </div>
      <div className="product-filter-content">
        <div className="product-filter-category">
          <h4>Categorys</h4>
          <div className="product-filter-category-box">
            {/* repeat */}
            {[
              "All",
              "Asthma",
              "Anti-Histamine",
              "Antibiotics",
              "Cholesterol",
              "Constipation Reliever Drugs",
              "Diabetics",
              "Eye Drops & Ear Drops",
              "Gastritis",
              "Hormones",
              "Nerves",
              "Pain Killers",
              "Pressure",
              "Urinary",
              "Veterinary",
              "Vitamins",
              "Worm Treatments",
            ].map((id) => (
              <div className="product-filter-category-item">
                <input
                  type="checkbox"
                  checked={selectedcategoryCheckbox === id}
                  onChange={() => handlectedcategoryCheckboxChange(id)}
                />
                <label key={id}>{id}</label>
              </div>
            ))}
            {}
          </div>
        </div>
        {}
      </div>
    </div>
  );
};

export default Medicines;
