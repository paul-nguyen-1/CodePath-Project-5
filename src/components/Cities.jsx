import React from "react";
import "./Categories.css";

function Cities({ setCities, handleCityChange, handleClearCity, setOverlay }) {
  const exitCities = () => {
    setCities(false);
    setOverlay(false);
  };

  return (
    <div className="categories">
      <div className="categoryHeader">
        <h3>City</h3>
        <p onClick={exitCities} style={{ cursor: "pointer" }}>
          x
        </p>
      </div>
      <div className="selectCategory">
        <input
          type="text"
          placeholder="Enter city"
          onChange={handleCityChange}
        />
      </div>
      <div className="split">
        <p className="categoryClear" onClick={handleClearCity}>
          Clear
        </p>
        <p onClick={exitCities}>Done</p>
      </div>
    </div>
  );
}

export default Cities;
