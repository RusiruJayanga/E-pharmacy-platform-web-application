import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
//margin css
import "../../../../components/user/customer/margin/margin.css";
//filter css
import "../../../../components/user/customer/filter/filter.css";
//react select
import Select from "react-select";
//product card css
import "../../../../components/user/customer/card/card.css";

const Pharmacies = () => {
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
  //advertisement fatch
  const advertisements = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Pharmacies-section1">
        <div className="margin-section-content">
          <h1>Pharmacies</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div id="product-section"></div>
      <div className="product-filter-container">
        <h3>
          Filter Pharmacies By <i class="bi bi-arrow-down"></i>
        </h3>
      </div>
      <div className="product-filter-content">
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
        <div className="product-filter-instructions">
          <h4>Attention !</h4>
          <p>
            When selecting a pharmacy, enter the district you live in. Stores
            are rated up to 5 stars based on customer feedback on the quality of
            service.
          </p>
        </div>
      </div>
      {}
      {/* advertisement card section */}
      <div className="advertisement-container">
        {/* repeat */}
        {advertisements.map((advertisement, idx) => (
          <div className="advertisement-card" id={idx}>
            <img src="product.png" alt="advertisement" />
            <div className="advertisement-card-content">
              <h5>Lorem ipsum dolor{advertisement}</h5>
              <span>
                <h5>Location</h5>{" "}
                <p>
                  4.5 <i class="bi bi-star-fill"></i>
                </p>
              </span>
              <Link to="/Pharmacies_details">
                <div className="advertisement-card-see-more">
                  <p>See More</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
        {/* repeat */}
      </div>
      <div className="advertisement-card-show-more-products">
        Show more <i class="bi bi-arrow-down"></i>
      </div>
      {/*advertisement section end */}
      {}
    </div>
  );
};

export default Pharmacies;
