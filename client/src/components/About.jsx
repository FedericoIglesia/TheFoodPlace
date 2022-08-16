import React from "react";
import { Link } from "react-router-dom";
import * as a from "./About.module.css";
import soon from "../coming-soon.png";

function About() {
  return (
    <div className={a["about-container"]}>
      {/* <h1>About Me: </h1> */}
      <Link to="/home">
        <button className={a["about-home-btn"]}>Back</button>
      </Link>
      <div>
        <img className={a["about-img"]} src={soon} alt="" />
      </div>
    </div>
  );
}

export default About;
