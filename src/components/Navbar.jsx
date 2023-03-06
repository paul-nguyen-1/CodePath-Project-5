import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

function Navbar({
  handleSearchClick,
  searchFilter,
  navbar,
  setNavbar,
  searchItems,
}) {
  //blur effect for navbar when scrolling
  const changeBackground = () => {
    // console.log("Changebackground called");
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <div className={navbar ? "navbarActive" : "navbar"}>
      <div className={navbar ? "logoActive" : "logo"}>
        <h2>NeetSeat 🎟</h2>
      </div>
      <div className={navbar ? "navLinksActive" : "navLinks"}>
        {searchFilter && (
          <input
            type="text"
            placeholder="Search for Events"
            value={null}
            onChange={(inputString) => searchItems(inputString.target.value)}
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
