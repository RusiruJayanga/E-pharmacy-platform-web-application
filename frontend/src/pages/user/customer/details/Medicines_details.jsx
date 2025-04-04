import React, { useState } from "react";
import "./details.css";
//ribben css
import "../../../../components/user/customer/margin/margin.css";

const Medicines_details = () => {
  //product fatch
  const product = {
    name: "Pain Relief Tablets",
    description:
      "Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.Fast-acting relief from body aches and pains.",
    price: 950,
    law: "illegal",
    offers: 44,
  };
  //image fatch
  const images = {
    images: [
      "/details/1.jpeg",
      "/details/2.jpeg",
      "/details/3.jpeg",
      "/details/4.jpeg",
    ],
  };
  //option fatch
  const options = {
    option: [
      "10 Tablets",
      "20 Tablets",
      "30 Tablets",
      "40 Tablets",
      "50 Tablets",
    ],
  };
  //product image select
  const [selectedImage, setSelectedImage] = useState(images.images[0]);
  //product option select
  const [selectedSize, setSelectedSize] = useState(options.option[0]);

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
          <h5>
            5/5
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </h5>
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
            <h4>Rs/ {product.price}</h4>
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
                  onClick={() => setSelectedSize(option)}
                >
                  {option}
                </h5>
              ))}
            </div>
          </div>
          <div className="details-box-button-container">
            {product.law === "illegal" && (
              <button>
                <h4>
                  <i class="bi bi-list-columns-reverse"></i>
                </h4>
                Upload Prescription
              </button>
            )}

            {product.law === "legal" && (
              <button>
                <h4>
                  <i class="bi bi-cart2"></i>
                </h4>
                Add To Cart
              </button>
            )}
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
        </div>
      </div>
      {}
      {/* seller section */}
      <div className="about-seller-container"></div>
      {}
    </div>
  );
};

export default Medicines_details;
