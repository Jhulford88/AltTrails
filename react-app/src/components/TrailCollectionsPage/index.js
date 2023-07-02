import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCollectionsThunk } from "../../store/collections";
import image from "../../assets/collections-page-banner.avif";
import "./trailCollectionsPage.css";

const CollectionsPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();

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
