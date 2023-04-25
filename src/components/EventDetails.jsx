import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import EventChart from "./EventChart";

function EventDetails() {
  //URL Variables
  let params = useParams();
  const RECOMMENDATION_URL = `https://api.seatgeek.com/2/recommendations?performers.id=${params.id}&postal_code=${params.postal_code}&`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_CLIENT = import.meta.env.VITE_API_CLIENT;

  const [eventInfo, setEventInfo] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);

  const [invalidArrowLeft, setInvalidArrowLeft] = useState(true);
  const [invalidArrowRight, setInvalidArrowRight] = useState(false);

  useEffect(() => {
    const searchEvents = async () => {
      const recommendations = await fetch(
        `${RECOMMENDATION_URL}${API_CLIENT}${API_KEY}`
      );
      const json = await recommendations.json();
      // console.log(json);
      // console.log(json.recommendations)
      setEventInfo(json.recommendations);
    };
    searchEvents().catch(console.error);
  }, [params.id, params.postal_code]);

  const handleLeftArrowKey = () => {
    cardIndex < 2 ? setCardIndex(0) : setCardIndex(cardIndex - 1);
    cardIndex < 3
      ? setInvalidArrowLeft(true)
      : setInvalidArrowRight(false) && setInvalidArrowLeft(false);
  };

  const handleRightArrowKey = () => {
    cardIndex > eventInfo.length - 2
      ? setCardIndex(eventInfo.length - 1)
      : setCardIndex(cardIndex + 1);
    cardIndex > eventInfo.length - 3
      ? setInvalidArrowRight(true)
      : setInvalidArrowLeft(false) && setInvalidArrowRight(false);
  };

  return (
    <div className="eventDetails">
      <EventChart
        id={params.id}
        postal_code={params.postal_code}
        index={cardIndex}
      />
      {eventInfo && (
        <div>
          <EventCard
            title={eventInfo[cardIndex].event.title}
            venue={eventInfo[cardIndex].event.venue.name}
            date={new Date(
              eventInfo[cardIndex].event.datetime_utc
            ).toLocaleDateString()}
            src={eventInfo[cardIndex].event.performers[0].image}
            alt={eventInfo[cardIndex].event.title}
            description={eventInfo[cardIndex].event.description}
            location={eventInfo[cardIndex].event.venue.address}
            exact_address={eventInfo[cardIndex].event.venue.extended_address}
            listing_count={eventInfo[
              cardIndex
            ].event.stats.listing_count.toLocaleString()}
            lowest_price={eventInfo[
              cardIndex
            ].event.stats.lowest_sg_base_price.toLocaleString()}
            average_price={eventInfo[
              cardIndex
            ].event.stats.average_price.toLocaleString()}
            highest_price={eventInfo[
              cardIndex
            ].event.stats.highest_price.toLocaleString()}
            ticket_url={eventInfo[cardIndex].event.url}
            index={cardIndex}
          />
        </div>
      )}
      <div className="arrow">
        <div
          onClick={handleLeftArrowKey}
          className={invalidArrowLeft ? "invalidLeftArrow" : "leftArrowKey"}
        >
          ←
        </div>
        <div
          onClick={handleRightArrowKey}
          className={invalidArrowRight ? "invalidRightArrow" : "rightArrowKey"}
        >
          →
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
