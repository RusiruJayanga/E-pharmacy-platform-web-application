import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Doctors = () => {
  const [selectedCategory, setSelectedCategory] = useState("Pending Requests");
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Pending Requests",
    "Approved Requests",
    "Rejected Requests",
  ];

  const statusMap = {
    "Pending Requests": "Pending",
    "Approved Requests": "Approved",
    "Rejected Requests": "Rejected",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");
        const status = statusMap[selectedCategory];
        const response = await axios.get(
          `http://localhost:5000/api/admin/doctor/status/${status}`
        );
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedCategory]);

  const navigateOrder = useNavigate();
  const handleDoctorClick = (doctorId) => {
    navigateOrder(`/Doctor_details`, { state: { doctorId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="order-head">
        <h2>Doctors</h2>
      </div>
      {}
      {/* order section */}
      <div className="order-container">
        <div className="order-option-box">
          {categories.map((category, index) => (
            <h4
              key={index}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        {!loading && doctors.length === 0 ? (
          <div className="no-doctors">No doctors found in this category</div>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor._id} className="product-order-container">
              <div className="product-order-up">
                <img
                  src={doctor.profile_picture || "default-profile.png"}
                  alt={doctor.name}
                />
                <div className="product-order-up-content">
                  <h4>{doctor.name}</h4>
                  <span>
                    <p>Doctor ID - {doctor._id}</p>
                  </span>
                  <div className="product-order-content-middle">
                    <span>
                      <p>SLMC Number -</p>
                      <h5>{doctor.slmc_number}</h5>
                    </span>
                    <span>
                      <p>Specialty -</p>
                      <h5>{doctor.specialty}</h5>
                    </span>
                    <span>
                      <p>District -</p>
                      <h5>{doctor.district}</h5>
                    </span>
                    <div className="product-order-content-middle-right">
                      <button onClick={() => handleDoctorClick(doctor._id)}>
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctors;
