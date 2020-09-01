import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Route path="/signup">
          <Header />
          <Signup />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
