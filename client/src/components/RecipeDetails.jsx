import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions/index";
import * as r from "./RecipeDetails.module.css";

function RecipeDetails(props) {
  const dispatch = useDispatch();
  const myRecipe = useSelector((state) => state.detail) || [];
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  //In order to display an unordered list of ingredients without duplicates, i need to store my nested array in a variable and remove the duplicates before the render. Using the Set constructor to get a unique set of values. Spreading it into an array to do a map of list items in the render.
  let arr;
  if (Object.keys(myRecipe).length) {
    if (Array.isArray(myRecipe.steps)) {
      arr = myRecipe.steps.map((s) => s.ingredients.map((i) => i.name));
    }
  }

  //Ingredients is an array of objects, inside an object inside an array, inside another array...
  let unique = [...new Set(arr)];
  let unique2 = [...new Set(unique.flat())];
  console.log(unique2);

  //   const ulStyle = {
  //     textAlign: "left",
  //   };

  return (
    <div>
      {Object.keys(myRecipe).length ? (
        <div className={r["recipe-details-container"]}>
          <img
            src={
              Object.keys(myRecipe).find((i) => i === "image")
                ? myRecipe.image
                : "https://thesmartwander.com/wp-content/uploads/2020/09/how-to-draw-food-3-1024x1024.jpg"
            }
            alt="Not Found"
            width="300px"
            height="350px"
            className={r["recipe-details-img"]}
          />
          <h1 className={r["recipe-details-title"]}>{myRecipe.name}</h1>
          <h3 className={r["recipe-details-dish"]}>
            {Object.keys(myRecipe).find((e) => e === "dishTypes")
              ? myRecipe.dishTypes.map((dish) => "- " + dish + " -")
              : "No dish types description available for this recipe"}
          </h3>
          <h3 className={r["recipe-details-diets"]}>
            {typeof myRecipe.diets[0] === "string"
              ? myRecipe.diets.map((d) => d + " ")
              : myRecipe.diets.map((d) => d.name)}
          </h3>
          <p className={r["recipe-details-summary"]}>
            {myRecipe.summary.replace(/<[^>]+>/g, "")}
          </p>
          <p className={r["recipe-details-score"]}>
            Health Score:<span>{myRecipe.healthScore}</span>
          </p>
          <h4 className={r["recipe-details-steps-title"]}>Steps:</h4>
          <p className={r["recipe-details-steps"]}>
            {typeof myRecipe.steps === "string"
              ? myRecipe.steps
              : myRecipe.steps.map((s) => (
                  <>
                    <div>
                      {s.number}: {s.step}
                    </div>
                    {/* <br></br> */}
                  </>
                ))}
          </p>
          {typeof myRecipe.steps !== "string" && (
            <h4 className={r["recipe-details-ingredients-title"]}>
              Ingredients:
            </h4>
          )}
          <div className={r["recipe-details-ingredients"]}>
            {unique2.map((u) => {
              return (
                <div>
                  <ul>
                    <li>{u}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={r["recipe-details-loader-container"]}>
          <p className={r["recipe-details-loader"]}>Loading recipes...</p>
          <div class={r["recipe-details-hourglass"]}></div>
        </div>
      )}
      <Link to="/home">
        <button className={r["recipe-details-btn"]}>Go Back</button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
