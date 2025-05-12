import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./login.css";
//login form css
import "../../../../../modules/user/customer/login/login.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  //navigate
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = !email ? "Required" : "";
    const passwordError = !password ? "Required" : "";
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/auth/seller-login/doctor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        toast.success("Login successful!");
        setTimeout(() => {
          resetForm();
          navigate("/Home_pharmacist");
        }, 1000);
      } catch (error) {
        toast.error(error.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="seller-login">
        <Link to="/Account">
          <h4>
            <i className="bi bi-arrow-left"></i>
          </h4>
        </Link>
        <div className="customer-login-popup-content">
          <div>
            <img src="customer-login.png" alt="login" />
          </div>
          <h2>Welcome back!</h2>
          <form className="customer-login-form" onSubmit={handleSubmit}>
            <div>
              <input
                name="Email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
              />
              <p>{errors.email}</p>

              <input
                name="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
              />
              <p>{errors.password}</p>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
