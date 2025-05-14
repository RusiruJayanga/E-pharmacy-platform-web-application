import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./details.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//google map config
import LocationMap from "../../../../config/LocationMap";
//prescription upload
import PrescriptionModel from "../../../../modules/user/customer/details/Lab_prescription";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lab_details = () => {
  //advertisement fatch
  //advertisement fatch
  const location = useLocation();
  const productId = location.state?.productId;
  const [workingTime, setWorkingTime] = useState("");
  const [labLocation, setLabLocation] = useState({ lat: 0, lng: 0 });

  const [lab, setLab] = useState(null);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/labs/${productId}`
        );
        const data = response.data;

        setLab(data);

        if (
          data.working_hours &&
          data.working_hours.open &&
          data.working_hours.close
        ) {
          setWorkingTime(
            `${data.working_hours.open} to ${data.working_hours.close}`
          );
        }

        if (data.location && data.location.lat && data.location.lng) {
          setLabLocation({
            lat: data.location.lat,
            lng: data.location.lng,
          });
        }
      } catch (err) {
        toast.error("Failed to load lab details");
      }
    };

    fetchLab();
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
            product_id: lab._id,
            productType: "Lab",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Lab is saved successfully!");
      } else {
        toast.error(data.message || "Failed to save");
      }
    } catch (error) {
      toast.error("Error saving to lab");
      console.error(error);
    }
  };

  //prescription upload
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      {lab ? (
        <div className="details-box-container">
          <div className="details-box-image">
            <img
              className="product-main-image-dif"
              src={lab.profile_picture}
              alt="lab"
            />
          </div>
          <div className="details-box-content">
            <h3>{lab.lab_name}</h3>
            <div className="details-box-description">
              <p>Description -</p>
              <p>{lab.description}</p>
            </div>
            <span className="details-box-span">
              <p>Contact Number - </p>
              <h5>{lab.phone_number}</h5>
            </span>
            <span>
              <p>E mail - </p>
              <h5>{lab.email}</h5>
            </span>
            <span>
              <p>District - </p>
              <h5>{lab.district}</h5>
            </span>
            <span>
              <p>working Hours - </p>
              <h5>{workingTime}</h5>
            </span>
            <div className="details-box-button-container">
              <button onClick={() => setIsPrescriptionOpen(true)}>
                <h4>
                  <i class="bi bi-list-columns-reverse"></i>
                </h4>
                Upload Prescription
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
      {/* map location section */}
      {lab ? (
        <div className="location-container">
          <div className="location-content">
            <h3>Location</h3>
            <h5>Find Laboratory Location</h5>
            <div className="location-instructions">
              <p>
                Quickly locate certified laboratories for your medical tests and
                checkups. Our platform allows you to browse labs by area,
                compare services, and access essential details like directions,
                contact information. It’s never been easier to book your next
                lab visit with confidence and clarity.
              </p>
            </div>
          </div>
          <div className="location-map">
            <LocationMap location={labLocation} />
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
      {}
      {/* reviews section */}
      <div className="review-container">
        <div className="review-head">
          <h2>Reviews</h2>
          <h4>
            5/5
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <h5>684 ratings</h5>
          </h4>
          <p>All from verified purchases</p>
        </div>
        <div className="review-box">
          {/* repeat */}
          <div className="review-box-review">
            <img src="user-icon.png" alt="profile" />
            <div className="review-box-content">
              <h5>
                5/5
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </h5>
              <h5>Rusiru</h5>
              <p>
                Good , Aluminum Heatsink Radiator Heat sink for Electronic IC
                Chip RAM MOS Dynatron Raspberry Pi Cooling With Thermal
                Conductive Tape.
              </p>
            </div>
          </div>
          {/* repeat */}
          <div className="review-box-show-more-products">
            Show more <i class="bi bi-arrow-down"></i>
          </div>
        </div>
      </div>
      {}
      {/* prescription model */}
      <PrescriptionModel
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
      />
      {}
    </div>
  );
};

export default Lab_details;
