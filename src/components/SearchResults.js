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
    let classToAdd = foundClasses.filter(el=>el.id === id);
    // api not working
    // function addToAttendees(id) {// adds one to class.number_attendees in server database
    //   let attendees = Number(classToAdd[0].number_attendees)
    //   classToAdd[0].number_attendees = attendees+1;
    //   console.log(classToAdd[0])
    //   axiosWithAuth()
    //     .put(`https://bw-back-end.herokuapp.comapi/auth/users/classes/${user.id}`, classToAdd[0])
    //     .then(res => console.log("add to attendees", res))
    //     .catch(err => console.log("add to attendees", err))
    // }
    axiosWithAuth() //adds class to the client's data on the server for recall on future logins
      .post(`https://bw-back-end.herokuapp.com/api/auth/users/classes/${user.id}/newclass`, {class_id: id})
      .then(res => console.log("add to user classes", res))
      .catch(err => console.log("add to user classes", err))
    // addToAttendees();
    dispatch(addClass(classToAdd[0]))//adds class to the client on local state for immediate render
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