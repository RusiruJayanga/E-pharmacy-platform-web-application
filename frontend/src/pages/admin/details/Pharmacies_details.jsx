import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../user/seller/doctor/details/appointment_doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pharmacies_details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pharmaciesId } = location.state || {};
  const [selectedPharmacies, setSelectedPharmacies] = useState(null);

  useEffect(() => {
    const fetchPharmaciesDetails = async () => {
      try {
        if (!pharmaciesId) {
          navigate("/Pharmacies_manage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/admin/pharmacist/${pharmaciesId}`
        );
        setSelectedPharmacies(response.data);
      } catch (err) {
        toast.error("Failed to fetch pharmacies details. Please try again.");
      }
    };

    fetchPharmaciesDetails();
  }, [pharmaciesId, navigate]);

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/pharmacist/${pharmaciesId}/status`,
        {
          status: "Approved",
        }
      );
      toast.success("Pharmacies approved");
      navigate("/Pharmacies_manage");
    } catch (err) {
      toast.error("Failed to approve pharmacies. Please try again.");
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/pharmacist/${pharmaciesId}/status`,
        {
          status: "Rejected",
        }
      );
      toast.success("Pharmacies Rejected");
      navigate("/Pharmacies_manage");
    } catch (err) {
      toast.error("Failed to reject pharmacies. Please try again.");
    }
  };

  return (
    <div>
      <div className="ribben"></div>
      <div className="appointment-profile-image">
        <img
          src={selectedPharmacies?.profile_picture || "default-profile.png"}
          alt={selectedPharmacies?.name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-image">
        <h5>Government ID</h5>
        <img
          src={selectedPharmacies?.government_id || "default-profile.png"}
          alt={selectedPharmacies?.name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-image">
        <h5>Registration Certificate</h5>
        <img
          src={
            selectedPharmacies?.registration_certificate ||
            "default-profile.png"
          }
          alt={selectedPharmacies?.name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-box">
        <h3>{selectedPharmacies?.pharmacy_name}</h3>
        <div className="appointment-info-content">
          <span>
            <p>Pharmacies ID - </p>
            <h6>{selectedPharmacies?._id}</h6>
          </span>
          <span>
            <p>Owner Name - </p>
            <h6>{selectedPharmacies?.owner_name}</h6>
          </span>
          <span>
            <p>National ID - </p>
            <h6>{selectedPharmacies?.national_id}</h6>
          </span>
          <span>
            <p>SLMC Number - </p>
            <h6>{selectedPharmacies?.slmc_number}</h6>
          </span>
          <span>
            <p>Postal Code - </p>
            <h6>{selectedPharmacies?.postal_code}</h6>
          </span>
          <span>
            <p>Email - </p>
            <h6>{selectedPharmacies?.email}</h6>
          </span>
          <span>
            <p>Pharmacies Phone Number - </p>
            <h6>{selectedPharmacies?.phone_number}</h6>
          </span>
          <span>
            <p>District - </p>
            <h6>{selectedPharmacies?.district}</h6>
          </span>
          <span>
            <p>Address - </p>
            <h6>{selectedPharmacies?.address}</h6>
          </span>
          <span>
            <p>Description - </p>
            <h6>{selectedPharmacies?.description}</h6>
          </span>
        </div>
        {selectedPharmacies?.account_status === "Pending" && (
          <form>
            <button onClick={handleReject}>Reject</button>
            <button onClick={handleApprove}>Approve</button>
          </form>
        )}
        {selectedPharmacies?.account_status === "Approved" && (
          <form>
            <button onClick={handleReject}>Reject</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Pharmacies_details;
