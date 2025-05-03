import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navigation_bar.css";
//animation
import { motion } from "framer-motion";
//login
import LoginModel from "../../../../modules/user/customer/login/Login";
//signup
import SignupModel from "../../../../modules/user/customer/signup/Signup";

const Navigation_bar = () => {
  //drop down menu
  const [translateshowDropdown, translatesetShowDropdown] = useState(false);
  const [accountshowDropdown, accountsetShowDropdown] = useState(false);
  const closeDropdowns = () => {
    translatesetShowDropdown(false);
    accountsetShowDropdown(false);
  };
  //responsive menu
  const [menuOpen, set_menu_open] = useState(false);
  //login
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  //signup
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  //imulated login status
  const token = localStorage.getItem("customerToken");

  return (
    <div className="nav-position" onClick={closeDropdowns}>
      <nav>
        <div className="nav-container">
          <h4 className="hamburger" onClick={() => set_menu_open(!menuOpen)}>
            ☰
          </h4>
          <ul className={`nav-left nav-responsive ${menuOpen ? "open" : ""}`}>
            <NavLink className="nav-list-left nav-responsive-left" to="/">
              Home
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Medicines"
            >
              Medicines
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Pharmacies"
            >
              Pharmacies
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Doctors"
            >
              Doctors
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Lab_Tests"
            >
              Lab Tests
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Accessories"
            >
              Accessories
            </NavLink>
          </ul>
          <ul className="nav-right">
            <Link to="/Search">
              <span>
                <p>Search Prescription With AI !</p>

                <h4 className="nav-list-right">
                  <i class="bi bi-search"></i>
                </h4>
              </span>
              <h4 className="nav-list-right search-bar">
                <i class="bi bi-search"></i>
              </h4>
            </Link>
            <Link to="/Cart">
              <h4 className="nav-list-right">
                <i class="bi bi-cart2"></i>
              </h4>
            </Link>
            <Link to="/Save">
              <h4 className="nav-list-right">
                <i class="bi bi-bookmark"></i>
              </h4>
            </Link>
            {/* translate dropdown */}
            <h4
              className="nav-list-right translate-drop"
              onClick={(e) => {
                e.stopPropagation();
                translatesetShowDropdown(!translateshowDropdown);
                accountsetShowDropdown(false);
              }}
            >
              <i className="bi bi-translate"></i>
              {translateshowDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="dropdown-menu dropdown-menu-translate"
                >
                  <p className="dropdown-item">English</p>
                  <p className="dropdown-item">සිංහල</p>
                  <p className="dropdown-item">தமிழ்</p>
                </motion.div>
              )}
            </h4>
            {/* Account Dropdown */}
            {token ? (
              <Link to="/Account">
                <h4 className="nav-list-right account-drop">
                  <i className="bi bi-person"></i>
                </h4>
              </Link>
            ) : (
              <h4
                className="nav-list-right account-drop"
                onClick={(e) => {
                  e.stopPropagation();
                  accountsetShowDropdown(!accountshowDropdown);
                  translatesetShowDropdown(false);
                }}
              >
                <i className="bi bi-person"></i>
                {accountshowDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="dropdown-menu dropdown-menu-account"
                  >
                    <p
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        accountsetShowDropdown(false);
                        setIsLoginOpen(true);
                      }}
                    >
                      Login
                    </p>
                    <p
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        accountsetShowDropdown(false);
                        setIsSignupOpen(true);
                      }}
                    >
                      Signup
                    </p>
                  </motion.div>
                )}
              </h4>
            )}
            {/* login module */}
            <LoginModel
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
            />
            {/* signup module */}
            <SignupModel
              isOpen={isSignupOpen}
              onClose={() => setIsSignupOpen(false)}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation_bar;
