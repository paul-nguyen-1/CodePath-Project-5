import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

const Layout = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <div className="App">
        <Navbar navbar={navbar} setNavbar={setNavbar} />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
