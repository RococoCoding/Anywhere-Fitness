import './App.css';
import Login from "./components/Login";
import SignUp from "./components/Signup"
import Dashboard from "./components/Dashboard";
import { Link, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        </nav>
      </header>
      <Link to="/protected">Dashboard</Link>
      <Route path="/protected">
        <Dashboard />
      </Route>
      <Route path="/search-results">
        <SearchResults />
      </Route>
      <Route path="/edit-class">
        <EditClass />
      </Route>
      <Link to="/singUp">Sing Up</Link>
        <Route path="/singUp">
          <SignUp /> 
        </Route>
      <Link to="/login">Login</Link>
        <Route path="/login">
          <Login /> 
        </Route>
      <CreateClass/>
      
    </div>
  );
}

export default App;
