import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";

const Layout = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <div className="App"></div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
