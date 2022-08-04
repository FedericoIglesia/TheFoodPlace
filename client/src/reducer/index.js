import { FILTER_BY_DIETS, GET_RECIPES, ORDER_BY_NAME } from "../actions";

const initialState = {
  recipes: [],
  totalRecipes: [], //saving the total list of recipes to avoid issues with the filtering
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        totalRecipes: action.payload,
      };
    case FILTER_BY_DIETS:
      const allRecipes = state.totalRecipes;
      const filteredStatus =
        action.payload === "allTypes"
          ? allRecipes
          : allRecipes.filter((recipe) => {
              if (recipe.diets.length) {
                //looking for recipes from the db
                if (recipe.diets.find((d) => d.name === action.payload))
                  return recipe;
                //looking for the recipes from the API s
                if (recipe.diets.find((diet) => diet === action.payload))
                  return recipe;
              }
            });
      return {
        ...state,
        recipes: filteredStatus,
      };
    case ORDER_BY_NAME:
      const order = action.payload;
      if (order === "asc") {
        order.sort();
      }
    default:
      return state;
  }
}

export default rootReducer;
