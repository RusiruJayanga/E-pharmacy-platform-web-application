import React, { useState } from "react";
import "./store.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";

const Store = () => {
  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="store-head">
        <h2>My Store</h2>
      </div>
      {}
      {/* product section */}
      <div className="store-container">
        {/* repeat */}
        <div className="store-item-container">
          <img src="/details/1.png" alt="appointment" />
          <div className="store-item-content">
            <h3>Paracetamol 500mg</h3>
            <span>
              <p>Legality - </p>
              <h6>Need Prescription</h6>
            </span>
            <span>
              <p>Availability - </p>
              <h6>Available</h6>
            </span>
          </div>
          <div className="store-item-content">
            <span>
              <p>Category - </p>
              <h6>Medicines</h6>
            </span>
            <span>
              <p>Quantity - </p>
              <h6>2023</h6>
            </span>
            <span>
              <p>Status - </p>
              <h5 className="instock">In Stock</h5>
            </span>
          </div>
          <div className="store-item-action">
            <h4>Edit</h4>
            <h4>
              <i class="bi bi-trash3"></i>
            </h4>
          </div>
        </div>
        {/* repeat */}
      </div>
      {}
    </div>
  );
};

export default Store;
