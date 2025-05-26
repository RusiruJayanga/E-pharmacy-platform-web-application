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

const Doctors = () => {
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

  //advertisement fatch
  const [selectedDistrict, setSelectedDistrict] = useState("Island Wide");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 21);

        if (selectedcategoryCheckbox && selectedcategoryCheckbox !== "All") {
          params.append("specialty", selectedcategoryCheckbox);
        }

        if (selectedDistrict && selectedDistrict !== "Island Wide") {
          params.append("district", selectedDistrict);
        }

        const res = await fetch(`http://localhost:5000/api/doctors?${params}`);
        const data = await res.json();

        setDoctors((prev) =>
          page === 1 ? data.doctors : [...prev, ...data.doctors]
        );
        setHasMore(data.hasMore);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedcategoryCheckbox, selectedDistrict, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  //details page
  const navigate = useNavigate();
  const handleCardClick = (productId) => {
    navigate(`/Doctors_details`, { state: { productId } });
  };

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container Doctors-section1">
        <div className="margin-section-content">
          <h1>Doctors</h1>
        </div>
      </div>
      {}
      {/* product filter section */}
      <div id="product-section"></div>
      <div className="product-filter-content">
        <div className="product-filter-category">
          <h4>Specialist</h4>
          <div className="product-filter-category-box">
            {/* repeat */}
            {[
              "All",
              "General Practitioner",
              "Endocrinologist",
              "Cardiologist",
              "Nephrologist",
              "Rheumatologist",
              "Neurologist",
              "Hepatologist",
              "Pulmonologist",
              "Dermatologist",
              "Psychologist",
              "Urologist",
              "Otolaryngologist",
              "Ophthalmologist",
              "Pediatrician",
              "Oncologist",
              "Plastic Surgeon",
              "Allergist",
            ].map((id) => (
              <div key={id} className="product-filter-category-item">
                <input
                  type="checkbox"
                  checked={selectedcategoryCheckbox === id}
                  onChange={() => handlectedcategoryCheckboxChange(id)}
                />
                <label>{id}</label>
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
              defaultValue={{ label: "Island Wide", value: "Island Wide" }}
              onChange={(option) => setSelectedDistrict(option.value)}
            />
          </div>
        </div>
      </div>
      {}
      {/* advertisement id card section */}
      <div className="advertisement-id-container">
        {/* repeat */}
        {doctors.length > 0 ? (
          doctors.map((doctor, idx) => (
            <div className="advertisement-id-card" id={idx}>
              <img
                src={doctor.profile_picture || "advertisement-doctor.png"}
                alt={doctor.name}
              />
              <div className="advertisement-id-card-content">
                <h5>{doctor.name}</h5>
                <p>{doctor.specialty}</p>
                <span>
                  <h5>{doctor.district}</h5>{" "}
                </span>
                <div
                  onClick={() => handleCardClick(doctor._id)}
                  className="advertisement-id-card-see-more"
                >
                  <p>See More</p>
                </div>
              </div>
            </div>
          ))
        ) : initialLoadComplete ? (
          <div className="advertisement-product-available">
            <h4>No Doctors Available</h4>
          </div>
        ) : null}
        {/* repeat */}
      </div>
      {doctors.length > 0 ? (
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

export default Doctors;
