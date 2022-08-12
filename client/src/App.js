import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreation from "./components/RecipeCreation";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/recipe" component={RecipeCreation} />
          <Route path="/home/:id">
            <RecipeDetails />
          </Route>
          {/* <Route exact path="*" component={NotFound} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
