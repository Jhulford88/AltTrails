import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import { createFavoriteThunk } from "../../store/trails";
import { authenticate } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './trailDetailPage.css'
import DeleteReviewModal from "../DeleteReviewModal";


const TrailDetailPage = () => {

    //initialize things
    const dispatch = useDispatch()
    const history = useHistory()
    const { trailId } = useParams()


    //useSelectors
    const singleTrail = useSelector(state => state.trails.singleTrail)
    const sessionUser = useSelector(state => state.session.user)


    //dispatching thunks on mount
    useEffect(() => {
        dispatch(getSingleTrailThunk(trailId))
        dispatch(authenticate())
    }, [dispatch, trailId])

    //dispatch thunk on click
    const addFavorite = (e) => {
      dispatch(createFavoriteThunk(trailId))
    }

    //Find the average star rating for single trail
    const reviewAvg = () => {
      let totalStars = null;
      singleTrail.reviews?.forEach(review => {
        totalStars += review.starRating
      })
      let res =  totalStars / singleTrail?.reviews?.length
      return res.toFixed(1)
    }

    //Find the difficulty level for single trail
    const findDifficulty = () => {
      if (singleTrail.length >= 20) return "Hard"
      if ((singleTrail.elevationGain / singleTrail.length) >= 300) return "Hard"
      if ((singleTrail.elevationGain / singleTrail.length) >= 200 && (singleTrail.elevationGain / singleTrail.length) <= 300) return "Medium"
      return "Easy"
    }

    //Find the category type
    const findCategory = () => {
      if (singleTrail.categoryId == 1) return "Hiking"
      if (singleTrail.categoryId == 2) return "Biking"
      if (singleTrail.categoryId == 3) return "Running"
      if (singleTrail.categoryId == 4) return "Walking"
    }

    return (
        <div className="parent-container">
          <div className="trail-detail-subheader-container">
            <div className="trail-detail-subheader-text"> United States &nbsp; {">"} &nbsp; {singleTrail.state} &nbsp; {">"} &nbsp; {singleTrail.city} &nbsp; {">"} &nbsp; {singleTrail.park} </div>
          </div>

            <div className="cover-photo-container">
                <img className="trail-card-img" src={singleTrail.coverPhoto}></img>
                {sessionUser ?
                <div className="favorite-button-container" title="Add to Favorites">
                  <button className="favorite-button" onClick={addFavorite}><i class="fa-solid fa-bookmark"></i></button>
                </div>
                : null}
                <div className="detail-banner-text">
                  <h1 className="trail-name-h1">{singleTrail.trailName}</h1>
                  <h2 className="park-name-h2">{singleTrail.park}</h2>
                  <div className="review-over-banner-container">
                    {singleTrail.reviews?.length ?
                      <div >
                        <div className="average-rating-number-banner">{reviewAvg()} <span className="average-rating-text"><i class="fa-solid fa-star" id="banner-rating-icon"></i></span></div>
                      </div>
                    : null}
                  </div>
                </div>
            </div>


            <div className="detail-stats-container">
                <div className="detail-stats">
                  <div >Distance</div>
                  <div className="detail-stats-res">{singleTrail.length} mi</div>
                </div>
                <div className="detail-stats">
                  <div >Elevation Gain</div>
                  <div className="detail-stats-res">{singleTrail.elevationGain} ft</div>
                </div>
                <div className="detail-stats">
                  <div >Difficulty</div>
                  <div className="detail-stats-res">{findDifficulty()}</div>
                </div>
                <div className="detail-stats">
                  <div >Type</div>
                  <div className="detail-stats-res">{findCategory()}</div>
                </div>
            </div>



            <div className="detail-page-container">
                <div className="detail-page-description">{singleTrail.description}</div>
                <div className="review-totals-container">
                    {singleTrail.reviews?.length ?
                      <div >
                        <div className="average-rating-number">{reviewAvg()} <span className="average-rating-text"><i class="fa-solid fa-star"></i></span></div>
                        <div>
                          {"(" + singleTrail.reviews?.length + ")"} <span>reviews</span>
                        </div>
                      </div>
                    : <h2>Be the First to Leave a Review!</h2>}

                    {sessionUser ? <div className="create-review-button-container">
                      <OpenModalButton
                          className="create-review-button"
                          buttonText={"Write Review"}
                          modalComponent={<CreateReviewModal trailId={trailId}/>}
                      />
                      </div>
                    : null}
                </div>

                <ul className="reviews-ul">
                  {singleTrail.reviews?.map(review => {
                    return (
                      <div key={review.id} className="review-area">
                        <div className="individual-review"> {review.reviewText}</div>
                        <div className="individual-review-stars">{review.starRating} <i class="fa-solid fa-star"></i></div>
                        {sessionUser && sessionUser.id === review.userId ? <OpenModalButton
                            className="create-review-button"
                            buttonText={"Update"}
                            modalComponent={<UpdateReviewModal review={review}/>}
                        />
                        : null}
                        {sessionUser && sessionUser.id === review.userId ? <OpenModalButton
                            className="create-review-button"
                            buttonText={"Delete"}
                            modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                        />
                        : null}
                      </div>
                    )
                  })}
                </ul>
                <div className="related-trails-container">

                </div>
            </div>
        </div>
    )
}

export default TrailDetailPage
