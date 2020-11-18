import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { editClassAction } from "../actions/userActions"; 

export default function EditClass() { 
  const classToEdit = useSelector(state => state.classReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const initialInput = {...classToEdit}

  const [input, setInput] = useState(initialInput);

  function changeHandler(e) {
    setInput({...input, [e.target.name]: e.target.value})
  }

  function editClass(e) {
    e.preventDefault();
    dispatch(editClassAction(input));
    push("/protected");
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

      <label htmlFor="startTime">Start Time:
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={input.startTime}
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

      <label htmlFor="max">Max Attendees:
        <input
          type="number"
          id="max"
          name="max"
          value={input.max}
          onChange={changeHandler}
        />
      </label>
      
      <button>Submit</button>
    </form>
  );
};