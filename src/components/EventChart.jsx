import React, { useEffect, useState } from "react";

function EventChart({ id, postal_code, index }) {
  const RECOMMENDATION_URL = `https://api.seatgeek.com/2/recommendations?performers.id=${id}&postal_code=${postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      const data = await fetch(`${RECOMMENDATION_URL}${API_CLIENT}${API_KEY}`);
      const json = await data.json();
      console.log(json.recommendations);
      setEventData(json.recommendations);
    };
    getEventData().catch(console.error);
  }, [id, postal_code]);

  // return <div>{eventData && eventData[index].event.title}</div>;
}

export default EventChart;
