import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import image from "../../assets/collections-page-banner.avif";
import "./trailCollectionsPage.css";

const CollectionsPage = () => {
  //Initialize things

  //useSelectors

  //Dispatch Thunks

  return (
    <div className="collections-page-parent-container">
      <div className="collections-banner-img-container">
        <img className="collections-banner-img" src={image}></img>
        <h1 className="collections-banner-text">Collections</h1>
      </div>
    </div>
  );
};

export default CollectionsPage;
