import React from "react";
import { Link } from "react-router-dom";
export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <h1>Welcome To The Food Place</h1>
        <Link to="/home">
          <button>Click Me</button>
        </Link>
      </div>
    );
  }
}
