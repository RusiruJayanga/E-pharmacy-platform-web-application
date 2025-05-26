import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../../components/user/customer/navigation/Navigation_bar.css";
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
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Home_admin"
            >
              Home
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Customers_manage"
            >
              Customers
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Doctors_manage"
            >
              Doctors
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Lab_manage"
            >
              Lab Owners
            </NavLink>
            <NavLink
              className="nav-list-left nav-responsive-left"
              to="/Pharmacies_manage"
            >
              Pharmacies
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation_bar;
