import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAllTrailsThunk } from "../../store/trails";
import { getAllCollectionsThunk } from "../../store/collections";
import { searchAllTrailsThunk } from "../../store/trails";
import Slider from "../Slider";
import hikingPhoto from "../../assets/hiking-photo.png";
import bikingPhoto from "../../assets/biking-photo.png";
import runningPhoto from "../../assets/running-photo.png";
import walkingPhoto from "../../assets/walking-photo.png";
import image from "../../assets/collections-page-banner.avif";
import "./landingPage.css";

const LandingPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();

  //useSelectors
  const trails = useSelector((state) => state.trails.allTrails);
  const collections = useSelector((state) => state.collections.allCollections);

  //State
  const [search, setSearch] = useState("");

  //Dispatch thunk to get all trails
  useEffect(() => {
    dispatch(getAllTrailsThunk());
    dispatch(getAllCollectionsThunk());
  }, [dispatch]);

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

  //Build collection cards to display
  const collectionCards = Object.values(collections)?.map((collection) => {
    return (
      <div
        key={collection.id}
        className="collection-page-trail-card"
        onClick={(e) => {
          history.push(`/collections/${collection.id}`);
        }}
      >
        <div className="collection-card-img-container">
          <img
            className="collections-trail-card-img"
            alt="Trail Image"
            src={
              collection?.trails?.length
                ? collection?.trails[0]?.coverPhoto
                : image
            }
          ></img>
          <div className="collection-card-trail-name">{collection.name}</div>
        </div>
      </div>
    );
  });

  const collectionCardSelection = new Array(1).fill(
    collectionCards.slice(0, 4)
  );

  if (!trails) return <h1>Loading...</h1>;

  return (
    <div>
      <Slider />
      <div className="search-bar-container">
        <input
          id="search-button-enter"
          type="search"
          className="search-bar"
          placeholder="Search by Trail Name, Park, or Description!"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={async (e) => {
            console.log("search query: ", search);
            await dispatch(searchAllTrailsThunk(search));
            history.push("/trails/search");
          }}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="categories-container">
        <h1 className="browse-by-activity">Browse by activity</h1>
        <div className="cat-pic-container">
          <NavLink className="cat-pics-navlink" exact to="/categories/Hiking">
            <img className="cat-pics" src={hikingPhoto}></img>
            <h2 className="cat-pics-labels">Hiking</h2>
          </NavLink>
          <NavLink className="cat-pics-navlink" exact to="/categories/Biking">
            <img className="cat-pics" src={bikingPhoto}></img>
            <h2 className="cat-pics-labels">Biking</h2>
          </NavLink>
          <NavLink className="cat-pics-navlink" exact to="/categories/Running">
            <img className="cat-pics" src={runningPhoto}></img>
            <h2 className="cat-pics-labels">Running</h2>
          </NavLink>
          <NavLink className="cat-pics-navlink" exact to="/categories/Walking">
            <img className="cat-pics" src={walkingPhoto}></img>
            <h2 className="cat-pics-labels">Walking</h2>
          </NavLink>
        </div>
      </div>
      <div className="collections-h1-container">
        <h1 className="popular-collections-h1">Explore Popular Collections</h1>
      </div>
      <div className="landing-collection-container">
        {collectionCardSelection}
      </div>
      <div className="all-trails-h1-container">
        <h1 className="all-trails-h1">Explore All Trails</h1>
      </div>
      <div className="trail-cards-container-container">
        <div className="trail-cards-container">{cards}</div>
      </div>
    </div>
  );
};

export default LandingPage;
