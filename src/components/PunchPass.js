import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export default function PunchPass() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();

  if (!user.role) {
    push("/");
  }

  return (
    <div></div>
  );
};