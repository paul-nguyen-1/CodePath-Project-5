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
  tickets,
  first_performer,
  second_performer,
  third_performer,
  fourth_performer,
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

  // console.log("first_performer:", first_performer)
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
                  height: "75px",
                  width: "75px",
                  border: "0.1px solid #D3D3D3",
                }}
              />
              <div className="eventContainer">
                <div className="eventSub">
                  <div>
                    {title} @ {venue}
                  </div>
                  <div
                    className="eventAttribute"
                    style={{ color: "#01421c", backgroundColor: "#b9f5d0" }}
                  >
                    ${price} each
                  </div>
                </div>
                <div className="eventSecondMain">
                  <div className="subAttributes">
                    <div
                      className="eventAttribute"
                      style={{ color: "#234E52", backgroundColor: "#B2F5EA" }}
                    >
                      {event}
                    </div>
                    <div
                      className="eventAttribute"
                      style={{ color: "#1A202C", backgroundColor: "#EDF2F7" }}
                    >
                      {tickets} tickets left
                    </div>

                    {first_performer && (
                      <div
                        className="eventAttribute performer"
                        style={{ color: "#1A202C", backgroundColor: "#EDF2F7" }}
                      >
                        {first_performer}
                      </div>
                    )}
                    {second_performer && (
                      <div
                        className="eventAttribute performer"
                        style={{ color: "#1A202C", backgroundColor: "#EDF2F7" }}
                      >
                        {second_performer}
                      </div>
                    )}
                    {third_performer && (
                      <div
                        className="eventAttribute performer"
                        style={{ color: "#1A202C", backgroundColor: "#EDF2F7" }}
                      >
                        {third_performer}
                      </div>
                    )}
                    {fourth_performer && (
                      <div
                        className="eventAttribute performer"
                        style={{ color: "#1A202C", backgroundColor: "#EDF2F7" }}
                      >
                        {fourth_performer}
                      </div>
                    )}
                  </div>

                  <div className="eventSecondSub">
                    <div
                      className="eventAttribute"
                      style={{ color: "#44337A", backgroundColor: "#E9D8FD" }}
                    >
                      {location}
                    </div>
                    <div
                      className="eventAttribute"
                      style={{ color: "#744210", backgroundColor: "#FEFCBF" }}
                    >
                      {date}
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default Events;
