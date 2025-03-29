import React from "react";
//animation
import { motion } from "framer-motion";
import "./signup.css";

const Signup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <motion.div
        className="customer-signup-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="customer-signup-left">
          <div>
            <img src="customer-signup.png" alt="login" />
          </div>
          <h2>Welcome !</h2>
        </div>
        <div className="customer-signup-right">
          <div className="customer-signup-close">
            <h3 onClick={onClose}>&times;</h3>
          </div>
          <div className="customer-signup-form">
            <input name="Name" placeholder="Name"></input>
            <p>console.error</p>
            <input name="Address" placeholder="Address"></input>
            <p>console.error</p>
            <input name="Postal code" placeholder="Postal code"></input>
            <p>console.error</p>
            <input name="Phone number" placeholder="Phone number"></input>
            <p>console.error</p>
            <input name="Email" placeholder="Email"></input>
            <p>console.error</p>
            <input name="Password" placeholder="Password"></input>
            <p>console.error</p>
          </div>
          <button>Send</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
