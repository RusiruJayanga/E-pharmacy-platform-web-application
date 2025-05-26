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
import PrescriptionModel from "../../../../modules/user/customer/details/Pharmacies_prescription";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pharmacies_details = () => {
  //advertisement fatch
  const location = useLocation();
  const productId = location.state?.productId;
  const [workingTime, setWorkingTime] = useState("");
  const [pharmacyLocation, setPharmacyLocation] = useState({ lat: 0, lng: 0 });

  const [pharmacy, setPharmacy] = useState(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pharmacies/${productId}`
        );
        const data = response.data;

        setPharmacy(data);

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
          setPharmacyLocation({
            lat: data.location.lat,
            lng: data.location.lng,
          });
        }
      } catch (err) {
        toast.error("Failed to load pharmacy details");
      }
    };

    fetchPharmacy();
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
            product_id: pharmacy._id,
            productType: "Pharmacy",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Pharmacy is saved successfully!");
      } else {
        toast.error(data.message || "Failed to save");
      }
    } catch (error) {
      toast.error("Error saving to pharmacy");
      console.error(error);
    }
  };

  //prescription upload
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews/pharmacy/${pharmacy?._id}`
        );
        setReviews(res.data);

        // Calculate average rating
        if (res.data.length > 0) {
          const avg =
            res.data.reduce((sum, r) => sum + r.rating, 0) / res.data.length;
          setAverageRating(avg.toFixed(1));
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    if (pharmacy?._id) fetchReviews();
  }, [pharmacy?._id]);

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      {pharmacy ? (
        <div className="details-box-container">
          <div className="details-box-image">
            <img
              className="product-main-image-dif"
              src={pharmacy.profile_picture}
              alt="pharmacy"
            />
          </div>
          <div className="details-box-content">
            <h3>{pharmacy.pharmacy_name}</h3>
            <div className="details-box-description">
              <p>Description -</p>
              <p>{pharmacy.description}</p>
            </div>
            <span className="details-box-span">
              <p>SLMC Number - </p>
              <h5>{pharmacy.slmc_number}</h5>
            </span>
            <span>
              <p>Contact Number - </p>
              <h5>{pharmacy.phone_number}</h5>
            </span>
            <span>
              <p>E mail - </p>
              <h5>{pharmacy.email}</h5>
            </span>
            <span>
              <p>District - </p>
              <h5>{pharmacy.district}</h5>
            </span>
            {pharmacy.working_hours && (
              <span>
                <p>Working Hours - </p>
                <h5>{workingTime}</h5>
              </span>
            )}
            <div className="details-box-button-container">
              <button onClick={() => setIsPrescriptionOpen(true)}>
                <h4>
                  <i class="bi bi-list-columns-reverse"></i>
                </h4>
                Upload Prescription
              </button>
              <button onClick={handleAddToWishlist}>
                <h4>
                  <i className="bi bi-bookmark"></i>
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
      <div className="location-head">
        <h2>Location</h2>
      </div>
      {pharmacy ? (
        <div className="location-container">
          <div className="location-content">
            <h5>Find Pharmacy Location</h5>
            <div className="location-instructions">
              <p>
                Easily discover nearby pharmacies with our interactive location
                feature. Whether you need to refill prescriptions or explore
                over-the-counter products, our system helps you find the most
                convenient pharmacy based on your location.
              </p>
            </div>
          </div>
          <div className="location-map">
            <LocationMap location={pharmacyLocation} />
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
            {averageRating}/5{" "}
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${
                  i < Math.round(averageRating) ? "bi-star-fill" : "bi-star"
                }`}
              ></i>
            ))}
            <h5>{reviews.length} ratings</h5>
          </h4>
          <p>All from verified purchases</p>
        </div>
        <div className="review-box">
          {/* repeat */}
          {reviews.map((review) => (
            <div className="review-box-review" key={review._id}>
              <img src="/user-icon.png" alt="profile" />
              <div className="review-box-content">
                <h5>
                  {review.rating}/5{" "}
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        i < review.rating ? "bi-star-fill" : "bi-star"
                      }`}
                    ></i>
                  ))}
                </h5>
                <h5>{review.customer_id?.name}</h5>
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p>No reviews yet for this pharmacy.</p>}
          {/* repeat */}
          {reviews.length > 3 && (
            <div className="review-box-show-more-products">
              Show more <i className="bi bi-arrow-down"></i>
            </div>
          )}
        </div>
      </div>
      {}
      {/* prescription model */}
      {pharmacy && (
        <PrescriptionModel
          isOpen={isPrescriptionOpen}
          onClose={() => setIsPrescriptionOpen(false)}
          pharmacyId={pharmacy._id}
        />
      )}
      {}
    </div>
  );
};

export default Pharmacies_details;
