import React from "react";
import "./navigation_bar.css";

const Navigation_bar = () => {
  return (
    <div className="nav-position">
      <nav>
        <div className="nav-container">
          <ul className="nav-left">
            <h5 href="" className="nav-list-left">
              home
            </h5>
            <h5 href="" className="nav-list-left">
              medicines
            </h5>
            <h5 href="" className="nav-list-left">
              doctors
            </h5>
            <h5 href="" className="nav-list-left">
              lab tests
            </h5>
            <h5 href="" className="nav-list-left">
              devices
            </h5>
            <h5 href="" className="nav-list-left">
              accessories
            </h5>
          </ul>
          <ul className="nav-right">
            <h4 href="" className="nav-list-right">
              <i class="bi bi-search"></i>
            </h4>
            <h4 href="" className="nav-list-right">
              <i class="bi bi-cart2"></i>
            </h4>
            <h4 href="" className="nav-list-right">
              <i class="bi bi-bookmark"></i>
            </h4>
            <h4 href="" className="nav-list-right translate-drop">
              <i class="bi bi-translate"></i>
            </h4>
            <h4 href="" className="nav-list-right">
              <i class="bi bi-person"></i>
            </h4>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation_bar;
