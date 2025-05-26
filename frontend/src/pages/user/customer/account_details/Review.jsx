import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./review.css";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const Review = () => {
  const { state } = useLocation();
  const { reviewId } = state || {};
  const token = localStorage.getItem("customerToken");
  const [productRating, setProductRating] = useState(0);
  const [productComment, setProductComment] = useState("");
  const [sellerRating, setSellerRating] = useState(0);
  const [sellerComment, setSellerComment] = useState("");
  const [productType, setProductType] = useState("");

  useEffect(() => {
    const getProductType = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews/products/check-type/${reviewId}`
        );
        setProductType(res.data.productType);
      } catch (err) {
        toast.error("Error fetching product type");
      }
    };
    getProductType();
  }, [reviewId]);

  const handleProductReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/reviews/product",
        {
          product_id: reviewId,
          productType,
          rating: productRating,
          comment: productComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product review submitted");
      setProductRating(0);
      setProductComment("");
    } catch (err) {
      toast.error("Failed to submit product review");
    }
  };

  const handleSellerReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/reviews/seller",
        {
          product_id: reviewId,
          productType,
          rating: sellerRating,
          comment: sellerComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Seller review submitted");
      setSellerRating(0);
      setSellerComment("");
    } catch (err) {
      toast.error("Failed to submit seller review");
    }
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="head-section margin-head-1">
        <h2>Add Review</h2>
      </div>
      {}
      <form onSubmit={handleProductReview} className="form-review">
        <h5>Review Product</h5>
        <StarRating rating={productRating} setRating={setProductRating} />
        <textarea
          maxLength={300}
          value={productComment}
          onChange={(e) => setProductComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleSellerReview} className="form-review">
        <h5>Review Seller</h5>
        <StarRating rating={sellerRating} setRating={setSellerRating} />
        <textarea
          maxLength={300}
          value={sellerComment}
          onChange={(e) => setSellerComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Review;
