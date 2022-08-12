import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions/index";

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
  let unique = [...new Set(arr)];
  console.log(unique);

  return (
    <div>
      {Object.keys(myRecipe).length ? (
        <div>
          <img
            src={
              Object.keys(myRecipe).find((i) => i === "image")
                ? myRecipe.image
                : "https://thesmartwander.com/wp-content/uploads/2020/09/how-to-draw-food-3-1024x1024.jpg"
            }
            alt="Not Found"
            width="300px"
            height="350px"
          />
          <h1>{myRecipe.name}</h1>
          <h3>
            {Object.keys(myRecipe).find((e) => e === "dishTypes")
              ? myRecipe.dishTypes.map((dish) => "- " + dish + " -")
              : "No dish types description available for this recipe"}
          </h3>
          <h3>
            {typeof myRecipe.diets[0] === "string"
              ? myRecipe.diets.map((d) => d + " ")
              : myRecipe.diets.map((d) => d.name)}
          </h3>
          <p>{myRecipe.summary.replace(/<[^>]+>/g, "")}</p>
          <p>Health Score:{myRecipe.healthScore}</p>
          <h4>Steps:</h4>
          <p>
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
          {typeof myRecipe.steps !== "string" && <h4>Ingredients:</h4>}
          <div>
            {unique.map((u) =>
              u.map((un) => {
                return (
                  <div>
                    <ul>
                      {/* it automatically adds commas! */}
                      <li>{un}</li>
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
