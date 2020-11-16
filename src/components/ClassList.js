import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import Classes from "./Classes";

export default function ClassList() {
  const user = useSelector(rootStates => rootStates.userReducer);
  const { push } = useHistory();


  function createOrSearch() {
    if (user.role === "instructor") {
      push("/create-class");
    }
    else {
      push("/search-class");
    }
  }

  if (user.classes.length > 0) {
    return (
      <div>
        {user.classes.map((el, idx) => {
          return (
            <Classes classToEdit={el} key={idx} />
          )
        })}
      </div>
    );
  }
  else {
    return (
      <div onClick={createOrSearch}>{user.role === "instructor" ? "Create a class!" : "Search for a class!"}</div>
    )
  }
};