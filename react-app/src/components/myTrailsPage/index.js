import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentTrailsThunk } from "../../store/trails";
import { deleteFavoriteThunk } from "../../store/trails";
import { authenticate } from "../../store/session";
import { getCurrentCollectionsThunk } from "../../store/collections";
import OpenModalButton from "../OpenModalButton";
import DeleteTrailModal from "../DeleteTrailModal";
import OpenDeleteCollectionModalButton from "../OpenDeleteCollectionModalButton";
import DeleteCollectionModal from "../DeleteCollectionModal";
import image from "../../assets/slider-5.avif";
import "./myTrailsPage.css";

const MyTrailsPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();

  //useSelectors
  const user = useSelector((state) => state.session.user);
  const trails = useSelector((state) => state.trails.userTrails);
  const collections = useSelector((state) => state.collections.userCollections);
  const favorites = user?.favorites;
  const reviews = user?.reviews;

  //State (to force reload of state after delete)
  const [deleted, setDeleted] = useState(false);

  //Dispatch thunk to get users trails
  useEffect(() => {
    dispatch(getCurrentCollectionsThunk());
    dispatch(getCurrentTrailsThunk());
    setDeleted(false);
    dispatch(authenticate());
  }, [dispatch, deleted]);

  //Delete favorite from DB and update store
  const removeFavorite = (trailId) => {
    dispatch(deleteFavoriteThunk(trailId));
    dispatch(authenticate());
    setDeleted(true);
  };

  //Build the current users trail cards - "My Trails" section
  const manageCards = Object.values(trails)?.map((trail) => {
    return (
      <div className="manage-trail-card">
        <div
          key={trail.id}
          onClick={(e) => {
            history.push(`/trails/${trail.id}`);
          }}
        >
          <div className="manage-trail-card-img-container">
            <img
              className="manage-trail-card-img"
              alt="Trail Image"
              src={trail?.coverPhoto}
            ></img>
          </div>
          <div className="manage-trail-name">{trail.trailName}</div>
          <div className="manage-park-name">{trail.park}</div>
          <div className="manage-park-stats">
            Length: {trail.length}mi · Est. {Math.floor(trail.length * 17)}min
          </div>
        </div>
        <div className="manage-button-container">
          <button onClick={() => history.push(`/trails/${trail.id}/update`)}>
            Update
          </button>
          &nbsp;&nbsp;
          <OpenModalButton
            className="trail-delete-button"
            buttonText={"Delete"}
            modalComponent={
              <DeleteTrailModal trailId={trail.id} setDeleted={setDeleted} />
            }
          />
        </div>
      </div>
    );
  });

  //Build the users favorites trail cards - "My Favorites" section
  const favoriteCards = favorites?.map((trail) => {
    return (
      <div className="manage-trail-card">
        <div
          key={trail.id}
          onClick={(e) => {
            history.push(`/trails/${trail.id}`);
          }}
        >
          <div className="manage-trail-card-img-container">
            <img
              className="manage-trail-card-img"
              alt="Trail Image"
              src={trail?.coverPhoto}
            ></img>
          </div>
          <div className="manage-trail-name">{trail.trailName}</div>
          <div className="manage-park-name">{trail.park}</div>
          <div className="manage-park-stats">
            Length: {trail.length}mi · Est. {Math.floor(trail.length * 17)}min
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              removeFavorite(trail.id);
            }}
          >
            Remove Favorite
          </button>
        </div>
      </div>
    );
  });

  //Build collection cards to display - "My Collections" section
  const collectionCards = Object.values(collections)?.map((collection) => {
    return (
      <div className="collection-page-trail-card">
        <div
          className="collection-card-top"
          key={collection.id}
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
        <div className="trail-delete-button-container">
          <OpenDeleteCollectionModalButton
            className="trail-delete-button"
            buttonText={"Delete"}
            modalComponent={
              <DeleteCollectionModal
                collectionId={collection.id}
                setDeleted={setDeleted}
              />
            }
          />
        </div>
      </div>
    );
  });

  if (!user) history.push("/");

  return (
    <div className="my-trails-parent">
      <div className="banner-img-container">
        <img className="banner-img" src={image}></img>
        <h1 className="banner-text">Lets do this...</h1>
      </div>
      <div className="user-stats">
        {user.favorites?.length ? user.favorites.length : 0}{" "}
        {user.favorites?.length === 1
          ? "Trail Favorited!"
          : "Trails Favorited!"}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        {Object.values(trails).length ? Object.values(trails).length : 0}{" "}
        {user.trails?.length === 1 ? "Trail Created!" : "Trails Created!"}{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {reviews.length}{" "}
        {reviews.length === 1 ? "Review Written!" : "Reviews Written!"}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {Object.values(collections).length
          ? Object.values(collections).length
          : 0}{" "}
        {Object.values(collections)?.length === 1
          ? "Collection Created!"
          : "Collections Created!"}
      </div>
      <div className="my-trails-sections-container">
        <div className="my-trails-section">
          <h1 className="section-headers-top">My Trails</h1>
          <div id="manage-cards-top" className="manage-trail-cards-container">
            {manageCards.length ? (
              manageCards
            ) : (
              <h2>Create your first trail to see them here!</h2>
            )}
          </div>
        </div>
        <div className="my-favorites-section">
          <h1 className="section-headers-bottom">My Favorites</h1>
          <div
            id="manage-cards-bottom"
            className="manage-trail-cards-container"
          >
            {favoriteCards.length ? (
              favoriteCards
            ) : (
              <h2>favorite some trails to see them here!</h2>
            )}
          </div>
        </div>
        <div className="my-collections-section">
          <h1 className="section-headers-bottom">My Collections</h1>
          <div
            id="manage-cards-bottom"
            className="manage-trail-cards-container"
          >
            {collectionCards.length ? (
              collectionCards
            ) : (
              <h2>Create your first collection to see them here!</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrailsPage;
