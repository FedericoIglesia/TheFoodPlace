import React from "react";
import { Link } from "react-router-dom";
import * as l from "./LandingPage.module.css";
export default class LandingPage extends React.Component {
  render() {
    return (
      <div className={l["landing-bg-img"]}>
        <h1 className={l["landing-title"]}>
          Welcome to
          <span> The Food Place</span>
        </h1>
        <Link to="/home">
          <button className={l["landing-button"]}>Let's Cook!</button>
        </Link>
      </div>
    );
  }
}
