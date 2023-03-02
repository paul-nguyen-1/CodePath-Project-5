import React from "react";
import "../App.css";

function Navbar({ handleSearchClick, searchFilter }) {
  return (
    <div className="navbar">
      <div className="logo">
        <h2>NeetSeat 🎟</h2>
      </div>
      <div className="navLinks">
        {searchFilter && (
          <input
            type="text"
            placeholder="Search for Performers"
            value={null}
          ></input>
        )}
        <button onClick={handleSearchClick}>🔍 Search</button>
        <button>ℹ️ About</button>
        <button>🏠 Contact</button>
      </div>
    </div>
  );
}

export default Navbar;
