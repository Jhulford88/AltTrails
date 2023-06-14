import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_ALL_TRAILS = 'trails/getAllTrails'


// ---------- ACTION CREATORS ----------
const getAllTrails = (trails) => {
    return {
      type: GET_ALL_TRAILS,
      projects
    }
  }



// ---------- THUNKS ----------
export const getAllTrailsThunk = () => async (dispatch) => {
    const res = await fetch('/api/trails')
    if (res.ok) {
      const { trails } = await res.json()
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

        default:
          return state
    }
}

export default trailsReducer
