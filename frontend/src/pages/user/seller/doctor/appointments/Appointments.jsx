import React from "react";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//order details css
import "../../../../components/user/common/order/order.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
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
        <div className="order-details-header">
          <h5 className="appointment accepted">Accepted</h5>
          <h5>Book Date - 4/7/2026</h5> <h5>Deu Date - 4/7/2026</h5>
        </div>
        <div className="order-details-content-container">
          <img src="product.png" alt="" />
          <div className="order-details-content">
            <h3>item.product_id.nameprice.toFixedprice</h3>
            <div className="order-details-content-head">
              <span>
                <p>Appointment ID -</p>
                <h5>6821fffa1cc1cb5d53ad0a15</h5>
              </span>
              <span>
                <p>Doctor ID -</p>
                <h5>6821fffa1cc1cb5d53ad0a15</h5>
              </span>
              <span>
                <p>Doctor Name -</p>
                <h5>item.price.toFixedprice.toFixed</h5>
              </span>
              <span>
                <p>Doctor Phone Number -</p>
                <h5>0776679711</h5>
              </span>
              <span>
                <p>Doctor Email -</p>
                <h5>item.price.toFixedprice.toFixed@gmail.com</h5>
              </span>
            </div>
            <div className="order-details-content-body">
              <span>
                <p>Option -</p>
                <h5>price.toFixedprice.toFixed</h5>
              </span>
              <span>
                <p>Price -</p>
                <h5>Rs/ 4000.00</h5>
              </span>
              <span>
                <p>Quantity -</p>
                <h5>88</h5>
              </span>
              <span>
                <p>Payment Status -</p>
                <h5>over-the-counter</h5>
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
