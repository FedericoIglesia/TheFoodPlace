import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";

export default function Home() {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick() {
    dispatch(getRecipes());
  }

  return (
    <div>
      <Link to="/recipes">Create New Recipe</Link>
      <h1>The Food Place</h1>
      <button onClick={handleClick}>Reload all recipes</button>
      <div>
        <select>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select>
          <option value="asc">Greater Health Score</option>
          <option value="desc">Lower Health Score</option>
        </select>

        {/* //can i map these below from my records in the db?} */}
        <select>
          <option value="allTypes">All Diet Types</option>
          <option value="glutenFree">Gluten Free</option>
          <option value="keto">Ketogenic</option>
          <option value="lacto-veg">Lacto-Vegetarian</option>
          <option value="ovo-veg">Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pesca">Pescatarian</option>
          <option value="paleo">Paleo</option>
          <option value="primal">Primal</option>
          <option value="lowfo">Low Fodmap</option>
          <option value="whole30">Whole30</option>
        </select>
        {allRecipes?.map((r) => {
          return (
            <>
              <Link to={"/home/" + r.id}>
                <Recipe image={r.image} name={r.name} diet={r.dietType} />;
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
