import React, { useEffect, useState } from "react";

function Events({ event, date, title, location, venue, price, url, id }) {
  const [performance, setPerformance] = useState(null);

  //URL Variables
  const BASE_URL = `https://api.seatgeek.com/2/events?id=${id}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;

  //   Call and access API for events
  useEffect(() => {
    const searchEvents = async () => {
      const response = await fetch(`${BASE_URL}${API_KEY}`);
      const json = await response.json();
      // console.log(json)
      setPerformance(json.events);
    };
    searchEvents().catch(console.error);
  }, [id]);

  return (
    <div>
      {performance ? (
        <div className="eventRow eventItems" key={id}>
          <div className="eventColumn">{event}</div>
          <div className="eventColumn">{date}</div>
          <div className="eventColumn">{title}</div>
          <div className="eventColumn">{location}</div>
          <div className="eventColumn">{venue}</div>
          <div className="eventColumn">
            {price == null ? "Sold Out / Unavailable" : `$${price}`}
          </div>
          <div className="eventColumn">
            <a href={url}>Tickets</a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Events;
