import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Styled from 'styled-components';
import { deleteClass } from "../actions/classActions";
import { setEdit } from "../actions/classActions";

export default function Classes(props) {
  const { classToEdit } = props;
  const user = useSelector(state => state.userReducer);
  const classes = useSelector(state => state.classReducer.class_list)
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    // if user is client 1) delete current class from server and user state
    if (user.role === "client") {
      let updatedClasses = classes.filter(el => el.id !== id)
      // axiosWithAuth()
      //   .delete(`https://bw-back-end.herokuapp.com/api/auth/users/classes/savedclasses/${user.id}`)
      dispatch(deleteClass(id));
      push("/search-class");
    }
    else {
      dispatch(setEdit(classToEdit));
      push("/edit-class");
    }
  }
  
  function deletingClass(e, id) {
    if (user.role === "instructor") {
       axiosWithAuth()
      .delete(`https://bw-back-end.herokuapp.com/api/auth/instructor/classes/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
    dispatch(deleteClass(id));
  }

  return (
    <StyledDiv>
      <div className="class-info">
        <p>{classToEdit.name}</p>
        <p>{classToEdit.date}</p>
        <p>{classToEdit.time}</p>
        <p>{classToEdit.time}</p>
      </div>
      <div><StyleButton onClick={(e) => clickOnEdit(e, classToEdit.id)}>Edit Class</StyleButton> 
      <StyleButton onClick={(e) => deletingClass(e, classToEdit.id)}>{user.role === "instructor" ? "Delete" : "Cancel"} Class</StyleButton>
      </div>
    </StyledDiv>
  );
};

const StyleButton = Styled.button`
/* remove default behavior */
appearance:none;
-webkit-appearance:none;

/* usual styles */
padding:10px;
border:none;
background-color:#3F51B5;
color:#fff;
font-weight:600;
border-radius:7px;
width:40%;

`
const StyledDiv = Styled.div`
display: flex;
justify-content: space-evenly;

div{
  display:flex;
  padding:20px;
  width:50%;
  justify-content: space-between;
}
p{
  font-size:2rem;
}
`