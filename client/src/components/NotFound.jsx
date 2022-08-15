import React from "react";
import nf from "./NotFound.module.css";
import logo from "../not-found3.png";

function NotFound() {
  return (
    <div className={nf["not-found-container"]}>
      <h1 className={nf["not-found__title"]}>NO RECIPES FOUND</h1>
      <img className={nf["not-found__img"]} src={logo} />
    </div>
  );
}

export default NotFound;
