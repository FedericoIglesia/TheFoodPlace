import React from "react";

export default function Recipe({ image, name, diets }) {
  //destructuring from props
  return (
    <div>
      <img src={image} alt="not found" width="200px" height="250px" />
      <h3>{name}</h3>
      <h4>{diets}</h4>
    </div>
  );
}
