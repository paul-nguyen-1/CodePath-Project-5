import React from "react";
import "./EventCard.css";

function EventCard({
  index,
  title,
  venue,
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
  return (
    <div className="card">
      <div className="cardContainer">
        <div key={index}>
          <h2 style={{ textDecoration: "underline" }}>{title}</h2>
          <h3>Venue: {venue}</h3>
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
              <button>
                <a href={ticket_url}>Tickets</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
