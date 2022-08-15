import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../actions";
import * as s from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    if (name) {
      dispatch(searchRecipes(name));
      setName("");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search for dozens of recipes!"
        onChange={(e) => handleInput(e)}
        value={name}
        className={s["search-bar"]}
      />
      <button type="submit" className={s["search-bar__button"]}>
        Go
      </button>
    </form>
  );
}

export default SearchBar;
