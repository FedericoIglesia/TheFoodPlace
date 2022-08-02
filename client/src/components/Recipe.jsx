import React from "react";

export default function Recipe({ image, name, dietType }) {
  //destructuring from props
  return (
    <div>
      <img src={image} alt="not found" width="200px" height="250px" />
      <h3>{name}</h3>
      <h4>{dietType}</h4>
    </div>
  );
}
