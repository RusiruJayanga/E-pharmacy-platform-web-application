import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
//google map config
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//user auth config
import { AuthProvider } from "./config/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LoadScript googleMapsApiKey="">
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </LoadScript>
  </AuthProvider>
);
