import './App.css';
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
      <CreateClass/>
    </div>
  );
}

export default App;
