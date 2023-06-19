import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import { createFavoriteThunk } from "../../store/trails";
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
    }, [dispatch, trailId])

    const addFavorite = (e) => {
      dispatch(createFavoriteThunk(trailId))
    }


    return (
        <div className="parent-container">
            <div className="detail-page-container">
                <h1>hello from trail detail page</h1>
                <div className="cover-photo-container">
                    <img className="trail-card-img" src={singleTrail.coverPhoto}></img>
                </div>
                <div>{singleTrail.trailName}</div>
                <div>{singleTrail.park}</div>
                <div>{singleTrail.length}</div>
                <div>{singleTrail.elevationGain}</div>
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
