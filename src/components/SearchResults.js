import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { addClass } from "../actions/classActions";

export default function SearchResults() {
  const foundClasses = useSelector(state => state.classReducer.search_classes);
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  if (!user.role) {
    push("/");
  }

  function reserveSpot(id) { 
    // 1) adds to attendees in server class data; 
    // 2) adds class to server user data & updates user's class list via dispatch action
    let classToAdd = foundClasses.filter(el=>el.id === id);

    // function addToAttendees(id) {
    //   classToAdd[0].attendees++
    //   // Axios.put(`${id}`, {classToAdd[0]})
    // }
    
    function addToUser() {
      axiosWithAuth()
        .post(`https://bw-back-end.herokuapp.com/api/auth/users/classes/${user.id}/newclass`, {class_id: id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } 
    // addToAttendees();
    addToUser();
    dispatch(addClass(classToAdd[0]))
    push("/dashboard");
  }

  return (
    <div>
      {foundClasses.map((el, idx) => {
        return (
        <div key={idx}> {el.name} {el.date} {el.startTime} {el.location}
          <button onClick={()=>reserveSpot(el.id)}>Reserve a spot</button>
        </div>
        )
      })}
    </div>
  );
};