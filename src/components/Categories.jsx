import React from "react";
import "./Categories.css";

function Categories({ setCategories }) {
  const exitCategories = () => {
    setCategories(false);
  };

  return (
    <div className="categories">
      <div className="categoryHeader">
        <h3>Category</h3>
        <p onClick={exitCategories} style={{ cursor: "pointer" }}>
          x
        </p>
      </div>
      <div className="selectCategory">
        <p>Select Categories</p>
        <p className="downCategory">⌄</p>
      </div>
      <p className="categoryClear">Clear</p>
    </div>
  );
}

export default Categories;
