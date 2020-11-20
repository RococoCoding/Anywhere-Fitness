import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Classes from "./Classes";

export default function ClassList() {
  const classes = useSelector(state => state.classReducer.class_list);
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();

  // useEffect(() => {
  //   if (user.role === "client") {
  //     function filter() {
  //       let filtered = []
  //       filteredClasses.forEach(el => { //refactor: use cs algo method instead of nested loops?
  //         let tempClass = classes.filter(el2 => el2.id === el.class_id)
  //         filtered.push(tempClass[0]);
  //       })
  //       setUserClasses(filtered);
  //     }
  //     filter();
  //   }
  // }, [])

  console.log("classList")
  function createOrSearch() {
    if (user.role === "instructor") {
      push("/create-class");
    }
    else {
      push("/search-class");
    }
  }

  if (!user?.role) {
    console.log("no role  ")
    push("/");
  }

  if (classes.length > 0) {
    console.log("classes")
    return (
      <div>
        {user.role === "instructor" ?
          classes.map((el, idx) => {
            console.log("instructor", classes)
            return (
              <Classes classToEdit={el} key={idx} />
            )
          })
          :
          classes.map((el, idx) => {
            return (
              <Classes classToEdit={el} key={idx} />
            )
          })
        }
      </div>
    );
  }
  else {
    console.log("else")
    return (
      <div onClick={createOrSearch}>{user.role === "instructor" ? "Create a class!" : "Search for a class!"}</div>
    )
  }
};