import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

import { BrowserRouter, Redirect, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/track" />
    </Route>
    <Route exact path="/track" render={() => <App />} />
  </BrowserRouter>,
  document.getElementById("root")
);
