import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCurrentTrailsThunk } from '../../store/trails';
import { deleteFavoriteThunk } from '../../store/trails';
import { authenticate } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import DeleteTrailModal from "../DeleteTrailModal";
import image from "../../assets/slider-5.avif"
import "./myTrailsPage.css"

//add useSelector and dispatch thunk for get user trails


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
    }, [dispatch, deleted])

    const removeFavorite = (trailId) => {
        dispatch(deleteFavoriteThunk(trailId))
        dispatch(authenticate())

    }


    const cards = Object.values(trails)?.map(trail => {
        return (
            <div>
                <div key={trail.id} className="manage-trail-card" onClick={(e) => {
                    history.push(`/trails/${trail.id}`)}}>
                    <div className="manage-trail-card-img-container">
                        <img className="manage-trail-card-img" alt="Trail Card" src={trail?.coverPhoto}></img>
                    </div>
                    <div>{trail.trailName}</div>
                    <div>{trail.park}</div>
                    <div>{trail.city}, {trail.state}</div>
                    <div>Length: {trail.length}mi</div>
                </div>
                    <div className='manage-button-container'>
                        <button  onClick={() => history.push(`/trails/${trail.id}/update`)} >Update</button>
                                <OpenModalButton
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
                <div key={trail.id} className="manage-trail-card" onClick={(e) => {
                    history.push(`/trails/${trail.id}`)}}>
                    <div className="manage-trail-card-img-container">
                        <img className="manage-trail-card-img" alt="Trail Card" src={trail?.coverPhoto}></img>
                    </div>
                    <div>{trail.trailName}</div>
                    <div>{trail.park}</div>
                    <div>{trail.city}, {trail.state}</div>
                    <div>Length: {trail.length}mi</div>
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
            <img className="trail-card-img" src={image}></img>
            <div className="manage-trail-cards-container">
                <h2>My Trails</h2>
                <div>{cards}</div>
            </div>
            <div>
                <h2>My Favorites</h2>
                <div>{favoriteCards}</div>
            </div>
        </div>
    )
}

export default MyTrailsPage
