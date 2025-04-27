import React, { useState, useEffect } from "react";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../customer/home/home.css";

const Home = () => {
  //auto count
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });
  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container seller-home-section1">
        <div className="margin-section-content">
          <h1>Lab Tests</h1>
        </div>
      </div>
      {}
      {/* count section */}
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="seller-count1.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={300} duration={2} />}+</h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count2.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={69669} duration={2} />}</h2>
            <h4>Products</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count3.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={750} duration={2} />}</h2>
            <h4>Customers Rated</h4>
          </div>
        </div>
      </div>
      {}
      {/* seller content */}

      {}
    </div>
  );
};

export default Home;
