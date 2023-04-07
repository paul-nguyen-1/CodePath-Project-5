import React from "react";
import "./Cities.css";

function Cities({ setCities, handleCityChange, handleClearCity }) {
  const exitCities = () => {
    setCities(false);
  };

  return (
    <div className="cities">
      <div className="cityHeader">
        <h3>Cities</h3>
        <p onClick={exitCities} style={{ cursor: "pointer" }}>
          x
        </p>
      </div>
      <div className="selectCity">
        <input
          type="text"
          placeholder="Enter city"
          onChange={handleCityChange}
        />
      </div>
      <div className="splitCity">
        <p className="cityClear" onClick={handleClearCity}>
          Clear
        </p>
        <p onClick={exitCities}>Done</p>
      </div>
    </div>
  );
}

export default Cities;
