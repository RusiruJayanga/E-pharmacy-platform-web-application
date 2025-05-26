import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarRating from "./StarRating";
import axios from "axios";
import "./Review.css";

const ReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("customerToken");
  const customerId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!customerId) {
      setError("You need to be logged in to submit a review");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        customer_id: customerId,
        rating,
        comment,
      };

      // If it's a product review
      if (state?.reviewId && state?.productType) {
        reviewData.product_id = state.reviewId;
        reviewData.productType = state.productType;
      }
      // If it's a pharmacy review
      else if (state?.pharmacyId) {
        reviewData.seller_id = state.pharmacyId;
      } else {
        setError("Invalid review target");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:5000/api/reviews", reviewData, config);
      navigate(-1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Write a Review</h2>
      {error && <div className="review-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="review-form-group">
          <label className="review-label">Rating</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        <div className="review-form-group">
          <label htmlFor="comment" className="review-label">
            Comment (optional)
          </label>
          <textarea
            id="comment"
            className="review-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="500"
          />
          <p className="char-count">{comment.length}/500 characters</p>
        </div>

        <div className="review-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="review-button review-button-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="review-button review-button-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
