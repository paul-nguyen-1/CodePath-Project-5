import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import concert from "/concert.jpg";
import music from "/music.jpg";
import loading from "/loading.gif";

function About() {
  //Might want to add lazy loading images using useEffect in the future -- settling for dancing cartoon for now
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="about">
      <Navbar />
      <div className="aboutContainer">
        <div className="aboutMain">
          {isLoading ? (
            <div>
              <img src={loading} style={{ width: "27.5vw", marginLeft:"35px"}} />
            </div>
          ) : (
            <div>
              <div className="concertImages" onLoad={() => setIsLoading(false)}>
                <img src={music} className="festival" />
                <img src={concert} className="concert" />
              </div>
            </div>
          )}
          <div className="aboutDescription">
            <h1>Lorem ipsum</h1>
            <h2 style={{color:"gray"}}>Lorem ipsum dolor sit amet, consectetur adipiscing.</h2>
            <p style={{color:"light-gray"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link to={"/"}>
              <button>Back to Home!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
