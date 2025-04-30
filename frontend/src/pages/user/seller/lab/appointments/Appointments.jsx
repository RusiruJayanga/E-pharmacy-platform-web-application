import React, { useState } from "react";
import "../../doctor/appointments/appointments.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";

const Appointments = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("New Appointments");
  const categories = [
    "New Appointments",
    "End Appointments",
    "Cancelled Appointments",
  ];

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="appointment-head">
        <h2>My Appointments</h2>
      </div>
      {}
      {/* product section */}
      <div className="appointment-container">
        <div className="appointment-option-box">
          {categories.map((category, index) => (
            <h4
              key={index}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        {selectedCategory === "New Appointments" && (
          <div>
            <div className="appointment-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="appointment-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Customer Phone Number - </p>
                  <h6>0776679711</h6>
                </span>
                <span>
                  <p>Customer Email - </p>
                  <h6>verification@gmail.com</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Customer Address - </p>
                  <h6>Complete with cityComplete with city</h6>
                </span>
                <span>
                  <p>Book Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>appointment Date - </p>
                  <h6>2023-10-05</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Appointment ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="processing">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "End Appointments" && (
          <div>
            <div className="appointment-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="appointment-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Customer Phone Number - </p>
                  <h6>0776679711</h6>
                </span>
                <span>
                  <p>Customer Email - </p>
                  <h6>verification@gmail.com</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Customer Address - </p>
                  <h6>Complete with cityComplete with city</h6>
                </span>
                <span>
                  <p>Book Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>appointment Date - </p>
                  <h6>2023-10-05</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Appointment ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="instock">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Cancelled Appointments" && (
          <div>
            <div className="appointment-item-container">
              <img src="/details/1.png" alt="appointment" />
              <div className="appointment-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Customer Phone Number - </p>
                  <h6>0776679711</h6>
                </span>
                <span>
                  <p>Customer Email - </p>
                  <h6>verification@gmail.com</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Customer Address - </p>
                  <h6>Complete with cityComplete with city</h6>
                </span>
                <span>
                  <p>Book Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>appointment Date - </p>
                  <h6>2023-10-05</h6>
                </span>
              </div>
              <div className="appointment-item-content">
                <span>
                  <p>Appointment ID - </p>
                  <h6>123456</h6>
                </span>
                <span>
                  <p>Payment Status - </p>
                  <h6>Paid</h6>
                </span>
                <span>
                  <p>Status - </p>
                  <h4 className="instock">Processing</h4>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Appointments;
