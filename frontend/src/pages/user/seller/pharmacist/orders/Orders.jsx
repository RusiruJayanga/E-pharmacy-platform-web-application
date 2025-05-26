import React, { useState, useEffect } from "react";
import "./orders.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//react select
import Select from "react-select";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getSellerId = () => {
  const raw = localStorage.getItem("pharmacistToken");
  if (!raw) return null;
  try {
    const token = JSON.parse(raw).token;
    const { pharmacistId } = JSON.parse(atob(token.split(".")[1]));
    return pharmacistId;
  } catch {
    return null;
  }
};

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState("New Orders");
  const [orders, setOrders] = useState({
    newOrders: [],
    deliveredOrders: [],
    cancelledOrders: [],
  });

  useEffect(() => {
    const sellerId = getSellerId();
    if (!sellerId) return toast.error("Please login first");

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/seller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("pharmacistToken")).token
              }`,
            },
          }
        );
        const data = await res.json();
        setOrders(data);
      } catch {
        toast.error("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem("pharmacistToken")).token;
      const res = await fetch(
        `http://localhost:5000/api/orders/item/${itemId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error();
      const updated = await res.json();

      setOrders((prev) => {
        const all = [
          ...prev.newOrders,
          ...prev.deliveredOrders,
          ...prev.cancelledOrders,
        ].map((o) => (o._id === updated._id ? updated : o));

        return {
          newOrders: all.filter((i) =>
            ["processing", "shipped"].includes(i.status)
          ),
          deliveredOrders: all.filter((i) => i.status === "delivered"),
          cancelledOrders: all.filter((i) => i.status === "cancelled"),
        };
      });

      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  //status options
  const statusOptions = [
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const statusColours = {
    processing: "#ffb300",
    shipped: "#2196f3",
    delivered: "#4caf50",
    cancelled: "#f44336",
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      width: "150px",
      borderRadius: 3,
      padding: "0 8px",
      fontSize: "16px",
      fontWeight: 300,
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0,123,255,.25)" : "none",
      borderColor: state.isFocused ? "#80bdff" : base.borderColor,
      "&:hover": { borderColor: "#80bdff" },
    }),
    option: (base, { data, isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? statusColours[data.value]
        : isFocused
        ? "#f0f0f0"
        : undefined,
      color: isSelected ? "#fff" : "#333",
      fontSize: "0.85rem",
    }),
    singleValue: (base, { data }) => ({
      ...base,
      color: statusColours[data.value],
      fontWeight: 600,
    }),
    dropdownIndicator: (base) => ({ ...base, padding: 4 }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const renderList = (list) =>
    list.map((item) => (
      <div key={item._id} className="order-item-container">
        <img
          src={item.product_id?.images?.[0] || "/details/1.png"}
          alt={item.product_id?.name}
        />

        <div className="order-item-content">
          <h4>{item.product_id?.name}</h4>
          <span>
            <p>Option - </p>
            <h6>{item.option}</h6>
          </span>
          <span>
            <p>Quantity - </p>
            <h6>{item.quantity}</h6>
          </span>
        </div>

        <div className="order-item-content">
          <span>
            <p>Order Date - </p>
            <h6>{item.order_date?.slice(0, 10)}</h6>
          </span>
          <span>
            <p>Delivery Date - </p>
            <h6>{item.delivery_date?.slice(0, 10)}</h6>
          </span>
          <span>
            <p>Category - </p>
            <h6>{item.productType}</h6>
          </span>
        </div>

        <div className="order-item-content">
          <span>
            <p>Customer Name - </p>
            <h6>{item.customer_id?.name}</h6>
          </span>
          <span>
            <p>Customer Address - </p>
            <h6>{item.customer_id?.address}</h6>
          </span>
          <span>
            <p>Phone Number - </p>
            <h6>{item.customer_id?.phone_number}</h6>
          </span>
        </div>

        <div className="order-item-content order-item-content-last">
          <span>
            <p>Delevery Method - </p>
            <h6>{item.order_id?.delevery_method}</h6>
          </span>
          <span>
            <p>Order ID - </p>
            <h6>{item.order_id?._id}</h6>
          </span>
          <span>
            <p>Status - </p>
            {["processing", "shipped"].includes(item.status) ? (
              <Select
                classNamePrefix="status-select"
                value={statusOptions.find((o) => o.value === item.status)}
                onChange={(opt) => handleStatusChange(item._id, opt.value)}
                options={statusOptions}
                isSearchable={false}
                styles={selectStyles}
                menuPlacement="auto"
              />
            ) : (
              <h4 className={item.status}>{item.status}</h4>
            )}
          </span>
        </div>
      </div>
    ));

  const categoryMap = {
    "New Orders": orders.newOrders,
    "Delivered Orders": orders.deliveredOrders,
    "Cancelled Orders": orders.cancelledOrders,
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben" />

      {/* head */}
      <div className="order-head">
        <h2>My Orders</h2>
      </div>

      {/* orders */}
      <div className="order-container">
        <div className="order-option-box">
          {Object.keys(categoryMap).map((cat) => (
            <h4
              key={cat}
              className={selectedCategory === cat ? "active-category" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </h4>
          ))}
        </div>

        {renderList(categoryMap[selectedCategory])}
      </div>
    </div>
  );
};

export default Orders;
