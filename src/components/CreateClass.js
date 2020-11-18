import React from "react";
import { useState } from 'react';
import * as yup from 'yup';
import schema from '../validation/Schema'
import { axiosWithAuth } from "../utils/axiosWithAuth";


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

    function validate() {
      yup
        .reach(schema, e.target.name)
        .validate(correctValue)
        .then((res) => {
          // console.log(res);
          setErrors({ ...errors, [e.target.name]: '' })
        })
        .catch((err) => {
          setErrors({ ...errors, [e.target.name]: err.message })
        })

    }
    validate();

    setValues({ ...values, [e.target.name]: correctValue })
  }

  function submitForm(e) {
    e.preventDefault();
    axiosWithAuth()
      .post('https://bw-back-end.herokuapp.com/api/auth/instructor/classes', values)
      .then((res) => {
        console.log(res);
        setValues(initialValues);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name"> Name
        <input
          type='text'
          name='name'
          value={values.name}
          onChange={changeValues}

        />
      </label>
      <label htmlFor="instructor_name"> Instructor Name
        <input
          type='text'
          name='instructor_name'
          value={values.instructor_name}
          onChange={changeValues}

        />
      </label>
      <label htmlFor="type"> Type
      <select name="type" value={values.type} onChange={changeValues} >
          <option value="">- Select an option -</option>
          <option value="Spin">Spin</option>
          <option value="Yoga">Yoga</option>
          <option value="Martial Arts">Martial Arts</option>
          <option value="Zumba">Zumba</option>
        </select>
      </label>
      {errors.type ? `${errors.type}` : ""}

      <label htmlFor="date">
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={changeValues}
        />
      </label>

      <label htmlFor="start_time">Start Time
        <input
          type='time'
          name='start_time'
          value={values.start_time}
          onChange={changeValues}

        />
      </label>
      <label htmlFor="duration">Duration
      <select name="duration" value={values.duration} onChange={changeValues}>
          <option value="">- Select an option -</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1.5 hours">1.5 hours</option>
          <option value="2 hours">2 hours</option>
        </select>
      </label>
      <label htmlFor="intensity">Intensity level
      <select name="intensity" value={values.intensity} onChange={changeValues}>
          <option value="">- Select an option -</option>
          <option value="low">Low</option>
          <option value="medium">Medium </option>
          <option value="high">High</option>
        </select>
      </label>
      <label htmlFor="location">Location
        <input
          type='text'
          name='location'
          value={values.location}
          onChange={changeValues}

        />
      </label>
      {/* <label htmlFor="number_attendees">Current number of registered attendees
        <input 
        type='number'
        name= 'number_attendees'
        value={values.number_attendees}
        onChange={changeValues}
          
        />
      </label> */}
      <label htmlFor="max_size">Max class size
        <input
          type='number'
          name='max_size'
          value={values.max_size}
          onChange={changeValues}

        />
      </label>
      <button>Submit!</button>
    </form>
  )
}
