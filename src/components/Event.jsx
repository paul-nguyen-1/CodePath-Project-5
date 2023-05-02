import React from "react";
import "./Event.css";

function Event({
  title,
  venue,
  date,
  src,
  alt,
  description,
  location,
  exact_address,
  listing_count,
  lowest_price,
  average_price,
  highest_price,
  ticket_url,
}) {
  function handleClick() {
    window.location.href = `${ticket_url}`;
  }
  return (
    <div className="event">
      <div className="eventsContainer">
        <div className="eventHeader">
          <h1>{title}</h1>
          <h2>@ {venue}</h2>
          <h3>{date}</h3>
        </div>
        <div className="eventMain">
          <img src={src} alt={alt} />
          <div className="eventDescription">
            <p>
              Description:{" "}
              {description === "" ? "No Description Available." : description}
            </p>
            <p>{location}</p>
            <p>
              Exact Location: {location} {exact_address}{" "}
            </p>
            <p>Listing Count: {listing_count} tickets</p>
            <p>Lowest Price: ${lowest_price}</p>
            <p>Average Price: ${average_price}</p>
            <p>Highest Price: ${highest_price}</p>
            <button onClick={handleClick} style={{ color: "#646cff" }}>
              Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
