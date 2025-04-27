import React, { useState } from "react";
import "./save.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";

const Save = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Medicines",
    "Doctors",
    "Lab Tests",
    "Pharmacies",
    "Accessories",
  ];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="save-head">
        <h2>My Save</h2>
      </div>
      {}
      {/* save section */}
      <div className="save-container">
        <div className="save-option-box">
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
        <div className="save-item-container">
          {/* repeat */}
          <div className="save-item">
            <img src="/details/1.png" alt="product" />
            <h4>Pain Relief Tablets Pain Relief Tablets</h4>
            <h5>202 Left</h5>
            <h5>2025/2/1</h5>
            <div className="save-action">
              <h4>Show</h4>
              <h4>
                <i class="bi bi-trash3"></i>
              </h4>
            </div>
          </div>
          {/* repeat */}
          <div className="save-item">
            <img src="/details/1.png" alt="product" />
            <h4>Pain Relief Tablets</h4>
            <h5>202 Left</h5>
            <h5>2025/2/1</h5>
            <div className="save-action">
              <h4>Show</h4>
              <h4>
                <i class="bi bi-trash3"></i>
              </h4>
            </div>
          </div>
          {/* repeat */}
        </div>
      </div>
      {}
    </div>
  );
};

export default Save;
