import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import concert from "/concert.jpg";
import music from "/music.jpg";

function About() {
  return (
    <div className="about">
      <Navbar />
      <div className="aboutContainer">
        <div className="aboutMain">
          <div className="concertImages">
            <img src={music} className="festival" />
            <img src={concert} className="concert" />
          </div>
          <div className="aboutDescription">
            <h1>Lorem ipsum</h1>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing.</h2>
            <p>
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
