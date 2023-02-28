import { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";

function App() {
  const [count, setCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState(false);
  const BASE_URL = "https://api.seatgeek.com/2/";
  const API_EVENTS = "events?";
  const CLIENT_ID = `client_id=${import.meta.env.VIET_CLIENT_ID}&`;
  const API_KEY = `&client_secret=${import.meta.env.VITE_API_KEY}`;
  const query = `${BASE_URL}${API_EVENTS}${CLIENT_ID}${API_KEY}`;

  const handleSearchClick = () => {
    setSearchFilter(!searchFilter);
  };

  return (
    <div className="App">
      <Navbar handleSearchClick={handleSearchClick}  searchFilter={searchFilter}/>
    </div>
  );
}

export default App;
