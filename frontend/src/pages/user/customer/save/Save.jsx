import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./save.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Save = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedItems, setSavedItems] = useState([]);
  const categories = [
    "All",
    "Medicines",
    "Doctors",
    "Lab Tests",
    "Pharmacies",
    "Accessories",
  ];

  //fetch saved items
  const token = localStorage.getItem("customerToken");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const customer_id = payload.customerId;

  const getCategoryFromType = (type) => {
    switch (type) {
      case "Medicine":
        return "Medicines";
      case "Accessory":
        return "Accessories";
      case "Doctor":
        return "Doctors";
      case "Pharmacy":
        return "Pharmacies";
      case "Lab":
        return "Lab Tests";
      default:
        return "Unknown";
    }
  };

  const fetchSavedItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/save/get/${customer_id}`
      );
      setSavedItems(res.data);
    } catch (err) {
      toast.error("Failed to load saved items");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/save/delete/${id}`);
      toast.success("Item removed");
      fetchSavedItems();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    if (customer_id) fetchSavedItems();
  }, [customer_id]);

  const filteredItems =
    selectedCategory === "All"
      ? savedItems
      : savedItems.filter(
          (item) => getCategoryFromType(item.productType) === selectedCategory
        );

  //navigation
  const navigate = useNavigate();

  const handleCardClick = (productId, productType) => {
    let path = "/";

    switch (productType) {
      case "Accessory":
        path = "/Accessories_details";
        break;
      case "Medicine":
        path = "/Medicines_details";
        break;
      case "Doctor":
        path = "/Doctors_details";
        break;
      case "Lab":
        path = "/Lab_details";
        break;
      case "Pharmacy":
        path = "/Pharmacies_details";
        break;
    }

    navigate(path, { state: { productId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="save-head">
        <h2>My Save</h2>
      </div>
      {}
      {/* save section */}
      <div className="save-container">
        <div className="save-option-box">
          {categories.map((category, index) => (
            <h4
              key={index}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        <div className="save-item-container">
          {/* repeat */}
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => (
              <div className="save-item" key={item._id}>
                <img
                  src={
                    item.product?.images?.[0] ||
                    item.product?.profile_picture ||
                    "/default.jpg"
                  }
                  alt="product"
                />
                <h4>
                  {item.product?.name ||
                    item.product?.pharmacy_name ||
                    item.product?.lab_name}
                </h4>
                <h5>{item.productType}</h5>
                <div className="save-action">
                  <button
                    onClick={() =>
                      handleCardClick(item.product._id, item.productType)
                    }
                  >
                    Show
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="advertisement-product-available">
              <h4>No Saved Items</h4>
            </div>
          )}
          {/* repeat */}
        </div>
      </div>
      {}
    </div>
  );
};

export default Save;
