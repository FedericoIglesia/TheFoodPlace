import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import * as n from "./Nav.module.css";

function Nav() {
  return (
    <div className={n.container}>
      <nav className={n.nav}>
        <div className={n["nav-container"]}>
          <Link to="/">
            <h1 className={n["nav-container__title"]}>
              <span>The </span>FoodPlace
            </h1>
          </Link>
          <SearchBar />
          <ul className={n["nav-container__ul"]}>
            <Link to="/home">
              <li>Home</li>
            </Link>
            <Link>
              <li>About</li>
            </Link>
            <Link to="/recipe">
              <li>Create</li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
