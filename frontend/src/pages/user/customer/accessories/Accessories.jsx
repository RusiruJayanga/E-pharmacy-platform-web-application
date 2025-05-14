import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
//margin css
import "../../../../components/user/common/margin/margin.css";
//filter css
import "../../../../components/user/customer/filter/filter.css";
//react select
import Select from "react-select";
//product card css
import "../../../../components/user/customer/card/card.css";

const Accessories = () => {
  //filter checkbox
  const [selectedcategoryCheckbox, setSelectedcategoryCheckbox] =
    useState("All");
  const handlectedcategoryCheckboxChange = (id) => {
    setSelectedcategoryCheckbox(id);
  };
  //filter select
  const All = [{ value: "Island Wide", label: "Island Wide" }];
  const Southern = [
    { value: "Matara", label: "Matara" },
    { value: "Galle", label: "Galle" },
    { value: "Hambantota", label: "Hambantota" },
  ];
  const Western = [
    { value: "Colombo", label: "Colombo" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Kalutara", label: "Kalutara" },
  ];
  const Central = [
    { value: "Kandy", label: "Kandy" },
    { value: "Matale", label: "Matale" },
    { value: "Nuwara Eliya", label: "Nuwara Eliya" },
  ];
  const Sabaragamuwa = [
    { value: "Kegalle", label: "Kegalle" },
    { value: "Ratnapura", label: "Ratnapura" },
  ];
  const Uva = [
    { value: "Badulla", label: "Badulla" },
    { value: "Moneragala", label: "Moneragala" },
  ];
  const Eastern = [
    { value: "Ampara", label: "Ampara" },
    { value: "Batticaloa", label: "Batticaloa" },
    { value: "Trincomalee", label: "Trincomalee" },
  ];
  const Northern = [
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Mannar", label: "Mannar" },
    { value: "Vavuniya", label: "Vavuniya" },
    { value: "Mullaitivu", label: "Mullaitivu" },
  ];
  const NorthCentral = [
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
  ];
  const NorthWestern = [
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Puttalam", label: "Puttalam" },
  ];
  const groupedFilterOptions = [
    {
      label: "Island Wide",
      options: All,
    },
    {
      label: "Southern Province",
      options: Southern,
    },
    {
      label: "Western Province",
      options: Western,
    },
    {
      label: "Central Province",
      options: Central,
    },
    {
      label: "Sabaragamuwa Province",
      options: Sabaragamuwa,
    },
    {
      label: "Uva Province",
      options: Uva,
    },
    {
      label: "Eastern Province",
      options: Eastern,
    },
    {
      label: "Northern Province",
      options: Northern,
    },
    {
      label: "North Central Province",
      options: NorthCentral,
    },
    {
      label: "North Western Province",
      options: NorthWestern,
    },
  ];

  //csrd count
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  //product fatch
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/accessories?page=${page}&limit=20`;
        if (selectedcategoryCheckbox && selectedcategoryCheckbox !== "All") {
          url += `&category=${encodeURIComponent(selectedcategoryCheckbox)}`;
        }
        if (selectedDistrict && selectedDistrict !== "Island Wide") {
          url += `&district=${encodeURIComponent(selectedDistrict)}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setAccessories((prev) =>
          page === 1 ? data.products : [...prev, ...data.products]
        );
        setHasMore(data.hasMore);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to fetch accessories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [selectedcategoryCheckbox, selectedDistrict, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  //details page
  const navigate = useNavigate();
  const handleCardClick = (productId) => {
    navigate(`/Accessories_details`, { state: { productId } });
  };

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Accessories-section1">
        <div className="margin-section-content">
          <h1>Accessories</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div id="product-section"></div>
      <div className="product-filter-content">
        <div className="product-filter-category">
          <h4>Category</h4>
          <div className="product-filter-category-box">
            {/* repeat */}
            {[
              "All",
              "Adult Care",
              "Ayurveda",
              "Beverages",
              "Cosmetics",
              "Dairy Products",
              "Diabetic Care",
              "Food Items",
              "Hair Care",
              "Household Remedies",
              "Kids",
              "Mother & Baby Care",
              "Personal Care",
              "Pet Care",
              "Skin Care",
              "Surgical Items",
              "Vitamins",
              "Medical Devices",
            ].map((id) => (
              <div className="product-filter-category-item">
                <input
                  type="checkbox"
                  checked={selectedcategoryCheckbox === id}
                  onChange={() => handlectedcategoryCheckboxChange(id)}
                />
                <label key={id}>{id}</label>
              </div>
            ))}
            {/* repeat */}
          </div>
        </div>
        {}
        <div className="product-filter-location">
          <h4>Location</h4>
          <p>Select your district</p>
          <div className="product-filter-location-dropbox">
            <Select
              options={groupedFilterOptions}
              onChange={(selected) =>
                setSelectedDistrict(selected?.value || null)
              }
              placeholder="Select District"
            />
          </div>
        </div>
      </div>
      {}
      {/* product card section */}
      <div className="product-container">
        {/* repeat */}
        {accessories.length > 0 ? (
          accessories.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-card-discription">
                <span>
                  <p>Name -</p>
                  <h5>{product.name}</h5>
                </span>
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
                  <h5>Rs/ {product.options[0]?.price || "N/A"}.00</h5>
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
      {accessories.length > 0 ? (
        hasMore && (
          <div
            className="product-card-show-more-products"
            onClick={!loading ? loadMore : null}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Loading..." : "Show more"}{" "}
            <i className="bi bi-arrow-down"></i>
          </div>
        )
      ) : initialLoadComplete ? (
        <div></div>
      ) : null}
      {/* product section end */}
      {}
    </div>
  );
};

export default Accessories;
