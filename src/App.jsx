import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [searchFilter, setSearchFilter] = useState(false);
  const [list, setList] = useState(null);
  const [eventContent, setEventContent] = useState([]);

  //URL Variables
  const BASE_URL = "https://api.seatgeek.com/2/";
  const API_EVENTS = "events";
  const API_KEY = import.meta.env.VITE_API_KEY;

  //Enable search filter on nav
  const handleSearchClick = () => {
    setSearchFilter(!searchFilter);
  };
  //Call and access API for events
  useEffect(() => {
    const fetchAllEvents = async () => {
      const response = await fetch(`${BASE_URL}${API_EVENTS}${API_KEY}`);
      const json = await response.json();
      setList(json.events);
    };
    fetchAllEvents().catch(console.error);
  }, []);

  console.log(list);

  return (
    <div className="App">
      <Navbar
        handleSearchClick={handleSearchClick}
        searchFilter={searchFilter}
      />
      <div className="eventContainer">
  <div className="eventRow eventTitles">
    <div className="eventColumn">Event Type</div>
    <div className="eventColumn">Performance</div>
    <div className="eventColumn">Date</div>
    <div className="eventColumn">Location</div>
    <div className="eventColumn">Tickets</div>
  </div>

  {list &&
    Object.entries(list).map(([event, index]) =>
      list[event] === index ? (
        <div className="eventRow eventItems" key={event}>
          <div className="eventColumn">{list[event].type.toUpperCase().replace(/_/g, " ")}</div>
          <div className="eventColumn">{list[event].title}</div>
          <div className="eventColumn">{new Date(list[event].datetime_utc).toLocaleDateString()}</div>
          <div className="eventColumn">{list[event].venue.display_location}</div>
          <div className="eventColumn"><a href={list[event].url}>Tickets</a></div>
        </div>
      ) : null
    )}
</div>

    </div>
  );
}

export default App;
