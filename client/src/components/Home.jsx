import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiets, getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  //setting up local states for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOffirstRecipe = indexOfLastRecipe - recipesPerPage;
  //getting the recipes from the global state by slicing the state array by the index. Since i'm slicing up to the 9th index(not included) i'm getting 9 recipes per page
  const currentRecipes = allRecipes.slice(
    indexOffirstRecipe,
    indexOfLastRecipe
  );

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick() {
    dispatch(getRecipes());
  }

  function handleDietFilter(e) {
    dispatch(filterByDiets(e.target.value));
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
        <select onChange={(e) => handleDietFilter(e)}>
          <option value="allTypes">All Diet Types</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="lacto-vegetarian">Lacto-Vegetarian</option>
          <option value="ovo-vegetarian">Ovo-Vegetarian</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleo">Paleo</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low Fodmap</option>
          <option value="whole30">Whole30</option>
        </select>
        {currentRecipes?.map((r) => {
          return (
            <>
              <Link to={"/home/" + r.id}>
                <Recipe image={r.image} name={r.name} diets={r.diets} />;
              </Link>
            </>
          );
        })}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        pages={pages}
      />
    </div>
  );
}
