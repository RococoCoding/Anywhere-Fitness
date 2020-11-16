import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { deleteClass } from "../actions/userActions";
import EditClass from "./EditClass";

export default function ClassList() {
  const [display, setDisplay] = useState(false);
  const user = useSelector(rootStates => rootStates.userReducer);
  const { push } = useHistory();
  const dispatch = useDispatch();

  function createOrSearch() {
    if (user.role === "instructor") {
      push("/create-class");
    }
    else {
      push("/search-class");
    }
  }

  function clickOnEdit(e, id) {
    // if user is client 1) delete current class from server and user state
    if (user.role !== "instructor") {
      let updatedClasses = [...user.classes].filter(el => el.id !== id)
      // Axios.put(`${user.id}`, {...user, classes: updatedClasses})
      // Axios.put(``)
      dispatch(deleteClass(id));
      push("/search-class");
    }
    setDisplay(true);
  }

  function editClassFunction(e) {
    e.preventDefault();
  }
  
  function deletingClass(e, id) {
    console.log({id})
    // Axios.delete()
    dispatch(deleteClass(id));
  }

  if (user.classes.length > 0) {
    return (
      <div>
        {user.classes.map((el, idx) => {
          return (
            <div key={idx}>
              {el.name}
              <button onClick={(e) => clickOnEdit(e, el.ClassID)}>Edit Class</button> 
              <button onClick={(e) => deletingClass(e, el.classID)}>{user.role === "instructor" ? "Delete" : "Cancel"} Class</button>
              {user.role === "instructor" 
                ? 
                  <EditClass display={display} editClass={editClassFunction} classToEdit={el}/>
                :
                  ""
              }
            </div>
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