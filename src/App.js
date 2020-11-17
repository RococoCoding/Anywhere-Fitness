import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return  (
    <Route 
      {...rest}
      render={props => {
        let token = localStorage.getItem('token')
        console.log(token)
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
          <Link to="/protected">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <Switch>
        <PrivateRoute path="/protected" component={Dashboard} />
        <PrivateRoute path="/search-results" component={SearchResults} />
        <PrivateRoute path="/edit-class" component={EditClass} />
        <PrivateRoute path="/create-class" component={CreateClass} />
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
