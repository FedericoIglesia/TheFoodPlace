import React from "react";
import * as s from "./RecipeSubmit.module.css";
import plane from "../submitted2.png";

function RecipeSubmit() {
  return (
    <div className={s["submit-container"]}>
      <h1 className={s["submit-title"]}>RECIPE SUBMITTED!!</h1>
      <img src={plane} className={s["submit-img"]} />
    </div>
  );
}

export default RecipeSubmit;
