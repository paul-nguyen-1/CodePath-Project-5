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
  const [lowestTicket, setLowestTicket] = useState(0);

  //Filter
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //URL Variables
  const BASE_URL = "https://api.seatgeek.com/2/events?venue.city=";
  const AMOUNT_PER_PAGE = `&per_page=700`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const ASSERT_TICKETS = "&listing_count.gt=0";
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
        `${BASE_URL}${city}&${API_KEY}${AMOUNT_PER_PAGE}${ASSERT_TICKET_PRICING}${EVENT_DATE}`
      );
      const json = await response.json();
      setMeta(json.meta);
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, [eventDate, lowestTicket]);

  // Call and access API for sorting popularity on change
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(
        `${BASE_URL}${city}&${API_KEY}${AMOUNT_PER_PAGE}${ASSERT_TICKET_PRICING}${SCORE_ORDER}`
      );
      const json = await response.json();
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, [score, lowestTicket]);

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
      if (event.stats.highest_price > highestPrice) {
        highestPrice = event.stats.highest_price;
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
    }, 200);
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
          <h2>{city} Events:</h2>
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

      <div className="filterContainer">
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>${lowestPrice}</span>
            <input
              type="range"
              value={lowestTicket}
              min={lowestPrice}
              max={1000}
              step={0.0001}
              onChange={handleTicketPrice}
            />
            <span>${1000}</span>
          </div>
        </div>
        <button onClick={handleEventDate}>
          {eventDate ? "Most Recent" : "Plan in Advance!"}
        </button>
        <button onClick={handleScore}>
          {score ? "Least Popular" : "Most Popular"}
        </button>
        <Input
          type="text"
          placeholder="Enter city here"
          onChange={(inputString) => searchTitle(inputString.target.value)}
        />
        <button>Search City!</button>
      </div>

      <div className="eventContainer">
        <div className="eventRow eventTitles">
          <div className="eventColumn">Event Type</div>
          <div className="eventColumn">Date</div>
          <div className="eventColumn">Performance</div>
          <div className="eventColumn">Location</div>
          <div className="eventColumn">Venue</div>
          <div className="eventColumn">Lowest Price</div>
          <div className="eventColumn">Tickets</div>
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
