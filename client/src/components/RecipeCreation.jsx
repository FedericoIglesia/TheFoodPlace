import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postRecipe,
  getDiets,
  searchRecipes,
  getRecipes,
} from "../actions/index";
import RecipeSubmit from "./RecipeSubmit";
import DuplicateNote from "./DuplicateNote";

//Creating a controlling function to prevent the user from submitting an invalid post
function control(input) {
  let invalidValues = {};
  if (!input.name) {
    invalidValues.name = "Please complete the name of the recipe";
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

    // setTimeout(() => {
    //   history.push("/home");
    // }, 4000);
  }

  //Getting the diet types list from the global state when the component is first rendered.
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  useEffect(() => {
    dispatch(getRecipes());
  }, [posted]);

  //Displaying a notification to the user to advise that the creation was successful. Watching the "posted" local state
  useEffect(() => {
    if (posted === "success" || posted === "duplicate")
      setTimeout(() => {
        setPosted("");
      }, 2000);
  }, [posted]);

  return (
    <>
      {posted === "success" ? (
        <RecipeSubmit />
      ) : posted === "duplicate" ? (
        <DuplicateNote />
      ) : (
        <div>
          <Link to="/home">
            <button>Back To Home</button>
          </Link>
          <h1>Submit Your Own Recipe!</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  key={1}
                  onChange={(e) => handleChange(e)}
                  placeholder="Name of your recipe"
                  required
                />
              </label>
              {invalidValues.name && (
                <p className="formInput-errors">{invalidValues.name}</p>
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
                <p className="formInput-errors">{invalidValues.summary}</p>
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
                <p className="formInput-errors">{invalidValues.healthScore}</p>
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
                <p className="formInput-errors">{invalidValues.steps}</p>
              )}
              <label>Diet Type:</label>
              {/* rendering the checkboxes with the diets gotten from the global state */}
              {dietState.map((d) => (
                <label>
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
              {!input.diet.length && (
                <p className="formInput-errors">{invalidValues.diet}</p>
              )}
            </div>
            {Object.keys(invalidValues).length && input.diet.length ? (
              <button type="submit">Submit Recipe</button>
            ) : (
              <button type="submit" disabled>
                Submit Recipe
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
