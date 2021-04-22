import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Track from "./components/Track.js";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/track" />
      </Route>
      <Route exact path="/track" render={() => <Track />} />
    </BrowserRouter>
  );
};

export default App;
