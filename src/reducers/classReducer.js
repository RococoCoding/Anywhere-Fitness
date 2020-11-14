import {ADD_CLASS} from "../actions/classActions";

const initialState = {
classID: 0,
name: "",
type: "",
date: 0,
startTime: 0,
duration: "",
intensity: "",
location: "",
attendees: 0,
max: 0,
punchpass: "",
}

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return state;
    default: return state;
  }
}

export default classReducer;