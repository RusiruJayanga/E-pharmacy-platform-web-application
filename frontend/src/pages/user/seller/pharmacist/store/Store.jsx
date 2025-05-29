import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./store.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("pharmacistToken");
    if (!raw) return toast.error("Please login first");

    const token = JSON.parse(raw).token;
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const seller_id = decoded.pharmacistId;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/product/store/seller/${seller_id}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/product/store/delete/${type}/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Item removed");
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const getStockClass = (quantity) => {
    if (quantity === 0) return "nostock";
    if (quantity <= 5) return "lowstock";
    return "instock";
  };

  //edit page
  const navigate = useNavigate();
  const handleCardClickAccessory = (productId) => {
    navigate(`/Accessories_edit`, { state: { productId } });
  };
  const handleCardClickMedicine = (productId) => {
    navigate(`/Medicines_edit`, { state: { productId } });
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="store-head">
        <h2>My Store</h2>
      </div>
      {}
      {/* product section */}
      <div className="store-container">
        {/* repeat */}
        {products.map((product) => (
          <div className="store-item-container" key={product._id}>
            <img src={product.images?.[0]} alt={product.name} />
            <div className="store-item-content">
              <h3>{product.name}</h3>
              {product.legality && (
                <span>
                  <p>Legality - </p>
                  <h6>{product.legality}</h6>
                </span>
              )}
              <span>
                <p>Availability - </p>
                <h6>{product.quantity > 0 ? "Available" : "Out of Stock"}</h6>
              </span>
            </div>
            <div className="store-item-content">
              <span>
                <p>Category - </p>
                <h6>{product.category}</h6>
              </span>
              <span>
                <p>Quantity - </p>
                <h6>{product.quantity}</h6>
              </span>
              <span>
                <p>Status - </p>
                <h4 className={getStockClass(product.quantity)}>
                  {product.quantity === 0
                    ? "No Stock"
                    : product.quantity <= 5
                    ? "Low Stock"
                    : "In Stock"}
                </h4>
              </span>
            </div>
            <div className="store-item-action">
              {product.legality ? (
                <button onClick={() => handleCardClickMedicine(product._id)}>
                  Edit
                </button>
              ) : (
                <button onClick={() => handleCardClickAccessory(product._id)}>
                  Edit
                </button>
              )}
              <button
                onClick={() =>
                  handleDelete(
                    product._id,
                    product.legality ? "medicine" : "accessory"
                  )
                }
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        ))}
        {/* repeat */}
      </div>
      {}
    </div>
  );
};

export default Store;
