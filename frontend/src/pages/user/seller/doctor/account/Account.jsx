import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./account.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//account section css
import "../../../../user/customer/info/seller_info.css";

const Account = () => {
  //user info fatch
  const token = localStorage.getItem("doctorToken");
  const user = JSON.parse(atob(token.split(".")[1]));

  //logout
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("doctorToken");
    navigate("/");
  }

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* account section */}
      <div className="doctor-account-info-margin"></div>
      <div className="account-info-container">
        <img src={user.profile_picture || "user-icon.png"} alt="user" />
        <h3> {user.name}</h3>
        <div className="account-info-box">
          <div className="account-info-content">
            <span>
              <p>Seller ID - </p>
              <h5>{user.doctorId}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5>{user.email} </h5>
            </span>
            <span>
              <p>Phone Number - </p>
              <h5>{user.phone_number} </h5>
            </span>
          </div>
          <div className="account-info-content">
            <span className="account-info-span">
              <p>Address - </p>
              <h5 className="account-info-h5">{user.address}</h5>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Account;
