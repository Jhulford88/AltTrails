import { normalizeObj } from "./helpers";

// ------------ TYPE VARIABLES ------------
const GET_ALL_COLLECTIONS = "collections/getAllCollections";

// ---------- ACTION CREATORS ----------
const getAllCollections = (collections) => {
  return {
    type: GET_ALL_COLLECTIONS,
    collections,
  };
};

// ---------- THUNKS ----------
export const getAllCollectionsThunk = () => async (dispatch) => {
  const res = await fetch("/api/collections");
  if (res.ok) {
    const { collections } = await res.json();
    dispatch(getAllCollections(collections));
    return;
  } else {
    console.log("Problem with loading all collections");
  }
};

// --------- INITIAL STATE -------------
const initialState = { allCollections: {} };

// ---------- REDUCER ----------
const collections = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        allCollections: { ...normalizeObj(action.collections) },
      };
    default:
      return state;
  }
};

export default collections;
