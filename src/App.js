import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
      </Switch>
    </Router>
  );
}
