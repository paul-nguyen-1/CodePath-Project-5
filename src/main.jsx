import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import Error from "./routes/Error";
import EventInfo from "./routes/EventInfo";
import About from "./routes/About";
import Contact from "./routes/Contact";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route
            index={false}
            path="/EventInfo/:id/:postal_code"
            element={<EventInfo />}
          />
          <Route index={false} path="/About" element={<About />} />
          <Route index={false} path="/Contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
