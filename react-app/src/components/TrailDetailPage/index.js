import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import { createFavoriteThunk } from "../../store/session";
import { authenticate } from "../../store/session";
import { getAllTrailsThunk } from "../../store/trails";
import { getCategoriesThunk } from "../../store/categories";
import OpenModalButton from "../OpenModalButton";
import OpenReviewModalButton from "../OpenReviewModalButton";
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import CollectionModal from "../CollectionModal";
import OpenCollectionModalButton from "../OpenCollectionModalButton";
import "./trailDetailPage.css";

const TrailDetailPage = () => {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();
  const { trailId } = useParams();

  //useSelectors
  const singleTrail = useSelector((state) => state.trails.singleTrail);
  const sessionUser = useSelector((state) => state.session.user);
  const trails = useSelector((state) => state.trails.allTrails);
  const categories = useSelector((state) => state.categories.categories);

  //State
  const [review, setReview] = useState(false);

  //Dispatching thunks on mount
  useEffect(() => {
    dispatch(getSingleTrailThunk(trailId));
    dispatch(getAllTrailsThunk());
    dispatch(getCategoriesThunk());
    dispatch(authenticate());
    setReview(false);
  }, [dispatch, trailId, review]);

  //Dispatch thunk on click
  const addFavorite = (e) => {
    dispatch(createFavoriteThunk(trailId));
  };

  //Determine the category
  let categoryId;
  if (categories) {
    Object.values(categories).forEach((category) => {
      if (category.id == singleTrail.categoryId) {
        categoryId = category.id;
      }
    });
  }

  //Build category cards to display
  const catCards = Object.values(trails)
    ?.filter(
      (trail) => trail.categoryId == categoryId && trail.id != singleTrail.id
    )
    .map((trail) => {
      return (
        <div
          key={trail.id}
          className="cat-trail-card"
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

  //Find the average star rating for single trail
  const reviewAvg = () => {
    let totalStars = null;
    singleTrail.reviews?.forEach((review) => {
      totalStars += review.starRating;
    });
    let res = totalStars / singleTrail?.reviews?.length;
    return res.toFixed(1);
  };

  //Find the difficulty level for single trail
  const findDifficulty = () => {
    if (singleTrail.length >= 20) return "Hard";
    if (singleTrail.elevationGain / singleTrail.length >= 300) return "Hard";
    if (
      singleTrail.elevationGain / singleTrail.length >= 200 &&
      singleTrail.elevationGain / singleTrail.length <= 300
    )
      return "Medium";
    return "Easy";
  };

  //Find the category type
  const findCategory = () => {
    if (singleTrail.categoryId == 1) return "Hiking";
    if (singleTrail.categoryId == 2) return "Biking";
    if (singleTrail.categoryId == 3) return "Running";
    if (singleTrail.categoryId == 4) return "Walking";
  };

  //Determine if the user has favorited this trail
  const userFavorited = sessionUser?.favorites?.filter(
    (favorite) => favorite.id == singleTrail.id
  );
  const isFavorited = userFavorited?.length ? "yes" : "no";

  //Building reviews
  const reviews = singleTrail?.reviews?.map((review) => {
    return (
      <div key={review.id} className="review-area">
        <div className="individual-review-username">{review.user}</div>
        <div className="individual-review-date">{review.createdAt}</div>
        <div className="individual-review-stars">
          <span className="individual-review-star">
            {Array(review.starRating).fill(<i class="fa-solid fa-star"></i>)}
          </span>
        </div>
        <br></br>
        <div className="individual-review">{review.reviewText}</div>
        <br></br>
        {sessionUser && sessionUser.id === review.userId ? (
          <OpenModalButton
            className="create-review-button"
            buttonText={"Update"}
            modalComponent={<UpdateReviewModal review={review} />}
          />
        ) : null}
        {sessionUser && sessionUser.id === review.userId ? (
          <OpenModalButton
            className="create-review-button"
            buttonText={"Delete"}
            modalComponent={<DeleteReviewModal reviewId={review.id} />}
          />
        ) : null}
      </div>
    );
  });

  return (
    <div className="parent-container">
      <div className="trail-detail-subheader-container">
        <div className="trail-detail-subheader-text">
          {" "}
          United States &nbsp; {">"} &nbsp; {singleTrail.state} &nbsp; {">"}{" "}
          &nbsp; {singleTrail.city} &nbsp; {">"} &nbsp; {singleTrail.park}{" "}
        </div>
      </div>

      <div className="cover-photo-container">
        <img className="trail-card-img" src={singleTrail.coverPhoto}></img>
        {sessionUser ? (
          <div className="favorite-button-container" title="Add to Favorites">
            <button className="favorite-button" onClick={addFavorite}>
              <i id={isFavorited} class="fa-solid fa-bookmark"></i>
            </button>
          </div>
        ) : null}
        <div className="detail-banner-text">
          <h1 className="trail-name-h1">{singleTrail.trailName}</h1>
          <h2 className="park-name-h2">{singleTrail.park}</h2>
          <div className="review-over-banner-container">
            {singleTrail.reviews?.length ? (
              <div>
                <div className="average-rating-number-banner">
                  {reviewAvg()}{" "}
                  <span className="average-rating-text">
                    <i class="fa-solid fa-star" id="banner-rating-icon"></i>
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="detail-stats-container">
        <div className="detail-stats">
          <div>Distance</div>
          <div className="detail-stats-res">{singleTrail.length} mi</div>
        </div>
        <div className="detail-stats">
          <div>Elevation Gain</div>
          <div className="detail-stats-res">{singleTrail.elevationGain} ft</div>
        </div>
        <div className="detail-stats">
          <div>Difficulty</div>
          <div className="detail-stats-res">{findDifficulty()}</div>
        </div>
        <div className="detail-stats">
          <div>Type</div>
          <div className="detail-stats-res">{findCategory()}</div>
        </div>
      </div>
      <div className="detail-page-description">{singleTrail.description}</div>
      <div className="detail-page-container">
        <div className="review-totals-container">
          {singleTrail.reviews?.length ? (
            <div>
              <div className="average-rating-number">
                {reviewAvg()}{" "}
                <span className="average-rating-text">
                  <i class="fa-solid fa-star"></i>
                </span>
              </div>
              <div>
                {"(" + singleTrail.reviews?.length + ")"} <span>reviews</span>
              </div>
            </div>
          ) : null}

          {sessionUser ? (
            <div className="create-review-button-container">
              <OpenReviewModalButton
                className="create-review-button"
                buttonText={"Write Review"}
                modalComponent={
                  <CreateReviewModal setReview={setReview} trailId={trailId} />
                }
              />
            </div>
          ) : null}
        </div>
        <div className="collection-button-container">
          <OpenCollectionModalButton
            className="create-review-button"
            buttonText={"Add to a collection"}
            modalComponent={<CollectionModal trailId={trailId} />}
          />
        </div>

        <div className="reviews-and-related">
          <div className="reviews-ul-container">
            <ul className="reviews-ul">{reviews?.reverse()}</ul>
          </div>
          <div className="related-trails-container">
            <h2>Related {findCategory()} Trails</h2>
            <div className="related-trails-cards">{catCards[0]}</div>
            <div className="related-trails-cards">{catCards[1]}</div>
            <div className="related-trails-cards">{catCards[2]}</div>
            <div className="related-trails-cards">{catCards[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetailPage;
