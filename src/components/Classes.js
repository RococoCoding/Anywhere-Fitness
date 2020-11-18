import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteClass } from "../actions/userActions";
import { setEdit } from "../actions/classActions";

export default function Classes(props) {
  const { classToEdit } = props;
  const user = useSelector(rootStates => rootStates.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    // if user is client 1) delete current class from server and user state
    if (user.role !== "instructor") {
      let updatedClasses = [...user.classes].filter(el => el.id !== id)
      // Axios.put(`${user.id}`, {...user, classes: updatedClasses})
      // Axios.put(``)
      dispatch(deleteClass(id));
      push("/search-class");
    }
    dispatch(setEdit(classToEdit));
    push("/edit-class");
  }
  
  function deletingClass(e, id) {
    // Axios.delete()
    dispatch(deleteClass(id));
  }

  return (
    <div>
      {classToEdit.name}
      <button onClick={(e) => clickOnEdit(e, classToEdit.ClassID)}>Edit Class</button> 
      <button onClick={(e) => deletingClass(e, classToEdit.classID)}>{user.role === "instructor" ? "Delete" : "Cancel"} Class</button>
    </div>
  );
};