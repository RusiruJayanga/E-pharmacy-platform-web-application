import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../../pages/user/seller/pharmacist/orders/orders.css";
//ribben css
import "../../../components/user/common/margin/margin.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/customer"
        );
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/customer/${customerId}`
      );
      setCustomers(customers.filter((customer) => customer._id !== customerId));
      toast.success("Customer deleted successfully");
    } catch (err) {
      console.error("Error deleting customer:", err);
      toast.error("Failed to delete customer");
    }
  };

  const confirmDelete = (customerId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this customer?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <button
            className="confirm-button"
            onClick={() => {
              handleDelete(customerId);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button className="cancel-button" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="order-head">
        <h2>Customers</h2>
      </div>
      {}
      {/* order section */}
      <div className="order-container">
        {customers.map((customer) => (
          <div key={customer._id} className="product-order-container">
            <div className="product-order-up">
              <div className="product-order-up-content">
                <h4>{customer.name}</h4>
                <span>
                  <p>Customer ID - {customer._id}</p>
                </span>
                <div className="product-order-content-middle">
                  <span>
                    <p>Customer Phone Number -</p>
                    <h5>{customer.phone_number}</h5>
                  </span>
                  <span>
                    <p>Customer Postal Code -</p>
                    <h5>{customer.postal_code || "N/A"}</h5>
                  </span>
                  <span>
                    <p>Customer Email -</p>
                    <h5>{customer.email}</h5>
                  </span>
                  <div className="product-order-content-middle-right">
                    <button
                      className="delete-button"
                      onClick={() => confirmDelete(customer._id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
