import {Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';
import SearchClass from "./components/SearchClass";
import Signup from "./components/Signup";
import Registered from "./components/Registered";
import Nav from "./components/nav";
import LoadingClasses from "./components/LoadingClasses";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return  (
    <Route 
      {...rest}
      render={props => {
        let token = localStorage.getItem('token')
        if (token) {
          return <Component {...props} />
        } else {
          return <Redirect to='/' />
        }
      }} 
    />
  )
};

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/search-class" component={SearchClass} />
        <PrivateRoute path="/search-results" component={SearchResults} />
        <PrivateRoute path="/edit-class" component={EditClass} />
        <PrivateRoute path="/create-class" component={CreateClass} />
        <PrivateRoute path="/loading-classes" component={LoadingClasses} />
        <Route path="/registered">
          <Registered />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
