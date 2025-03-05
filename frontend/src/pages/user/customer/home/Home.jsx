import React, { useState, useEffect } from "react";
import "./home.css";

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
      <div className="home-slider-container">
        {/*carousel*/}
        {images.map((image, index) => (
          <div
            key={index}
            className={`home-slide ${
              index === currentIndex ? "home-lider-active" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(1,138,235,0.46691173051251746) 0%, rgba(20,150,127,0.7834383411567753) 100%), url(${image})`,
            }}
          >
            <div className="home-slider-content">
              <h1>Health Plus Pharmacy</h1>
              <p className="home-slider-content-p">
                Health plus pharmacy is your go-to pharmacy platform for
                medicines, health products, <br></br>doctor consultations and
                lab test.
              </p>
              <div className="home-slider-button-container">
                <button className="home-slider-left-button">SEARCH</button>
                <button className="home-slider-right-button">SHOP</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
