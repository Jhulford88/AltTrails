import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllTrailsThunk } from "../../store/trails";
import './landingPage.css';



const LandingPage = () => {

    //Initialize things
    const dispatch = useDispatch()
    const history = useHistory()

    //useSelectors
    const trails = useSelector(state => state.trails.allTrails)

    useEffect(() => {
        dispatch(getAllTrailsThunk())
    }, [dispatch])

    const cards = Object.values(trails)?.map(trail => {
        return (
            <div className="trail-card">
                <div>{trail.trailName}</div>
                <div>{trail.park}</div>
                <div>{trail.city}, {trail.state}</div>
            </div>
        )
    })


    return (
        <div>
            <h1>hello from landing page</h1>
            <div className="trail-cards-container">
                {cards}
            </div>
        </div>
    )
}

export default LandingPage;
