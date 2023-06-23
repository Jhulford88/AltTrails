import { normalizeObj } from "./helpers";

// ------------ TYPE VARIABLES ------------
const GET_CATEGORIES = "category/getCategories";

// ---------- ACTION CREATORS ----------
export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  };
};

// ---------- THUNKS ----------
export const getCategoriesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/categories`);
  if (response.ok) {
    const { categories } = await response.json();
    console.log("thunk categories", categories);
    dispatch(getCategories(categories));
  } else {
    console.log("There was an error getting all categories!");
  }
};

// --------- INITIAL STATE -------------
const initialState = {};

// ---------- REDUCER ----------
const category = (state = initialState, action) => {
  console.log("Action", action, state);
  let newState;
  switch (action.type) {
    case GET_CATEGORIES:
      newState = { ...state };
      newState.categories = normalizeObj(action.categories);
      return newState;
    default:
      return state;
  }
};

export default category;
