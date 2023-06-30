import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCollectionsThunk } from "../../store/collections";
import image from "../../assets/collections-page-banner.avif";
import "./trailCollectionsPage.css";

const CollectionsPage = () => {
  //Initialize things
  const dispatch = useDispatch();

  //useSelectors
  const collections = useSelector((state) => state.collections.allCollections);

  //Dispatch Thunks
  useEffect(() => {
    dispatch(getAllCollectionsThunk());
  }, [dispatch]);

  //Build collection cards to display
  const cards = Object.values(collections)?.map((collection) => {
    return (
      <div
        key={collection.id}
        className="trail-card"
        // onClick={(e) => {
        //   history.push(`/trails/${trail.id}`);
        // }}
      >
        <div className="trail-card-img-container">
          <img
            className="landing-trail-card-img"
            alt="Trail Image"
            src={collection?.trails[0].coverPhoto}
          ></img>
        </div>
        <div className="trail-name">{collection.name}</div>
        {/* <div className="park-name">{trail.park}</div> */}
        <div>
          {/* Length: {trail.length}mi · Est. {Math.floor(trail.length * 17)}min */}
        </div>
      </div>
    );
  });

  return (
    <div className="collections-page-parent-container">
      <div className="collections-banner-img-container">
        <img className="collections-banner-img" src={image}></img>
        <h1 className="collections-banner-text">Collections</h1>
      </div>
      <div className="trail-cards-container">{cards}</div>
    </div>
  );
};

export default CollectionsPage;
