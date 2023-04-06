import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";

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
  image,
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
            to={`/EventInfo/${id}/${postal_code}`}
            key={id}
            className="events"
          >
            <div className="eventMain">
              <img
                src={image}
                style={{
                  height: "50px",
                  width: "50px",
                  border: "0.1px solid #D3D3D3",
                }}
              />
              <div className="eventContainer">
                <div className="eventSub">
                  <div>
                    {title} @ {venue}
                  </div>
                  <div>${price} USD</div>
                </div>
                <div className="eventSecondMain">
                  <div>{event}</div>
                  <div>
                    {location} {date}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="eventColumn">{event}</div>
            <div className="eventColumn">{date}</div>
            <div className="eventColumn">{title}</div>
            <div className="eventColumn">{location}</div>
            <div className="eventColumn">{venue}</div>
            <div className="eventColumn">
              {price == null ? "Sold Out / Unavailable" : `$${price}`}
            </div> */}
            <button
              className="eventColumn"
              onClick={handleClick}
              style={{
                color: "#646cff",
                height: "40px",
                width: "150px",
                alignSelf: "center",
              }}
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
