
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  const { push } = useHistory();
  const classes = useSelector(state => state.classReducer.class_list);  
  const user = useSelector(state => state.userReducer);

  if (!user.role) {
    push("/");
  }
  if (classes.length === 0) { 
    return (
      <Onboarding />
    )
  } 
  else { 

    return (
    <div>
      Dashboard 
      {user.role === "instructor" ? 
        <nav>
          <Link to="/create-class">Create Class</Link>
        </nav> 
      :
        <nav>
          <Link to="/search-class">Search Class</Link>
        </nav>
      }
      <ClassList />
    </div>
    );
  }
};

