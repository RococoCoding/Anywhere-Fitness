import './App.css';
<<<<<<< HEAD
import Login from "./components/Login"

=======
import Dashboard from "./components/Dashboard";
import { Link, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import EditClass from './components/EditClass';
import CreateClass from './components/CreateClass';
>>>>>>> 2410bf9447e4cd3af46d55ff20eb768a48b6c373

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        </nav>
      </header>
    {/* Loading... */}
      <Login></Login>
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
      <CreateClass/>
    </div>
  );
}

export default App;
