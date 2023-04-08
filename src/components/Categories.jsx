import React from "react";
import "./Categories.css";

function Categories({ setCategories, handleSearchEvent, handleClearSearch, setOverlay }) {
  const exitCategories = () => {
    setCategories(false);
    setOverlay(false);
  };

  return (
    <div className="categories" style={{outline:'none'}}>
      <div className="categoryHeader">
        <h3>Events</h3>
        <p onClick={exitCategories} style={{ cursor: "pointer" }}>
          x
        </p>
      </div>
      <div className="selectCategory">
        <input
          type="text"
          placeholder="Enter event"
          onChange={handleSearchEvent}
        />
      </div>
      <div className="split">
        <p className="categoryClear" onClick={handleClearSearch}>
          Clear
        </p>
        <p onClick={exitCategories}>Done</p>
      </div>
    </div>
  );
}

export default Categories;
