import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./details.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//prescription upload
import PrescriptionModel from "../../../../modules/user/customer/details/Medicines_prescription";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Medicines_details = () => {
  //product image select
  const [selectedImage, setSelectedImage] = useState("");
  //product option select
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);

  const handleOptionClick = (option) => {
    setSelectedSize(option.name);
    setCurrentPrice(option.price);
  };

  //product fatch
  const location = useLocation();
  const productId = location.state?.productId;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/medicines/${productId}`
        );
        const data = await res.json();

        if (res.ok) {
          setProduct(data);

          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }

          if (data.options && data.options.length > 0) {
            setSelectedSize(data.options[0].name);
            setCurrentPrice(data.options[0].price);
          }
        } else {
          toast.error(data.message || "Failed to load product");
        }
      } catch (error) {
        toast.error("Error fetching product details");
        console.error(error);
      }
    };

    if (productId) {
      fetchProductDetails();
    } else {
      toast.error("No product ID found");
    }
  }, [productId]);

  //add to cart
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product._id,
          productType: "Medicine",
          option: selectedSize,
          price: price,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Added to cart successfully!");
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

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
            product_id: product._id,
            productType: "Medicine",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Product is saved successfully!");
      } else {
        toast.error(data.message || "Failed to save");
      }
    } catch (error) {
      toast.error("Error saving to product");
      console.error(error);
    }
  };

  //prescription upload
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  //price
  const price = currentPrice - (product?.discount / 100) * currentPrice;

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews/product/${product?._id}`
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

    if (product?._id) fetchReviews();
  }, [product?._id]);

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* details box */}
      {product ? (
        <div className="details-box-container">
          <div className="details-box-image">
            <img
              className="product-main-image"
              src={selectedImage}
              alt="product"
            />
            <div className="thumbnail-row">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  className={`thumbnail-image ${
                    selectedImage === img ? "active-product" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="details-box-content">
            <h3>{product.name}</h3>
            <div className="details-box-description">
              <p>Description -</p>
              <p>{product.description}</p>
            </div>
            {product.discount > 0 && (
              <span className="details-box-span">
                <p>Offer - </p>
                <p>{product.discount}% off</p>
              </span>
            )}
            <span>
              <p>Price - </p>
              <h4>Rs/ {price.toFixed(2)}</h4>
            </span>
            <div className="details-box-options">
              <p>Options -</p>
              <div className="details-box-options-button-container">
                {product?.options?.map((option, index) => (
                  <h5
                    key={index}
                    className={`option-btn ${
                      selectedSize === option.name ? "selected-option" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.name}
                  </h5>
                ))}
              </div>
            </div>
            <div className="details-box-button-container">
              {product.law === "Need Prescription" ? (
                <button onClick={() => setIsPrescriptionOpen(true)}>
                  <h4>
                    <i className="bi bi-list-columns-reverse"></i>
                  </h4>
                  Upload Prescription
                </button>
              ) : (
                <button onClick={handleAddToCart}>
                  <h4>
                    <i className="bi bi-cart2"></i>
                  </h4>
                  Add To Cart
                </button>
              )}
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
          {reviews.length === 0 && <p>No reviews yet for this product.</p>}
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
      {product && (
        <PrescriptionModel
          isOpen={isPrescriptionOpen}
          onClose={() => setIsPrescriptionOpen(false)}
          productId={product._id}
        />
      )}
      {}
    </div>
  );
};

export default Medicines_details;
