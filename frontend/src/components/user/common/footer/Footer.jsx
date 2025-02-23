import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col footer-logo">
              <img src="logo.png" alt="" />
            </div>
            <div className="footer-col">
              <h4>About Us</h4>
              <p>
                Health plus pharmacy is your go-to pharmacy platform for
                medicines, health products, doctor consultations and lab test.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Doctors</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact us</h4>
              <p>Gmail: healthplus@gmail.com</p>
              <p>Phone: +94 776 679 711</p>
              <p>Location: Matara, Sri Lanka</p>
              <ul className="social-media">
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Pharmacy Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="footer-bottom-end"></div>
    </div>
  );
};

export default Footer;
