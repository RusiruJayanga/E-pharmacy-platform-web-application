import React, { useState } from "react";
import "./login.css";
//animation
import { motion } from "framer-motion";
//backend connection
import { loginUser } from "../../../../services/AuthService.js";
import { useAuth } from "../../../../config/AuthContext.jsx";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//backend connection
const Login = ({ isOpen, onClose }) => {
  //validation
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  //reset form
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
        const response = await loginUser(email, password);
        login(response.token, {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        });
        toast.success("Login successful!");
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      } catch (err) {
        toast.error(err.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  //loading
  const [isLoading, setIsLoading] = useState(false);

  //popup close
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <ToastContainer position="top-center" autoClose={3500} theme="dark" />
      <motion.div
        className="customer-login-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="customer-login-close">
          <h3 onClick={onClose}>&times;</h3>
        </div>
        <div>
          <img src="customer-login.png" alt="login" />
        </div>
        <h2>Welcome back !</h2>
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
            {isLoading ? "Processing" : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
