// components/StarRating.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import "./review.css";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star"
              color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
              size={24}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
