import React, { useState } from "react";
import "./navigation_bar.css";

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

  return (
    <div className="nav-position" onClick={closeDropdowns}>
      <nav>
        <div className="nav-container">
          <h4 className="hamburger" onClick={() => set_menu_open(!menuOpen)}>
            ☰
          </h4>
          <ul className={`nav-left nav-responsive ${menuOpen ? "open" : ""}`}>
            <p
              onClick={() => set_manue("Home")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Home" ? "active" : ""
              }`}
            >
              Home
            </p>
            <p
              onClick={() => set_manue("Medicines")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Medicines" ? "active" : ""
              }`}
            >
              Medicines
            </p>
            <p
              onClick={() => set_manue("Doctors")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Doctors" ? "active" : ""
              }`}
            >
              Doctors
            </p>
            <p
              onClick={() => set_manue("Lab-Tests")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Lab-Tests" ? "active" : ""
              }`}
            >
              Lab Tests
            </p>
            <p
              onClick={() => set_manue("Devices")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Devices" ? "active" : ""
              }`}
            >
              Devices
            </p>
            <p
              onClick={() => set_manue("Accessories")}
              className={`nav-list-left nav-responsive-left ${
                manu === "Accessories" ? "active" : ""
              }`}
            >
              Accessories
            </p>
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
            {/* translate Dropdown */}
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
                <div className="dropdown-menu dropdown-menu-translate">
                  <p className="dropdown-item">English</p>
                  <p className="dropdown-item">සිංහල</p>
                  <p className="dropdown-item">தமிழ்</p>
                </div>
              )}
            </h4>
            {/* account Dropdown */}
            <h4
              className="nav-list-right account-drop"
              onClick={(e) => {
                e.stopPropagation();
                accountsetShowDropdown(!accountshowDropdown);
                translatesetShowDropdown(false);
              }}
            >
              <i class="bi bi-person"></i>
              {accountshowDropdown && (
                <div className="dropdown-menu dropdown-menu-account">
                  <p className="dropdown-item">Login</p>
                  <p className="dropdown-item">Signup</p>
                </div>
              )}
            </h4>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation_bar;
