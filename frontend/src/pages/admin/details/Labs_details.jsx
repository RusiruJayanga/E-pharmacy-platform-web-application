import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../user/seller/doctor/details/appointment_doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Labs_details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { labId } = location.state || {};
  const [selectedLab, setSelectedLab] = useState(null);

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        if (!labId) {
          navigate("/Lab_manage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/admin/lab/${labId}`
        );
        setSelectedLab(response.data);
      } catch (err) {
        toast.error("Failed to fetch lab details. Please try again.");
      }
    };

    fetchLabDetails();
  }, [labId, navigate]);

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/lab/${labId}/status`, {
        status: "Approved",
      });
      toast.success("Lab approved");
      navigate("/Lab_manage");
    } catch (err) {
      toast.error("Failed to approve lab. Please try again.");
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/lab/${labId}/status`, {
        status: "Rejected",
      });
      toast.success("Lab Rejected");
      navigate("/Lab_manage");
    } catch (err) {
      toast.error("Failed to reject lab. Please try again.");
    }
  };

  return (
    <div>
      <div className="ribben"></div>
      <div className="appointment-profile-image">
        <img
          src={selectedLab?.profile_picture || "default-profile.png"}
          alt={selectedLab?.lab_name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-image">
        <h5>NMRA</h5>
        <img
          src={selectedLab?.nmra_cert || "default-profile.png"}
          alt={selectedLab?.lab_name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-image">
        <h5>Diagnostic License</h5>
        <img
          src={selectedLab?.diagnostic_license || "default-profile.png"}
          alt={selectedLab?.lab_name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-box">
        <h3>{selectedLab?.lab_name}</h3>
        <div className="appointment-info-content">
          <span>
            <p>Lab ID - </p>
            <h6>{selectedLab?._id}</h6>
          </span>
          <span>
            <p>Pathologist Name - </p>
            <h6>{selectedLab?.pathologist_name}</h6>
          </span>
          <span>
            <p>National ID - </p>
            <h6>{selectedLab?.national_id}</h6>
          </span>
          <span>
            <p>Business Reg Number - </p>
            <h6>{selectedLab?.business_reg_number}</h6>
          </span>
          <span>
            <p>Postal Code - </p>
            <h6>{selectedLab?.postal_code}</h6>
          </span>
          <span>
            <p>Email - </p>
            <h6>{selectedLab?.email}</h6>
          </span>
          <span>
            <p>LAb Phone Number - </p>
            <h6>{selectedLab?.phone_number}</h6>
          </span>
          <span>
            <p>District - </p>
            <h6>{selectedLab?.district}</h6>
          </span>
          <span>
            <p>Address - </p>
            <h6>{selectedLab?.address}</h6>
          </span>
          <span>
            <p>Description - </p>
            <h6>{selectedLab?.description}</h6>
          </span>
        </div>
        {selectedLab?.account_status === "Pending" && (
          <form>
            <button onClick={handleReject}>Reject</button>
            <button onClick={handleApprove}>Approve</button>
          </form>
        )}
        {selectedLab?.account_status === "Approved" && (
          <form>
            <button onClick={handleReject}>Reject</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Labs_details;
