import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./home.css";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
//slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../components/user/customer/slider/slider.css";
//product card css
import "../../../../components/user/customer/card/card.css";
//margin css
import "../../../../components/user/customer/margin/margin.css";

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

  //auto count
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  //slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  const categories = [
    "Adult Care",
    "Ayurveda",
    "Dairy Products",
    "Diabetic Care",
    "Household Remedies",
    "Kids",
    "Mother & Baby Care",
    "Personal Care",
    "Pet Care",
    "Surgical Items",
  ];

  //product fatch
  const products = ["1", "2", "3", "4", "5", "6"];

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
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="count1.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={300} duration={2} />}+</h2>
            <h4>Sri Lankan Cities</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="count2.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={69669} duration={2} />}</h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="count3.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={750} duration={2} />}</h2>
            <h4>Monthly Visitors</h4>
          </div>
        </div>
      </div>
      {}
      {/* direction section */}
      <div className="direction-container">
        <div className="direction-box box-medicines">
          <img src="direction/box-medicines.png" alt="direction" />
          <div className="direction-box-content">
            <h3>Medicines</h3>
            <p>
              Find a wide range of prescription and over-the-counter medicines
              for various health needs, delivered to your doorstep.
            </p>
            <NavLink to="/Medicines">
              <button>See More</button>
            </NavLink>
          </div>
        </div>
        <div className="direction-box box-doctors">
          <img src="direction/box-doctors.png" alt="direction" />
          <div className="direction-box-content">
            <h3>Doctors</h3>
            <p>
              Book online consultations with certified doctors for expert
              medical advice, prescriptions, and health guidance.
            </p>
            <NavLink to="/Doctors">
              <button>See More</button>
            </NavLink>
          </div>
        </div>
        <div className="direction-box box-lab">
          <img src="direction/box-lab.png" alt="direction" />
          <div className="direction-box-content">
            <h3>Lab Tests</h3>
            <p>
              Schedule diagnostic tests from trusted labs with home sample
              collection and get accurate reports online.
            </p>
            <NavLink to="/Lab_Tests">
              <button>See More</button>
            </NavLink>
          </div>
        </div>
        <div className="direction-box box-pharmacies">
          <img src="direction/box-pharmacies.png" alt="direction" />
          <div className="direction-box-content">
            <h3>Pharmacies</h3>
            <p>
              Easily find and connect with nearby pharmacies offering a wide
              range of medicines, health products, and medical essentials.
              Browse trusted pharmacies, check product availability, compare
              prices, and place orders for doorstep delivery or in-store pickup.
            </p>
            <NavLink to="/Pharmacies">
              <button>See More</button>
            </NavLink>
          </div>
        </div>
      </div>
      {}
      {/* product section */}
      {/* head section */}
      <div id="product-section"></div>
      <div className="section-head">
        <h2>Accessory Categories</h2>
      </div>
      {}
      {/* category slider section */}
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {categories.map((category, idx) => (
            <div className="category-slider">
              <div className="slider-item">
                <div>
                  <img
                    src={`slider/${category.toLowerCase()}.png`}
                    alt="category"
                  />
                </div>
                <h5>{category}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {}
      {/* product card section 1 */}
      <div className="product-container">
        {/* repeat */}
        {products.map((product, idx) => (
          <div className="product-card" id={idx}>
            <div className="product-card-discription">
              <span>
                <p>Name</p>
                <h5>Lorem ipsum dolor{product}</h5>
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
        ))}
        {/* repeat */}
      </div>
      <div className="product-card-show-more-products">
        Show more <i class="bi bi-arrow-right"></i>
      </div>
      {/* product section 1 end */}
      {}
      {/* margin section 1 */}
      <div className="margin-section-container section1">
        <div className="margin-section-content">
          <h2>Beauty Care</h2>
          <p>
            Explore a wide selection of beauty care products tailored to
            nourish, protect, and enhance your skin and hair. From skincare
            essentials to haircare treatments and personal care items, find
            everything you need for a glowing, healthy, and confident look.
          </p>
        </div>
      </div>
      {}
      {/* product card section 2 */}
      <div className="product-container">
        {/* repeat */}
        {products.map((product, idx) => (
          <div className="product-card" id={idx}>
            <div className="product-card-discription">
              <span>
                <p>Name</p>
                <h5>Lorem ipsum dolor{product}</h5>
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
        ))}
        {/* repeat */}
      </div>
      <div className="product-card-show-more-products">
        Show more <i class="bi bi-arrow-right"></i>
      </div>
      {/* product section 3 end */}
      {}
      {/* services section */}
      {/* head section */}
      <div className="section-head">
        <h2>our services</h2>
      </div>
      {}
      <div className="services-container">
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/ordering.png"
              alt="services"
              className="services1"
            />
          </div>
          <h4>Online Medicine Ordering</h4>
          <p>
            Easily order prescription and over-the-counter medicines from
            trusted pharmacies. Enjoy a seamless shopping experience with
            doorstep delivery for your convenience.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/prescription.png"
              alt="services"
              className="services2"
            />
          </div>
          <h4>Prescription Upload & Refill</h4>
          <p>
            Upload your prescription for easy medicine orders. Set automatic
            refill reminders to never miss a dose and ensure continuous
            medication availability.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/locator.png"
              alt="services"
              className="services3"
            />
          </div>
          <h4>Pharmacy Locator</h4>
          <p>
            Find nearby pharmacies with our location-based search feature.
            Compare availability and prices before placing your order at the
            most convenient pharmacy.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/emergency.png"
              alt="services"
              className="services4"
            />
          </div>
          <h4>Emergency Medicine Assistance</h4>
          <p>
            Get urgent medicines delivered quickly during emergencies. Our
            platform ensures a fast and reliable service for critical healthcare
            needs.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/language.png"
              alt="services"
              className="services5"
            />
          </div>
          <h4>Multi-Language Support</h4>
          <p>
            Access our platform in English, Sinhala, and Tamil for a
            user-friendly experience. Choose your preferred language for better
            navigation and service.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/delivery.png"
              alt="services"
              className="services6"
            />
          </div>
          <h4>Fast & Reliable Delivery</h4>
          <p>
            Get your medicines and health essentials delivered to your doorstep
            quickly and securely. Choose from standard, express, or same-day
            delivery options for a hassle-free experience.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/support.png"
              alt="services"
              className="services7"
            />
          </div>
          <h4>24/7 Customer Support</h4>
          <p>
            Our dedicated support team is available round the clock to assist
            you with your orders, prescriptions, and any queries. Get instant
            help through chat, call, or email.
          </p>
        </div>
        <div className="services-box">
          <div className="services-image">
            <img
              src="service/prices.png"
              alt="services"
              className="services8"
            />
          </div>
          <h4>Affordable Prices & Discounts</h4>
          <p>
            Enjoy competitive pricing on all medicines and healthcare products.
            Get exclusive discounts, special offers, and cashback deals to save
            more on your medical needs.
          </p>
        </div>
      </div>
      {}
      {/* contact section */}
      {/* head section */}
      <div id="contact"></div>
      <div className="section-head">
        <h2>contact us</h2>
      </div>
      {}
      <div className="contact-container">
        <div className="contact-left">
          <img src="contact.jpeg" alt="contact" />
        </div>
        <div className="contact-right">
          <div className="contact-form">
            <input name="Name" placeholder="Name"></input>
            <p>console.error</p>
            <input name="Contact Number" placeholder="Contact Number"></input>
            <p>console.error</p>
            <input name="Email" placeholder="Email"></input>
            <p>console.error</p>
            <textarea
              className="textinput input-element"
              placeholder="Message"
            ></textarea>
            <p>
              console.error <span> 100/100</span>
            </p>
            <button className="contact-button">Send</button>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default Home;
