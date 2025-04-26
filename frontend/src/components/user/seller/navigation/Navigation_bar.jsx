import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../customer/navigation/Navigation_bar.css";
import "./navigation_bar.css";

const Navigation_bar = () => {
  //responsive menu
  const [menuOpen, set_menu_open] = useState(false);
  //imulated login status
  const token = "dummyToken123";

  return (
    <div className="nav-position nav-bg">
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
              Product
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Pharmacies"
            >
              Advertistment
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
            <Link to="/Account">
              <h4 className="nav-list-right account-drop">
                <i className="bi bi-person"></i>
              </h4>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation_bar;
