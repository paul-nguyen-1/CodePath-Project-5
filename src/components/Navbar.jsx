import React from "react";
import { useEffect } from "react";
import "../App.css";
import { Input } from "semantic-ui-react";

function Navbar({
  handleSearchClick,
  searchFilter,
  navbar,
  setNavbar,
  handleSearchEvent
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
          <Input
            type="text"
            placeholder="Search for Events"
            onChange={handleSearchEvent}
          />
        )}
        <button onClick={handleSearchClick}>🔍 Search</button>
        <button>ℹ️ About</button>
        <button>🏠 Contact</button>
      </div>
    </div>
  );
}

export default Navbar;
