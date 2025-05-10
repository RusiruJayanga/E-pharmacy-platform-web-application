import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
//google map config
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//user auth config
import { AuthProvider } from "./config/AuthContext";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LoadScript googleMapsApiKey="AIzaSyDylV7_zS_tUJALvKT9ILAeu3YWmYSXKLo">
      <StrictMode>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3500}
            theme="dark"
            style={{ zIndex: 10010 }}
          />
          <App />
        </BrowserRouter>
      </StrictMode>
    </LoadScript>
  </AuthProvider>
);
