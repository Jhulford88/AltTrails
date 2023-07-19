import { normalizeObj } from "./helpers";

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = "trails/getAllTrails";
const POST_NEW_TRAIL = "trails/postNewTrail";
const GET_SINGLE_TRAIL = "trails/getSingleTrail";
const UPDATE_TRAIL = "trails/updateTrail";
const DELETE_TRAIL = "trails/deleteTrail";
const GET_CURRENT_TRAILS = "trails/getCurrentTrails";
const POST_NEW_REVIEW = "trails/postNewReview";
const DELETE_REVIEW = "trails/deleteReview";

// ---------- ACTION CREATORS ----------
const getAllTrails = (trails) => {
  return {
    type: GET_ALL_TRAILS,
    trails,
  };
};

const postNewTrail = (trail) => {
  return {
    type: POST_NEW_TRAIL,
    trail,
  };
};

const getSingleTrail = (trail) => {
  return {
    type: GET_SINGLE_TRAIL,
    trail,
  };
};

const updateTrail = (trail, id) => {
  return {
    type: UPDATE_TRAIL,
    trail,
    id,
  };
};

const deleteTrail = (trailId) => {
  return {
    type: DELETE_TRAIL,
    trailId,
  };
};

const getCurrentTrails = (trails) => {
  return {
    type: GET_CURRENT_TRAILS,
    trails,
  };
};

const postNewReview = (review, trailId) => {
  return {
    type: POST_NEW_REVIEW,
    review,
    trailId,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// ---------- THUNKS ----------
export const getAllTrailsThunk = () => async (dispatch) => {
  const res = await fetch("/api/trails");
  if (res.ok) {
    const { trails } = await res.json();
    dispatch(getAllTrails(trails));
    return;
  } else {
    console.log("Problem with loading all trails");
  }
};

export const postNewTrailThunk = (newTrail) => async (dispatch) => {
  try {
    const res = await fetch("/api/trails/new", {
      method: "POST",
      body: newTrail,
    });

    if (res.ok) {
      const response = await res.json();
      dispatch(postNewTrail(response.trail));
      return response.trail;
    } else {
      const response = await res.json();
      return {
        errors: { ...response },
      };
    }
  } catch (e) {
    console.error("Error caught in postNewTrailThunk", e);
    return e;
  }
};

export const getSingleTrailThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/trails/${id}`);
  if (res.ok) {
    const { single_trail } = await res.json();
    dispatch(getSingleTrail(single_trail));
    return;
  } else {
    const { errors } = await res.json();
    return errors;
  }
};

export const updateTrailThunk = (id, trail) => async (dispatch) => {
  try {
    const res = await fetch(`/api/trails/${id}/update`, {
      method: "PUT",
      body: trail,
    });

    if (res.ok) {
      const response = await res.json();
      dispatch(updateTrail(response.trail, id));
      return response.trail;
    } else {
      const response = await res.json();
      return response;
    }
  } catch (e) {
    console.error("Error making edit request for trail", e);
  }
};

export const deleteTrailThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteTrail(trailId));
  }
};

export const getCurrentTrailsThunk = () => async (dispatch) => {
  const res = await fetch("/api/trails/current");
  if (res.ok) {
    const { trails } = await res.json();
    dispatch(getCurrentTrails(trails));
    return;
  }
};

export const postNewReviewThunk = (formData, trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/reviews/${trailId}`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const response = await res.json();
    dispatch(postNewReview(response, trailId));
    return response;
  } else {
    const response = await res.json();
    return {
      errors: { ...response },
    };
  }
};

export const updateReviewThunk =
  (formData, trailId, reviewId) => async (dispatch) => {
    let id = parseInt(trailId);
    const res = await fetch(`/api/trails/reviews/${reviewId}/update`, {
      method: "PUT",
      body: formData,
    });
    return res;
  };

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  reviewId = parseInt(reviewId);
  const res = await fetch(`/api/trails/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

export const deleteFavoriteThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/favorites/${trailId}/delete`, {
    method: "DELETE",
  });
};

export const searchAllTrailsThunk = (query) => async (dispatch) => {
  const res = await fetch(`/api/trails/search?query=${query}`);
  if (res.ok) {
    //projects here will be filtered based on the search query
    const { trails } = await res.json();
    dispatch(getAllTrails(trails));
    return;
  } else {
    console.log("Problem with loading trails with query params");
  }
};

// --------- INITIAL STATE -------------
const initialState = { allTrails: {}, singleTrail: {}, userTrails: {} };

// ---------- REDUCER ----------

const trailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRAILS:
      return { ...state, allTrails: { ...normalizeObj(action.trails) } };
    case POST_NEW_TRAIL:
      return { ...state, singleTrail: { ...action.trail } };
    case GET_SINGLE_TRAIL:
      return { ...state, singleTrail: { ...action.trail } };
    case UPDATE_TRAIL:
      let newEditState = { ...state };
      newEditState.allTrails[action.id] = action.trail;
      return newEditState;
    case DELETE_TRAIL:
      let newDeleteState = { ...state };
      delete newDeleteState.allTrails[action.trailId];
      delete newDeleteState.singleTrail[action.trailId];
      delete newDeleteState.userTrails[action.trailId];
      return newDeleteState;
    case GET_CURRENT_TRAILS:
      return { ...state, userTrails: { ...normalizeObj(action.trails) } };
    case DELETE_REVIEW:
      let newDeleteReviewState = {
        ...state,
        singleTrail: { ...state.singleTrail },
      };
      let filteredReviews = newDeleteReviewState.singleTrail.reviews.filter(
        (review) => review.id !== action.reviewId
      );
      newDeleteReviewState.singleTrail.reviews = filteredReviews;
      return newDeleteReviewState;
    case POST_NEW_REVIEW:
      let newReviewState = { ...state };
      newReviewState.singleTrail.reviews.push(action.review);
      return newReviewState;
    default:
      return state;
  }
};

export default trailsReducer;
