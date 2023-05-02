import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../App.css";
import { useParams } from "react-router-dom";

function SingleChart({ id, postal_code, index }) {
  let params = useParams();
  const EVENT_URL = `https://api.seatgeek.com/2/events?id=${params.id}&postal_code=${params.postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      const data = await fetch(`${EVENT_URL}${API_CLIENT}${API_KEY}`);
      const json = await data.json();
      // console.log(json.events[0]);
      setEventData(json.events[0]);
    };
    getEventData().catch(console.error);
  }, [params.id, params.postal_code]);

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
      value: eventData && eventData.stats.average_price,
    },
    {
      name: "Median Price",
      value: eventData && eventData.stats.median_price,
    },
    {
      name: "Lowest Price",
      value: eventData && eventData.stats.lowest_sg_base_price,
    },
    {
      name: "Good Deal",
      value:
        eventData && eventData.stats.lowest_price_good_deals
          ? eventData && eventData.stats.lowest_price_good_deals
          : eventData && eventData.stats.lowest_sg_base_price,
    },
    {
      name: "Listing Count",
      value: eventData && eventData.stats.listing_count,
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
          <Tooltip label="name" labelStyle={{ color: "#82ca9d" }} />
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

export default SingleChart;
