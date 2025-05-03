import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./details.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//prescription upload
import PrescriptionModel from "../../../../modules/user/customer/details/Medicines_prescription";

const Medicines_details = () => {
  //product fatch
  const product = {
    name: "Pain Relief Tablets",
    description:
      "Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.",
    law: "illegal",
    offers: 4,
    seller: "hh group.ltd",
  };
  //image fatch
  const images = {
    images: ["/upload/cetirizine.png", "/upload/cetirizine1.png"],
  };
  //option fatch
  const options = {
    option: ["Tablets1", "Tablets2", "Tablets3", "Tablets4", "Tablets5"],
    prices: {
      Tablets1: 25,
      Tablets2: 1500,
      Tablets3: 2000,
      Tablets4: 2009,
      Tablets5: 2005,
    },
  };
  //product image select
  const [selectedImage, setSelectedImage] = useState(images.images[0]);
  //product option select
  const [selectedSize, setSelectedSize] = useState(options.option[0]);
  const [currentPrice, setCurrentPrice] = useState(
    options.prices[options.option[0]]
  );

  const handleOptionClick = (option) => {
    setSelectedSize(option);
    setCurrentPrice(options.prices[option]);
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
            className="product-main-image"
            src={selectedImage}
            alt="product"
          />
          <div className="thumbnail-row">
            {images.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className={`thumbnail-image ${
                  selectedImage === img ? "active-product" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="details-box-content">
          <h3>{product.name}</h3>
          <span>
            <Link to="/Seller_info">
              <h5 className="details-box-seller-info">Seller Info</h5>
            </Link>
          </span>
          <div className="details-box-description">
            <p>Description -</p>
            <p>{product.description}</p>
          </div>
          {product.offers > 0 && (
            <span className="details-box-span">
              <p>Offer - </p>
              <p>{product.offers}% off</p>
            </span>
          )}
          <span className={`${product.offers === 0 ? "details-box-span" : ""}`}>
            <p>Price - </p>
            <h4>Rs/ {currentPrice}</h4>
          </span>
          <div className="details-box-options">
            <p>Options -</p>
            <div className="details-box-options-button-container">
              {options.option.map((option, index) => (
                <h5
                  key={index}
                  className={`option-btn ${
                    selectedSize === option ? "selected-option" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </h5>
              ))}
            </div>
          </div>
          <div className="details-box-button-container">
            {product.law === "illegal" && (
              <button onClick={() => setIsPrescriptionOpen(true)}>
                <h4>
                  <i className="bi bi-list-columns-reverse"></i>
                </h4>
                Upload Prescription
              </button>
            )}

            {product.law === "legal" && (
              <button>
                <h4>
                  <i className="bi bi-cart2"></i>
                </h4>
                Add To Cart
              </button>
            )}
            <button>
              <h4>
                <i className="bi bi-bookmark"></i>
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
      {/* reviews section */}
      <div className="review-container">
        <div className="review-head">
          <h2>Reviews</h2>
          <h4>
            5/5
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <h5>1 ratings</h5>
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
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
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
            Show more <i className="bi bi-arrow-down"></i>
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

export default Medicines_details;
