import React from "react";
import "./Pricing.css";

function Pricing({
  lowestTicket,
  highestPrice,
  handleTicketPrice,
  setPricing,
  handleClearPricing,
}) {
  const handleExitPricing = () => {
    setPricing(false);
  };

  return (
    <div>
      <div className="pricing">
        <div className="categoryHeader">
          <h3>Price Filter</h3>
          <p onClick={handleExitPricing} style={{ cursor: "pointer" }}>
            x
          </p>
        </div>
        <div className="selectCategory">
          <input
            type="number"
            value={lowestTicket}
            min={0}
            max={highestPrice}
            step={5}
            onChange={handleTicketPrice}
            placeholder="Ticket Price"
          />
        </div>
        <div className="split">
          <p className="categoryClear" onClick={handleClearPricing}>
            Clear
          </p>
          <p onClick={handleExitPricing}>Done</p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
