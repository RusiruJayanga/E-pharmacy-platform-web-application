import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Lab = () => {
  const [selectedCategory, setSelectedCategory] = useState("Pending Requests");
  const [labs, setLabs] = useState([]);

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

  // Fetch labs based on selected category
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        setError("");
        const status = statusMap[selectedCategory];
        const response = await axios.get(
          `http://localhost:5000/api/admin/lab/status/${status}`
        );
        setLabs(response.data);
      } catch (err) {
        setError("Failed to fetch labs. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [selectedCategory]);

  const navigateOrder = useNavigate();
  const handleLabClick = (labId) => {
    navigateOrder(`/Labs_details`, { state: { labId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="order-head">
        <h2>Labs</h2>
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
        {!loading && labs.length === 0 ? (
          <div className="no-doctors">No doctors found in this category</div>
        ) : (
          labs.map((lab) => (
            <div key={lab._id} className="product-order-container">
              <div className="product-order-up">
                <img
                  src={lab.profile_picture || "default-profile.png"}
                  alt={lab.lab_name}
                />
                <div className="product-order-up-content">
                  <h4>{lab.lab_name}</h4>
                  <span>
                    <p>Lab ID - {lab._id}</p>
                  </span>
                  <div className="product-order-content-middle">
                    <span>
                      <p>National ID -</p>
                      <h5>{lab.national_id}</h5>
                    </span>
                    <span>
                      <p>District -</p>
                      <h5>{lab.district}</h5>
                    </span>
                    <span>
                      <p>Business Reg Number -</p>
                      <h5>{lab.business_reg_number}</h5>
                    </span>
                    <div className="product-order-content-middle-right">
                      <button onClick={() => handleLabClick(lab._id)}>
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

export default Lab;
