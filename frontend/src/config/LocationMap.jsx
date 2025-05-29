import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const LocationMap = ({ location, onLocationChange, editable = false }) => {
  const handleMapClick = (e) => {
    if (!editable) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (onLocationChange) {
      onLocationChange({ lat, lng });
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || center}
      zoom={15}
      onClick={handleMapClick}
      options={{
        clickableIcons: false,
        draggableCursor: editable ? "crosshair" : "default",
      }}
    >
      <Marker
        position={location || center}
        draggable={editable}
        onDragEnd={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          if (onLocationChange) {
            onLocationChange({ lat, lng });
          }
        }}
      />
    </GoogleMap>
  );
};

export default LocationMap;
