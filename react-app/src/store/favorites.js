import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_FAVORITES = 'favorites/getFavorites';

// ---------- ACTION CREATORS ----------



// ---------- THUNKS ----------


// --------- INITIAL STATE -------------
const initialState = {};

// ---------- REDUCER ----------
const favoritesReducer = (state = initialState, action) => {
    // console.log("Action", action, state)
    // let newState;
    switch (action.type) {

        default:
            return state;
  }
};

export default favoritesReducer;
