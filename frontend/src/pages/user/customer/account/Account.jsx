import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./account.css";
//account section css
import "../info/seller_info.css";
//log out
import { useAuth } from "../../../../config/AuthContext";

const Account = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Settings");
  const categories = [
    "Settings",
    "Pending Orders",
    "Completed Orders",
    "Appointments",
    "Notifications",
  ];

  //log out
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //decode user data
  const token = localStorage.getItem("customerToken");
  const user = JSON.parse(atob(token.split(".")[1]));

  return (
    <div>
      {/* account section */}
      <div className="user-account-info-margin"></div>
      <div className="account-info-container">
        <img src="user-icon.png" alt="user" />
        <h3> {user.name}</h3>
        <div className="account-info-box">
          <div className="account-info-content">
            <span>
              <p>Phone Number - </p>
              <h5> {user.phone_number}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5> {user.email}</h5>
            </span>
          </div>
          <div className="account-info-content">
            <span>
              <p>Postal Code - </p>
              <h5> {user.postal_code}</h5>
            </span>
            <span className="account-info-span">
              <p>Address -</p>
              <h5 className="account-info-h5">{user.address}</h5>
            </span>
            <button onClick={handleLogout}>Log Out</button>
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
          {/* settings */}
          {selectedCategory === "Settings" && (
            <div className="setting-container">
              <h4>Personal Information</h4>
              <div className="setting-content">
                <span>
                  <p>Change Phone Number -</p>
                  <h6>Change</h6>
                </span>
                <span>
                  <p>Change District -</p>
                  <h6>Change</h6>
                </span>
                <span>
                  <p>Change Postal Code -</p>
                  <h6>Change</h6>
                </span>
                <span>
                  <p>Change Address -</p>
                  <h6>Change</h6>
                </span>
              </div>
              <h4>Security Information</h4>
              <div className="setting-content">
                <span>
                  <p>Change Password -</p>
                  <h6>Change</h6>
                </span>
                {user?.account_status === "Pharmacist Pendin" && (
                  <span>
                    <p>Request To Be Seller -</p>
                    <Link to="/Request">
                      <button>Request</button>
                    </Link>
                  </span>
                )}
                {[
                  "Doctor Pending",
                  "Pharmacist Pnding",
                  "Lab Owner Pending",
                ].includes(user?.account_status) && (
                  <span>
                    <p>Request To Be Seller -</p>
                    <h6 className="setting-pending">Pending</h6>
                  </span>
                )}
                {user?.account_status === "Rejected" && (
                  <span>
                    <p>Request To Be Seller -</p>
                    <h6 className="setting-delete">Rejected</h6>
                  </span>
                )}
                {user?.account_status === "Pharmacist Pendin" && (
                  <span>
                    <p>Seller Account -</p>
                    <Link to="/Doctor_login">
                      <button>Login</button>
                    </Link>
                  </span>
                )}
                {user?.account_status === "Pharmacist Pending" && (
                  <span>
                    <p>Seller Account -</p>
                    <Link to="/Pharmacist_login">
                      <button>Login</button>
                    </Link>
                  </span>
                )}
                {user?.account_status === "Lab Owner" && (
                  <span>
                    <p>Seller Account -</p>
                    <Link to="/Lab_login">
                      <button>Login</button>
                    </Link>
                  </span>
                )}
                <span>
                  <p>Delete Account -</p>
                  <h6 className="setting-delete">Delete</h6>
                </span>
              </div>
            </div>
          )}
          {/* pending orders */}
          {selectedCategory === "Pending Orders" && (
            <div className="pending-order-item">
              <img src="/details/1.png" alt="product" />
              <div className="pending-order-item-content">
                <h3>Vitamin C Capsules</h3>
                <span>
                  <p>Price - </p>
                  <h6>Rs/ 250</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2</h6>
                </span>
                <span>
                  <p>Order ID - </p>
                  <h6>123456</h6>
                </span>
              </div>
              <div className="pending-order-item-content">
                <span>
                  <p>Order Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Delivery Date - </p>
                  <h6>2023-10-05</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="shipped">Processing</h4>
                </span>
              </div>
            </div>
          )}
          {/* completed orders */}
          {selectedCategory === "Completed Orders" && (
            <div className="pending-order-item">
              <img src="/details/1.png" alt="product" />
              <div className="pending-order-item-content">
                <h3>Vitamin C Capsules</h3>
                <span>
                  <p>Price - </p>
                  <h6>Rs/ 250</h6>
                </span>
                <span>
                  <p>Quantity - </p>
                  <h6>2</h6>
                </span>
                <span>
                  <p>Order ID - </p>
                  <h6>123456</h6>
                </span>
              </div>
              <div className="pending-order-item-content">
                <span>
                  <p>Order Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Delivery Date - </p>
                  <h6>2023-10-05</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="shipped">Processing</h4>
                </span>
              </div>
            </div>
          )}
          {/* appointments */}
          {selectedCategory === "Appointments" && (
            <div className="appointments-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="appointments-content">
                <h3>Appointment with Dr. Smith</h3>
                <span>
                  <p>Appointment ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h5>Confirmed</h5>
                </span>
              </div>
              <div className="appointments-content-right">
                <button>Show</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {}
    </div>
  );
};

export default Account;
