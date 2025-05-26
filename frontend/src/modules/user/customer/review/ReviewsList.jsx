import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import "./Review.css";

const ReviewsList = ({ productId, productType, pharmacyId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let query = "";
        if (productId && productType) {
          query = `?product_id=${productId}&productType=${productType}`;
        } else if (pharmacyId) {
          query = `?seller_id=${pharmacyId}`;
        } else {
          setError("No review target specified");
          return;
        }

        const response = await axios.get(`/api/reviews${query}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, productType, pharmacyId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (reviews.length === 0) return <div>No reviews yet</div>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="p-4 border rounded-lg">
          <div className="flex items-center mb-2">
            <div className="font-semibold mr-2">
              {review.customer_id?.name || "Anonymous"}
            </div>
            <StarRating rating={review.rating} />
            <span className="ml-2 text-gray-500 text-sm">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          {review.comment && <p className="text-gray-700">{review.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
