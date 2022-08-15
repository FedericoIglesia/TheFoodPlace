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
import NotFound from "./NotFound";
import Nav from "./Nav";
import * as h from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  //setting up local states for the pagination

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  // eslint-disable-next-line
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
    <div className={h.container}>
      <Nav />
      <div className={h["home-container"]}>
        <div className={h["home-filters-container"]}>
          <select
            className={h["home-filters"]}
            onChange={(e) => handleOrderByName(e)}
            defaultValue={"default"}
          >
            <option disabled value="default">
              By Name
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className={h["home-filters"]}
            onChange={(e) => handleOrderByScore(e)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              By Health Score
            </option>
            <option value="up">Greater</option>
            <option value="down">Lower</option>
          </select>
          {/* //can i map these below from my records in the db?} */}
          <select
            className={h["home-filters"]}
            onChange={(e) => handleDietFilter(e)}
          >
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
        </div>
        <button
          onClick={(e) => handleClick(e)}
          className={h["home-reload-button"]}
        >
          Reload all recipes
        </button>{" "}
        <div className={h["home-recipes-container"]}>
          {!currentRecipes.length ? (
            <p className={h["home-recipes-loader"]}>Loading recipes...</p>
          ) : allRecipes === "ERR" ? (
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
                  </Link>
                </>
              );
            })
          )}
        </div>
        <div className={h["home-pagination-container"]}>
          {allRecipes !== "ERR" && (
            <Pagination
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              pages={pages}
              key={pages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// "https://www.fao.org/3/a0104e/a0104e0c.jpg";
