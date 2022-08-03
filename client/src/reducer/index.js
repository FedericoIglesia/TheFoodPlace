import { FILTER_BY_DIETS, GET_RECIPES } from "../actions";

const initialState = {
  recipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case FILTER_BY_DIETS:
      const allRecipes = state.recipes;
      const filteredStatus =
        action.payload === "allTypes"
          ? allRecipes
          : allRecipes.filter((r) => r.diets.includes(action.payload));
      return {
        ...state,
        recipes: filteredStatus,
      };
    default:
      return state;
  }
}

export default rootReducer;
