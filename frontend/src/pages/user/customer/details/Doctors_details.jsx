import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./details.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctors_details = () => {
  //advertisement fatch
  const location = useLocation();
  const productId = location.state?.productId;
  const [workingTime, setWorkingTime] = useState("");

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/${productId}`
        );
        const data = response.data;

        setDoctor(data);

        if (
          data.working_hours &&
          data.working_hours.open &&
          data.working_hours.close
        ) {
          setWorkingTime(
            `${data.working_hours.open} to ${data.working_hours.close}`
          );
        }
      } catch (err) {
        toast.error("Failed to load doctor details");
      }
    };

    fetchDoctor();
  }, [productId]);

  //add to save
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        toast.error("Please login to save items");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/save/add-to-save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: doctor._id,
            productType: "Doctor",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Doctor is saved successfully!");
      } else {
        toast.error(data.message || "Failed to save");
      }
    } catch (error) {
      toast.error("Error saving to doctor");
      console.error(error);
    }
  };

  //chanel doctor
  const handleChannelDoctor = async () => {
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        toast.error("Please login to save items");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/appointments/doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: doctor._id,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Appointment requested!");
      } else {
        toast.error(data.message || "Failed to request");
      }
    } catch (error) {
      toast.error("Could not book appointment");
      console.error(error);
    }
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      {doctor ? (
        <div className="details-box-container">
          <div className="details-box-image">
            <img
              className="product-main-image-dif"
              src={doctor.profile_picture}
              alt="doctor"
            />
          </div>
          <div className="details-box-content">
            <h3>{doctor.name}</h3>
            <div className="details-box-description">
              <p>Description -</p>
              <p>{doctor.description}</p>
            </div>
            <span className="details-box-span">
              <p>Specialist In - </p>
              <h5>{doctor.specialty}</h5>
            </span>
            <span>
              <p>Contact Number - </p>
              <h5>{doctor.phone_number}</h5>
            </span>
            <span>
              <p>E mail - </p>
              <h5>{doctor.email}</h5>
            </span>
            <span>
              <p>District - </p>
              <h5>{doctor.district}</h5>
            </span>
            <div className="details-box-button-container">
              <button onClick={handleChannelDoctor}>
                <h4>
                  <i class="bi bi-chat-dots"></i>
                </h4>
                Channel Doctor
              </button>
              <button onClick={handleAddToWishlist}>
                <h4>
                  <i class="bi bi-bookmark"></i>
                </h4>
              </button>
            </div>
            <div className="details-box-paywith">
              <img src="paypal.png" alt="paywith" />
              <img src="cardpay.png" alt="paywith" />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
      {}
    </div>
  );
};

export default Doctors_details;
