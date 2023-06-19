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


    return (
        <div className="parent-container">
            <div className="detail-page-container">
                <div className="cover-photo-container">
                    <img className="trail-card-img" src={singleTrail.coverPhoto}></img>
                </div>
                <h1 className="trail-name-h1">{singleTrail.trailName}</h1>
                <h2 className="park-name-h2">{singleTrail.park}</h2>
                <div>{singleTrail.length} mi</div>
                <div>elevation gain {singleTrail.elevationGain} ft</div>
                <div>{singleTrail.description}</div>
                {sessionUser ? <div>
                <OpenModalButton
                    className="create-review-button"
                    buttonText={"Leave a Review"}
                    modalComponent={<CreateReviewModal trailId={trailId}/>}
                />
                </div>
                : null}

                {sessionUser ?
                <div className="favorite-button">
                  <button onClick={addFavorite}>add to favorites</button>
                </div>
                : null}


                <div>
        <ul className="reviews-ul">
          {singleTrail.reviews?.map(review => {
            return (
              <div className="review-area">
                {/* <span className="username-says">{comment.user.first_name} says...</span> */}
                <li key={review.id} className="individual-review"> {review.reviewText}</li>
                <li key={review.id} className="individual-review-stars"> Stars: {review.starRating}</li>

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
