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
        <p onClick={exitCategories} className="closeCategory">
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
        <p onClick={exitCategories} className="categoryDone">Done</p>
      </div>
    </div>
  );
}

export default Categories;
