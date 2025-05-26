import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./request.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//order card css
import "../../../../../components/user/common/order/order.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pending Request");

  const categories = [
    "Pending Request",
    "Accepted Request",
    "Rejected Request",
  ];

  const getPharmacistToken = () => {
    const raw = localStorage.getItem("pharmacistToken");
    if (!raw) return null;
    try {
      const token = JSON.parse(raw).token;
      return token;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const token = getPharmacistToken();
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:5000/api/request/seller/requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((r) => {
    if (selectedCategory === "Pending Request") return r.status === "Pending";
    if (selectedCategory === "Accepted Request") return r.status === "Accepted";
    if (selectedCategory === "Rejected Request") return r.status === "Rejected";
    return false;
  });

  const navigateRequest = useNavigate();
  const handleRequestClick = (requestId) => {
    navigateRequest(`/Request_seller_details`, { state: { requestId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="request-head">
        <h2>My Order Requests</h2>
      </div>
      {}
      {/* request section */}
      <div className="request-container">
        <div className="request-option-box">
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
        {filteredRequests.map((appointment) => (
          <div className="product-order-container" key={appointment._id}>
            <div className="product-order-up">
              <img src="user-icon.png" alt="user" />
              <div className="product-order-up-content">
                <h4>{appointment.customer_id?.name || "Unknown Customer"}</h4>
                <span>
                  <p>Request ID -</p>
                  <h5>{appointment._id}</h5>
                </span>
                <div className="product-order-content-middle">
                  <span>
                    <p>Request Date -</p>
                    <h5>
                      {new Date(appointment.request_date).toLocaleDateString()}
                    </h5>
                  </span>
                  <span>
                    <p>Due Date -</p>
                    <h5>
                      {appointment.due_date
                        ? new Date(appointment.due_date).toLocaleDateString()
                        : "Pending"}
                    </h5>
                  </span>
                  {appointment.status === "Pending" && (
                    <div className="product-order-content-middle-right">
                      <button
                        onClick={() => handleRequestClick(appointment._id)}
                      >
                        Show
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {}
    </div>
  );
};

export default Request;
