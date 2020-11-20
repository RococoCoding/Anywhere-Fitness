import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { setClassList, filterState } from "../actions/classActions";

import Dashboard from "../components/Dashboard";

export default function LoadingClasses() {
  const user = useSelector(state => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const dispatcher = useDispatch();
  useEffect(() => {
    async function fetchData() {
      let doneLoading = await axiosWithAuth().get(`https://bw-back-end.herokuapp.com/api/auth/users/classes`)
        .then(res => {
          dispatcher(setClassList(res.data.data));
          return false;
        })
        .catch(err => console.log(err));
      setIsLoading(doneLoading);
      if (user.role === "client") { //if user is client and after the classes are set ...
        let doneLoading2 = await axiosWithAuth().get(`https://bw-back-end.herokuapp.com/api/auth/users/classes/savedclasses/${user.id}`)
          .then(res => {
            console.log(res)
            dispatcher(filterState(res.data.data));
            return false;
          }) //... sets array of ids to classstate.filtered_list
          .catch(err => console.log(err));
        setIsLoading2(doneLoading2)
      }
      else setIsLoading2(false);
    }
    fetchData();
  }, [])

  if (isLoading || isLoading2) {
    return (
      <div>Loading...</div>
    )
  } else {
    return <Dashboard />
  }
}