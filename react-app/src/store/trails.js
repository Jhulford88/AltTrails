import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = 'trails/getAllTrails'
const POST_NEW_TRAIL = 'trails/postNewTrail'


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



// ---------- THUNKS ----------
export const getAllTrailsThunk = () => async (dispatch) => {
    const res = await fetch('/api/trails')
    if (res.ok) {
      const { trails } = await res.json()
      console.log('trails in thunk response from backend.....................',trails)
      dispatch(getAllTrails(trails))
      return
    } else {
      console.log("Problem with loading all trails")
    }
}

export const postNewTrailThunk = (newTrail) => async (dispatch) => {
  try {
    console.log("Making post request to new trail route", newTrail)
    const res = await fetch('/api/trails/new', {
      method: "POST",
      body: newTrail
    })
    console.log("Post request", res)

    if (res.ok) {
      console.log("Response OK")
      const response = await res.json()
      console.log("Response data", response)
      dispatch(postNewTrail(response.trail))
      return response.trail
    } else {
      console.error("Response not OK. Status code:", res.status)
      const response = await res.json()
      console.log("Response when res is not okay and there are errors:", response)
      return {
        errors: { ...response }
      }
    }
  } catch (e) {
    console.error('Error caught in postNewTrailThunk', e)
    return e
  }
}



// --------- INITIAL STATE -------------
const initialState = { allTrails: {}, singleTrail: {} }

// ---------- REDUCER ----------

const trailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_TRAILS:
            return { ...state, allTrails: { ...normalizeObj(action.trails)}}
        default:
          return state
        case POST_NEW_TRAIL:
          return { ...state, singleTrail: { ...action.trail } }
    }
}

export default trailsReducer
