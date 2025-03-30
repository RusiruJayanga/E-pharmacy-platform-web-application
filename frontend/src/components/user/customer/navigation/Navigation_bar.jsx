import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navigation_bar.css";
//animation
import { motion } from "framer-motion";
//login
import LoginModel from "../../../../modules/user/customer/login/login";
//signup
import SignupModel from "../../../../modules/user/customer/signup/signup";

const Navigation_bar = () => {
  //drop down menu
  const [translateshowDropdown, translatesetShowDropdown] = useState(false);
  const [accountshowDropdown, accountsetShowDropdown] = useState(false);
  const closeDropdowns = () => {
    translatesetShowDropdown(false);
    accountsetShowDropdown(false);
  };
  const [menuOpen, set_menu_open] = useState(false);
  //active menu
  const [manu, set_manue] = useState("Home");
  //login
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  //signup
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="nav-position" onClick={closeDropdowns}>
      <nav>
        <div className="nav-container">
          <h4 className="hamburger" onClick={() => set_menu_open(!menuOpen)}>
            ☰
          </h4>
          <ul className={`nav-left nav-responsive ${menuOpen ? "open" : ""}`}>
            <NavLink to="/">
              <p
                onClick={() => set_manue("Home")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Home" ? "active" : ""
                }`}
              >
                Home
              </p>
            </NavLink>
            <NavLink to="/Medicines">
              <p
                onClick={() => set_manue("Medicines")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Medicines" ? "active" : ""
                }`}
              >
                Medicines
              </p>
            </NavLink>
            <NavLink to="/Pharmacies">
              <p
                onClick={() => set_manue("Pharmacies")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Pharmacies" ? "active" : ""
                }`}
              >
                Pharmacies
              </p>
            </NavLink>
            <NavLink to="/Doctors">
              <p
                onClick={() => set_manue("Doctors")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Doctors" ? "active" : ""
                }`}
              >
                Doctors
              </p>
            </NavLink>
            <NavLink to="/Lab_Tests">
              <p
                onClick={() => set_manue("Lab-Tests")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Lab-Tests" ? "active" : ""
                }`}
              >
                Lab Tests
              </p>
            </NavLink>
            <NavLink to="/Accessories">
              <p
                onClick={() => set_manue("Accessories")}
                className={`nav-list-left nav-responsive-left ${
                  manu === "Accessories" ? "active" : ""
                }`}
              >
                Accessories
              </p>
            </NavLink>
          </ul>
          <ul className="nav-right">
            <h4 className="nav-list-right">
              <i class="bi bi-search"></i>
            </h4>
            <h4 className="nav-list-right">
              <i class="bi bi-cart2"></i>
            </h4>
            <h4 className="nav-list-right">
              <i class="bi bi-bookmark"></i>
            </h4>
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
