import './App.css';
import Login from "./components/Login";
import SignUp from "./components/Signup"
import Dashboard from "./components/Dashboard";
import { Link, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJuYW1lIjoic2lubmVyIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MDU2NDI4MTEsImV4cCI6MTYwNTcyOTIxMX0.He3yuqNO0jEzqOM8oeqWGx3-j_TXmJao9aWeEKS8ilI")
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
          <Link to="/singUp">Sing Up</Link>
          <Link to="/login">Login</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <Switch>
        <PrivateRoute path="/protected" component={Dashboard} />
        <PrivateRoute path="/search-results" component={SearchResults} />
        <PrivateRoute path="/edit-class" component={EditClass} />
        <PrivateRoute path="/create-class" component={CreateClass} />   
        <Route path="/singUp">
          <SignUp /> 
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
