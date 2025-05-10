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
import "../../../../components/user/common/margin/margin.css";
//contact validation
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const products = [
    {
      id: 1,
      name: "Baby Diapers",
      price: "Rs. 999.00",
      image: "baby-diapers.png",
    },
    {
      id: 2,
      name: "Thermometer - Digital",
      price: "Rs. 599.00",
      image: "thermometer.png",
    },
    {
      id: 3,
      name: "Blood Pressure Monitor",
      price: "Rs. 2,499.00",
      image: "bp-monitor.png",
    },
    {
      id: 4,
      name: "Adult Diapers",
      price: "Rs. 699.00",
      image: "adult-diapers.png",
    },
    {
      id: 5,
      name: "Nebulizer Machine",
      price: "Rs. 3,899.00",
      image: "nebulizer.png",
    },
    {
      id: 6,
      name: "Pulse Oximeter",
      price: "Rs. 1,299.00",
      image: "oximeter.png",
    },
    {
      id: 7,
      name: "Face Mask (Box of 50)",
      price: "Rs. 299.00",
      image: "face-mask.png",
    },
    {
      id: 8,
      name: "Hand Sanitizer - 500ml",
      price: "Rs. 199.00",
      image: "hand-sanitizer.png",
    },
    {
      id: 9,
      name: "Wheelchair",
      price: "Rs. 12,999.00",
      image: "wheelchair.png",
    },
    {
      id: 10,
      name: "Walking Cane",
      price: "Rs. 799.00",
      image: "cane.png",
    },
  ];
  const beautyProducts = [
    {
      id: 11,
      name: "Vitamin C Face Serum",
      price: "Rs. 799.00",
      image: "vitamin-c-serum.png",
    },
    {
      id: 12,
      name: "Sunscreen SPF 50",
      price: "Rs. 599.00",
      image: "sunscreen.png",
    },
    {
      id: 13,
      name: "Aloe Vera Gel",
      price: "Rs. 299.00",
      image: "aloe-vera-gel.png",
    },
    {
      id: 14,
      name: "Charcoal Face Wash",
      price: "Rs. 349.00",
      image: "charcoal-facewash.png",
    },
    {
      id: 15,
      name: "Lip Balm - Strawberry",
      price: "Rs. 199.00",
      image: "lip-balm.png",
    },
  ];

  //contact validation
  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Required"),
      contactNumber: Yup.string()
        .required("Required")
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          "Invalid phone number format"
        ),
      email: Yup.string().required("Required").email("Invalid email address"),
      message: Yup.string()
        .required("Required")
        .max(200, "Message must be 200 characters or less"),
    }),
    onSubmit: (values) => {
      console.log("Submitting:", values);
    },
  });

  return (
    <div>
      {/* main carousel */}
      <div className="home-slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`home-slide ${
              index === currentIndex ? "home-slider-active" : ""
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
                <a href="#contact">
                  <button className="home-slider-left-button">CONTACT</button>
                </a>
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
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card-discription">
              <span>
                <p>Name -</p>
                <h5>{product.name}</h5>
              </span>
              <div className="product-card-offers hot">
                <p>
                  <i className="bi bi-prescription2"></i>
                </p>
              </div>
            </div>
            <div className="product-card-image">
              <img src={`upload/${product.image}`} alt={product.name} />
            </div>
            <div className="product-card-price">
              <span>
                <p>Price -</p>
                <h5>{product.price}</h5>
              </span>
            </div>
            <Link to={`/Accessories_details/${product.id}`}>
              <div className="product-card-see-more">
                <p>See More</p>
              </div>
            </Link>
          </div>
        ))}
        {/* repeat */}
      </div>
      <NavLink to="/Accessories">
        <div className="product-card-show-more-products">
          Show more <i class="bi bi-arrow-right"></i>
        </div>
      </NavLink>
      {/* product section 1 end */}
      {}
      {/* margin section 1 */}
      <div className="margin-section-container section1">
        <div className="margin-section-content">
          <h1>Beauty Care</h1>
        </div>
      </div>
      {}
      {/* product card section 2 */}
      <div className="product-container">
        {/* repeat */}
        {beautyProducts.map((beautyproduct) => (
          <div className="product-card" key={beautyproduct.id}>
            <div className="product-card-discription">
              <span>
                <p>Name -</p>
                <h5>{beautyproduct.name}</h5>
              </span>
              <div className="product-card-offers hot">
                <p>
                  <i className="bi bi-prescription2"></i>
                </p>
              </div>
            </div>
            <div className="product-card-image">
              <img
                src={`upload/${beautyproduct.image}`}
                alt={beautyproduct.name}
              />
            </div>
            <div className="product-card-price">
              <span>
                <p>Price -</p>
                <h5>{beautyproduct.price}</h5>
              </span>
            </div>
            <Link to={`/Accessories_details/${beautyproduct.id}`}>
              <div className="product-card-see-more">
                <p>See More</p>
              </div>
            </Link>
          </div>
        ))}
        {/* repeat */}
      </div>
      <NavLink to="/Accessories">
        <div className="product-card-show-more-products">
          Show more <i class="bi bi-arrow-right"></i>
        </div>
      </NavLink>
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
          <form className="contact-form" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p>
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : " "}
            </p>

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact number"
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
            />
            <p>
              {formik.touched.contactNumber && formik.errors.contactNumber
                ? formik.errors.contactNumber
                : " "}
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : " "}
            </p>

            <textarea
              name="message"
              className="textinput input-element"
              placeholder="Message"
              maxLength={200}
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>
            <p>
              {formik.values.message.length > 0 && (
                <span>{formik.values.message.length}/200</span>
              )}
              {formik.touched.message && formik.errors.message
                ? formik.errors.message
                : " "}
            </p>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      {}
    </div>
  );
};

export default Home;
