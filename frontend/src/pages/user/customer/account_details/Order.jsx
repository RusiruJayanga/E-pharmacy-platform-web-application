import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//order details css
import "../../../../components/user/common/order/order.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigateReview = useNavigate();
  const handleReviewClick = (reviewId) => {
    navigateReview(`/Review_product`, { state: { reviewId } });
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/account/order/${orderId}`
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order details"
        );
        setLoading(false);
        toast.error(
          err.response?.data?.message || "Failed to fetch order details"
        );
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const getTrackingSteps = (status) => {
    const steps = [
      { status: "Order Placed", completed: true },
      {
        status: "Processing",
        completed: ["processing", "shipped", "delivered"].includes(status),
      },
      {
        status: "Shipped",
        completed: ["shipped", "delivered"].includes(status),
      },
      { status: "Delivered", completed: status === "delivered" },
    ];
    return steps;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div className="error">No order found</div>;

  const firstItem = order.items[0];
  const isCancelled = firstItem.status === "cancelled";

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="head-section margin-head-1">
        <h2>My Order</h2>
      </div>
      {}
      {/* order details section */}
      <div className="order-details-container">
        {!isCancelled && (
          <div className="tracking-progress">
            <div className="tracking-steps">
              {getTrackingSteps(firstItem.status).map((step, index) => (
                <div key={index} className="tracking-step">
                  <div
                    className={`step-circle ${
                      step.completed ? "completed" : ""
                    }`}
                  >
                    {step.completed ? "✓" : index + 1}
                  </div>
                  <p>{step.status}</p>
                </div>
              ))}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (getTrackingSteps(firstItem.status).filter(
                        (step) => step.completed
                      ).length -
                        1) *
                      43.33
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div className="order-details-header">
          <h5> Delevery Method - {order.order.delivery_method}</h5>
          <h5>Order Date - {order.order.order_date.slice(0, 10)}</h5>
          {!isCancelled && (
            <h5>Delivery Date - {firstItem.delivery_date.slice(0, 10)}</h5>
          )}
        </div>
        {order.items.map((item, idx) => (
          <div className="order-details-content-container">
            <img
              src={item.product.image || "default-product.png"}
              alt={item.product.name}
            />
            <div className="order-details-content">
              <h3>{item.product.name}</h3>
              <div className="order-details-content-head">
                <span>
                  <p>Main Order ID -</p>
                  <h5>{order.order._id}</h5>
                </span>
                <span>
                  <p>Order ID -</p>
                  <h5>{item._id}</h5>
                </span>
                <span>
                  <p>Seller ID -</p>
                  <h5>{item.seller._id}</h5>
                </span>
                <span>
                  <p>Seller Name -</p>
                  <h5>{item.seller.name}</h5>
                </span>
                <span>
                  <p>Seller Email -</p>
                  <h5>{item.seller.email}</h5>
                </span>
                <span>
                  <p>Seller Phone Number -</p>
                  <h5>{item.seller.phone}</h5>
                </span>
              </div>
              <div className="order-details-content-body">
                <span>
                  <p>Option -</p>
                  <h5>{item.option}</h5>
                </span>
                <span>
                  <p>Price -</p>
                  <h5>Rs/ {item.price.toFixed(2)}</h5>
                </span>
                <span>
                  <p>Quantity -</p>
                  <h5>{item.quantity}</h5>
                </span>
                <span>
                  <p>Payment Status -</p>
                  <h5>{order.order.payment_status}</h5>
                </span>
                {item.status === "delivered" && (
                  <button onClick={() => handleReviewClick(item.product?._id)}>
                    Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {}
    </div>
  );
};

export default Order;
