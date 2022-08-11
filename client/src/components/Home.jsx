import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDiets,
  getRecipes,
  orderByName,
  orderByScore,
} from "../actions";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import NotFound from "./NotFound";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  //setting up local states for the pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [order, setOrder] = useState("");

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  //getting the recipes from the global state by slicing the state array by the index. Since i'm slicing up to the 9th index(not included) i'm getting 9 recipes per page

  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick() {
    console.log(currentRecipes);
    dispatch(getRecipes());
  }

  function handleDietFilter(e) {
    dispatch(filterByDiets(e.target.value));
  }

  function handleOrderByName(e) {
    // e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  function handleOrderByScore(e) {
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  return (
    <div>
      <Link to="/recipe">Create New Recipe</Link>
      <h1>The Food Place</h1>
      <SearchBar />
      <button onClick={(e) => handleClick(e)}>Reload all recipes</button>{" "}
      <div>
        <select onChange={(e) => handleOrderByName(e)} defaultValue={"default"}>
          <option disabled value="default">
            Order By Name
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e) => handleOrderByScore(e)}
          defaultValue={"default"}
        >
          <option value="default" disabled>
            Order By Health Score
          </option>
          <option value="up">Greater Health Score</option>
          <option value="down">Lower Health Score</option>
        </select>
        {/* //can i map these below from my records in the db?} */}
        <select onChange={(e) => handleDietFilter(e)}>
          <option value="allTypes">All Diet Types</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="dairy free">Dairy Free</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleo">Paleo</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole30</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
        </select>
        {allRecipes === "ERR" ? (
          <NotFound />
        ) : (
          currentRecipes?.map((r) => {
            return (
              <>
                <Link to={"/home/" + r.id}>
                  <Recipe
                    image={
                      r.image
                        ? r.image
                        : "https://thesmartwander.com/wp-content/uploads/2020/09/how-to-draw-food-3-1024x1024.jpg"
                    }
                    name={r.name}
                    diets={r.diets}
                    key={r.id}
                  />
                  ;
                </Link>
              </>
            );
          })
        )}
      </div>
      {allRecipes !== "ERR" && (
        <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pages={pages}
          key={pages}
        />
      )}
    </div>
  );
}

// "https://www.fao.org/3/a0104e/a0104e0c.jpg";
