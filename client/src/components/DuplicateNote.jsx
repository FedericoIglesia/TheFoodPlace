import React from "react";
import p from "./DuplicateNote.module.css";
import check from "../duplicate-check.ico";

function DuplicateNote() {
  return (
    <div className={p["duplicate-container"]}>
      <h1 className={p["duplicate-title"]}>This recipe already exists!</h1>
      <p className={p["duplicate-description"]}>
        Please submit a recipe with a different name
      </p>
      <img className={p["duplicate-img"]} src={check} />
    </div>
  );
}

export default DuplicateNote;
