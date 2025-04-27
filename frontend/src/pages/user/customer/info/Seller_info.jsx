import React from "react";
import "./seller_info.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//location and reviews css
import "../details/details.css";
//google map config
import LocationMap from "../../../../config/LocationMap";

const Seller_info = () => {
  //google map location fatch
  const pharmacyLocation = {
    lat: 6.9271,
    lng: 79.8612,
  };
  //seller info fatch
  const seller = {
    name: "Health Plus Pharmacy",
    phone: "0771234567",
    email: "healthplus@example.com",
    district: "Colombo",
    workingHours: "8:00 AM - 8:00 PM",
    address: "123, Main Street, Colombo 03",
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* account section */}
      <div className="account-info-margin"></div>
      <div className="account-info-container">
        <img src="user-icon.png" alt="seller" />
        <h3> {seller.name}</h3>
        <div className="account-info-box">
          <div className="account-info-content">
            <span>
              <p>Phone Number - </p>
              <h5> {seller.phone}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5> {seller.email}</h5>
            </span>
            <span>
              <p>District - </p>
              <h5> {seller.district}</h5>
            </span>
          </div>
          <div className="account-info-content">
            <span>
              <p>working Hours - </p>
              <h5> {seller.workingHours}</h5>
            </span>
            <span className="account-info-span">
              <p>Address - </p>
              <h5 className="account-info-h5">{seller.address}</h5>
            </span>
            <button>Message</button>
          </div>
        </div>
      </div>
      {}
      {/* map location section */}
      <div className="location-container">
        <div className="location-content">
          <h3>Location</h3>
          <h5>Find Seller Location</h5>
          <div className="location-instructions">
            <p>
              Easily locate pharmacies or sellers near you using our integrated
              map feature. Whether you're searching for a trusted local pharmacy
              or need directions to a specific seller, our system helps you find
              the most convenient and accessible locations based on your area.
            </p>
          </div>
        </div>
        <div className="location-map">
          <LocationMap location={pharmacyLocation} />
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

export default Seller_info;
