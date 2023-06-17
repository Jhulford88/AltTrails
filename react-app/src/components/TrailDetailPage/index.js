import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './trailDetailPage.css'


const TrailDetailPage = () => {

    //initialize things
    const dispatch = useDispatch()
    const history = useHistory()
    const { trailId } = useParams()


    //useSelectors
    const singleTrail = useSelector(state => state.trails.singleTrail)


    useEffect(() => {
        dispatch(getSingleTrailThunk(trailId))
      }, [dispatch, trailId])

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
                <div>
                <OpenModalButton
                    className="create-review-button"
                    buttonText={"Leave a Review"}
                    modalComponent={<CreateReviewModal trailId={trailId}/>}
                />
                </div>
                <div>
        <ul className="reviews-ul">
          {singleTrail.reviews?.map(review => {
            return (
              <div className="review-area">
                {/* <span className="username-says">{comment.user.first_name} says...</span> */}
                <li key={review.id} className="individual-review"> {review.reviewText}</li>
                {/* {userId === review.user_id ? <button onClick={() => handleDelete(comment.id)} className="update-delete-buttons">Delete</button> : null} */}
                {/* {userId === comment.user_id ? <button onClick={() => handleUpdate()} className="update-delete-buttons">Update</button> : null} */}
                {/* {userId === comment.user_id && update ? <UpdateCommentComponent commentId={comment.id} projectId={projectId} originalText={comment.comment} setUpdate={setUpdate} /> : null} */}
                <OpenModalButton
                    className="create-review-button"
                    buttonText={"Update"}
                    modalComponent={<UpdateReviewModal review={review}/>}
                />
                <OpenModalButton
                    className="create-review-button"
                    buttonText={"Delete"}
                    modalComponent={<CreateReviewModal trailId={trailId}/>}
                />
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
