import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

import Header from "./components/Header";

import UserContext from './utils/userContext';

function App() {

  const [user, setUser] = useState("NotSet");

  useEffect(() => {
    // Check for token to keep user logged in
      // console.log("Cheking if user is signed in!");
      axios.get("/api/user-login/login").then(response => {
        // console.log(response);
        if (response.data.username){
          setUser(response.data);
        }
      })
    }, [])


  return (
    <UserContext.Provider value={{ user, setUser}}>
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
            <Route exact path="/user">
              <Header />
              <User />
            </Route>
            <Route exact path="/user/:userName" >
              <Header />
              <User />
            </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
    
  );
}

export default App;
