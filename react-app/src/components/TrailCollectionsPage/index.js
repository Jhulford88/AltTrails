import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTrailsThunk } from "../../store/trails";
import { getCategoriesThunk } from "../../store/categories";
import hiking from "../../assets/hiking-banner.jpeg";
import biking from "../../assets/biking-banner.jpeg";
import running from "../../assets/running-banner.webp";
import walking from "../../assets/walking-banner.jpeg";
import "./trailCollectionsPage.css";

const CollectionsPage = () => {
  //Initialize things

  //useSelectors

  //Dispatch Thunks

  return <h1>Hello from collections page</h1>;
};

export default CollectionsPage;
