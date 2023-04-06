import { useState, useEffect } from "react";
import "./App.css";
import Events from "./components/Events";
import Navbar from "./components/Navbar";
import { Input } from "semantic-ui-react";
import ReactPaginate from "react-paginate";

function App() {
  const [searchFilter, setSearchFilter] = useState(false);
  const [list, setList] = useState(null);
  const [meta, setMeta] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [city, setCity] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [score, setScore] = useState(null);
  const [lowestTicket, setLowestTicket] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [scoreEventChoice, setScoreEventChoice] = useState(null);

  //Filter
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //URL Variables
  const BASE_URL = `https://api.seatgeek.com/2/events?q=${search}&venue.city=`;
  const AMOUNT_PER_PAGE = `&per_page=${postPerPage}&page=${currentPage}`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const ASSERT_TICKET_PRICING = `&lowest_price.gt=${lowestTicket}`;
  const eventDateOrder = eventDate ? "asc" : "desc";
  const scoreOrder = score ? "asc" : "desc";
  const EVENT_DATE = `&sort=datetime_utc.${eventDateOrder}`;
  const SCORE_ORDER = `&sort=score.${scoreOrder}`;
  const SCORE_EVENT = scoreEventChoice ? EVENT_DATE : SCORE_ORDER;

  //Enable search filter on nav
  const handleSearchClick = () => {
    setSearchFilter(!searchFilter);
    setNavbar(false);
  };

  //Call and access API for sorting events on change
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(
        `${BASE_URL}${city}&${API_CLIENT}${API_KEY}${AMOUNT_PER_PAGE}${ASSERT_TICKET_PRICING}${SCORE_EVENT}`
      );
      const json = await response.json();
      console.log(json.events);
      setMeta(json.meta);
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, [SCORE_EVENT, lowestTicket, city, search, currentPage, postPerPage]);

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
  const average_price = num_events > 0 ? total_price / num_events : 0;

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

  //Changes date to either the closest date or furthest
  const handleEventDate = () => {
    setEventDate(!eventDate);
    setScoreEventChoice(true);
  };

  //Change score from most popular to least popular
  const handleScore = () => {
    setScore(!score);
    setScoreEventChoice(false);
  };

  //Ticket pricing
  const handleTicketPrice = (e) => {
    setLowestTicket(e.target.value);
  };

  //City change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  //Event Search
  const handleSearchEvent = (e) => {
    setSearch(e.target.value);
  };

  //Change Pages issue resolved // come back if needed -- https://github.com/AdeleD/react-paginate/issues/167
  const changePage = ({ selected }) => {
    setCurrentPage(Math.ceil(selected + 1));
  };

  const totalPages = meta && Math.ceil(meta.total / 10);

  return (
    <div className="App">
      {
        <Navbar
          handleSearchClick={handleSearchClick}
          searchFilter={searchFilter}
          navbar={navbar}
          setNavbar={setNavbar}
          handleSearchEvent={handleSearchEvent}
        />
      }
      {/* <div className="statsContainer">
        <div className="stat">
          <h2>Live Events:</h2>
          <h3>
            {meta && meta.total ? meta.total.toLocaleString() : "Loading..."}
          </h3>
        </div>
        <div className="stat">
          <h2>Average Price:</h2>
          <h3>
            {average_price
              ? `$${average_price.toLocaleString()}`
              : "Loading..."}
          </h3>
        </div>
        <div className="stat">
          <h2>Price Range:</h2>
          <h3>
            {lowestPrice != Infinity
              ? `$${lowestPrice.toLocaleString()} - $${highestPrice.toLocaleString()}`
              : "Loading..."}
          </h3>
        </div>
      </div> */}

      <div className="filterContainer">
        <button onClick={handleEventDate}>
          {eventDate ? "Most Recent" : "Plan in Advance!"}
        </button>
        <button onClick={handleScore} style={{ marginRight: "25px" }}>
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
        {/* <div className="eventRow eventTitles">
          <div className="eventColumn">Event Type</div>
          <div className="eventColumn">Date</div>
          <div className="eventColumn">Performance</div>
          <div className="eventColumn">Location</div>
          <div className="eventColumn">Venue</div>
          <div className="eventColumn">Lowest Price</div>
          <div className="eventCol
          umn"></div>
        </div> */}
        <div className="stat">
          <h3>
            {meta && meta.total ? meta.total.toLocaleString() + " events " : "Loading..."}
          </h3>
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
                  price={list[
                    event
                  ].stats.lowest_sg_base_price.toLocaleString()}
                  url={list[event].url}
                  id={list[event].id}
                  postal_code={list[event].venue.postal_code}
                  image={list[event].performers[0].image}
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
                  price={list[
                    event
                  ].stats.lowest_sg_base_price.toLocaleString()}
                  url={list[event].url}
                  id={list[event].id}
                  postal_code={list[event].venue.postal_code}
                  image={list[event].performers[0].image}
                />
              ) : null
            )}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nexLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default App;
