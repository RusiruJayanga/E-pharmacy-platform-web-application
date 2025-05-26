import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../../pages/user/seller/doctor/login/login.css";
//login form css
import "../../../modules/user/customer/login/login.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setErrors({ username: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = !username ? "Required" : "";
    const passwordError = !password ? "Required" : "";
    setErrors({ username: usernameError, password: passwordError });

    if (!usernameError && !passwordError) {
      setIsLoading(true);

      setTimeout(() => {
        if (username.toLowerCase() === "rusiru" && password === "123rj") {
          toast.success("Login successful!");
          setTimeout(() => {
            resetForm();
            navigate("/Home_admin");
          }, 1000);
        } else {
          toast.error("Invalid username or password");
        }
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div>
      <div className="seller-login">
        <div className="customer-login-popup-content">
          <div>
            <img src="customer-login.png" alt="login" />
          </div>
          <h2>Welcome back!</h2>
          <form className="customer-login-form" onSubmit={handleSubmit}>
            <div>
              <input
                name="Username"
                placeholder="User name"
                type="text"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrors({ ...errors, username: "" });
                }}
              />
              <p>{errors.username}</p>

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
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
