import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events({
  event,
  date,
  title,
  location,
  venue,
  price,
  url,
  id,
  postal_code,
}) {
  const [performance, setPerformance] = useState(null);

  //URL Variables
  const BASE_URL = `https://api.seatgeek.com/2/events?id=${id}&postal_code=${postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;

  //   Call and access API for events
  useEffect(() => {
    const searchEvents = async () => {
      const response = await fetch(`${BASE_URL}${API_CLIENT}${API_KEY}`);
      const json = await response.json();
      // console.log(json)
      setPerformance(json.events);
    };
    searchEvents().catch(console.error);
  }, [id, postal_code]);

  function handleClick() {
    window.location.href = `${url}`;
  }

  return (
    <div>
      {performance ? (
        <div key={id}>
          <Link
            to={`/EventInfo/${id}`}
            key={id}
            className="eventRow eventItems"
            style={{ color: "white", display: "flex" }}
          >
            <div className="eventColumn">{event}</div>
            <div className="eventColumn">{date}</div>
            <div className="eventColumn">{title}</div>
            <div className="eventColumn">{location}</div>
            <div className="eventColumn">{venue}</div>
            <div className="eventColumn">
              {price == null ? "Sold Out / Unavailable" : `$${price}`}
            </div>
            <button
              className="eventColumn"
              onClick={handleClick}
              style={{ color: "#646cff", height: "50px" }}
            >
              Tickets
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default Events;
