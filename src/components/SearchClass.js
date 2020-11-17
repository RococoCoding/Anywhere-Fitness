import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { searchClass } from "../actions/classActions"

const initialState = {
  type: "any",
  time: "any",
  date: "any",
  duration: "any",
  intensity: "any",
  location: "any",
};

// const initialResults = [];

const mockRes = [
  {
    classID: 1,
    name: "Spin Xtreme",
    type: "spin",
    date: "2020-11-17",
    startTime: "10:00",
    duration: "1 hour",
    intensity: "high",
    location: "downtown",
    attendees: 2,
    max: 10,
    punchpass: 10,
  },
  {
    classID: 4,
    name: "Spin Xtreme 11",
    type: "spin",
    date: "2020-11-17",
    startTime: "11:00",
    duration: "1 hour",
    intensity: "high",
    location: "downtown",
    attendees: 2,
    max: 10,
    punchpass: 10,
  },
  {
    classID: 2,
    name: "Yoga Master",
    type: "yoga",
    date: "2020-11-17",
    startTime: "12:00",
    duration: "1.5 hour",
    intensity: "high",
    location: "FiDi",
    attendees: 10,
    max: 10,
    punchpass: 10,
  },
  {
    classID: 3,
    name: "Kickboxing King",
    type: "martial arts",
    date: "2020-11-17",
    startTime: "11:00",
    duration: "30 minutes",
    intensity: "high",
    location: "Central Park",
    attendees: 2,
    max: 10,
    punchpass: 10,
  }
];

export default function SearchClass() {
  const [input, setInput] = useState(initialState);
  // const [results, setResults] = useState(initialResults);

  const dispatch = useDispatch()

  const { push } = useHistory();

  function changeHandler(e) {
    setInput({...input, [e.target.name]: e.target.value})
  }; 

  function filterResults() {
    let inputCopy = {...input};
    for (let i in inputCopy) {
      if (inputCopy[i] === "any") {
        delete inputCopy[i] //delete empty search fields
      };
    };
    const keys = Object.keys(inputCopy); //use keys[0] to search api 
    let temp = mockRes.filter(el => {
        for (let i in keys) {
          if (el[keys[i]] !==  inputCopy[keys[i]]) {
            return false;
          };
        };
        return true;
      }
    );
    return temp;
  }

  function searchSubmit(e) {
    e.preventDefault();
    // Axios.get("")
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    // delete input[keys[0]];
    dispatch(searchClass(filterResults()))
    push("/searchResults");
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