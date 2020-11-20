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
  // const classes = useSelector(state => state.classReducer.class_list)
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    // if user is client 1) delete current class from server and user state
    if (user.role === "client") {
      // let updatedClasses = classes.filter(el => el.id !== id)
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

  function addPunchPass(e, id) {
    let updatedClass = classToEdit;
    updatedClass.punch_pass = "true";
    axiosWithAuth()
      .put(`https://bw-back-end.herokuapp.com/api/auth/instructor/classes/${classToEdit.id}`, updatedClass)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <StyledDiv>
      <div className="class-info">
        <h4>{classToEdit.name}</h4>
        <div className="info-buttons">
          <div className="display-info">
            <p><span>Instructor Name: </span>{classToEdit.instructor_name}</p>
            <p><span>Date: </span>{classToEdit.date}</p>
            <p><span>Time: </span>{classToEdit.time}</p>
            <p><span>Location: </span>{classToEdit.location}</p>
            <p><span>Duration: </span>{classToEdit.duration}</p>
            <p><span>Intensity: </span>{classToEdit.intensity}</p>
            <p><span>Punch Pass: </span>{classToEdit.punch_pass ? "Yes" : "No"}</p>
          </div>
          <div className="buttons-div">
            <StyleButton onClick={(e) => clickOnEdit(e, classToEdit.id)}>
              Edit Class
            </StyleButton>
            <StyleButton onClick={(e) => deletingClass(e, classToEdit.id)}>
              {user.role === "instructor" ? "Delete" : "Cancel"} Class
            </StyleButton>
            {user.role === "instructor"
              ?
              <StyleButton onClick={(e) => addPunchPass(e, classToEdit.id)}>
                Add Punch Pass
            </StyleButton>
              :
              ""
            }
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyleButton = Styled.button`
/* remove default behavior */
appearance:none;
-webkit-appearance:none;

/* usual styles */
padding: 6%;
border:none;
background-color:#3F51B5;
color:#fff;
font-weight:600;
border-radius:7px;
font-size: 1.2rem;
width: max-content;
height: max-content;
margin: 5% 0;
`
const StyledDiv = Styled.div`
width: 96%;
display: flex;
border: 2px solid black;
margin: 2%;
.buttons-div {
  display:flex;
  flex-direction: column;
}
.info-buttons {
  display: flex;
}
h4 {
  font-weight: bold;
  font-size: 2.5rem;
}
p {
  font-size: 1.7rem;
  text-align: left;
}
span {
  display: inline-block;
  width: 40%;
}
.class-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 2%;
}
.display-info {
  width: 75%;
}
`