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

const Pharmacies = () => {
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

  //advertisement fatch
  const [selectedDistrict, setSelectedDistrict] = useState("Island Wide");
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 21);

        if (selectedDistrict && selectedDistrict !== "Island Wide") {
          params.append("district", selectedDistrict);
        }

        const res = await fetch(
          `http://localhost:5000/api/pharmacies?${params}`
        );
        const data = await res.json();

        setPharmacies((prev) =>
          page === 1 ? data.pharmacies : [...prev, ...data.pharmacies]
        );
        setHasMore(data.hasMore);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to fetch pharmacies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [selectedDistrict, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  //details page
  const navigate = useNavigate();
  const handleCardClick = (productId) => {
    navigate(`/Pharmacies_details`, { state: { productId } });
  };

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Pharmacies-section1">
        <div className="margin-section-content">
          <h1>Pharmacies</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div id="product-section"></div>
      <div className="product-filter-content">
        {}
        <div className="product-filter-location">
          <h4>Location</h4>
          <p>Select your district</p>
          <div className="product-filter-location-dropbox">
            <Select
              options={groupedFilterOptions}
              defaultValue={{ label: "Island Wide", value: "Island Wide" }}
              onChange={(option) => setSelectedDistrict(option.value)}
            />
          </div>
        </div>
        <div className="product-filter-instructions">
          <h4>Attention !</h4>
          <p>
            When selecting a pharmacy, enter the district you live in. Stores
            are rated up to 5 stars based on customer feedback on the quality of
            service.
          </p>
        </div>
      </div>
      {}
      {/* advertisement card section */}
      <div className="advertisement-container">
        {/* repeat */}
        {pharmacies.length > 0 ? (
          pharmacies.map((pharmacy, idx) => (
            <div className="advertisement-card" key={pharmacy._id || idx}>
              <img
                src={pharmacy.profile_picture || "product.png"}
                alt={pharmacy.pharmacy_name}
              />
              <div className="advertisement-card-content">
                <h5>{pharmacy.pharmacy_name}</h5>
                <span>
                  <h5>{pharmacy.district}</h5>
                  <p>
                    {pharmacy.rate} <i className="bi bi-star-fill"></i>
                  </p>
                </span>
                <div
                  onClick={() => handleCardClick(pharmacy._id)}
                  className="advertisement-card-see-more"
                >
                  <p>See More</p>
                </div>
              </div>
            </div>
          ))
        ) : initialLoadComplete ? (
          <div className="advertisement-product-available">
            <h4>No Labs Available</h4>
          </div>
        ) : null}
        {/* repeat */}
      </div>
      {pharmacies.length > 0 ? (
        hasMore && (
          <div
            className="advertisement-id-card-show-more-products"
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
      {/*advertisement section end */}
      {}
    </div>
  );
};

export default Pharmacies;
