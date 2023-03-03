import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [searchFilter, setSearchFilter] = useState(false);
  const [list, setList] = useState(null);
  const [meta, setMeta] = useState(null);
  const [eventContent, setEventContent] = useState([]);

  //URL Variables
  const BASE_URL = "https://api.seatgeek.com/2/events";
  const AMOUNT_PER_PAGE = "&per_page=15";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const CITY_ZIP = "&postal_code=75201";
  //Enable search filter on nav
  const handleSearchClick = () => {
    setSearchFilter(!searchFilter);
  };
  //Call and access API for events
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(
        `${BASE_URL}${API_KEY}${AMOUNT_PER_PAGE}${CITY_ZIP}`
      );
      const json = await response.json();
      console.log(json);
      setMeta(json.meta);
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, []);

  //Get Average Price of Events
  let total_price = 0;
  let num_events = 0;
  //List not iterable so grab event from list first
  if (list) {
    for (let event of list) {
      if (event.stats.average_price) {
        total_price += event.stats.average_price;
        num_events++;
      }
    }
  }
  const average_price =
    num_events > 0 ? (total_price / num_events).toFixed(2) : 0;

  //Return lowest price in events
  let lowestPrice = Infinity;
  if (list) {
    for (let event of list) {
      //Make sure all events list their price and return the min value
      if (
        event.stats &&
        event.stats.lowest_price != null &&
        event.stats.lowest_price < lowestPrice
      ) {
        lowestPrice = event.stats.lowest_price;
      }
    }
  }
  //Return highest price in events
  let highestPrice = -Infinity;
  if (list) {
    for (let event of list) {
      if (event.stats.highest_price > highestPrice) {
        highestPrice = event.stats.highest_price;
      }
    }
  }

  return (
    <div className="App">
      <Navbar
        handleSearchClick={handleSearchClick}
        searchFilter={searchFilter}
      />

      <div className="statsContainer">
        <div className="stat">
          <h2>Dallas Events:</h2>
          <h3>{meta && meta.total}</h3>
        </div>
        <div className="stat">
          <h2>Average Price:</h2>
          <h3>${average_price}</h3>
        </div>
        <div className="stat">
          <h2>Price Range:</h2>
          <h3>
            ${lowestPrice} - ${highestPrice}
          </h3>
        </div>
      </div>
      <div className="eventContainer">
        <div className="eventRow eventTitles">
          <div className="eventColumn">Event Type</div>
          <div className="eventColumn">Date</div>
          <div className="eventColumn">Performance</div>
          <div className="eventColumn">Location</div>
          <div className="eventColumn">Venue</div>
          <div className="eventColumn">Average Price</div>
          <div className="eventColumn">Tickets</div>
        </div>

        {list &&
          Object.entries(list).map(([event]) =>
            list[event].stats.average_price ? (
              <div className="eventRow eventItems" key={event}>
                <div className="eventColumn">
                  {list[event].type.toUpperCase().replace(/_/g, " ")}
                </div>
                <div className="eventColumn">
                  {new Date(list[event].datetime_utc).toLocaleDateString()}
                </div>
                <div className="eventColumn">{list[event].title}</div>

                <div className="eventColumn">
                  {list[event].venue.display_location}
                </div>
                <div className="eventColumn">{list[event].venue.name}</div>
                <div className="eventColumn">
                  ${list[event].stats.average_price}
                </div>
                <div className="eventColumn">
                  <a href={list[event].url}>Tickets</a>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

export default App;
