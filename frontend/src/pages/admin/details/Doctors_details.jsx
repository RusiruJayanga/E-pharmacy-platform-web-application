import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../user/seller/doctor/details/appointment_doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctors_details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = location.state || {};
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch detailed doctor info
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        if (!doctorId) {
          navigate("/Doctors_manage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/admin/doctor/${doctorId}`
        );
        setSelectedDoctor(response.data);
      } catch (err) {
        toast.error("Failed to fetch doctor details. Please try again.");
      }
    };

    fetchDoctorDetails();
  }, [doctorId, navigate]);

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctor/${doctorId}/status`,
        {
          status: "Approved",
        }
      );
      toast.success("Doctor approved");
      navigate("/Doctors_manage");
    } catch (err) {
      toast.error("Failed to approve doctor. Please try again.");
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctor/${doctorId}/status`,
        {
          status: "Rejected",
        }
      );
      toast.success("Doctor Rejected");
      navigate("/Doctors_manage");
    } catch (err) {
      toast.error("Failed to reject doctor. Please try again.");
    }
  };

  return (
    <div>
      <div className="ribben"></div>
      <div className="appointment-profile-image">
        <img
          src={selectedDoctor?.profile_picture || "default-profile.png"}
          alt={selectedDoctor?.name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-image">
        <h5>License File</h5>
        <img
          src={selectedDoctor?.license_file || "default-profile.png"}
          alt={selectedDoctor?.name}
          className="doctor-image"
        />
      </div>
      <div className="appointment-info-box">
        <h3>{selectedDoctor?.name}</h3>
        <div className="appointment-info-content">
          <span>
            <p>Doctor ID - </p>
            <h6>{selectedDoctor?._id}</h6>
          </span>
          <span>
            <p>SLMC Number - </p>
            <h6>{selectedDoctor?.slmc_number}</h6>
          </span>
          <span>
            <p>Specialty - </p>
            <h6>{selectedDoctor?.specialty}</h6>
          </span>
          <span>
            <p>Email - </p>
            <h6>{selectedDoctor?.email}</h6>
          </span>
          <span>
            <p>Doctor Phone Number - </p>
            <h6>{selectedDoctor?.phone_number}</h6>
          </span>
          <span>
            <p>District - </p>
            <h6>{selectedDoctor?.district}</h6>
          </span>
          <span>
            <p>Address - </p>
            <h6>{selectedDoctor?.address}</h6>
          </span>
          <span>
            <p>Description - </p>
            <h6>{selectedDoctor?.description}</h6>
          </span>
        </div>
        {selectedDoctor?.account_status === "Pending" && (
          <form>
            <button onClick={handleReject}>Reject</button>
            <button onClick={handleApprove}>Approve</button>
          </form>
        )}
        {selectedDoctor?.account_status === "Approved" && (
          <form>
            <button onClick={handleReject}>Reject</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Doctors_details;
