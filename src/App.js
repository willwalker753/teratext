import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

//import all class components
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import Message from './components/Message';
import Account from './components/Account';
import Home from './components/Home';
import Friend from './components/Friend';

function App() {
  
  //use exact react router assigning each class component to a path
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/user/message/:friendId/:friendUsername">
          <Message />
        </Route>
        <Route exact path="/user/friend">
          <Friend />
        </Route>
        <Route exact path="/user/account">
          <Account />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
