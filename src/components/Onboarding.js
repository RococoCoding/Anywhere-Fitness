import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { skipOnboarding } from "../actions/userActions";
import CreateClass from "./CreateClass";
import SearchClass from "./SearchClass";

export default function Onboarding() {
  const user = useSelector(rootStates => rootStates.userReducer)
  const dispatch = useDispatch();
  const { push } = useHistory();

  function pushToDashboard() {
    dispatch(skipOnboarding());
    push("/protected");
  }

  return (
    <div>
      <p>We noticed you haven't {user.role === "instructor" ? "created" : "signed up for"} any classes yet! Would you like to get started?</p>
      <div className="button" onClick={pushToDashboard}>Skip</div>
      {user.role === "instructor" ? <CreateClass /> : <SearchClass />}
    </div>
  );
};