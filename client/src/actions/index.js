import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const SEARCH_NAME_RECIPES = "SEARCH_NAME_RECIPES";
export const SEARCH_NAME_RECIPES_REJECTED = "SEARCH_NAME_RECIPES_REJECTED";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const POST_RECIPE_DUPLICATE = "POST_RECIPE_DUPLICATE";
export const GET_DETAIL = "GET_DETAIL";

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
      // alert("No recipes with that name");
      console.log("No recipes with that name ---->  " + err);
      return dispatch({
        type: SEARCH_NAME_RECIPES_REJECTED,
        payload: "ERR",
      });
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let dietInfo = await axios("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: dietInfo.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes", payload);
    return dispatch({
      type: POST_RECIPE,
      payload: response.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
}
