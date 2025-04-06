import React from "react";
//google map
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const LocationMap = ({ location }) => {
  return (
    <LoadScript googleMapsApiKey="API">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || center}
        zoom={15}
      >
        <Marker position={location || center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;
