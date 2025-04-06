import React, { useState } from "react";
import "./details.css";
//ribben css
import "../../../../components/user/customer/margin/margin.css";

const Doctors_details = () => {
  //product fatch
  const advertisementid = {
    name: "Pain Relief Tablets",
    description:
      "Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.",
    specialistin: "Cardiologist",
    phonenumber: "0776679711",
    email: "achesandpainFastacting@gmail.com",
    districts: "Matara",
  };
  //image fatch
  const images = {
    images: ["/details/1.jpeg"],
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      <div className="details-box-container">
        <div className="details-box-image">
          <img
            className="product-main-image"
            src={images.images}
            alt="product"
          />
        </div>
        <div className="details-box-content">
          <h3>{advertisementid.name}</h3>
          <div className="details-box-description">
            <p>Description -</p>
            <p>{advertisementid.description}</p>
          </div>
          <span className="details-box-span">
            <p>Specialist In - </p>
            <h5>{advertisementid.specialistin}</h5>
          </span>
          <span>
            <p>Contact Number - </p>
            <h5>{advertisementid.phonenumber}</h5>
          </span>
          <span>
            <p>E mail - </p>
            <h5>{advertisementid.email}</h5>
          </span>
          <span>
            <p>District - </p>
            <h5>{advertisementid.districts}</h5>
          </span>

          <div className="details-box-paywith">
            <img src="paypal.png" alt="paywith" />
            <img src="cardpay.png" alt="paywith" />
          </div>
        </div>
      </div>
      {}
      {/* reviews section */}
      <div className="review-container">
        <div className="review-head">
          <h2>Reviews</h2>
          <h4>
            5/5
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <h5>684 ratings</h5>
          </h4>
          <p>All from verified purchases</p>
        </div>
        <div className="review-box">
          {/* repeat */}
          <div className="review-box-review">
            <img src="user-icon.png" alt="profile" />
            <div className="review-box-content">
              <h5>
                5/5
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </h5>
              <h5>Rusiru</h5>
              <p>
                Good , Aluminum Heatsink Radiator Heat sink for Electronic IC
                Chip RAM MOS Dynatron Raspberry Pi Cooling With Thermal
                Conductive Tape.
              </p>
            </div>
          </div>
          {/* repeat */}
          <div className="review-box-show-more-products">
            Show more <i class="bi bi-arrow-down"></i>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Doctors_details;
