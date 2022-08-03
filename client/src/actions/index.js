import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";

export function getRecipes() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/recipes"); //check for proxys in the package json for /
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
}

export function filterByDiets(payload) {
  console.log(payload);
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}
