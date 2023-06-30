import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleCollectionThunk } from "../../store/collections";
import image from "../../assets/collections-page-banner.avif";
import "./collectionDetailPage.css";

const CollectionDetailPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();
  const { collectionId } = useParams();

  //useSelectors
  const collection = useSelector((state) => state.collections.singleCollection);

  //Dispatch Thunks
  useEffect(() => {
    dispatch(getSingleCollectionThunk(collectionId));
  }, [dispatch]);

  //Build trail cards to display
  const cards = collection.trails?.map((trail) => {
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

  return (
    <div className="collections-page-parent-container">
      <div className="collections-banner-img-container">
        <img className="collections-banner-img" src={image}></img>
        <h1 className="collections-banner-text">{collection.name}</h1>
      </div>
      <div className="trail-cards-container">{cards}</div>
    </div>
  );
};

export default CollectionDetailPage;
