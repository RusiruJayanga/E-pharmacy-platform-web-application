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
              <h1>Health&nbsp; Plus&nbsp; Pharmacy</h1>
              <p>
                Health Plus Pharmacy, we make healthcare easy and accessible.
                Browse a wide range of medicines, health products,<br></br> lab
                tests, and doctor appointments—all from the comfort of your
                home.
              </p>
              <div className="home-slider-button-container">
                <button className="home-slider-left-button">SEARCH</button>
                <a href="#product-section">
                  <button className="home-slider-right-button">SHOP</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {}
      {/* count section */}
      <div className="count-container">
        <div className="count-box">
          <img src="count1.png" alt="count" />
          <div className="count-content">
            <h2>300 +</h2>
            <h4>Sri Lankan Cities</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="count2.png" alt="count" />
          <div className="count-content">
            <h2>666698</h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="count3.png" alt="count" />
          <div className="count-content">
            <h2>6666</h2>
            <h4>Monthly Visitors</h4>
          </div>
        </div>
      </div>
      {}
      {/* medicines product section */}
      <div id="product-section"></div>
      <div className="product-head">
        <h2>medicines</h2>
        <p>
          Explore a wide range of genuine medicines from trusted pharmacies.
          Order online with ease and get doorstep delivery for your healthcare
          needs!
        </p>
      </div>
      {}
      <div className="product-container">
        {/* repeat */}
        <div className="product-card">
          <div className="product-card-discription">
            <span>
              <p>Name</p>
              <h5>Lorem ipsum dolor</h5>
            </span>
            <div className="product-card-offers hot">
              <p>
                <i class="bi bi-prescription2"></i>
              </p>
            </div>
          </div>
          <div className="product-card-image">
            <img src="product.png" alt="" />
          </div>
          <div className="product-card-price">
            <span>
              <p>Price -</p>
              <h5>Rs/ 89855.00</h5>
            </span>
          </div>
          <div className="product-card-see-more">
            <p>See More</p>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="product-card">
          <div className="product-card-discription">
            <span>
              <p>Name</p>
              <h5>Lorem ipsum dolor</h5>
            </span>
            <div className="product-card-offers offer">
              <p>
                <i class="bi bi-prescription2"></i>
              </p>
            </div>
          </div>
          <div className="product-card-image">
            <img src="product.png" alt="" />
          </div>
          <div className="product-card-price">
            <span>
              <p>Price -</p>
              <h5>Rs/ 89855.00</h5>
            </span>
          </div>
          <div className="product-card-see-more">
            <p>See More</p>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="product-card">
          <div className="product-card-discription">
            <span>
              <p>Name</p>
              <h5>Lorem ipsum dolor</h5>
            </span>
            <div className="product-card-offers hot">
              <p>
                <i class="bi bi-prescription2"></i>
              </p>
            </div>
          </div>
          <div className="product-card-image">
            <img src="product.png" alt="" />
          </div>
          <div className="product-card-price">
            <span>
              <p>Price -</p>
              <h5>Rs/ 89855.00</h5>
            </span>
          </div>
          <div className="product-card-see-more">
            <p>See More</p>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="product-card">
          <div className="product-card-discription">
            <span>
              <p>Name</p>
              <h5>Lorem ipsum dolor</h5>
            </span>
            <div className="product-card-offers hot">
              <p>
                <i class="bi bi-prescription2"></i>
              </p>
            </div>
          </div>
          <div className="product-card-image">
            <img src="product.png" alt="" />
          </div>
          <div className="product-card-price">
            <span>
              <p>Price -</p>
              <h5>Rs/ 89855.00</h5>
            </span>
          </div>
          <div className="product-card-see-more">
            <p>See More</p>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="product-card">
          <div className="product-card-discription">
            <span>
              <p>Name</p>
              <h5>Lorem ipsum dolor</h5>
            </span>
            <div className="product-card-offers hot">
              <p>
                <i class="bi bi-prescription2"></i>
              </p>
            </div>
          </div>
          <div className="product-card-image">
            <img src="product.png" alt="product" />
          </div>
          <div className="product-card-price">
            <span>
              <p>Price -</p>
              <h5>Rs/ 89855.00</h5>
            </span>
          </div>
          <div className="product-card-see-more">
            <p>See More</p>
          </div>
        </div>
        {/* repeat */}
      </div>
      <div className="product-card-show-more-products">
        Show more <i class="bi bi-arrow-right"></i>
      </div>
      {/* product section end */}
      {}
      {/* margin section */}
      <div className="margin-section-container">
        <div className="margin-section-content">
          <h2>pharmacies</h2>
          <p>
            Find trusted pharmacies offering genuine medicines and healthcare
            essentials. Compare prices, check availability, and order
            conveniently online with doorstep delivery for a hassle-free
            experience.
          </p>
        </div>
      </div>
      {}
      {/* pharmacies advertisement section */}
      <div className="advertisement-container">
        {/* repeat */}
        <div className="advertisement-card">
          <img src="product.png" alt="advertisement" />
          <div className="advertisement-card-content">
            <h5>Lorem ipsum dolor</h5>
            <span>
              <h5>Location</h5>{" "}
              <p>
                4.5 <i class="bi bi-star-fill"></i>
              </p>
            </span>
            <div className="advertisement-card-see-more">
              <p>See More</p>
            </div>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="advertisement-card">
          <img src="product.png" alt="advertisement" />
          <div className="advertisement-card-content">
            <h5>Lorem ipsum dolor</h5>
            <span>
              <h5>Location</h5>{" "}
              <p>
                4.5 <i class="bi bi-star-fill"></i>
              </p>
            </span>
            <div className="advertisement-card-see-more">
              <p>See More</p>
            </div>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="advertisement-card">
          <img src="product.png" alt="advertisement" />
          <div className="advertisement-card-content">
            <h5>Lorem ipsum dolor</h5>
            <span>
              <h5>Location</h5>{" "}
              <p>
                4.5 <i class="bi bi-star-fill"></i>
              </p>
            </span>
            <div className="advertisement-card-see-more">
              <p>See More</p>
            </div>
          </div>
        </div>
        {/* repeat */}
        {/* repeat */}
        <div className="advertisement-card">
          <img src="product.png" alt="advertisement" />
          <div className="advertisement-card-content">
            <h5>Lorem ipsum dolor</h5>
            <span>
              <h5>Location</h5>{" "}
              <p>
                4.5 <i class="bi bi-star-fill"></i>
              </p>
            </span>
            <div className="advertisement-card-see-more">
              <p>See More</p>
            </div>
          </div>
        </div>
        {/* repeat */}
      </div>
      <div className="advertisement-card-show-more-products">
        Show more <i class="bi bi-arrow-right"></i>
      </div>
      {/*advertisement section end */}
      {}
      {/* banners */}
      <div className="home-banner-container">
        <div className="home-banner banner1">
          <img src="home-banner1.png" alt="banner" />
          <div className="home-banner-content">
            <h5>Lab tests</h5>
            <p>
              Book reliable lab tests online with fast and accurate results.
            </p>
          </div>
        </div>
        <div className="home-banner banner2">
          <img src="home-banner2.png" alt="banner" />
          <div className="home-banner-content">
            <h5>Health products</h5>
            <p>Find top-quality health essentials for everyday wellness.</p>
          </div>
        </div>
        <div className="home-banner banner3">
          <img src="home-banner3.png" alt="banner" />
          <div className="home-banner-content">
            <h5>Doctor appointments</h5>
            <p>Consult expert doctors online or in-person easily.</p>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Home;
