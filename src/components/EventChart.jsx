import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../App.css";

function EventChart({ id, postal_code, index }) {
  const RECOMMENDATION_URL = `https://api.seatgeek.com/2/recommendations?performers.id=${id}&postal_code=${postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      const data = await fetch(`${RECOMMENDATION_URL}${API_CLIENT}${API_KEY}`);
      const json = await data.json();
      // console.log(json.recommendations[index]);
      setEventData(json.recommendations);
    };
    getEventData().catch(console.error);
  }, [id, postal_code, index]);

  const colors = [
    "#0088FE",
    "#87CEEB",
    "#FFBB28",
    "#FF8042",
    "red",
    "pink",
    "purple",
  ];

  const data = [
    {
      name: "Average Price",
      value: eventData && eventData[index].event.stats.average_price,
    },
    {
      name: "Median Price",
      value: eventData && eventData[index].event.stats.median_price,
    },
    {
      name: "Lowest Price",
      value:
        eventData &&
        eventData[index].event.stats.lowest_sg_base_price_good_deals,
    },
    {
      name: "Good Deal",
      value: eventData && eventData[index].event.stats.lowest_price_good_deals,
    },
    {
      name: "Listing Count",
      value: eventData && eventData[index].event.stats.listing_count,
    },
  ];

  return (
    <div className="content">
      <ResponsiveContainer
        width="100%"
        height={200}
        style={{ cursor: "pointer" }}
      >
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip label="name" labelStyle={{color:"#82ca9d"}} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EventChart;
