import React from "react";
import { Link } from "react-router-dom";
import * as l from "./LandingPage.module.css";
export default class LandingPage extends React.Component {
  render() {
    return (
      <div className={l["landing-bg-img"]}>
        <h2 className={l["landing-title__1st"]}>Welcome to</h2>
        <h1 className={l["landing-title__2nd"]}>
          <span>The</span> FoodPlace
        </h1>
        <Link to="/home">
          <button className={l["landing-button"]}>Let's Cook!</button>
        </Link>
      </div>
    );
  }
}
