import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Welcome To The Food Place</h1>
      <Link to="/home">
        <button>Click Me</button>
      </Link>
    </div>
  );
}
