import React from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  const user = useSelector(rootStates => rootStates.userReducer);
  // Axios.get()
  if (!user.classes) {
    return (
      <Onboarding />
    )
  } 
  else {
     return (
      <div>
        Dashboard
        <nav>
          {/* links to create/add classes, profile */}
        </nav>
        <ClassList />
      </div>
    );
  }
};

