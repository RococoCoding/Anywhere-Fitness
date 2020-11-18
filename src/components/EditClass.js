import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { editClassAction } from "../actions/userActions"; 
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function EditClass() { 
  const classToEdit = useSelector(state => state.classReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [input, setInput] = useState(classToEdit);

  function changeHandler(e) {
    setInput({...input, [e.target.name]: e.target.value})
  }

  function editClass(e) {
    e.preventDefault();
    axiosWithAuth()
      .put(`https://bw-back-end.herokuapp.com/api/auth/instructor/classes/${classToEdit.id}`, input)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    dispatch(editClassAction(input));
    push("/dashboard");
  }

  return (
    <form onSubmit={(e) => editClass(e, input)}>
      <label htmlFor="name">Name:
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="instructor_name"> Instructor Name
        <input
          type='text'
          name='instructor_name'
          value={input.instructor_name}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="type">Type:
        <select
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
        </select>
      </label>

      <label htmlFor="date">Date:
        <input
          type="date"
          id="date"
          name="date"
          value={input.date}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="start_time">Start Time:
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={input.start_time}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="duration">Duration:
        <select
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
        </select>
      </label>

      <label htmlFor="intensity">Intensity:
        <select
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
        </select>
      </label>

      <label htmlFor="max_size">Max Attendees:
        <input
          type="number"
          id="max_size"
          name="max_size"
          value={input.max_size}
          onChange={changeHandler}
        />
      </label>
      
      <button>Submit</button>
    </form>
  );
};