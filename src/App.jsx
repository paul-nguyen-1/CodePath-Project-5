import { useState, useEffect } from "react";
import "./App.css";
import Events from "./components/Events";
import Navbar from "./components/Navbar";
import { Input } from "semantic-ui-react";

function App() {
  const [searchFilter, setSearchFilter] = useState(false);
  const [list, setList] = useState(null);
  const [meta, setMeta] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [city, setCity] = useState("Dallas");
  const [eventDate, setEventDate] = useState(true);
  const [score, setScore] = useState(true);
  const [lowestTicket, setLowestTicket] = useState(1);

  //Filter
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //URL Variables
  const BASE_URL = "https://api.seatgeek.com/2/events?venue.city=";
  const AMOUNT_PER_PAGE = `&per_page=700`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const ASSERT_TICKET_PRICING = `&lowest_price.gt=${lowestTicket}`;
  const eventDateOrder = eventDate ? "asc" : "desc";
  const scoreOrder = score ? "asc" : "desc";
  const EVENT_DATE = `&sort=datetime_utc.${eventDateOrder}`;
  const SCORE_ORDER = `&sort=score.${scoreOrder}`;

  //Enable search filter on nav
  const handleSearchClick = () => {
    setSearchFilter(!searchFilter);
    setNavbar(false);
  };

  //Call and access API for sorting events on change
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(
        `${BASE_URL}${city}&${API_CLIENT}${API_KEY}${AMOUNT_PER_PAGE}${ASSERT_TICKET_PRICING}${EVENT_DATE}`
      );
      const json = await response.json();
      // console.log(json.events)
      setMeta(json.meta);
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, [eventDate, lowestTicket, city]);

  // Call and access API for sorting popularity on change
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(
        `${BASE_URL}${city}&${API_CLIENT}${API_KEY}${AMOUNT_PER_PAGE}${ASSERT_TICKET_PRICING}${SCORE_ORDER}`
      );
      const json = await response.json();
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, [score, lowestTicket, city]);

  //Get Average Price of Events
  let total_price = 0;
  let num_events = 0;
  //List not iterable so grab event from list first
  if (list) {
    for (let event of list) {
      if (
        event.stats.lowest_sg_base_price != null &&
        event.stats.lowest_sg_base_price
      ) {
        total_price += event.stats.lowest_sg_base_price;
        num_events++;
      }
    }
  }
  const average_price =
    num_events > 0 ? (total_price / num_events).toFixed(2) : 0;

  //Return lowest price for all events in city
  let lowestPrice = Infinity;
  if (list) {
    for (let event of list) {
      //Make sure all events list their price and return the min value
      if (
        event.stats &&
        event.stats.lowest_sg_base_price != null &&
        event.stats.lowest_sg_base_price < lowestPrice
      ) {
        lowestPrice = event.stats.lowest_sg_base_price;
      }
    }
  }

  //Return highest price for all events in city
  let highestPrice = -Infinity;
  if (list) {
    for (let event of list) {
      if (
        event.stats &&
        event.stats.lowest_sg_base_price != null &&
        event.stats.lowest_sg_base_price > highestPrice
      ) {
        highestPrice = event.stats.lowest_sg_base_price;
      }
    }
  }

  //Filter search for events
  const searchTitle = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      // console.log(list);
      const filteredData = Object.keys(list).filter((event) =>
        Object.values(list[event].title)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list));
    }
  };

  //Changes date to either the closest date or furthest
  const handleEventDate = () => {
    setEventDate(!eventDate);
  };

  //Change score from most popular to least popular
  const handleScore = () => {
    setScore(!score);
  };

  const handleTicketPrice = (e) => {
    const value = e.target.value;
    setTimeout(() => {
      setLowestTicket(value);
    }, 300);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <Navbar
        handleSearchClick={handleSearchClick}
        searchFilter={searchFilter}
        navbar={navbar}
        setNavbar={setNavbar}
        searchTitle={searchTitle}
      />

      <div className="statsContainer">
        <div className="stat">
          <h2>Live Events:</h2>
          <h3>{meta && meta.total ? meta.total : "Loading..."}</h3>
        </div>
        <div className="stat">
          <h2>Average Price:</h2>
          <h3>{average_price ? `$${average_price}` : "Loading..."}</h3>
        </div>
        <div className="stat">
          <h2>Price Range:</h2>
          <h3>
            {lowestPrice != Infinity ? `$${lowestPrice} - $${highestPrice}` : "Loading..."}
          </h3>
        </div>
      </div>

      <div className="filterContainer">
        <button onClick={handleEventDate}>
          {eventDate ? "Most Recent" : "Plan in Advance!"}
        </button>
        <button onClick={handleScore} style={{marginRight:"25px"}}>
          {score ? "Least Popular" : "Most Popular"}
        </button>
        <Input
          type="number"
          value={lowestTicket}
          min={0}
          max={highestPrice}
          step={5}
          onChange={handleTicketPrice}
          placeholder="Price Filter"
          className="my-range-input"
        />

        <input
        className="cityInput"
          type="text"
          placeholder="Enter city here"
          onChange={handleCityChange}
        />
      </div>

      <div className="eventContainer">
        <div className="eventRow eventTitles">
          <div className="eventColumn">Event Type</div>
          <div className="eventColumn">Date</div>
          <div className="eventColumn">Performance</div>
          <div className="eventColumn">Location</div>
          <div className="eventColumn">Venue</div>
          <div className="eventColumn">Lowest Price</div>
          <div className="eventColumn"></div>
        </div>
        {searchInput.length > 0
          ? filteredResults.map((event) =>
              list[event] ? (
                <Events
                  key={event}
                  event={list[event].type.toUpperCase().replace(/_/g, " ")}
                  date={new Date(list[event].datetime_utc).toLocaleDateString()}
                  title={list[event].title}
                  location={list[event].venue.display_location}
                  venue={list[event].venue.name}
                  price={list[event].stats.lowest_sg_base_price}
                  url={list[event].url}
                  id={list[event].id}
                />
              ) : null
            )
          : list &&
            Object.entries(list).map(([event]) =>
              list[event] ? (
                <Events
                  key={event}
                  event={list[event].type.toUpperCase().replace(/_/g, " ")}
                  date={new Date(list[event].datetime_utc).toLocaleDateString()}
                  title={list[event].title}
                  location={list[event].venue.display_location}
                  venue={list[event].venue.name}
                  price={list[event].stats.lowest_sg_base_price}
                  url={list[event].url}
                  id={list[event].id}
                />
              ) : null
            )}
      </div>
    </div>
  );
}

export default App;
