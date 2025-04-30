import React, { useState } from "react";
import "./request.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";

const Request = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Shop Request");
  const categories = ["Shop Request", "Medicine Request", "Cancelled Request"];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="request-head">
        <h2>My Orders</h2>
      </div>
      {}
      {/* request section */}
      <div className="request-container">
        <div className="request-option-box">
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
        {selectedCategory === "Shop Request" && (
          <div>
            <div className="request-item-container">
              <div className="request-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Request Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Shop</h6>
                </span>
              </div>
              <div className="request-item-content request-item-content-last">
                <button>Review</button>
                <button>Accept</button>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Medicine Request" && (
          <div>
            <div className="request-item-container">
              <div className="request-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Request Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Shop</h6>
                </span>
              </div>
              <div className="request-item-content">
                <span>
                  <p>Customer Name - </p>
                  <h6>verification</h6>
                </span>
                <span>
                  <p>Option - </p>
                  <h6>option</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2023</h6>
                </span>
              </div>
              <div className="request-item-content request-item-content-last">
                <button>Review</button>
                <button>Accept</button>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Cancelled Request" && (
          <div>
            <div className="request-item-container">
              <div className="request-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Request Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Shop</h6>
                </span>
              </div>
              <div className="request-item-content request-item-content-last">
                <button>Review</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Request;
