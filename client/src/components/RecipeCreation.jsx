import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../actions/index";
import RecipeSubmit from "./RecipeSubmit";

export default function RecipeCreation() {
  const dispatch = useDispatch();

  //not sure if i wanna add this yet...
  // const history = useHistory();

  const dietState = useSelector((state) => state.diets);
  const [posted, setPosted] = useState("");
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diet: [],
  });

  //handling input changes (text & textarea)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    setPosted("success");
    setInput({
      name: "",
      summary: "",
      healthScore: 0,
      steps: "",
      diet: [],
    });

    // setTimeout(() => {
    //   history.push("/home");
    // }, 4000);
  }

  //Getting the diet types list from the global state when the component is first rendered.
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  //Displaying a notification to the user to advise that the creation was successful. Watching the "posted" local state
  useEffect(() => {
    if (posted === "success")
      setTimeout(() => {
        setPosted("");
      }, 2000);
  }, [posted]);

  return (
    <>
      {posted === "success" ? (
        <RecipeSubmit />
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
                />
              </label>
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
              <label>
                Steps:
                <textarea
                  value={input.steps}
                  name="steps"
                  onChange={(e) => handleChange(e)}
                />
              </label>
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
            </div>
            <button type="submit">Submit Recipe</button>
          </form>
        </div>
      )}
    </>
  );
}
