import React, { useState } from "react";
import "./request.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//google map config
import LocationMap from "../../../../config/LocationMap";

const Request = () => {
  //add location

  const defaultLocation = {
    lat: 6.9271,
    lng: 79.8612,
  };
  const [sellerLocation, setSellerLocation] = useState(defaultLocation);
  const handleLocationChange = (newLocation) => {
    setSellerLocation(newLocation);
  };

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="request-head">
        <h2>Join With Us</h2>
      </div>
      {}
      {/* request form section */}
      <div className="request-form">
        <input name="Name" placeholder="Name"></input>
        <p>console.error</p>
        <input name="Address" placeholder="Address"></input>
        <p>console.error</p>
        <input name="Postal code" placeholder="Postal code"></input>
        <p>console.error</p>
        <input name="Phone number" placeholder="Phone number"></input>
        <p>console.error</p>
        <input
          name="National ID number"
          placeholder="National ID number"
        ></input>
        <p>console.error</p>
        <input name="Email" placeholder="Email"></input>
        <p>console.error</p>
        <input name="Password" placeholder="Password"></input>
        <p>console.error</p>
        {/* location map */}
        <h6>Enter Your Shop Location</h6>
        <div className="request-location-map">
          <LocationMap
            location={sellerLocation}
            onLocationChange={handleLocationChange}
            editable={true}
          />
        </div>
        <p>console.error</p>
        <button>Request</button>
      </div>
      {}
    </div>
  );
};

export default Request;
