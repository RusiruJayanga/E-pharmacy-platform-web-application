import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
//google map config
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  <LoadScript googleMapsApiKey="AI">
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </LoadScript>
);
