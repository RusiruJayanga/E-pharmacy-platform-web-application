import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./search.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//product card css
import "../../../../components/user/customer/card/card.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  useEffect(() => {
    fetchProducts();
  }, []);

  //product fatch
  const [Products, setProducts] = useState([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/search/get");
      setProducts(res.data);
      setInitialLoadComplete(true);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  //search
  const [term, setTerm] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search/?query=${encodeURIComponent(term)}`
      );
      setProducts(res.data);
    } catch (err) {
      toast.error("Search failed");
    }
  };

  //ocr detect
  const [file, setFile] = useState(null);
  const [detected, setDetected] = useState([]);
  const handleUpload = async () => {
    if (!file) return toast.warn("Choose a file first");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/prescription",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setDetected(res.data.detected);
      toast.success("Prescription processed!");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* search bar */}
      <div className="search-bar-container">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="What are you looking for?"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {}
      {/* upload section */}
      <div className="upload-container">
        <label className="custom-prescription-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          Choose Prescription File
        </label>

        <button onClick={handleUpload}>Detect Medicines</button>
      </div>
      {detected.length > 0 && (
        <div className="prescription-result">
          <h5>Detected Text -</h5>
          <p>
            &nbsp;
            {detected.join(", ")}
          </p>
        </div>
      )}
      {}
      {/* product card section */}
      <div className="product-container">
        {/* repeat */}
        {Products.length > 0 ? (
          Products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-card-discription">
                <span>
                  <p>Name -</p>
                  <h5>{product.name}</h5>
                </span>
                <div className="product-card-offers">
                  <p>
                    <i className="bi bi-prescription2"></i>
                  </p>
                </div>
              </div>
              <div className="product-card-image">
                <img
                  src={product.images?.[0] || "product.png"}
                  alt={product.name}
                />
              </div>
              <div className="product-card-price">
                <span>
                  <p>Price -</p>
                  <h5>
                    Rs/{" "}
                    {product.options?.[0]?.price
                      ? product.options[0].price.toFixed(2)
                      : "N/A"}
                  </h5>
                </span>
              </div>
              <div
                onClick={() => handleCardClick(product._id)}
                className="product-card-see-more"
              >
                <p>See More</p>
              </div>
            </div>
          ))
        ) : initialLoadComplete ? (
          <div className="advertisement-product-available">
            <h4>No Products Available</h4>
          </div>
        ) : null}
        {/* repeat */}
      </div>
      {/* product section end */}
      {}
    </div>
  );
};

export default Search;
