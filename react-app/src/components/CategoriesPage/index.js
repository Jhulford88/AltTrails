import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTrailsThunk } from "../../store/trails";
import { getCategoriesThunk } from "../../store/categories";
import hiking from "../../assets/hiking-banner.jpeg";
import biking from "../../assets/biking-banner.jpeg";
import running from "../../assets/running-banner.webp";
import walking from "../../assets/walking-banner.jpeg";
import "./categoriesPage.css";

const CategoriesPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryParam } = useParams();

  //useSelectors
  const trails = useSelector((state) => state.trails.allTrails);
  const categories = useSelector((state) => state.categories.categories);

  //Dispatch Thunks
  useEffect(() => {
    dispatch(getAllTrailsThunk());
    dispatch(getCategoriesThunk());
    //  window.scrollTo(0, 0)
  }, [dispatch]);

  //Determine the category
  let categoryId;
  if (categories) {
    Object.values(categories).forEach((category) => {
      if (category.type.includes(categoryParam)) {
        categoryId = category.id;
      }
    });
  }

  //Build the trail cards to be displayed
  const cards = Object.values(trails)?.map((trail) => {
    if (trail.categoryId == categoryId)
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
    <div>
      <div className="cat-banner-container">
        {categoryParam == "Hiking" ? (
          <img className="trail-card-img" src={hiking}></img>
        ) : null}
        {categoryParam == "Biking" ? (
          <img className="trail-card-img" src={biking}></img>
        ) : null}
        {categoryParam == "Running" ? (
          <img className="trail-card-img" src={running}></img>
        ) : null}
        {categoryParam == "Walking" ? (
          <img className="trail-card-img" src={walking}></img>
        ) : null}
        <h1 className="cat-banner-text">{categoryParam}</h1>
      </div>
      <div className="category-trail-cards-container">{cards}</div>
    </div>
  );
};

export default CategoriesPage;
