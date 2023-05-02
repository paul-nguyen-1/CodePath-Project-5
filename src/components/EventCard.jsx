import React from "react";
import "./EventCard.css";

function EventCard({
  index,
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
    <div className="card">
      <div className="cardContainer" style={{ color: "black" }}>
        <h1 style={{fontSize:"32px"}}>Recommended Events</h1>
        <div key={index}>
          <h2>{title}</h2>
          <h3>@ {venue}</h3>
          <h4>Date: {date}</h4>
          <div className="miscContainer">
            <div>
              <img className="eventImage" src={src} alt={alt} />
            </div>
            <div>
              <p>
                Description:{" "}
                {description === "" ? "No Description Available." : description}
              </p>
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
    </div>
  );
}

export default EventCard;
