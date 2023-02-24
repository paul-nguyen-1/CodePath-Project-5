import React from "react";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h2>SeatFreak 🎟</h2>
      </div>
      <div className="navLinks">
        <button>🔍 Search</button>
        <button>ℹ️ About</button>
        <button>🏠 Contact</button>
      </div>
    </div>
  );
}

export default Navbar;
