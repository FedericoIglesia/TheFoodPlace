import React from "react";
import r from "./Recipe.module.css";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //the diet types from the API come in as an array of strings, while from the DB they come in as an array of objects. Doing a conditional rendering below depending on the source of information.
    let obj = this.props.diets.map((d) => d.name + "");
    let str = this.props.diets.map((d) => d + "   ");

    return (
      <div className={r["recipe-container"]}>
        <div className={r["recipe-img-container"]}>
          <img
            className={r["recipe-img"]}
            src={this.props.image}
            alt="not found"
          />
        </div>
        <h3 className={r["recipe-name"]}>{this.props.name}</h3>
        {typeof this.props.diets[0] == "string" ? (
          <h4 className={r["recipe-diets"]}>{str + " "}</h4>
        ) : (
          <h4 className={r["recipe-diets"]}>{obj + " "}</h4>
        )}
      </div>
    );
  }
}

// export default function Recipe({ image, name, diets }) {
//   //destructuring from props

//   //the diet types from the API come in as an array of strings, while from the DB they come in as an array of objects. Doing a conditional rendering below depending on the source of information.

// let obj = diets.map((d) => d.name + ", ");
// let str = diets.map((d) => d + ", ");

//   return (
// <div>
//   <img src={image} alt="not found" width="200px" height="250px" />
//   <h3>{name}</h3>
//   {typeof diets[0] == "string" ? <h4>{str}</h4> : <h4>{obj}</h4>}
//   <p></p>
// </div>
//   );
// }
