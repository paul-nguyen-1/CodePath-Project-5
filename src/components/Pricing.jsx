import React from "react";
import "./Categories.css";

function Pricing({
  lowestTicket,
  highestPrice,
  handleTicketPrice,
  setPricing,
  handleClearPricing,
  setOverlay,
}) {
  const handleExitPricing = () => {
    setPricing(false);
    setOverlay(false);
  };

  return (
    <div className="categories">
      <div className="categoryHeader">
        <h3>Price</h3>
        <p onClick={handleExitPricing} className="closeCategory">
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
        <p onClick={handleExitPricing} className="categoryDone">Done</p>
      </div>
    </div>
  );
}

export default Pricing;
