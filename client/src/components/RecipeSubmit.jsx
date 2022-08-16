import React from "react";
import * as s from "./RecipeSubmit.module.css";
import check from "../submit-check-icon.ico";

function RecipeSubmit() {
  return (
    <div className={s["submit-container"]}>
      <h1 className={s["submit-title"]}>Recipe Submitted!</h1>
      <img src={check} className={s["submit-img"]} alt="submit" />
    </div>
  );
}

export default RecipeSubmit;
