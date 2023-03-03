import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

function Navbar({ handleSearchClick, searchFilter }) {
  const [navbar, setNavbar] = useState(false);

  //blur effect for navbar when scrolling
  const changeBackground = () => {
    console.log("Changebackground called");
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <div className={navbar ? "navbarActive" : "navbar"}>
      <div className="logo">
        <h2>NeetSeat 🎟</h2>
      </div>
      <div className="navLinks">
        {searchFilter && (
          <input
            type="text"
            placeholder="Search for Events"
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
