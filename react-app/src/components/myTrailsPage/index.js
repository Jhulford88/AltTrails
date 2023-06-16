import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCurrentTrailsThunk } from '../../store/trails';
import OpenModalButton from '../OpenModalButton';
import DeleteTrailModal from "../DeleteTrailModal";
import "./myTrailsPage.css"

//add useSelector and dispatch thunk for get user trails


const MyTrailsPage = () => {

    //initialize things
    const dispatch = useDispatch()
    const history = useHistory()


    //useSelectors
    const user = useSelector(state => state.session.user)
    const trails = useSelector(state => state.trails.userTrails)

    //state (to force reload of state after delete)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        dispatch(getCurrentTrailsThunk())
        setDeleted(false)
    }, [dispatch, deleted])


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



    return (
        <div>
            <h1>Hello from My Trails Page</h1>
            <div className="manage-trail-cards-container">
                <div>{cards}</div>
            </div>
        </div>
    )
}

export default MyTrailsPage
