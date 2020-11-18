import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { deleteClass } from "../actions/userActions";
import { setEdit } from "../actions/classActions";

export default function Classes(props) {
  const { classToEdit } = props;
  const user = useSelector(rootStates => rootStates.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    // if user is client 1) delete current class from server and user state
    if (user.role == "client") {
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
    if (user.role === "instructor") {
       axiosWithAuth()
      .delete(`https://bw-back-end.herokuapp.com/api/auth/instructor/classes/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      dispatch(deleteClass(id));
    }
    // if client, edit user.classes in api
  }

  return (
    <div>
      {classToEdit.name}
      <button onClick={(e) => clickOnEdit(e, classToEdit.id)}>Edit Class</button> 
      <button onClick={(e) => deletingClass(e, classToEdit.id)}>{user.role === "instructor" ? "Delete" : "Cancel"} Class</button>
    </div>
  );
};