import { normalizeObj } from "./helpers";

// ------------ TYPE VARIABLES ------------
const GET_ALL_COLLECTIONS = "collections/getAllCollections";
const GET_SINGLE_COLLECTION = "collections/getSingleCollection";
const GET_CURRENT_COLLECTIONS = "collections/getCurrentCollections";
const DELETE_COLLECTION = "collections/deleteCollection";

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

const getCurrentCollections = (collections) => {
  return {
    type: GET_CURRENT_COLLECTIONS,
    collections,
  };
};

const deleteCollection = (collectionId) => {
  return {
    type: DELETE_COLLECTION,
    collectionId,
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

export const getCurrentCollectionsThunk = () => async (dispatch) => {
  const res = await fetch("/api/collections/current");
  if (res.ok) {
    const { collections } = await res.json();
    dispatch(getCurrentCollections(collections));
    return;
  }
};

export const deleteCollectionThunk = (collectionId) => async (dispatch) => {
  collectionId = parseInt(collectionId);
  console.log("hello from inside deleteCollection thunk.......");
  const res = await fetch(`/api/collections/${collectionId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    console.log("res was ok..........");
    dispatch(deleteCollection(collectionId));
  }
};

// --------- INITIAL STATE -------------
const initialState = {
  allCollections: {},
  singleCollection: {},
  userCollections: {},
};

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
    case GET_CURRENT_COLLECTIONS:
      return {
        ...state,
        userCollections: { ...normalizeObj(action.collections) },
      };
    case DELETE_COLLECTION:
      let newDeleteState = { ...state };
      delete newDeleteState.userCollections[action.collectionId];
      return newDeleteState;
    default:
      return state;
  }
};

export default collections;
