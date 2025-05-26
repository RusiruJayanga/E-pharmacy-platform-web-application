import React from "react";
import { FaStar } from "react-icons/fa";
import "./Review.css";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer text-2xl"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
