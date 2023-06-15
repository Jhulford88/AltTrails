import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = 'trails/getAllTrails'


// ---------- ACTION CREATORS ----------
const getAllTrails = (trails) => {
    return {
      type: GET_ALL_TRAILS,
      trails
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


// --------- INITIAL STATE -------------
const initialState = { allTrails: {}, singleTrail: {} }

// ---------- REDUCER ----------

const trailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_TRAILS:
            return { ...state, allTrails: { ...normalizeObj(action.trails)}}
        default:
          return state
    }
}

export default trailsReducer
