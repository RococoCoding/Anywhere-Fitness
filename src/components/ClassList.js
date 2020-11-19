import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import Classes from "./Classes";

export default function ClassList() {
  const user = useSelector(rootStates => rootStates.userReducer);
  const { push } = useHistory();
  const [classes, setClasses] = useState([]);
  const role = user.role === "instructor" ? user.role : "users";

  useEffect(() => {
    axiosWithAuth().get(`https://bw-back-end.herokuapp.com/api/auth/${role}/classes`)
      .then(res => {
        setClasses(user.role === "instructor" ? res.data.Class : res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  function createOrSearch() {
    if (user.role === "instructor") {
      push("/create-class");
    }
    else {
      push("/search-class");
    }
  }

  if (classes.length > 0) {
    return (
      <div>
        {classes.map((el, idx) => {
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