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

const Appointments = () => {
  const location = useLocation();
  const { appointmentId } = location.state || {};
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    if (appointmentId) {
      axios
        .get(`http://localhost:5000/api/account/appointment/${appointmentId}`)
        .then((res) => {
          setAppointmentData(res.data);
        })
        .catch((err) => {
          toast.error("Failed to load appointment details");
          console.error(err);
        });
    }
  }, [appointmentId]);

  if (!appointmentData) {
    return <div>Loading appointment details...</div>;
  }

  const {
    _id,
    sellerType,
    book_date,
    due_date,
    status,
    payment_status,
    sellerDetails,
  } = appointmentData;

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="head-section margin-head-1">
        <h2>My Appointments</h2>
      </div>
      {}
      {}
      <div className="order-details-container">
        <div className="order-details-content-container">
          <img src={sellerDetails.profile_picture} alt="seller" />
          <div className="order-details-content">
            <h3>
              {sellerType === "Doctor"
                ? sellerDetails.name
                : sellerDetails.lab_name}
            </h3>
            <h4 className={`appointment ${status.toLowerCase()}`}>{status}</h4>
            <div className="order-details-content-head">
              <span>
                <p>Appointment ID -</p>
                <h5>{_id}</h5>
              </span>
              <span>
                <p>{sellerType} ID -</p>
                <h5>{sellerDetails._id}</h5>
              </span>
              <span>
                <p>{sellerType} Name -</p>
                <h5>
                  {sellerType === "Doctor"
                    ? sellerDetails.name
                    : sellerDetails.pathologist_name}
                </h5>
              </span>
              <span>
                <p>{sellerType} Phone Number -</p>
                <h5>{sellerDetails.phone_number}</h5>
              </span>
              <span>
                <p>{sellerType} Email -</p>
                <h5>{sellerDetails.email}</h5>
              </span>
            </div>
            <div className="order-details-content-body">
              <span>
                <p>Payment Status -</p>
                <h5>{payment_status}</h5>
              </span>
              <span>
                <p>Book Date -</p>
                <h5>{book_date.slice(0, 10)}</h5>
              </span>
              <span>
                <p>Due Date -</p>
                <h5>{due_date?.slice(0, 10) || "N/A"}</h5>
              </span>
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Appointments;
