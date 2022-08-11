import {
  FILTER_BY_DIETS,
  GET_RECIPES,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  SEARCH_NAME_RECIPES,
  SEARCH_NAME_RECIPES_REJECTED,
  GET_DIETS,
  POST_RECIPE,
} from "../actions";

const initialState = {
  recipes: [],
  totalRecipes: [], //saving the total list of recipes to avoid issues with the filtering
  diets: [],
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
              return null;
            });
      return {
        ...state,
        recipes: filteredStatus,
      };

    case ORDER_BY_NAME:
      const sortedName =
        action.payload === "asc"
          ? state.totalRecipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              else return -1;
            })
          : state.totalRecipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              else return 1;
            });
      return {
        ...state,
        recipes: sortedName,
      };

    case ORDER_BY_SCORE:
      const sortedScore =
        action.payload === "up"
          ? state.recipes.sort((a, b) => {
              if (a.score > b.score) return 1;
              else return -1;
            })
          : state.recipes.sort((a, b) => {
              if (a.score < b.score) return 1;
              else return -1;
            });

      return {
        ...state,
        recipes: sortedScore,
      };

    case SEARCH_NAME_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case SEARCH_NAME_RECIPES_REJECTED:
      return {
        ...state,
        recipes: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
