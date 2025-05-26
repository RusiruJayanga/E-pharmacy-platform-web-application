import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../doctor/home/home.css";
//margin css
import "../../../../../components/user/common/margin/margin.css";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../../customer/home/home.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  const [selectedCategory, setSelectedCategory] = useState("New Appointments");
  const categories = [
    "New Appointments",
    "End Appointments",
    "Rejected Appointments",
  ];

  const [newAppointments, setNewAppointments] = useState([]);
  const [endAppointments, setEndAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalClients: 0,
    averageRating: 0,
  });

  const fetchAllData = async () => {
    // helper returns the raw JWT string
    const token = JSON.parse(localStorage.getItem("labToken"))?.token;
    if (!token) {
      toast.error("Please log in");
      return;
    }

    try {
      const authHeader = { Authorization: `Bearer ${token}` };

      const [newRes, endRes, rejectRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/lab/appointments/lab/new", {
          headers: authHeader,
        }),
        axios.get("http://localhost:5000/api/lab/appointments/lab/end", {
          headers: authHeader,
        }),
        axios.get("http://localhost:5000/api/lab/appointments/lab/rejected", {
          headers: authHeader,
        }),
        axios.get("http://localhost:5000/api/lab/lab/stats", {
          headers: authHeader,
        }),
      ]);

      setNewAppointments(newRes.data);
      setEndAppointments(endRes.data);
      setRejectedAppointments(rejectRes.data);
      setStats(statsRes.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to load data"
      );
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  //details page
  const navigate = useNavigate();
  const handleCardClick = (appointmentId) => {
    navigate(`/Appointment_lab`, { state: { appointmentId } });
  };

  const renderAppointmentItem = (item) => (
    <div key={item._id}>
      <div className="appointment-item-container">
        <div className="appointment-item-content">
          <h3>{item.customer_id?.name}</h3>
          <span>
            <p>Appointment ID - </p>
            <h6>{item._id}</h6>
          </span>
          <span>
            <p>Customer Email - </p>
            <h6>{item.customer_id?.email || "N/A"}</h6>
          </span>
        </div>
        <div className="appointment-item-content">
          <span>
            <p>Payment Status - </p>
            <h6>{item.payment_status}</h6>
          </span>
          <span>
            <p>Book Date - </p>
            <h6>{new Date(item.book_date).toLocaleDateString()}</h6>
          </span>
          <span>
            <p>Status - </p>
            <h4 className={item.status}>{item.status}</h4>
          </span>
        </div>
        <div className="appointment-item-action">
          <button onClick={() => handleCardClick(item._id)}>Show</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="margin-section-container lab-home-section1"></div>

      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="doctor-count1.png" alt="count" />
          <div className="count-content">
            <h2>
              {inView && (
                <CountUp start={0} end={stats.totalAppointments} duration={2} />
              )}
              +
            </h2>
            <h4>Appointments</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="doctor-count2.png" alt="count" />
          <div className="count-content">
            <h2>
              {inView && (
                <CountUp start={0} end={stats.totalClients} duration={2} />
              )}
            </h2>
            <h4>Clients</h4>
          </div>
        </div>
      </div>

      <div className="appointment-head">
        <h2>My Appointments</h2>
      </div>

      <div className="appointment-container">
        <div className="appointment-option-box">
          {categories.map((category) => (
            <h4
              key={category}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>

        {selectedCategory === "New Appointments" &&
          (newAppointments.length > 0 ? (
            newAppointments.map(renderAppointmentItem)
          ) : (
            <div className="advertisement-product-available">
              <h4>No Appointments</h4>
            </div>
          ))}

        {selectedCategory === "End Appointments" &&
          (endAppointments.length > 0 ? (
            endAppointments.map(renderAppointmentItem)
          ) : (
            <div className="advertisement-product-available">
              <h4>No Appointments</h4>
            </div>
          ))}

        {selectedCategory === "Rejected Appointments" &&
          (rejectedAppointments.length > 0 ? (
            rejectedAppointments.map(renderAppointmentItem)
          ) : (
            <div className="advertisement-product-available">
              <h4>No Appointments</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
