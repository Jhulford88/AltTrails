import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleCollectionThunk } from "../../store/collections";
import OpenDeleteFromCollectionModalButton from "../OpenDeleteFromCollectionModalButton";
import DeleteFromCollectionModal from "../DeleteFromCollectionModal";
import image from "../../assets/collections-page-banner.avif";
import "./collectionDetailPage.css";

const CollectionDetailPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();
  const { collectionId } = useParams();

  //useSelectors
  const collection = useSelector((state) => state.collections.singleCollection);
  const user = useSelector((state) => state.session.user);

  //State (to force reload of state after delete)
  const [deleted, setDeleted] = useState(false);

  //Dispatch Thunks
  useEffect(() => {
    dispatch(getSingleCollectionThunk(collectionId));
  }, [dispatch, deleted]);

  //Build trail cards to display
  const cards = collection.trails?.map((trail) => {
    return (
      <div className="trail-card">
        <div
          key={trail.id}
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
          <div className="length-and-time">
            Length: {trail.length}mi · Est. {Math.floor(trail.length * 17)}min
          </div>
        </div>
        <div>
          {user.id === collection.userId ? (
            <OpenDeleteFromCollectionModalButton
              className="trail-delete-button"
              buttonText={"Delete"}
              modalComponent={
                <DeleteFromCollectionModal
                  trailId={trail.id}
                  collectionId={collection.id}
                  setDeleted={setDeleted}
                />
              }
            />
          ) : null}
          {console.log("trailId on collection detail page......", trail.id)}
          {console.log(
            "collectionId on collection detail page......",
            collection.id
          )}
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
