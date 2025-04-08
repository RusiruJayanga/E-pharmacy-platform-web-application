import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./details.css";
//ribben css
import "../../../../components/user/customer/margin/margin.css";
//google map config
import LocationMap from "../../../../config/LocationMap";
//prescription upload
import PrescriptionModel from "../../../../modules/user/customer/details/Pharmacies_prescription";

const Pharmacies_details = () => {
  //advertisement fatch
  const advertisement = {
    name: "Pain Relief Tablets",
    description:
      "Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.",
    phonenumber: "0776679711",
    email: "achesandpainFastacting@gmail.com",
    districts: "Matara",
    images: ["/details/1.png"],
    time: "10Am to 10Pm",
  };
  //google map location fatch
  const pharmacyLocation = {
    lat: 6.9271,
    lng: 79.8612,
  };
  //prescription upload
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      <div className="details-box-container">
        <div className="details-box-image">
          <img
            className="product-main-image-dif"
            src={advertisement.images}
            alt="product"
          />
        </div>
        <div className="details-box-content">
          <h3>{advertisement.name}</h3>
          <span>
            <Link to="/Seller_info">
              <h5 className="details-box-seller-info">Contact Shop</h5>
            </Link>
          </span>
          <div className="details-box-description">
            <p>Description -</p>
            <p>{advertisement.description}</p>
          </div>
          <span className="details-box-span">
            <p>Contact Number - </p>
            <h5>{advertisement.phonenumber}</h5>
          </span>
          <span>
            <p>E mail - </p>
            <h5>{advertisement.email}</h5>
          </span>
          <span>
            <p>District - </p>
            <h5>{advertisement.districts}</h5>
          </span>
          <span>
            <p>working Hours - </p>
            <h5>{advertisement.time}</h5>
          </span>
          <div className="details-box-button-container">
            <button onClick={() => setIsPrescriptionOpen(true)}>
              <h4>
                <i class="bi bi-list-columns-reverse"></i>
              </h4>
              Upload Prescription
            </button>
            <button>
              <h4>
                <i class="bi bi-bookmark"></i>
              </h4>
            </button>
          </div>
          <div className="details-box-paywith">
            <img src="paypal.png" alt="paywith" />
            <img src="cardpay.png" alt="paywith" />
          </div>
        </div>
      </div>
      {}
      {/* map location section */}
      <div className="location-container">
        <div className="location-content">
          <h3>Location</h3>
          <h5>Find Pharmacy Location</h5>
          <div className="location-instructions">
            <p>
              Easily discover nearby pharmacies with our interactive location
              feature. Whether you need to refill prescriptions or explore
              over-the-counter products, our system helps you find the most
              convenient pharmacy based on your location.
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
      {/* prescription model */}
      <PrescriptionModel
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
      />
      {}
    </div>
  );
};

export default Pharmacies_details;
