import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";


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
        <div>
            <div>hello from trail detail page</div>
            <div>{singleTrail.trailName}</div>
        </div>
    )
}

export default TrailDetailPage
