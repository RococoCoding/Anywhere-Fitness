import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearUser } from "../actions/userActions";
import { clearClasses } from "../actions/classActions";

export default function Nav() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();
  const dispatcher = useDispatch();

  function logout() {
    localStorage.clear();
    dispatcher(clearUser());
    dispatcher(clearClasses());
    push("/");
  }

  if (user.role === "instructor") {
    return (
      <nav>
        <Link to="/dashboard">Dashboard | </Link>
        <Link to="/create-class">Create Class | </Link>
        <Link to="/punch-pass">Create Punch Pass | </Link>
        <div onClick={logout}>Logout</div>
      </nav>
    )
  }
  if (user.role === "client") {
    return (
      <nav>
        <Link to="/dashboard">Dashboard | </Link>
        <Link to="/search-class">Search Class | </Link>
        <div onClick={logout}>Logout</div>
      </nav>
    )
  }
  else {
    return (
      <nav>
        <Link to="/">Log in | </Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    )
  }
}