import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAllTrailsThunk } from "../../store/trails";
import Slider from "../Slider"
import './landingPage.css';
import hikingPhoto from "../../assets/hiking-photo.png"
import bikingPhoto from "../../assets/biking-photo.png"
import runningPhoto from "../../assets/running-photo.png"
import walkingPhoto from "../../assets/walking-photo.png"


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
                <div className="trail-name">{trail.trailName}</div>
                <div className="park-name">{trail.park}</div>
                {/* <div>{trail.city}, {trail.state}</div> */}
                <div>Length: {trail.length}mi · Est. {Math.floor(trail.length*17)}min</div>
            </div>
        )
    })

    if (!trails) return (
        <h1>Loading...</h1>
    )

    return (
        <div>
            <Slider />
            <div className="categories-container">
                <h1 className="browse-by-activity">Browse by activity</h1>
                <div className="cat-pic-container">
                    <NavLink exact to="/categories/Hiking">
                            <img className="cat-pics" src={hikingPhoto}></img>
                            <h2 className="cat-pics-labels">Hiking</h2>
                    </NavLink>
                    <NavLink exact to="/categories/Biking">
                            <img className="cat-pics" src={bikingPhoto}></img>
                            <h2 className="cat-pics-labels">Biking</h2>
                    </NavLink>
                    <NavLink exact to="/categories/Running">
                            <img className="cat-pics" src={runningPhoto}></img>
                            <h2 className="cat-pics-labels">Running</h2>
                    </NavLink>
                    <NavLink exact to="/categories/Walking">
                            <img className="cat-pics" src={walkingPhoto}></img>
                            <h2 className="cat-pics-labels">Walking</h2>
                    </NavLink>
                </div>
            </div>
            <h1 className="all-trails-h1">All trails...</h1>
            <div className="trail-cards-container">
                {cards}
            </div>
        </div>
    )
}

export default LandingPage;
