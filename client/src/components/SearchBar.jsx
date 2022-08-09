import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../actions";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRecipes(name));
    setName("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search for dozens of recipes"
        onChange={(e) => handleSearch(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
