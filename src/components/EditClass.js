import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Styled from 'styled-components';
import { editClassAction } from "../actions/classActions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import schema from '../validation/Schema';

const initialFormErrors = {
  name: '',
  instructor_name: '',
  type: '',
  date: '',
  start_time: '',
  duration: '',
  intensity: '',
  location: '',
  max_size: '',
  number_attendees: '',
}
export default function EditClass() {
  const classToEdit = useSelector(state => state.classReducer.edit_class);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [input, setInput] = useState(classToEdit);
  const user = useSelector(state => state.userReducer);
  const [errors, setErrors] = useState(initialFormErrors);

  if (!user.role) {
    push("/");
  }

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  function editClass(e) {
    e.preventDefault();
    function validate() {
      schema
        .validate(input, { abortEarly: false })
        .then((res) => {
          console.log(res);
          axiosWithAuth()
            .put(`https://bw-back-end.herokuapp.com/api/auth/instructor/classes/${classToEdit.id}`, input)
            .then(res => console.log(res))
            .catch(err => console.log(err))
          dispatch(editClassAction(input));
          push("/dashboard");

        })
        .catch((err) => {
          console.log(err);
          const emptyErr = {
            name: '',
            instructor_name: '',
            type: '',
            start_time: '',
            duration: '',
            intensity: '',
            location: '',
            date: '',
            number_attendees: '0',
            max_size: '',
          };
          err.inner.forEach(element => {
            emptyErr[element.path] = element.message;
          });
          setErrors(emptyErr)
        })
    }
    validate();
  }

  return (

    <div>
      <HeaderDiv>Edit Class</HeaderDiv>
      <FormContainer onSubmit={editClass}>
        <label htmlFor="name">Name:
        <StyledInput
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.name ? `${errors.name}` : ""}</div>
        <label htmlFor="instructor_name"> Instructor Name
        <StyledInput
            type='text'
            name='instructor_name'
            value={input.instructor_name}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.instructor_name ? `${errors.instructor_name}` : ""}</div>
        <label htmlFor="type">Type:
        <StyledSelect
            type="dropdown"
            id="type"
            name="type"
            value={input.type}
            onChange={changeHandler}
          >
            <option value="any">Any</option>
            <option value="spin">Spin</option>
            <option value="yoga">Yoga</option>
            <option value="boxing">Martial Arts</option>
            <option value="weights">Zumba</option>
          </StyledSelect>
        </label>
        <div>{errors.type ? `${errors.type}` : ""}</div>
        <label htmlFor="date">Date:
        <StyledInput
            type="date"
            id="date"
            name="date"
            value={input.date}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.date ? `${errors.date}` : ""}</div>
        <label htmlFor="start_time">Start Time:
        <StyledInput
            type="time"
            id="start_time"
            name="start_time"
            value={input.start_time}
            onChange={changeHandler}
          />
        </label>
        <div> {errors.start_time ? `${errors.start_time}` : ""}</div>
        <label htmlFor="duration">Duration:
        <StyledSelect
            type="dropdown"
            id="duration"
            name="duration"
            value={input.duration}
            onChange={changeHandler}
          >
            <option value="any">Any</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="1.5 hours">1.5 hours</option>
          </StyledSelect>
        </label>
        <div>{errors.duration ? `${errors.duration}` : ""}</div>
        <label htmlFor="intensity">Intensity:
        <StyledSelect
            type="dropdown"
            id="intensity"
            name="intensity"
            value={input.intensity}
            onChange={changeHandler}
          >
            <option value="any">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </StyledSelect>
        </label>
        <div>{errors.intensity ? `${errors.intensity}` : ""}</div>
        <label htmlFor="location">Location
            <StyledSelect
            type='text'
            name='location'
            value={input.location}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.location ? `${errors.location}` : ""}</div>
        <label htmlFor="max_size">Max Attendees:
        <StyledInput
            type="number"
            id="max_size"
            name="max_size"
            value={input.max_size}
            onChange={changeHandler}
          />
        </label>

        <StyleButton>Submit</StyleButton>
      </FormContainer>
    </div>
  );
};



const FormContainer = Styled.form`
display: flex;
flex-direction: column;
align-items: center;
/* background-color:lightgrey; */
padding: 3%;
padding-top: .5rem;
font-size:1.3rem;
text-align:center;

label {
  width:30vw;
}
div{  
  font-size: 1.5rem;
  color:white;
  background-color: red;
  
}
  
}
`
const StyledInput = Styled.input`
padding:10px;
border:.5px solid black;
box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
margin:10px 0px;  //add top and bottom margin
width: 100%;
font-size: 1.3rem;
border-radius: 5px;
`
const StyledSelect = Styled.select`
padding:10px;
box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
margin:10px 0px;  //add top and bottom margin
width: 104%;
font-size: 1rem;
border:.5px solid black;
border-radius: 5px;





`
const StyleButton = Styled.button`
/* remove default behavior */
appearance:none;
-webkit-appearance:none;

/* usual styles */
align:center;
padding:15px;
border:none;
background-color:#3F51B5;
color:#fff;
font-weight:600;
border-radius:7px;
width:20rem;
`

const HeaderDiv = Styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: center;
border-bottom: solid black;
font-size: 3rem;
margin-bottom: 1rem;
background-color:#3F51B5;
color:#fff;
`