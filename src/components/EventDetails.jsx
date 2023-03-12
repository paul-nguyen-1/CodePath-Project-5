import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
  //URL Variables
  let params = useParams();
  const RECOMMENDATION_URL = `https://api.seatgeek.com/2/recommendations?performers.id=${params.id}&postal_code=${params.postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;

  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    const searchEvents = async () => {
      const recommendations = await fetch(
        `${RECOMMENDATION_URL}${API_CLIENT}${API_KEY}`
      );
      const json = await recommendations.json();
      console.log(json);
      setEventInfo(json.recommendations);
    };
    searchEvents().catch(console.error);
  }, [params.id]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Recommendations {params.postal_code}</h1>
      {eventInfo &&
        eventInfo.map((event, index) => (
          <div key={index}>
            <h1>{event.event.title}</h1>
            <h2>Venue: {event.event.venue.name}</h2>
            <img
              className="eventImage"
              src={event.event.performers[0].image}
              alt={event.event.title}
            />
            <p>
              Description:{" "}
              {event.event.description === ""
                ? "No Description Available."
                : event.event.description}
            </p>
            <p>
              Exact Location: {event.event.venue.address}{" "}
              {event.event.venue.extended_address}{" "}
            </p>
            <p>Listing Count: {event.event.stats.listing_count} tickets</p>
            <p>Lowest Price: ${event.event.stats.lowest_sg_base_price}</p>
            <p>Average Price: ${event.event.stats.median_price}</p>
            <p>Highest Price: ${event.event.stats.highest_price}</p>
            <button>
              <a href={event.event.url}>Tickets</a>
            </button>
          </div>
        ))}
    </div>
  );
}

export default EventDetails;
