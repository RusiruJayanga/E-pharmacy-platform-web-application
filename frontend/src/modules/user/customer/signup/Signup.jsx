import React, { useState } from "react";
import "./signup.css";
//animation
import { motion } from "framer-motion";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";
//backend connection
import { registerUser } from "../../../../services/AuthService.js";
import { useAuth } from "../../../../config/AuthContext.jsx";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  //validation
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      postalCode: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      postalCode: Yup.string()
        .required("Required")
        .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid postal code format"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          "Invalid phone number format"
        ),
      email: Yup.string().required("Required").email("Invalid email format"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /[!@#$%^&*(),.?]/,
          "Must contain at least one symbol (!@#$%^&*(),.?)"
        ),
    }),

    //submit form
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await registerUser({
          name: values.name,
          address: values.address,
          postal_code: values.postalCode,
          phone_number: values.phoneNumber,
          email: values.email,
          password: values.password,
        });

        login(response.token, {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          phone_number: response.user.phone_number,
        });

        toast.success("Registration successful! Welcome!");
        setTimeout(() => {
          onClose();
          resetForm();
          setHasSubmitted(false);
        }, 1000);
      } catch (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  //loading
  const [isLoading, setIsLoading] = useState(false);

  //popup close
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <ToastContainer position="top-center" autoClose={3500} theme="dark" />
      <motion.div
        className="customer-signup-popup-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="customer-signup-left">
          <div>
            <img src="customer-signup.png" alt="login" />
          </div>
          <h2>Welcome !</h2>
        </div>
        <div className="customer-signup-right">
          <div className="customer-signup-close">
            <h3 onClick={onClose}>&times;</h3>
          </div>
          <form
            className="customer-signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              setHasSubmitted(true);
              formik.handleSubmit(e);
            }}
          >
            <input
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p>{hasSubmitted && formik.errors.name && formik.errors.name}</p>

            <input
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <p>
              {hasSubmitted && formik.errors.address && formik.errors.address}
            </p>

            <input
              name="postalCode"
              placeholder="Postal code"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            />
            <p>
              {hasSubmitted &&
                formik.errors.postalCode &&
                formik.errors.postalCode}
            </p>

            <input
              name="phoneNumber"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            <p>
              {hasSubmitted &&
                formik.errors.phoneNumber &&
                formik.errors.phoneNumber}
            </p>

            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>{hasSubmitted && formik.errors.email && formik.errors.email}</p>

            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p>
              {hasSubmitted && formik.errors.password && formik.errors.password}
            </p>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processing" : "Signup"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
