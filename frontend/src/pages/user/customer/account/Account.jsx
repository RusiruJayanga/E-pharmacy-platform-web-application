import React, { useState } from "react";
import "./account.css";
//ribben css
import "../../../../components/user/customer/margin/margin.css";
//account section css
import "../info/seller_info.css";

const Account = () => {
  //user info fatch
  const user = {
    name: "Health Plus Pharmacy",
    phone: "0771234567",
    email: "healthplus@example.com",
    district: "Colombo",
    postalCode: "81000",
    address: "123, Main Street, Colombo 03",
  };
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Pending Orders");
  const categories = [
    "Pending Orders",
    "Completed Orders",
    "Appointments",
    "Notifications",
    "Settings",
  ];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* account section */}
      <div className="user-account-info-margin"></div>
      <div className="account-info-container">
        <img src="user-icon.png" alt="user" />
        <h3> {user.name}</h3>
        <div className="account-info-box">
          <div className="account-info-content">
            <span>
              <p>Phone Number - </p>
              <h5> {user.phone}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5> {user.email}</h5>
            </span>
            <span>
              <p>District - </p>
              <h5> {user.district}</h5>
            </span>
          </div>
          <div className="account-info-content">
            <span>
              <p>Postal code - </p>
              <h5> {user.postalCode}</h5>
            </span>
            <span className="account-info-span">
              <p>Address - </p>
              <h5 className="account-info-h5">{user.address}</h5>
            </span>
            <button>Log Out</button>
          </div>
        </div>
      </div>
      {}
      {/* head section */}
      <div className="activity-head">
        <h2>My Activity</h2>
      </div>
      {}
      {/* account activity section */}
      <div className="account-activity-container">
        <div className="activity-category">
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
        <div className="activity-container">
          <div className="pending-order-item">
            <img src="/details/1.png" alt="product" />
            <div className="pending-order-item-content">
              <h3>Vitamin C Capsules</h3>
              <span>
                <p>Price: </p>
                <h6>Rs/ 250</h6>
              </span>
              <span>
                <p>Quantity: </p>
                <h6>2</h6>
              </span>
              <span>
                <p>Order ID: </p>
                <h6>123456</h6>
              </span>
              <span>
                <p>Order Date: </p>
                <h6>2023-10-01</h6>
              </span>
              <span>
                <p>Delivery Date: </p>
                <h6>2023-10-05</h6>
              </span>
              <span>
                <p>Status: </p>
                <h6>Pending</h6>
              </span>
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Account;
