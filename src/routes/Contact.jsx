import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";

function Contact() {
  return (
    <div className="contact">
      <Navbar />
      <div className="contactHeaders">
        <h1>Contact Us</h1>
        <h2>Have any questions? We'd love to hear from you.</h2>
      </div>
      <div className="contactContainer">
        <div
          className="press contactCard"
          style={{ boxShadow: "0px -10px 5px #0BC5EA" }}
        >
          <h2>Press</h2>
          <p>
            Are you interested in our latest news or working on an event and
            need to get in touch?
          </p>
          <button   style={{
              border: "2px solid #0BC5EA",
              color: "#0BC5EA",
              borderRadius: "45px",
              backgroundColor: "white",
            }}>Visit Press Page</button>
        </div>
        <div
          className="help contactCard"
          style={{ boxShadow: "0px -10px 5px #3cdd78", height:"400px" }}
        >
          <h2>Help & Support</h2>
          <p>
            Our support team is spread across the globe to give you answers
            fast.
          </p>
          <button   style={{
              border: "2px solid #3cdd78",
              color: "white",
              borderRadius: "45px",
              backgroundColor: "#3cdd78",
            }}>Visit Support Page</button>
          <h5 style={{color:"#3cdd78"}}>SUBMIT A REQUEST</h5>
        </div>
        <div
          className="sales contactCard"
          style={{ boxShadow: "0px -10px 5px #3182ce" }}
        >
          <h2>Sales</h2>
          <p>
            Get in touch with our sales team to see how we can work together.
          </p>
          <button
            style={{
              border: "2px solid #3182ce",
              color: "#3182ce",
              borderRadius: "45px",
              backgroundColor: "white",
            }}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
