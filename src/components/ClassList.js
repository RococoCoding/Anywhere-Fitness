import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Classes from "./Classes";

export default function ClassList() {
  const classList = useSelector(state => state.classReducer.class_list);  
  const user = useSelector(rootStates => rootStates.userReducer);
  const { push } = useHistory();
  const [classes, setClasses] = useState([]);
  
  useEffect(() => {
      setClasses(classList);
  }, [ClassList]);

 
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
    return (<>
      <div onClick={createOrSearch}>{user.role === "instructor" ? "Create a class!" : "Search for a class!"}</div>
    </>)
  }
};