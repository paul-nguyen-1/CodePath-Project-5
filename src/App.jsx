import { useState, useEffect } from "react";
import "./App.css";
import Events from "./components/Events";
import Navbar from "./components/Navbar";
import { Input } from "semantic-ui-react";
import ReactPaginate from "react-paginate";
import Categories from "./components/Categories";
import Cities from "./components/Cities";
import Pricing from "./components/Pricing";

function App() {
  const [searchFilter, setSearchFilter] = useState(false);
  const [list, setList] = useState(null);
  const [meta, setMeta] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [city, setCity] = useState("");
  const [sorting, setSorting] = useState(true);
  const [lowestTicket, setLowestTicket] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [scoreEventChoice, setScoreEventChoice] = useState(true);

  //State for filter components
  const [categories, setCategories] = useState(false);
  const [cities, setCities] = useState(false);
  const [pricing, setPricing] = useState(false);

  //Filter
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //URL Variables
  const BASE_URL = `https://api.seatgeek.com/2/events?q=${search}&venue.city=`;
  const AMOUNT_PER_PAGE = `&per_page=${postPerPage}&page=${currentPage}`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;
  const ASSERT_TICKET_PRICING = `&lowest_price.gt=${lowestTicket}`;
  const sortOrder = sorting ? "asc" : "desc";
  const EVENT_DATE = `&sort=datetime_utc.${sortOrder}`;
  const SCORE_ORDER = `&sort=score.${sortOrder}`;
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

  //Sort by date
  const handleEventDate = () => {
    setScoreEventChoice(true);
    setSorting(true);
  };

  //Sort by popularity
  const handleScore = () => {
    setScoreEventChoice(false);
    setSorting(false);
  };

  //Sort asc/desc
  const handleSorting = () => {
    setSorting(!sorting);
  };

  //Ticket pricing
  const handleTicketPrice = (e) => {
    setLowestTicket(e.target.value);
  };

  //City change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  //Clear input for city
  const handleClearCity = () => {
    setCity("");
    setCities(false);
  };

  //Event Search
  const handleSearchEvent = (e) => {
    setSearch(e.target.value);
  };

  //Clear input for taxonomy
  const handleClearSearch = () => {
    setSearch("");
    setCategories(false);
  };

  const handleClearPricing = () => {
    setLowestTicket(0);
    setPricing(false);
  };

  //Change Pages issue resolved // come back if needed -- https://github.com/AdeleD/react-paginate/issues/167
  const changePage = ({ selected }) => {
    setCurrentPage(Math.ceil(selected + 1));
  };

  const totalPages = meta && Math.ceil(meta.total / 10);

  //Selecting date and popularity asc/desc
  const handleOptionChange = (value) => {
    if (value === "date") {
      handleEventDate();
    } else if (value === "score") {
      handleScore();
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === "10") {
      setPostPerPage(10);
    }
    if (pageNumber === "25") {
      setPostPerPage(25);
    }
    if (pageNumber === "50") {
      setPostPerPage(50);
    }
    if (pageNumber === "75") {
      setPostPerPage(75);
    }
  };

  const handleCategories = () => {
    setCategories(true);
    setCities(false);
    setPricing(false);
  };

  const handleCities = () => {
    setCities(true);
    setCategories(false);
    setPricing(false);
  };

  const handlePricing = () => {
    setPricing(true);
    setCities(false);
    setCategories(false);
  };

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

      <div className="filterContainer">
        <button onClick={handleCategories}>Events</button>
        {categories && (
          <Categories
            setCategories={setCategories}
            handleSearchEvent={handleSearchEvent}
            handleClearSearch={handleClearSearch}
          />
        )}
        <button onClick={handleCities}>City</button>
        {cities && (
          <Cities
            setCities={setCities}
            handleCityChange={handleCityChange}
            handleClearCity={handleClearCity}
          />
        )}
        <button onClick={handlePricing}>Pricing</button>
        {pricing && (
          <Pricing
            setPricing={setPricing}
            lowestTicket={lowestTicket}
            max={highestPrice}
            handleTicketPrice={handleTicketPrice}
            handleClearPricing={handleClearPricing}
          />
        )}
      </div>

      <div className="eventContainer">
        <div className="stat">
          <div>
            <h3 style={{ fontSize: "24px" }}>
              {meta && meta.total
                ? meta.total.toLocaleString() + " events "
                : "Loading..."}
            </h3>
          </div>
          <div className="sort">
            <p style={{ cursor: "pointer" }} onClick={handleSorting}>
              ↑↓
            </p>
            <select
              style={{
                backgroundColor: "white",
                width: "95px",
                height: "25px",
                color: "black",
                marginLeft: "10px",
                border: "1px solid #D3D3D3",
              }}
              onChange={(e) => handleOptionChange(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="score">Popularity</option>
            </select>
            <select
              style={{
                backgroundColor: "white",
                width: "50px",
                height: "25px",
                color: "black",
                marginLeft: "10px",
                border: "1px solid #D3D3D3",
              }}
              onChange={(e) => handlePageChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </select>
          </div>
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
                  first_performer={list[event].performers[1].name}
                  second_performer={list[event].performers[2].name}
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
                  tickets={list[event].stats.visible_listing_count}
                  performers={list[event].performers.length}
                  first_performer={
                    list[event].performers.length > 2 &&
                    list[event].performers[1].name
                  }
                  second_performer={
                    list[event].performers.length > 3 &&
                    list[event].performers[2].name
                  }
                  third_performer={
                    list[event].performers.length > 4 &&
                    list[event].performers[3].name
                  }
                  fourth_performer={
                    list[event].performers.length > 5 &&
                    list[event].performers[4].name
                  }
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
