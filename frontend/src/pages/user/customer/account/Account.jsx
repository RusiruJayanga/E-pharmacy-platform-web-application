import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./account.css";
//account section css
import "../info/seller_info.css";
//order card css
import "../../../../components/user/common/order/order.css";
//log out
import { useAuth } from "../../../../config/AuthContext";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  //category select
  const [selectedCategory, setSelectedCategory] = useState("Pending Orders");
  const categories = ["Pending Orders", "Completed Orders", "Cancelled Orders"];

  const [selectedACategory, setSelectedACategory] = useState(
    "Doctor Appointments"
  );
  const acategories = [
    "Doctor Appointments",
    "Lab Appointments",
    "Ended Appointments",
    "Cancelled Appointments",
  ];

  // Category select for requests
  const [selectedRCategory, setSelectedRCategory] =
    useState("Pending Requests");
  const rcategories = [
    "Pending Requests",
    "Approved Requests",
    "Cancelled Requests",
  ];

  //log out
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //decode user data
  const token = localStorage.getItem("customerToken");
  const user = JSON.parse(atob(token.split(".")[1]));

  //fetch data
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/customer",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      }
    };
    fetchOrders();
  }, [token]);

  const pending = orders.filter((o) =>
    ["processing", "shipped"].includes(o.status)
  );
  const completed = orders.filter((o) => o.status === "delivered");
  const cancelled = orders.filter((o) => o.status === "cancelled");

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/appointments/customer",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, [token]);

  const now = new Date();

  const doctorAppointments = appointments.filter((app) => {
    const dueDate = app.due_date ? new Date(app.due_date) : null;
    return (
      app.sellerType === "Doctor" &&
      app.status === "Accepted" &&
      (!dueDate || dueDate >= now)
    );
  });

  const labAppointments = appointments.filter((app) => {
    const dueDate = app.due_date ? new Date(app.due_date) : null;
    return (
      app.sellerType === "Lab" &&
      app.status === "Accepted" &&
      (!dueDate || dueDate >= now)
    );
  });

  const endedAppointments = appointments.filter((app) => {
    const dueDate = app.due_date ? new Date(app.due_date) : null;
    return (dueDate && dueDate < now) || app.status === "Completed";
  });

  const cancelledAppointments = appointments.filter(
    (app) => app.status === "Rejected"
  );

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/request/customer",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRequests(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load requests");
      }
    };
    fetchRequests();
  }, [token]);

  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const approvedRequests = requests.filter((r) => r.status === "Accepted");
  const cancelledRequests = requests.filter((r) => r.status === "Rejected");

  //details page
  const navigateOrder = useNavigate();
  const handleOrderClick = (orderId) => {
    navigateOrder(`/Order_details`, { state: { orderId } });
  };

  const navigateAppointment = useNavigate();
  const handleAppointmentClick = (appointmentId) => {
    navigateAppointment(`/Appointment_details`, { state: { appointmentId } });
  };

  const navigateRequest = useNavigate();
  const handleRequestClick = (requestId) => {
    navigateRequest(`/Request_details`, { state: { requestId } });
  };

  return (
    <div>
      {/* account section */}
      <div className="user-account-info-margin"></div>
      <div className="user-account-info-container">
        <img src="user-icon.png" alt="user" />
        <h3> {user.name}</h3>
        <div className="user-account-info-box">
          <div className="user-account-info-content">
            <h4>Personal Information</h4>
            <span>
              <p>Phone Number - </p>
              <h5> {user.phone_number}</h5>
            </span>
            <span>
              <p>Email - </p>
              <h5> {user.email}</h5>
            </span>

            <span>
              <p>Postal Code - </p>
              <h5> {user.postal_code}</h5>
            </span>
            <span className="user-account-info-span">
              <p>Address -</p>
              <h5 className="user-account-info-h5">{user.address}</h5>
            </span>
          </div>
          <div className="user-setting-container">
            {/* settings */}
            <div className="setting-content">
              <h4>Security Information</h4>
              {user?.account_status === "Lab" && (
                <span>
                  <p>Request To Be Seller -</p>
                  <Link to="/Request">
                    <button>Request</button>
                  </Link>
                </span>
              )}
              {[
                "Doctor Pending",
                "Pharmacist Pnding",
                "Lab Owner Pending",
              ].includes(user?.account_status) && (
                <span>
                  <p>Request To Be Seller -</p>
                  <h6 className="setting-pending">Pending</h6>
                </span>
              )}
              {user?.account_status === "Rejected" && (
                <span>
                  <p>Request To Be Seller -</p>
                  <h6 className="setting-delete">Rejected</h6>
                </span>
              )}
              {user?.account_status === "Lab" && (
                <span>
                  <p>Doctor Account -</p>
                  <Link to="/Doctor_login">
                    <button>Login</button>
                  </Link>
                </span>
              )}
              {user?.account_status === "Lab" && (
                <span>
                  <p>Pharmacist Account -</p>
                  <Link to="/Pharmacist_login">
                    <button>Login</button>
                  </Link>
                </span>
              )}
              {user?.account_status === "Lab" && (
                <span>
                  <p>Lab Account -</p>
                  <Link to="/Lab_login">
                    <button>Login</button>
                  </Link>
                </span>
              )}
              <div className="setting-button">
                <button onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {}
      {/* head section */}
      <div className="activity-head">
        <h2>My Activity</h2>
      </div>
      {}
      {/* account activity section */}
      <div className="account-activity-container">
        <div className="activity-category">
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
        <div className="activity-container">
          {/* pending orders */}
          {selectedCategory === "Pending Orders" &&
            (pending.length ? (
              pending.map((item) => (
                <div className="product-order-container" key={item.order_id}>
                  <div className="product-order-up">
                    <img
                      src={item.product_id.images?.[0] || "placeholder.png"}
                      alt={item.product_id.name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.product_id.name}</h4>
                      <span>
                        <p>Order ID - {item.order_id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Price -</p>
                          <h5>Rs/ {item.price.toFixed(2)}</h5>
                        </span>
                        <span>
                          <p>Quantity -</p>
                          <h5>{item.quantity}</h5>
                        </span>
                        <span>
                          <p>Order Date -</p>
                          <h5>{item.order_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() => handleOrderClick(item.order_id)}
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Procecssing">{item.status}</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Orders</h4>
              </div>
            ))}
          {/* completed orders */}
          {selectedCategory === "Completed Orders" &&
            (completed.length ? (
              completed.map((item) => (
                <div className="product-order-container" key={item._id}>
                  <div className="product-order-up">
                    <img
                      src={item.product_id.images?.[0] || "placeholder.png"}
                      alt={item.product_id.name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.product_id.name}</h4>
                      <span>
                        <p>Order ID - {item.order_id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Price -</p>
                          <h5>Rs/ {item.price.toFixed(2)}</h5>
                        </span>
                        <span>
                          <p>Quantity -</p>
                          <h5>{item.quantity}</h5>
                        </span>
                        <span>
                          <p>Order Date -</p>
                          <h5>{item.order_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() => handleOrderClick(item.order_id)}
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Complete">Complete</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Orders</h4>
              </div>
            ))}
          {/* canceled orders */}
          {selectedCategory === "Cancelled Orders" &&
            (cancelled.length ? (
              cancelled.map((item) => (
                <div className="product-order-container" key={item._id}>
                  <div className="product-order-up">
                    <img
                      src={item.product_id.images?.[0] || "placeholder.png"}
                      alt={item.product_id.name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.product_id.name}</h4>
                      <span>
                        <p>Order ID - {item.order_id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Price -</p>
                          <h5>Rs/ {item.price.toFixed(2)}</h5>
                        </span>
                        <span>
                          <p>Quantity -</p>
                          <h5>{item.quantity}</h5>
                        </span>
                        <span>
                          <p>Order Date -</p>
                          <h5>{item.order_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() => handleOrderClick(item.order_id)}
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Complete">Cancelled</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Orders</h4>
              </div>
            ))}
        </div>
      </div>
      {}
      {/* account activity section */}
      <div className="account-activity-container">
        <div className="activity-category">
          {acategories.map((category, index) => (
            <h4
              key={index}
              className={
                selectedACategory === category ? "active-category" : ""
              }
              onClick={() => setSelectedACategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        <div className="activity-container">
          {/* doctor appointments */}
          {selectedACategory === "Doctor Appointments" &&
            (doctorAppointments.length ? (
              doctorAppointments.map((appointment) => (
                <div className="product-order-container" key={appointment._id}>
                  <div className="product-order-up">
                    <img
                      src={
                        appointment.seller?.profile_picture || "placeholder.png"
                      }
                      alt={appointment.seller?.name}
                    />
                    <div className="product-order-up-content">
                      <h4>{appointment.seller?.name}</h4>
                      <span>
                        <p>Order ID - {appointment._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Type -</p>
                          <h5>{appointment.sellerType}</h5>
                        </span>
                        <span>
                          <p>Book Date -</p>
                          <h5>{appointment.book_date.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Due Date -</p>
                          <h5>{appointment.due_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <buttonon
                            onClick={() =>
                              handleAppointmentClick(appointment._id)
                            }
                          >
                            Show
                          </buttonon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Appointments</h4>
              </div>
            ))}
          {/* lab appointments */}
          {selectedACategory === "Lab Appointments" &&
            (labAppointments.length ? (
              labAppointments.map((appointment) => (
                <div className="product-order-container" key={appointment._id}>
                  <div className="product-order-up">
                    <img
                      src={
                        appointment.seller?.profile_picture || "placeholder.png"
                      }
                      alt={appointment.seller?.lab_name}
                    />
                    <div className="product-order-up-content">
                      <h4>{appointment.seller?.lab_name}</h4>
                      <span>
                        <p>Order ID - {appointment._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Type -</p>
                          <h5>{appointment.sellerType}</h5>
                        </span>
                        <span>
                          <p>Book Date -</p>
                          <h5>{appointment.book_date.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Due Date -</p>
                          <h5>{appointment.due_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() =>
                              handleAppointmentClick(appointment._id)
                            }
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Appointments</h4>
              </div>
            ))}
          {/* ended appointments */}
          {selectedACategory === "Ended Appointments" &&
            (endedAppointments.length ? (
              endedAppointments.map((appointment) => (
                <div className="product-order-container" key={appointment._id}>
                  <div className="product-order-up">
                    <img
                      src={
                        appointment.seller?.profile_picture || "placeholder.png"
                      }
                      alt={
                        appointment.seller?.name || appointment.seller?.lab_name
                      }
                    />
                    <div className="product-order-up-content">
                      <h4>{appointment.seller?.name}</h4>
                      <span>
                        <p>Order ID - {appointment._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Type -</p>
                          <h5>{appointment.sellerType}</h5>
                        </span>
                        <span>
                          <p>Book Date -</p>
                          <h5>{appointment.book_date.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Due Date -</p>
                          <h5>{appointment.due_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() =>
                              handleAppointmentClick(appointment._id)
                            }
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Appointments</h4>
              </div>
            ))}
          {/* canceled appointments */}
          {selectedACategory === "Cancelled Appointments" &&
            (cancelledAppointments.length ? (
              cancelledAppointments.map((appointment) => (
                <div className="product-order-container" key={appointment._id}>
                  <div className="product-order-up">
                    <img
                      src={
                        appointment.seller?.profile_picture?.[0] ||
                        "placeholder.png"
                      }
                      alt={appointment.seller?.name}
                    />
                    <div className="product-order-up-content">
                      <h4>{appointment.seller?.name}</h4>
                      <span>
                        <p>Order ID - {appointment._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Type -</p>
                          <h5>{appointment.sellerType}</h5>
                        </span>
                        <span>
                          <p>Book Date -</p>
                          <h5>{appointment.book_date.slice(0, 10)}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button
                            onClick={() =>
                              handleAppointmentClick(appointment._id)
                            }
                          >
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Appointments</h4>
              </div>
            ))}
        </div>
      </div>
      {}
      {/* account activity section - Requests */}
      <div className="account-activity-container">
        <div className="activity-category">
          {rcategories.map((category, index) => (
            <h4
              key={index}
              className={
                selectedRCategory === category ? "active-category" : ""
              }
              onClick={() => setSelectedRCategory(category)}
            >
              {category}
            </h4>
          ))}
        </div>
        <div className="activity-container">
          {/* pending requests */}
          {selectedRCategory === "Pending Requests" &&
            (pendingRequests.length ? (
              pendingRequests.map((item) => (
                <div className="product-order-container" key={item._id}>
                  <div className="product-order-up">
                    <img
                      src={item.seller_id?.profile_picture || "placeholder.png"}
                      alt={item.seller_id?.pharmacy_name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.seller_id?.pharmacy_name}</h4>
                      <span>
                        <p>Request ID - {item._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Request Date -</p>
                          <h5>{item.request_date.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Pharmacy ID -</p>
                          <h5>{item.seller_id?._id}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button onClick={() => handleRequestClick(item._id)}>
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Procecssing">{item.status}</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Requests</h4>
              </div>
            ))}
          {/* completed requests */}
          {selectedRCategory === "Approved Requests" &&
            (approvedRequests.length ? (
              approvedRequests.map((item) => (
                <div className="product-order-container" key={item._id}>
                  <div className="product-order-up">
                    <img
                      src={item.seller_id?.profile_picture || "placeholder.png"}
                      alt={item.seller_id?.pharmacy_name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.seller_id?.pharmacy_name}</h4>
                      <span>
                        <p>Request ID - {item._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Request Date -</p>
                          <h5>{item.request_date?.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Pharmacy ID -</p>
                          <h5>{item.seller_id?._id}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button onClick={() => handleRequestClick(item._id)}>
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Complete">Complete</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Requests</h4>
              </div>
            ))}
          {/* canceled requests */}
          {selectedRCategory === "Cancelled Requests" &&
            (cancelledRequests.length ? (
              cancelledRequests.map((item) => (
                <div className="product-order-container" key={item._id}>
                  <div className="product-order-up">
                    <img
                      src={item.seller_id?.profile_picture || "placeholder.png"}
                      alt={item.seller_id?.pharmacy_name}
                    />
                    <div className="product-order-up-content">
                      <h4>{item.seller_id?.pharmacy_name}</h4>
                      <span>
                        <p>Request ID - {item._id}</p>
                      </span>
                      <div className="product-order-content-middle">
                        <span>
                          <p>Request Date -</p>
                          <h5>{item.request_date.slice(0, 10)}</h5>
                        </span>
                        <span>
                          <p>Pharmacy ID -</p>
                          <h5>{item.seller_id?._id}</h5>
                        </span>
                        <div className="product-order-content-middle-right">
                          <button onClick={() => handleRequestClick(item._id)}>
                            Show
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-order-down">
                    <div className="product-order-down-content-left">
                      <h4 className="Complete">Cancelled</h4>
                    </div>
                    <div className="product-order-down-content-right"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="advertisement-product-available">
                <h4>No Requests</h4>
              </div>
            ))}
        </div>
      </div>
      {}
    </div>
  );
};

export default Account;
