import React, { useEffect, useState } from "react";
import axios from "axios";
import "./appointment_doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
//margin css
import "../../../../../components/user/common/margin/margin.css";
import { toast } from "react-toastify";

const Appointment_doctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentId } = location.state || {};

  const [appointment, setAppointment] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    if (!appointmentId) {
      toast.error("No appointment ID provided");
      return;
    }

    // Fetch appointment details
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/appointment-doctor/get/${appointmentId}`
        );
        setAppointment(res.data);
      } catch (err) {
        toast.error("Failed to load appointment details");
        console.error(err);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handleApprove = async (e) => {
    e.preventDefault();

    if (!appointmentDate) {
      toast.warning("Please select an appointment date");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/appointment-doctor/approve/${appointmentId}`,
        {
          due_date: appointmentDate,
        }
      );
      toast.success("Appointment approved");
      navigate("/Home_doctor");
    } catch (err) {
      toast.error("Error approving appointment");
      console.error(err);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/appointment-doctor/reject/${appointmentId}`
      );
      toast.success("Appointment rejected");
      navigate("/Home_doctor");
    } catch (err) {
      toast.error("Error rejecting appointment");
      console.error(err);
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="ribben"></div>
      <div className="appointment-info-box">
        {" "}
        <h3>{appointment.customer_id?.name}</h3>
        <div className="appointment-info-content">
          <span>
            <p>Appointment ID - </p>
            <h6>{appointment._id}</h6>
          </span>
          <span>
            <p>Customer Phone Number - </p>
            <h6>{appointment.customer_id?.phone_number}</h6>
          </span>
          <span>
            <p>Customer Email - </p>
            <h6>{appointment.customer_id?.email}</h6>
          </span>
          <span>
            <p>Customer Address - </p>
            <h6>{appointment.customer_id?.address}</h6>
          </span>
          <span>
            <p>Book Date - </p>
            <h6>{new Date(appointment.book_date).toLocaleDateString()}</h6>
          </span>
          <span>
            <p>Description if available - </p>
            <h6>{appointment.description || "N/A"}</h6>
          </span>
        </div>
        {appointment.status === "Pending" && (
          <form>
            <p>Appointment Date</p>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />

            <button
              type="submit"
              className="form-approve-button"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              type="button"
              className="form-reject-button"
              onClick={handleReject}
            >
              Reject
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment_doctor;
