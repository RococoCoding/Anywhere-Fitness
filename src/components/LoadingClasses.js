import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { setClassList, filterState } from "../actions/classActions";
import Styled from 'styled-components';

import Dashboard from "../components/Dashboard";

export default function LoadingClasses() {
  const user = useSelector(state => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const dispatcher = useDispatch();
  useEffect(() => {
    // let isMounted = true;
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
            dispatcher(filterState(res.data.data));
            return false;
          }) //... sets array of ids to classstate.filtered_list
          .catch(err => console.log(err));
        setIsLoading2(doneLoading2)
      }
      else setIsLoading2(false);
    }
    // if (isMounted) {
    fetchData();
    // }
    // return () => isMounted = false;
  }, [])
  // #region getting errors trying to wait for first axios to resolve second one. Need first one to get all the classes to filter from
  // tried separating concerns and setting result to a separate filtered_classes key in state, but still getting weird
  // errors regarding looping state updates. Not sure if it's related to this, but at least the classes show up fine without it

  // #endregion
  if (isLoading || isLoading2) {
    return (
      <div>Loading...</div>
    )
  } else {
    return <Dashboard />
  }
}