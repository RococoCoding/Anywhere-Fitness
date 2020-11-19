import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";

import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';
import SearchClass from "./components/SearchClass";
import Signup from "./components/Signup";

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
  const { push } = useHistory();

  function logout() {
    localStorage.clear();
    push("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/signup">Sign up</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/search-class" component={SearchClass} />
        <PrivateRoute path="/search-results" component={SearchResults} />
        <PrivateRoute path="/edit-class" component={EditClass} />
        <PrivateRoute path="/create-class" component={CreateClass} />
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
