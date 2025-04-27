import React, { useState } from "react";
import "./search.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//react select
import Select from "react-select";
//product card css
import "../../../../components/user/customer/card/card.css";

const Search = () => {
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
  const selectcustomStyles = {
    control: (base) => ({
      ...base,
      height: "60px",
      minHeight: "60px",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "60px",
    }),
  };
  //product fatch
  const products = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* search bar */}
      <div className="search-bar-container">
        <input placeholder="What are you looking for?" type="text" />
        <div className="search-bar-filter-location-dropbox">
          <Select
            options={groupedFilterOptions}
            defaultValue={{ label: "Island Wide", value: "Island_Wide" }}
            styles={selectcustomStyles}
          />
        </div>
        <button>Search</button>
      </div>
      {}
      {/* upload section */}
      <div className="upload-container"></div>
      {}
      {/* product card section */}
      <div className="product-container">
        {/* repeat */}
        {products.map((product, idx) => (
          <div className="product-card" id={idx}>
            <div className="product-card-discription">
              <span>
                <p>Name -</p>
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

export default Search;
