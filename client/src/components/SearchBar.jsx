import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../actions";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(searchRecipes(name));
    setName("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search for dozens of recipes"
        onChange={(e) => handleInput(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
