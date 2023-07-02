import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Slider from "../Slider";
import "./searchResultsPage.css";

const SearchResultsPage = () => {
  //Initialize things
  const history = useHistory();

  //useSelectors
  const trails = useSelector((state) => state.trails.allTrails);

  //Build trail cards to display
  const cards = Object.values(trails)?.map((trail) => {
    return (
      <div
        key={trail.id}
        className="trail-card"
        onClick={(e) => {
          history.push(`/trails/${trail.id}`);
        }}
      >
        <div className="trail-card-img-container">
          <img
            className="landing-trail-card-img"
            alt="Trail Image"
            src={trail?.coverPhoto}
          ></img>
        </div>
        <div className="trail-name">{trail.trailName}</div>
        <div className="park-name">{trail.park}</div>
        <div>
          Length: {trail.length}mi · Est. {Math.floor(trail.length * 17)}min
        </div>
      </div>
    );
  });

  if (!trails) return <h1>Loading...</h1>;

  return (
    <div>
      <Slider />
      <div className="all-trails-h1-container">
        <h1 className="all-trails-h1">Search Results</h1>
      </div>
      <div className="trail-cards-container">{cards}</div>
    </div>
  );
};

export default SearchResultsPage;
