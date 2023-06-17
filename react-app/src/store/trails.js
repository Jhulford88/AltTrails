import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = 'trails/getAllTrails'
const POST_NEW_TRAIL = 'trails/postNewTrail'
const GET_SINGLE_TRAIL = 'trails/getSingleTrail'
const UPDATE_TRAIL = 'trails/updateTrail'
const DELETE_TRAIL= "trails/deleteTrail"
const GET_CURRENT_TRAILS = "trails/getCurrentTrails"
const POST_NEW_REVIEW = 'trails/postNewReview'

// ---------- ACTION CREATORS ----------
const getAllTrails = (trails) => {
    return {
      type: GET_ALL_TRAILS,
      trails
    }
}

const postNewTrail = (trail) => {
  return {
    type: POST_NEW_TRAIL,
    trail
  }
}

const getSingleTrail = (trail) => {
  return {
    type: GET_SINGLE_TRAIL,
    trail
  }
}

const updateTrail = (trail, id) => {
  return {
    type: UPDATE_TRAIL,
    trail,
    id
  }
}

const deleteTrail = (trailId) => {
  return {
    type: DELETE_TRAIL,
    trailId
  }
}

const getCurrentTrails = (trails) => {
  return {
    type: GET_CURRENT_TRAILS,
    trails
  }
}

const postNewReview = (review) => {
  return {
    type: POST_NEW_REVIEW,
    review
  }
}

// ---------- THUNKS ----------
export const getAllTrailsThunk = () => async (dispatch) => {
    const res = await fetch('/api/trails')
    if (res.ok) {
      const { trails } = await res.json()
      // console.log('trails in thunk response from backend.....................',trails)
      dispatch(getAllTrails(trails))
      return
    } else {
      console.log("Problem with loading all trails")
    }
}

export const postNewTrailThunk = (newTrail) => async (dispatch) => {
  try {
    // console.log("Making post request to new trail route", newTrail)
    const res = await fetch('/api/trails/new', {
      method: "POST",
      body: newTrail
    })
    // console.log("Post request", res)

    if (res.ok) {
      // console.log("Response OK")
      const response = await res.json()
      // console.log("Response data", response)
      dispatch(postNewTrail(response.trail))
      return response.trail
    } else {
      // console.error("Response not OK. Status code:", res.status)
      const response = await res.json()
      // console.log("Response when res is not okay and there are errors:", response)
      return {
        errors: { ...response }
      }
    }
  } catch (e) {
    console.error('Error caught in postNewTrailThunk', e)
    return e
  }
}


export const getSingleTrailThunk = (id) => async (dispatch) => {
  // console.log("this is the id", id)
  const res = await fetch(`/api/trails/${id}`)
  if (res.ok) {
    const { single_trail } = await res.json()
    dispatch(getSingleTrail(single_trail))
    return
  } else {
    const { errors } = await res.json()
    return errors
  }
}

export const updateTrailThunk = (id, trail) => async dispatch => {
  try {
    console.log("trail has arrived in thunk............", trail)
    const res = await fetch(`/api/trails/${id}/update`, {
      method: "PUT",
      body: trail
    })
    // console.log("Edit request", res)

    if (res.ok) {
      console.log("Edit request OK", res)
      const response = await res.json();
      dispatch(updateTrail(response.trail, id))
      return response.trail;
    } else {
      // console.error('Edit response not OK')
      const response = await res.json()
      // console.error("Edit response", response)
      return response;
    }
  } catch (e) {
    console.error("Error making edit request for trail", e)
  }
}

export const deleteTrailThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    dispatch(deleteTrail(trailId))
  }
}

export const getCurrentTrailsThunk = () => async (dispatch) => {
  const res = await fetch('/api/trails/current')
  if (res.ok) {
    const { trails } = await res.json()
    // console.log(trails)
    dispatch(getCurrentTrails(trails))
    return
  }
}

export const postNewReviewThunk = (formData, trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/reviews/${trailId}`, {
    method: "POST",
    body: formData
  })
  // console.log('res after returning from backend..........', res)
  if (res.ok) {
    const response = await res.json()
    // console.log("response in post review", response)
    dispatch(postNewReview(response))
    return response
  } else {
    const response = await res.json()
    return {
      errors: { ...response }
    }
  }
}

// --------- INITIAL STATE -------------
const initialState = { allTrails: {}, singleTrail: {}, userTrails: {} }

// ---------- REDUCER ----------

const trailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_TRAILS:
          return { ...state, allTrails: { ...normalizeObj(action.trails)}}
        case POST_NEW_TRAIL:
          return { ...state, singleTrail: { ...action.trail } }
        case GET_SINGLE_TRAIL:
          return { ...state, singleTrail: { ...action.trail } }
        case UPDATE_TRAIL:
          let newEditState = { ...state }
          newEditState.allTrails[action.id] = action.trail
          return newEditState
        case DELETE_TRAIL:
          let newDeleteState = { ...state }
          delete newDeleteState.allTrails[action.trailId]
          delete newDeleteState.singleTrail[action.trailId]
          delete newDeleteState.userTrails[action.trailId]
          return newDeleteState
        case GET_CURRENT_TRAILS:
          return { ...state, userTrails: { ...normalizeObj(action.trails) } }
        default:
          return state
    }
}

export default trailsReducer
