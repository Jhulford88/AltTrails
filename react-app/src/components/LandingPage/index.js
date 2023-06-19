import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllTrailsThunk } from "../../store/trails";
import Slider from "../Slider"
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
            <div key={trail.id} className="trail-card" onClick={(e) => {
                history.push(`/trails/${trail.id}`)
              }}>
                <div className="trail-card-img-container">
                    <img className="landing-trail-card-img" alt="Trail Image" src={trail?.coverPhoto}></img>
                </div>
                <div>{trail.trailName}</div>
                <div>{trail.park}</div>
                <div>{trail.city}, {trail.state}</div>
                <div>Length: {trail.length}mi</div>
            </div>
        )
    })

    if (!trails) return (
        <h1>Loading...</h1>
    )

    return (
        <div>
            <Slider />
            <div className="trail-cards-container">
                {cards}
            </div>
        </div>
    )
}

export default LandingPage;
