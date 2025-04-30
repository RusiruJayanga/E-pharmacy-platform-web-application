import React, { useState, useEffect } from "react";
import "../../doctor/home/home.css";
//margin css
import "../../../../../components/user/common/margin/margin.css";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../../customer/home/home.css";
//request css
import "../../pharmacist/request/request.css";

const Home = () => {
  //auto count
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });
  //category select
  const [selectedCategory, setSelectedCategory] = useState("New Request");
  const categories = ["New Request", "Cancelled Request"];

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container lab-home-section1"></div>
      {}
      {/* count section */}
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="doctor-count1.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={300} duration={2} />}+</h2>
            <h4>Appointments</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="doctor-count2.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={69669} duration={2} />}</h2>
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
      {/* request section */}
      <div className="request-container">
        <div className="request-option-box">
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
        {selectedCategory === "New Request" && (
          <div>
            <div className="request-item-container">
              <div className="request-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Request Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Shop</h6>
                </span>
              </div>
              <div className="request-item-content request-item-content-last">
                <button>Review</button>
                <button>Accept</button>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {selectedCategory === "Cancelled Request" && (
          <div>
            <div className="request-item-container">
              <div className="request-item-content">
                <h3>Paracetamol 500mg</h3>
                <span>
                  <p>Request Date - </p>
                  <h6>2023-10-01</h6>
                </span>
                <span>
                  <p>Category - </p>
                  <h6>Shop</h6>
                </span>
              </div>
              <div className="request-item-content request-item-content-last">
                <button>Review</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Home;
