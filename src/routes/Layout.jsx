import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"

const Layout = () => {
  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
