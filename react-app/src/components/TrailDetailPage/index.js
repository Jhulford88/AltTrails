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


    useEffect(() => {
        dispatch(getSingleTrailThunk(trailId))
        dispatch(authenticate())
    }, [dispatch, trailId])

    const addFavorite = (e) => {
      dispatch(createFavoriteThunk(trailId))
    }

    const reviewAvg = () => {
      let totalStars = null;
      singleTrail.reviews?.forEach(review => {
        totalStars += review.starRating
      })
      let res =  totalStars / singleTrail?.reviews?.length
      return res.toFixed(1)
    }

    return (
        <div className="parent-container">
            <div className="cover-photo-container">
                <img className="trail-card-img" src={singleTrail.coverPhoto}></img>
            </div>
            <div className="detail-page-container">
                <h1 className="trail-name-h1">{singleTrail.trailName}</h1>
                <h2 className="park-name-h2">{singleTrail.park}</h2>
                <div>{singleTrail.length} mi</div>
                <div>elevation gain {singleTrail.elevationGain} ft</div>
                <div>{singleTrail.description}</div>
                <div>category?</div>

                {sessionUser ?
                <div className="favorite-button">
                  <button onClick={addFavorite}>add to favorites</button>
                </div>
                : null}


                <div>
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
      </div>
            </div>
        </div>
    )
}

export default TrailDetailPage
