import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./cart.css";

const Thank = () => {
  const navigate = useNavigate();

  return (
    <div className="thank">
      <img src="thank.png" alt="thank" />
      <h2>thank you for your order !</h2>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default Thank;
