import React, { useState, useEffect } from "react";
import "./home.css";
//margin css
import "../../../../../components/user/common/margin/margin.css";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../../customer/home/home.css";

const Home = () => {
  //auto count
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container doctor-home-section1"></div>
      {}
      {/* count section */}
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="doctor-count1.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={10} duration={2} />}+</h2>
            <h4>Appointments</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="doctor-count2.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={6} duration={2} />}</h2>
            <h4>Clients</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count3.png" alt="count" />
          <div className="count-content">
            <h2>
              <i class="bi bi-star-fill"></i>
              {inView && <CountUp start={0} end={5} duration={2} />}
            </h2>
            <h4>Customers Rated</h4>
          </div>
        </div>
      </div>
      {}
      {/* appointment section */}
      <div className="appointment-container">
        {/* repeat */}
        <div className="appointment-item-container">
          <img src="/details/1.png" alt="appointment" />
          <div className="appointment-item-content">
            <h3>Paracetamol 500mg</h3>
            <span>
              <p>Customer Name - </p>
              <h6>verification</h6>
            </span>
            <span>
              <p>Customer Phone Number - </p>
              <h6>0776679711</h6>
            </span>
          </div>
          <div className="appointment-item-content">
            <span>
              <p>Customer Email - </p>
              <h6>verification@gmail.com</h6>
            </span>
            <span>
              <p>Customer Address - </p>
              <h6>Complete with cityComplete with city</h6>
            </span>
          </div>
          <div className="appointment-item-action">
            <button>Action</button>
          </div>
        </div>
        {/* repeat */}
      </div>
      {}
    </div>
  );
};

export default Home;
