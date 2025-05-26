import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//order details css
import "../../../../components/user/common/order/order.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Request = () => {
  const location = useLocation();
  const { requestId } = location.state || {};
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/account/request/${requestId}`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load request details.");
      }
    };

    if (requestId) fetchRequestDetails();
  }, [requestId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="head-section margin-head-1">
        <h2>My Requests</h2>
      </div>
      {}
      {}
      <div className="order-details-container">
        <div className="order-details-header">
          <h5 className={`request ${data.status.toLowerCase()}`}>
            {data.status}
          </h5>
          <h5>
            Request Date - {new Date(data.request_date).toLocaleDateString()}
          </h5>
        </div>
        <div className="order-details-content-container">
          <img src={data.image} alt="Request" />
          <div className="order-details-content">
            <h3>{data.pharmacy.pharmacy_name}</h3>
            <div className="order-details-content-head">
              <span>
                <p>Request ID -</p>
                <h5>{data.requestId}</h5>
              </span>
              <span>
                <p>Pharmacy ID -</p>
                <h5>{data.pharmacy.pharmacy_id}</h5>
              </span>
              <span>
                <p>Customer ID -</p>
                <h5>{data.customerId}</h5>
              </span>
              <span>
                <p>Pharmacy Phone Number -</p>
                <h5>{data.pharmacy.phone_number}</h5>
              </span>
              <span>
                <p>Pharmacy Email -</p>
                <h5>{data.pharmacy.email}</h5>
              </span>
            </div>
            <div className="order-details-content-body">
              <span className="order-description">
                <p>Description -</p>
                <p>{data.description || "Not provided"}</p>
              </span>
              {data.seller_description && (
                <div>
                  <span className="order-description">
                    <p>Seller Description -</p>
                    <p>{data.seller_description}</p>
                  </span>
                  <button>Confirm Order</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Request;
