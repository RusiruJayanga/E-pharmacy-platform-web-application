import React, { useState, useEffect } from "react";
import "./home.css";
//product card css
import "../../../../components/user/customer/card/card.css";

//images for home slider
const images = ["slider1.jpg", "slider2.jpg", "slider3.jpg", "slider4.jpg"];

const Home = () => {
  //image home slider
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      {/* main carousel */}
      <div className="home-slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`home-slide ${
              index === currentIndex ? "home-lider-active" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(20,150,127,0.741946436777836) 0%, rgba(44,62,80,0.6106092095041141) 100%), url(${image})`,
            }}
          >
            <div className="home-slider-content">
              <h1>Health Plus Pharmacy</h1>
              <p>
                At Health Plus Pharmacy, we make healthcare easy and accessible.
                Browse a wide range of medicines, health products,<br></br> lab
                tests, and doctor appointments—all from the comfort of your
                home.
              </p>
              <div className="home-slider-button-container">
                <button className="home-slider-left-button">SEARCH</button>
                <button className="home-slider-right-button">SHOP</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* banners */}
      <div className="home-banner-container">
        <div className="home-banner banner1">
          <img src="home-banner1.png" alt="" />
          <div className="home-banner-content">
            <h5>Lab tests</h5>
            <p>
              Book reliable lab tests online with fast and accurate results.
            </p>
          </div>
        </div>
        <div className="home-banner banner2">
          <img src="home-banner2.png" alt="" />
          <div className="home-banner-content">
            <h5>Health products</h5>
            <p>Find top-quality health essentials for everyday wellness.</p>
          </div>
        </div>
        <div className="home-banner banner3">
          <img src="home-banner3.png" alt="" />
          <div className="home-banner-content">
            <h5>Doctor appointments</h5>
            <p>Consult expert doctors online or in-person easily.</p>
          </div>
        </div>
      </div>
      {}
      {/* product section */}
      <div className="product-head">
        <h2>medicines</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          ime quisquam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Architecto ime quisquam!
        </p>
      </div>
      <div className="product-container">
        <div className="product-card">
          <div></div>
          <img src="" alt="" />
          <div>Lorem ipsum dolor</div>
          <div>Rs/ 89855.00</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
