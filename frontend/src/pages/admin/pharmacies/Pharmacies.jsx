import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Pharmacies = () => {
  const [selectedCategory, setSelectedCategory] = useState("Pending Requests");
  const [pharmacies, setPharmacies] = useState([]);

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
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        setError("");
        const status = statusMap[selectedCategory];
        const response = await axios.get(
          `http://localhost:5000/api/admin/pharmacist/status/${status}`
        );
        setPharmacies(response.data);
      } catch (err) {
        setError("Failed to fetch pharmacies. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [selectedCategory]);

  const navigateOrder = useNavigate();
  const handlePharmaciesClick = (pharmaciesId) => {
    navigateOrder(`/Pharmacies_detail`, { state: { pharmaciesId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="order-head">
        <h2>Pharmacies</h2>
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
        {!loading && pharmacies.length === 0 ? (
          <div className="no-doctors">No doctors found in this category</div>
        ) : (
          pharmacies.map((pharmacies) => (
            <div key={pharmacies._id} className="product-order-container">
              <div className="product-order-up">
                <img
                  src={pharmacies.profile_picture || "default-profile.png"}
                  alt={pharmacies.pharmacy_name}
                />
                <div className="product-order-up-content">
                  <h4>{pharmacies.pharmacy_name}</h4>
                  <span>
                    <p>Lab ID - {pharmacies._id}</p>
                  </span>
                  <div className="product-order-content-middle">
                    <span>
                      <p>National ID -</p>
                      <h5>{pharmacies.national_id}</h5>
                    </span>
                    <span>
                      <p>District -</p>
                      <h5>{pharmacies.district}</h5>
                    </span>
                    <span>
                      <p>Phone Number -</p>
                      <h5>{pharmacies.phone_number}</h5>
                    </span>
                    <div className="product-order-content-middle-right">
                      <button
                        onClick={() => handlePharmaciesClick(pharmacies._id)}
                      >
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
      {}
    </div>
  );
};

export default Pharmacies;
