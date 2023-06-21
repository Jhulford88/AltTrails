import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCurrentTrailsThunk } from '../../store/trails';
import { deleteFavoriteThunk } from '../../store/trails';
import { authenticate } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import DeleteTrailModal from "../DeleteTrailModal";
import image from "../../assets/slider-5.avif"
import "./myTrailsPage.css"


const MyTrailsPage = () => {

    //initialize things
    const dispatch = useDispatch()
    const history = useHistory()


    //useSelectors
    const user = useSelector(state => state.session.user)
    const favorites = user?.favorites
    const trails = useSelector(state => state.trails.userTrails)

    //state (to force reload of state after delete)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        dispatch(getCurrentTrailsThunk())
        setDeleted(false)
        dispatch(authenticate())
    }, [dispatch, deleted, favorites])

    //Delete favorite from DB and update store
    const removeFavorite = (trailId) => {
        dispatch(deleteFavoriteThunk(trailId))
        dispatch(authenticate())

    }


    const manageCards = Object.values(trails)?.map(trail => {
        return (
            <div className="manage-trail-card">
                <div key={trail.id}  onClick={(e) => {
                    history.push(`/trails/${trail.id}`)
                    }}>
                    <div className="manage-trail-card-img-container">
                        <img className="manage-trail-card-img" alt="Trail Image" src={trail?.coverPhoto}></img>
                    </div>
                    <div className="manage-trail-name">{trail.trailName}</div>
                    <div className="manage-park-name">{trail.park}</div>
                    <div className="manage-park-stats">Length: {trail.length}mi · Est. {Math.floor(trail.length*17)}min</div>
                </div>
                    <div className='manage-button-container'>
                        <button  onClick={() => history.push(`/trails/${trail.id}/update`)} >Update</button>
                        &nbsp;&nbsp;<OpenModalButton
                            className="trail-delete-button"
                            buttonText={"Delete"}
                            modalComponent={<DeleteTrailModal trailId={trail.id} setDeleted={setDeleted} />}
                        />
                    </div>
            </div>
        )
      })


      const favoriteCards = favorites?.map(trail => {
        return (
            <div>
                <div key={trail.id}  onClick={(e) => {
                    history.push(`/trails/${trail.id}`)
                    }}>
                    <div className="manage-trail-card-img-container">
                        <img className="manage-trail-card-img" alt="Trail Image" src={trail?.coverPhoto}></img>
                    </div>
                    <div className="manage-trail-name">{trail.trailName}</div>
                    <div className="manage-park-name">{trail.park}</div>
                    <div className="manage-park-stats">Length: {trail.length}mi · Est. {Math.floor(trail.length*17)}min</div>
                </div>
                    <div>
                        <button onClick={() => {removeFavorite(trail.id)}}>Remove Favorite</button>
                    </div>
            </div>
        )
      })


      if (!user) history.push('/')

    return (
        <div>
            <div className="banner-img-container">
                <img className='banner-img' src={image}></img>
                <h1 className='banner-text'>Lets do this...</h1>
            </div>
            <h2>My Trails</h2>
            <div className="manage-trail-cards-container">
                {manageCards}
            </div>
            <h2>My Favorites</h2>
            <div className="manage-trail-cards-container">
                {manageCards}
            </div>

        </div>
    )
}

export default MyTrailsPage
