import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar({
  handleSearchClick,
  searchFilter,
  navbar,
  handleSearchEvent,
  setNavbar,
}) {
  //blur effect for navbar when scrolling
  // const changeBackground = () => {
  //   // console.log("Changebackground called");
  //   if (window.scrollY >= 20) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", changeBackground);
  // }, []);

  

  const [activeHamburger, setActiveHamburger] = useState(true);

  useEffect(() => {
    if (!activeHamburger) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [activeHamburger]);

  const handleHamburger = () => {
    setActiveHamburger(!activeHamburger);
  };

  return (
    <div className={navbar ? "navbarActive" : "navbar"}>
      <div className={navbar ? "logoActive" : "logo"}>
        <Link to="/" style={{ color: "white" }}>
          {" "}
          <h2 style={{ color: "black" }} className="navbarTitle">
            NeetSeat
          </h2>
        </Link>
      </div>
      <div className="navHamburger" onClick={handleHamburger}>
        <MenuIcon className={activeHamburger ? "icon" : "icon hidden"} />
        <CloseIcon className={activeHamburger ? "icon hidden" : "icon"} />
      </div>

      {!activeHamburger && (
        <div className="hamburgerLinks">
          {" "}
          {searchFilter && (
            <Input
              type="text"
              placeholder="Search for Events"
              onChange={handleSearchEvent}
            />
          )}
          <button
            onClick={handleSearchClick}
            style={{ backgroundColor: "white", color: "black" }}
          >
            🔍 Search
          </button>
          <Link to="/about">
            <button style={{ backgroundColor: "white", color: "black" }}>
              ℹ️ About
            </button>
          </Link>
          <Link to="/contact">
            <button style={{ backgroundColor: "white", color: "black" }}>
              🏠 Contact
            </button>
          </Link>
        </div>
      )}
      <div className={navbar ? "navLinksActive" : "navLinks"}>
        {searchFilter && (
          <Input
            type="text"
            placeholder="Search for Events"
            onChange={handleSearchEvent}
          />
        )}
        <button
          onClick={handleSearchClick}
          style={{ backgroundColor: "white", color: "black" }}
        >
          🔍 Search
        </button>
        <Link to="/about">
          <button style={{ backgroundColor: "white", color: "black" }}>
            ℹ️ About
          </button>
        </Link>
        <Link to="/contact">
          <button style={{ backgroundColor: "white", color: "black" }}>
            🏠 Contact
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
