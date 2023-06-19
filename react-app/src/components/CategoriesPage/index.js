import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleTrailThunk } from "../../store/trails";
import { createFavoriteThunk } from "../../store/trails";
import { authenticate } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import './categoriesPage.css'
import DeleteReviewModal from "../DeleteReviewModal";
import { getAllTrailsThunk } from "../../store/trails";
import { getCategoriesThunk } from "../../store/categories";


const CategoriesPage = () => {

    //Initialize things
    const dispatch = useDispatch()
    const history = useHistory()
    const { categoryParam } = useParams();

     //useSelectors
     const trails = useSelector(state => state.trails.allTrails)
     const categories = useSelector(state => state.categories.categories);

     useEffect(() => {
         dispatch(getAllTrailsThunk())
         dispatch(getCategoriesThunk())
     }, [dispatch])

     //determine the category
     let categoryId;
     if (categories) {
         Object.values(categories).forEach(category => {
            if (category.type.includes(categoryParam)){
                categoryId = category.id
            }
         })
     }



    const cards = Object.values(trails)?.map(trail => {
        if (trail.categoryId == categoryId)
        return (
            <div key={trail.id} className="trail-card" onClick={(e) => {
                history.push(`/trails/${trail.id}`)
              }}>
                <div className="trail-card-img-container">
                    <img className="landing-trail-card-img" alt="Trail Image" src={trail?.coverPhoto}></img>
                </div>
                <div className="trail-name">{trail.trailName}</div>
                <div className="park-name">{trail.park}</div>
                <div>Length: {trail.length}mi · Est. {Math.floor(trail.length*17)}min</div>
            </div>
        )
    })

    return (
        <div>
            <h1>Here Are Some {categoryParam} Trails!</h1>
            <div className="category-trail-cards-container">
                {cards}
            </div>
        </div>

    )
}

export default CategoriesPage
