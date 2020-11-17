import React, { useEffect } from "react";
import Axios from "axios";
import {useSelector} from "react-redux";

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

//dashboard gets user data from userreducer
//if user does not have any classes, will display onboard

export default function Dashboard() {
  const user = useSelector(rootStates => rootStates.userReducer)

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

