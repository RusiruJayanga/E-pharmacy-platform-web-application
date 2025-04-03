import React, { useState } from "react";
//margin css
import "../../../../components/user/customer/margin/margin.css";
//filter css
import "../../../../components/user/customer/filter/filter.css";
//react select
import Select from "react-select";
//product card css
import "../../../../components/user/customer/card/card.css";

const Accessories = () => {
  //filter checkbox
  const [selectedcategoryCheckbox, setSelectedcategoryCheckbox] =
    useState("All");
  const handlectedcategoryCheckboxChange = (id) => {
    setSelectedcategoryCheckbox(id);
  };
  //filter select
  const All = [{ value: "Island Wide", label: "Island Wide" }];
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
      label: "Island Wide",
      options: All,
    },
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
  //product fatch
  const products = ["1", "2", "3", "4", "5", "6"];

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Accessories-section1">
        <div className="margin-section-content">
          <h1>Accessories</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div id="product-section"></div>
      <div className="product-filter-container">
        <h3>
          Filter Accessories By <i class="bi bi-arrow-down"></i>
        </h3>
      </div>
      <div className="product-filter-content">
        <div className="product-filter-category">
          <h4>Category</h4>
          <div className="product-filter-category-box">
            {/* repeat */}
            {[
              "All",
              "Adult Care",
              "Ayurveda",
              "Beverages",
              "Cosmetics",
              "Dairy Products",
              "Diabetic Care",
              "Food Items",
              "Hair Care",
              "Household Remedies",
              "Kids",
              "Mother & Baby Care",
              "Personal Care",
              "Pet Care",
              "Skin Care",
              "Surgical Items",
              "Vitamins",
              "Medical Devices",
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
        <div className="product-filter-location">
          <h4>Location</h4>
          <p>Select your district</p>
          <div className="product-filter-location-dropbox">
            <Select
              options={groupedFilterOptions}
              defaultValue={{ label: "Island Wide", value: "Island_Wide" }}
            />
          </div>
        </div>
      </div>
      {}
      {/* product card section */}
      <div className="product-container">
        {/* repeat */}
        {products.map((product, idx) => (
          <div className="product-card" id={idx}>
            <div className="product-card-discription">
              <span>
                <p>Name</p>
                <h5>Lorem ipsum dolor{product}</h5>
              </span>
              <div className="product-card-offers hot">
                <p>
                  <i class="bi bi-prescription2"></i>
                </p>
              </div>
            </div>
            <div className="product-card-image">
              <img src="product.png" alt="product" />
            </div>
            <div className="product-card-price">
              <span>
                <p>Price -</p>
                <h5>Rs/ 89855.00</h5>
              </span>
            </div>
            <div className="product-card-see-more">
              <p>See More</p>
            </div>
          </div>
        ))}
        {/* repeat */}
      </div>
      <div className="product-card-show-more-products">
        Show more <i class="bi bi-arrow-down"></i>
      </div>
      {/* product section end */}
      {}
    </div>
  );
};

export default Accessories;
