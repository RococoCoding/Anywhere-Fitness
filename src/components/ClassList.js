import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function ClassList() {
  const user = useSelector(rootStates => rootStates.userReducer)
  const { push } = useHistory();

  function createOrSearch() {
    if (user.role === "instructor") {
      push("/create-class");
    }
    else {
      push("/search-class");
    }
  }

  if (user.classes.length > 0) {
    return (
      <div>
        {user.classes.map((el, idx) => {
          return (
            <div key={idx}>
              {el.name}
              <button>Edit Class</button>
              <button>{user.role === "instructor" ? "Delete" : "Cancel"} Class</button>
            </div>
          )
        })}
      </div>
    );
  }
  else {
    return (
      <div onClick={createOrSearch}>{user.role === "instructor" ? "Create a class!" : "Search for a class!"}</div>
    )
  }
};