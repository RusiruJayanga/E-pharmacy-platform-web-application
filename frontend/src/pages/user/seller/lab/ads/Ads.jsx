import React, { useState } from "react";
import "../../doctor/ads/ads.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";

const Ads = () => {
  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="advertisement-head">
        <h2>Add advertisement</h2>
      </div>
      {}
      {/* advertisement section */}
      <div className="advertisement-form">
        <input name="Location" placeholder="Location" />
        <p>console.error</p>
        <input name="Session Price" placeholder="Session Price" />
        <p>console.error</p>
        <textarea
          className="textinput input-element"
          placeholder="description"
        ></textarea>
        <p>
          console.error <span> 100/100</span>
        </p>
        <button>Add</button>
      </div>
      {}
    </div>
  );
};

export default Ads;
