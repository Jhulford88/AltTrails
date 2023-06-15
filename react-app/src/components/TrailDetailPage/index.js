import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
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
                <div>Trail description goes here</div>
                <button className="update-button" onClick={() => history.push(`/trails/${trailId}/update`)}>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default TrailDetailPage
