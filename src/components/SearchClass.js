import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { searchClass } from "../actions/classActions"

const initialState = {
  type: "",
  time: "",
  date: "",
  duration: "",
  intensity: "",
  location: "",
};


export default function SearchClass() {
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch()
  const { push } = useHistory();
  const user = useSelector(state => state.userReducer);

  if (!user.role) {
    push("/");
  }

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  };


  function searchSubmit(e) {
    e.preventDefault();
    dispatch(searchClass(input))
    localStorage.setItem("onboarding", "true");
    push("/search-results");
  };

  return (
    <form onSubmit={searchSubmit}>
      <p>Find a class</p>

      <label htmlFor="type">
        <select
          name="type"
          id="type"
          type="dropdown"
          onChange={changeHandler}
        >
          <option value="any">Any</option>
          <option value="spin">Spin</option>
          <option value="yoga">Yoga</option>
          <option value="boxing">Martial Arts</option>
          <option value="weights">Zumba</option>
        </select>
      </label>

      <label htmlFor="time">
        <input
          type="time"
          name="time"
          value={input.time}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="duration">
        <select
          name="duration"
          id="duration"
          type="dropdown"
          onChange={changeHandler}
        >
          <option value="any">Any</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1.5 hours">1.5 hours</option>
        </select>
      </label>

      <label htmlFor="date">
        <input
          type="date"
          name="date"
          value={input.date}
          onChange={changeHandler}
        />
      </label>

      <label htmlFor="intensity">
        <select
          name="intensity"
          id="intensity"
          type="dropdown"
          onChange={changeHandler}
        >
          <option value="any">Any</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label htmlFor="location">
        <select
          name="location"
          id="location"
          type="dropdown"
          onChange={changeHandler}
        >
          <option value="any">Any</option>
          <option value="downtown">Downtown</option>
          <option value="fidi">FiDi</option>
          <option value="Central Park">Central Park</option>
        </select>
      </label>

      <button>Search</button>
    </form>
  );
};