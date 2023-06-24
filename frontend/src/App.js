import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import User from "./user/pages/User";

const App = () => {
  return (
    <Router>
      {/* Switch:- It is user to switch between any routes because if we not use this then after first route execution it will redirect us to the home page again we we enter any other route  */}
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* Redirect:- It will redirect to the home page whenever the user enters something which is not a route. */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
