import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets, getRecipes } from "../actions/index";
import RecipeSubmit from "./RecipeSubmit";
import DuplicateNote from "./DuplicateNote";
import * as r from "./RecipeCreation.module.css";

//Creating a controlling function to prevent the user from submitting an invalid post
function control(input) {
  let invalidValues = {};
  if (!input.name) {
    invalidValues.name = "Please complete the name of the recipe";
    // delete invalidValues.name;
  }
  if (!input.summary) {
    invalidValues.summary = "Please complete a summary of your dish";
  }
  if (input.healthScore < 1 || input.healthScore > 100) {
    invalidValues.healthScore =
      "Please select a health score between 1 and 100.";
  }
  if (!input.steps) {
    invalidValues.steps = "Please complete the necessary steps for this recipe";
  }
  if (input.diet) invalidValues.diet = "Please complete at least one diet type";

  return invalidValues;
}

export default function RecipeCreation() {
  const dispatch = useDispatch();

  //not sure if i wanna add this yet...
  // const history = useHistory();

  const dietState = useSelector((state) => state.diets);
  const recipes = useSelector((state) => state.recipes);
  const [posted, setPosted] = useState("");
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diet: [],
  });
  const [invalidValues, setInvalidValues] = useState({});

  //handling input changes (text & textarea) & setting invalidValues state to control the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInvalidValues(
      control({
        ...input,
        [name]: value,
      })
    );
  };

  //handling checkboxes. If checked then assign the value to the local state diet array. If unchecked, remove it.
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diet: [...input.diet, e.target.value],
      });
    } else
      setInput((prev) => ({
        ...input,
        diet: prev.diet.filter((d) => d !== e.target.value),
      }));
  }

  // At the moment of submit i'll check if there's an existing recipe in our global state that matches the one being submitted. If there is, i'll advise the user that it's a duplicate and will not be posted. This is consistent with the duplicate check i did on my backend post route.
  function handleSubmit(e) {
    e.preventDefault();
    if (input.name === "") {
      alert("Please complete the name");
    } else {
      dispatch(postRecipe(input));
      setInput({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diet: [],
      });

      if (!recipes.some((r) => r.name.includes(input.name))) {
        setPosted("success");
      } else setPosted("duplicate");
    }

    // setTimeout(() => {
    //   history.push("/home");
    // }, 4000);
  }

  //Getting the diet types list from the global state when the component is first rendered.
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecipes());
  }, [posted, dispatch]);

  //Displaying a notification to the user to advise that the creation was successful. Watching the "posted" local state
  useEffect(() => {
    if (posted === "success" || posted === "duplicate")
      setTimeout(() => {
        setPosted("");
      }, 4000);
  }, [posted]);

  return (
    <div className={r["recipe-create-container"]}>
      {posted === "success" ? (
        <RecipeSubmit />
      ) : posted === "duplicate" ? (
        <DuplicateNote />
      ) : (
        <div className={r["form-container"]}>
          <Link to="/home">
            <button className={r["form-btn"]}>Back</button>
          </Link>
          <h1 className={r["form-title"]}>Submit Your Own Recipe!</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={r["form-input-container"]}>
              <label>
                Name:
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  key={1}
                  onChange={(e) => handleChange(e)}
                  placeholder="Name of your recipe"
                />
              </label>
              {invalidValues.name && (
                <p className={r["form-input-errors-name"]}>
                  {invalidValues.name}
                </p>
              )}
              <label>
                Summary:
                <input
                  type="text"
                  value={input.summary}
                  name="summary"
                  key={2}
                  onChange={(e) => handleChange(e)}
                  placeholder="Write a short summary of your dish"
                />
              </label>
              {invalidValues.summary && (
                <p className={r["form-input-errors-summary"]}>
                  {invalidValues.summary}
                </p>
              )}
              <label>
                Health Score:
                <input
                  type="number"
                  value={input.healthScore}
                  name="healthScore"
                  key={3}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              {invalidValues.healthScore && (
                <p className={r["form-input-errors-score"]}>
                  {invalidValues.healthScore}
                </p>
              )}
              <label>
                Steps:
                <textarea
                  value={input.steps}
                  name="steps"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              {invalidValues.steps && (
                <p className={r["form-input-errors-steps"]}>
                  {invalidValues.steps}
                </p>
              )}
              <label>Diet Type:</label>
              <div className={r["form-checkbox-container"]}>
                {/* rendering the checkboxes with the diets gotten from the global state */}
                {dietState.map((d, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name={d}
                      value={d}
                      key={d}
                      onChange={(e) => handleCheck(e)}
                    />
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </label>
                ))}
              </div>
              {!input.diet.length && (
                <p className={r["form-input-errors-diets"]}>
                  {invalidValues.diet}
                </p>
              )}
            </div>
            {Object.keys(invalidValues).length > 0 && input.diet.length ? (
              <button className={r["form-btn-submit"]} type="submit">
                Submit Recipe
              </button>
            ) : (
              <button
                className={r["form-btn-submit-disabled"]}
                type="submit"
                disabled
              >
                Submit Recipe
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
