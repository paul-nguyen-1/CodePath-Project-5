import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";

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
    console.log(params);
    searchEvents().catch(console.error);
  }, [params.id, params.postal_code]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Recommendations {params.postal_code}</h1>
      {eventInfo &&
        eventInfo.map((event, index) => (
          <div key={index}>
            <EventCard
              key={index}
              title={event.event.title}
              venue={event.event.venue.name}
              src={event.event.performers[0].image}
              alt={event.event.title}
              description={event.event.description}
              location={event.event.venue.address}
              exact_address = {event.event.venue.extended_address}
              listing_count={event.event.stats.listing_count}
              lowest_price={event.event.stats.lowest_sg_base_price}
              average_price={event.event.stats.median_price}
              highest_price={event.event.stats.highest_price}
              ticket_url={event.event.url}
              index={index}
            />
          </div>
        ))}
    </div>
  );
}

export default EventDetails;
