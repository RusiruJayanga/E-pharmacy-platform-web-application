import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./account.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//account section css
import "../../../../user/customer/info/seller_info.css";

const Account = () => {
  //user info fatch
  const user = {
    name: "Health Plus Pharmacy",
    phone: "0771234567",
    email: "rusirujayanga@gmail.com",
    district: "Colombo",
    postalCode: "81000",
    address: "123, Main Street, Colombo 03",
  };
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Settings");
  const categories = [
    "Settings",
    "Pending Orders",
    "Completed Orders",
    "Appointments",
    "Notifications",
  ];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* account section */}
      <div className="doctor-account-info-margin"></div>
      <div className="account-info-container">
        <img src="user-icon.png" alt="user" />
        <h3> {user.name}</h3>
        <div className="account-info-box">
          <div className="account-info-content">
            <span>
              <p>Phone Number - </p>
              <h5>{user.phone}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5>{user.email} </h5>
            </span>
            <span>
              <p>District - </p>
              <h5>{user.district} </h5>
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
    </div>
  );
};

export default Account;
