import React from "react";
import { motion } from "framer-motion";
import "./login.css";

const login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="customer-login-popup-overlay" onClick={onClose}>
      <motion.div
        className="customer-login-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="customer-login-close">
          <h3 onClick={onClose}>&times;</h3>
        </div>
        <div>
          <img src="customer-login.png" alt="login" />
        </div>
        <h2>Welcome back !</h2>
        <div className="customer-login-form">
          <input name="Email" placeholder="Email"></input>
          <p>console.error</p>
          <input name="Password" placeholder="Password"></input>
          <p>console.error</p>
        </div>
        <button className="contact-button">Send</button>
      </motion.div>
    </div>
  );
};

export default login;
