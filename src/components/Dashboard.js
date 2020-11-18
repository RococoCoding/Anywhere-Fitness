import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  let user = useSelector(rootStates => rootStates.userReducer);  

  if (!user.classes) { 
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
      <ClassList classes={user.classes} />
    </div>
    );
  }
};

