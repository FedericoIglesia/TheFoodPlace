import React from "react";

export default function Recipe({ image, name, diets }) {
  //destructuring from props

  //the diet types from the API come in as an array of strings, while from the DB they come in as an array of objects. Doing a conditional rendering below depending on the source of information.
  let obj = diets.map((d) => d.name + ", ");
  let str = diets.map((d) => d + ", ");

  return (
    <div>
      <img src={image} alt="not found" width="200px" height="250px" />
      <h3>{name}</h3>
      {typeof diets[0] == "string" ? <h4>{str}</h4> : <h4>{obj}</h4>}
    </div>
  );
}
