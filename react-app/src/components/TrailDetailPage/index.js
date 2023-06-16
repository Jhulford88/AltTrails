import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from "../ReviewComponent";
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
                    modalComponent={<CreateReviewModal />}
                />
                </div>
            </div>
        </div>
    )
}

export default TrailDetailPage
