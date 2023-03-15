import React, { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
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
      uv: eventData && eventData[index].event.stats.average_price,
      value: "price",
    },
    {
      name: "Median Price",
      uv: eventData && eventData[index].event.stats.median_price,
      value: "price",
    },
    {
      name: "Lowest Price",
      uv:
        eventData &&
        eventData[index].event.stats.lowest_sg_base_price_good_deals,
      value: "price",
    },
    {
      name: "Good Deal",
      uv: eventData && eventData[index].event.stats.lowest_price_good_deals,
      value: "price",
    },
    {
      name: "Highest Price",
      uv: eventData && eventData[index].event.stats.highest_price,
      value: "price",
    },
    {
      name: "Listing Count",
      uv: eventData && eventData[index].event.stats.listing_count,
      value: "listing",
    },
    {
      name: "Visible Listing Count",
      uv: eventData && eventData[index].event.stats.listing_count,
      value: "listing",
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    function (entry, index) {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="content">
      <h1 style={{ textAlign: "center", fontSize:"2em" }}>Recommended Events:</h1>
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ cursor: "pointer" }}
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                key={`cell-${index}`}
                fill={index === activeIndex ? "#82ca9d" : colors[index % 20]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <h3 className="content">{`${activeItem.name} for ${
        eventData && eventData[index].event.title
      }: ${eventData && data[activeIndex].value == "price" ? "$" : ""}${
        activeItem.uv && activeItem.uv.toLocaleString()
      } ${
        eventData && data[activeIndex].value === "listing" ? "tickets" : ""
      }`}</h3>
    </div>
  );
}

export default EventChart;
