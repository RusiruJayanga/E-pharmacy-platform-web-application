import React, { useState } from "react";
import "./details.css";
//animation
import { motion } from "framer-motion";
const Pharmacies_prescription = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <motion.div
        className="prescription-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="prescription-popup-close">
          <h3 onClick={onClose}>&times;</h3>
        </div>
        <h3>Request Medicines</h3>
        <div className="prescription-popup-upload-form">
          <label className="prescription-file-upload">
            <input
              type="file"
              name="registrationCertificate"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <h2>
              <i class="bi bi-cloud-arrow-up-fill"></i>
            </h2>
            Browse Prescription File to Upload
          </label>
          <div className="prescription-popup-error">
            <p>console.error</p>
          </div>
          <textarea placeholder="Note (optional)"></textarea>
        </div>
        <button>Request</button>
      </motion.div>
    </div>
  );
};

export default Pharmacies_prescription;
