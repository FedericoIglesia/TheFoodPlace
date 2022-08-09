import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const SEARCH_NAME_RECIPES = "SEARCH_NAME_RECIPES";

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
  // console.log(payload);
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function orderByName(payload) {
  console.log(payload);
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export function searchRecipes(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      console.log(response.data);
      return dispatch({
        type: SEARCH_NAME_RECIPES,
        payload: response.data,
      });
    } catch (err) {
      console.log("no recipe  " + err);
    }
  };
}
