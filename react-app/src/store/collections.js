import { normalizeObj } from "./helpers";

// ------------ TYPE VARIABLES ------------
const GET_ALL_COLLECTIONS = "collections/getAllCollections";
const GET_SINGLE_COLLECTION = "collections/getSingleCollection";

// ---------- ACTION CREATORS ----------
const getAllCollections = (collections) => {
  return {
    type: GET_ALL_COLLECTIONS,
    collections,
  };
};

const getSingleCollection = (single_collection) => {
  return {
    type: GET_SINGLE_COLLECTION,
    single_collection,
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

export const getSingleCollectionThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/collections/${id}`);
  if (res.ok) {
    const { single_collection } = await res.json();
    dispatch(getSingleCollection(single_collection));
    return;
  } else {
    const { errors } = await res.json();
    return errors;
  }
};

// --------- INITIAL STATE -------------
const initialState = { allCollections: {}, singleCollection: {} };

// ---------- REDUCER ----------
const collections = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        allCollections: { ...normalizeObj(action.collections) },
      };
    case GET_SINGLE_COLLECTION:
      return { ...state, singleCollection: { ...action.single_collection } };
    default:
      return state;
  }
};

export default collections;
