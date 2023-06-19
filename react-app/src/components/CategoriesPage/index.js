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


const CategoriesPage = () => {

    const { category } = useParams();

    return (
        <h1>Hello from {category} category page</h1>
    )
}

export default CategoriesPage
