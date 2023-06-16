import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = 'trails/getAllTrails'
const POST_NEW_TRAIL = 'trails/postNewTrail'
const GET_SINGLE_TRAIL = 'trails/getSingleTrail'
const UPDATE_TRAIL = 'trails/updateTrail'

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


// --------- INITIAL STATE -------------
const initialState = { allTrails: {}, singleTrail: {} }

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
        default:
          return state
    }
}

export default trailsReducer
