import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateClassList } from "../actions/userActions";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function SearchResults() {
  const foundClasses = useSelector(state => state.classReducer);
  const user = useSelector(state => state.userReducer);
  
  const dispatch = useDispatch();
  const { push } = useHistory();

  function reserveSpot(id) { 
    // 1) adds to attendees in server class data; 
    // 2) adds class to server user data & updates user's class list via dispatch action
    let classToAdd = foundClasses.filter(el=>el.id === id);
    function addToAttendees(id) {
      classToAdd[0].attendees++
      // Axios.put(`${id}`, {classToAdd[0]})
    }
    
    function addToUser() {
      let userClass = {
        name: classToAdd[0].name,
        date: classToAdd[0].date,
        startTime: classToAdd[0].startTime,
        location: classToAdd[0].location,
        duration: classToAdd[0].duration,
        id: id
      }
      axiosWithAuth()
        .post(`https://back-end12345.herokuapp.com/api/auth/users/classes/1/newclass`, {class_id: userClass.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
      dispatch(updateClassList(userClass));
    } 
    // addToAttendees();
    addToUser();
    push("/dashboard");
  }
  return (
    <div>
      {foundClasses.map((el, idx) => {
        console.log(el)
        return (
        <div key={idx}> {el.name} {el.date} {el.startTime} {el.location}
          <button onClick={()=>reserveSpot(el.id)}>Reserve a spot</button>
        </div>
        )
      })}
    </div>
  );
};