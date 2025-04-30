import React, { useState } from "react";
import "./orders.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";

const Orders = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("New Orders");
  const categories = ["New Orders", "Delivered Orders", "Cancelled Orders"];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="order-head">
        <h2>My Orders</h2>
      </div>
      {}
      {/* order section */}
      <div className="order-container">
        <div className="order-option-box">
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
        {selectedCategory === "New Orders" && (
          <div>
            <div className="order-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="order-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Option - </p>
                  <h6>option</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2023</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Order Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Delivery Date - </p>
                  <h6>2023-10-05</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Medicines</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Customer Name - </p>
                  <h6>verification</h6>
                </span>
                <span>
                  <p>Shipping Address - </p>
                  <h6>Complete with city </h6>
                </span>
                <span>
                  <p>Postal code - </p>
                  <h6>810000</h6>
                </span>
              </div>
              <div className="order-item-content order-item-content-last">
                <span>
                  <p>Order ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="processing">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Delivered Orders" && (
          <div>
            <div className="order-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="order-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Option - </p>
                  <h6>option</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2023</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Order Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Delivery Date - </p>
                  <h6>2023-10-05</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Medicines</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Customer Name - </p>
                  <h6>verification</h6>
                </span>
                <span>
                  <p>Shipping Address - </p>
                  <h6>Complete with city </h6>
                </span>
                <span>
                  <p>Postal code - </p>
                  <h6>810000</h6>
                </span>
              </div>
              <div className="order-item-content order-item-content-last">
                <span>
                  <p>Order ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="processing">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Cancelled Orders" && (
          <div>
            <div className="order-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="order-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Option - </p>
                  <h6>option</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2023</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Order Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Delivery Date - </p>
                  <h6>2023-10-05</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Medicines</h6>
                </span>
              </div>
              <div className="order-item-content">
                <span>
                  <p>Customer Name - </p>
                  <h6>verification</h6>
                </span>
                <span>
                  <p>Shipping Address - </p>
                  <h6>Complete with city </h6>
                </span>
                <span>
                  <p>Postal code - </p>
                  <h6>810000</h6>
                </span>
              </div>
              <div className="order-item-content order-item-content-last">
                <span>
                  <p>Order ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="processing">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Orders;
