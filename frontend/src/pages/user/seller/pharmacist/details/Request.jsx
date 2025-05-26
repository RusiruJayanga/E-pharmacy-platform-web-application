import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../doctor/details/appointment_doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
//margin css
import "../../../../../components/user/common/margin/margin.css";
import { toast } from "react-toastify";

const Request = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestId } = location.state || {};
  const [request, setRequest] = useState({});
  const [requestSellerDescription, setRequestSellerDescription] = useState("");

  useEffect(() => {
    if (requestId) {
      axios
        .get(`http://localhost:5000/api/request/${requestId}`)
        .then((res) => {
          setRequest(res.data);
        })
        .catch((err) => {
          toast.error("Error fetching request data");
        });
    }
  }, [requestId]);

  const handleApprove = async (e) => {
    e.preventDefault();
    if (!requestSellerDescription.trim()) {
      return toast.error("Please enter a description before approving.");
    }
    try {
      await axios.put(
        `http://localhost:5000/api/request/approve/${requestId}`,
        {
          seller_description: requestSellerDescription,
        }
      );
      toast.success("Request approved");
      navigate("/Request_pharmacist");
    } catch (err) {
      toast.error("Error approving request");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/request/reject/${requestId}`);
      toast.success("Request rejected");
      navigate("/Request_pharmacist");
    } catch (err) {
      toast.error("Error rejecting request");
    }
  };

  return (
    <div>
      <div className="ribben"></div>
      <div className="appointment-info-image">
        <img src={request.image} alt={request._id} />
      </div>
      <div className="appointment-info-box">
        <div className="appointment-info-content">
          <h3>{request.customer_id?.name}</h3>
          <span>
            <p>Request ID - </p>
            <h6>{request._id}</h6>
          </span>
          <span>
            <p>Customer ID - </p>
            <h6>{request.customer_id?._id}</h6>
          </span>
          <span>
            <p>Customer Name - </p>
            <h6>{request.customer_id?.name}</h6>
          </span>
          <span>
            <p>Customer Phone Number - </p>
            <h6>{request.customer_id?.phone_number}</h6>
          </span>
          <span>
            <p>Customer Email - </p>
            <h6>{request.customer_id?.email}</h6>
          </span>
          <span>
            <p>Customer Address - </p>
            <h6>{request.customer_id?.address}</h6>
          </span>
          <span>
            <p>Request Date - </p>
            <h6>{new Date(request.request_date).toLocaleDateString()}</h6>
          </span>
          <span>
            <p>Description - </p>
            <h6>{request.description || "N/A"}</h6>
          </span>
        </div>

        <form>
          <p>Seller Description</p>
          <textarea
            value={requestSellerDescription}
            onChange={(e) => setRequestSellerDescription(e.target.value)}
            maxLength={200}
          />
          <button type="submit" onClick={handleApprove}>
            Approve
          </button>
          <button type="button" onClick={handleReject}>
            Reject
          </button>
        </form>
      </div>
    </div>
  );
};

export default Request;
