
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { setClassList, filterState } from "../actions/classActions";

import Onboarding from "./Onboarding";
import ClassList from "./ClassList";

export default function Dashboard() {
  const { push } = useHistory();
  const classes = useSelector(state => state.classReducer.class_list);  
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [userClassIDs, setUserClassIDs] = useState();

  useEffect(() => {   
    axiosWithAuth().get(`https://bw-back-end.herokuapp.com/api/auth/users/classes`) //get list of all classes...
      .then(res => dispatch(setClassList(res.data))) //..set to class reducer state
      .catch(err => console.log(err))
    if (user.role === "client") { //if client ...
       axiosWithAuth().get(`https://bw-back-end.herokuapp.com/api/auth/users/classes/savedclasses/${user.id}`)
      .then(res => {
        setUserClassIDs(res.data) //...get array of ids of classes on their acct...
        dispatch(filterState(res.data))//...and filter classes in class reducer state
      })
      .catch(err => console.log(err))
    }
 
  }, []);


  function logout() {
    localStorage.clear();
    push("/");
  }

  if (!user.role) {
    push("/");
  }
  // if (!user.signedup) { 
  //   return (
  //     <Onboarding />
  //   )
  // } 
  else { 
    return (
    <div>
      Dashboard 
      {user.role === "instructor" ? 
        <nav>
          <Link to="/dashboard">Dashboard</Link> 
          <div onClick={logout}>Logout</div>
          <Link to="/create-class">Create Class</Link>
        </nav> 
      :
        <nav>
           <Link to="/dashboard">Dashboard</Link> 
          <div onClick={logout}>Logout</div>
          <Link to="/search-class">Search Class</Link>
        </nav>
      }
      <ClassList />
    </div>
    );
  }
};

