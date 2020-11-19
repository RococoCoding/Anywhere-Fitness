import React from "react";
import { useState } from 'react';
import * as yup from 'yup';
import schema from '../validation/Schema'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Styled from 'styled-components';


export default function CreateClass() {
  const initialValues = {
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
  }

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

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);

  function changeValues(e) {
    e.persist();
    const correctValue = e.target.value;

    // function validate() {
    //   yup
    //     .reach(schema, e.target.name)
    //     .validate(correctValue)
    //     .then((res) => {
    //       // console.log(res);
    //       setErrors({ ...errors, [e.target.name]: '' })
    //     })
    //     .catch((err) => {
    //       setErrors({ ...errors, [e.target.name]: err.message })
    //     })

    // }
    // validate();

    setValues({ ...values, [e.target.name]: correctValue })
  }

  function submitForm(e) {
    e.preventDefault();
    // console.log(values);
    
    function validate() {
      schema
        .validate(values,{abortEarly:false})
        .then((res) => {
          console.log(res);
          setValues(initialValues);
          setErrors(initialFormErrors);
          axiosWithAuth()
                .post('https://bw-back-end.herokuapp.com/api/auth/instructor/classes', values)
                .then((res) => {
                  console.log(res);
                  setValues(initialValues);
                  setErrors(initialFormErrors);
                })
                .catch((err) => {
                  console.log(err);
                })

      
        })
        .catch((err) => {
          console.log(err);
          const emptyErr ={
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
    console.log(errors)
  }



  return (<div>
    
<HeaderDiv>Create Class</HeaderDiv> 
    
    <FormContainer onSubmit={submitForm}>
      <label htmlFor="name"> Name:
        <StyledInput
          type='text'
          name='name'
          value={values.name}
          onChange={changeValues}

        />
      </label>
      <div>{errors.name ? `${errors.name}` : ""}</div>
      <label htmlFor="instructor_name"> Instructor Name:
        <StyledInput
          type='text'
          name='instructor_name'
          value={values.instructor_name}
          onChange={changeValues}

        />
      </label>
      <div>{errors.instructor_name ? `${errors.instructor_name}` : ""}</div>
      <label htmlFor="type"> Type:
      <StyledSelect name="type" value={values.type} onChange={changeValues} >
          <option value="">- Select an option -</option>
          <option value="Spin">Spin</option>
          <option value="Yoga">Yoga</option>
          <option value="Martial Arts">Martial Arts</option>
          <option value="Zumba">Zumba</option>
        </StyledSelect>
      </label>
      <div>{errors.type ? `${errors.type}` : ""}</div>
  
      <label htmlFor="date"> Date of Class:
        <StyledInput
          type="date"
          name="date"
          value={values.date}
          onChange={changeValues}
        />
      </label>
      <div>{errors.date ? `${errors.date}` : ""}</div>
      <label htmlFor="start_time">Start Time:
        <StyledInput
          type='time'
          name='start_time'
          value={values.start_time}
          onChange={changeValues}

        />
      </label>
      <div> {errors.start_time ? `${errors.start_time}` : ""}</div>
      <label htmlFor="duration">Duration:
      <StyledSelect name="duration" value={values.duration} onChange={changeValues}>
          <option value="">- Select an option -</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1.5 hours">1.5 hours</option>
          <option value="2 hours">2 hours</option>
        </StyledSelect>
      </label>
      <div>{errors.duration ? `${errors.duration}` : ""}</div>
      <label htmlFor="intensity">Intensity level:
      <StyledSelect name="intensity" value={values.intensity} onChange={changeValues}>
          <option value="">- Select an option -</option>
          <option value="low">Low</option>
          <option value="medium">Medium </option>
          <option value="high">High</option>
        </StyledSelect>
      </label>
      <div>{errors.intensity ? `${errors.intensity}` : ""}</div>
      <label htmlFor="location">Location:
        <StyledInput
          type='text'
          name='location'
          value={values.location}
          onChange={changeValues}

        />
      </label>
      <div>{errors.location ? `${errors.location}` : ""}</div>
      {/* <label htmlFor="number_attendees">Current number of registered attendees
        <input 
        type='number'
        name= 'number_attendees'
        value={values.number_attendees}
        onChange={changeValues}
          
        />
      </label> */}
      <label htmlFor="max_size">Max class size:
        <StyledInput
          type='number'
          name='max_size'
          value={values.max_size}
          onChange={changeValues}

        />
      </label>
      <StyleButton>Submit!</StyleButton>
    </FormContainer>
   
    </div>
  )
}



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
// const StyledForm = Styled.form`
// display: flex;
// flex-direction: column;
// align-items: center;
// width: 30%;
// /* height: 40%; */
// box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
// padding: 15%;
// color: red;