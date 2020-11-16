import { UPDATE_CLASS_LIST, SKIP_ONBOARDING, ADD_USER, DELETE_CLASS, EDIT_CLASS } from "../actions/userActions";
import Axios from "axios";

const initialState = {
id: 0,
username: "",
password: "",
email: "",
classes: [ {
  classID: 1,
  name: "Spin Xtreme",
  type: "spin",
  date: "2020-11-17",
  startTime: "10:00",
  duration: "1 hour",
  intensity: "high",
  location: "downtown",
  attendees: 2,
  max: 10,
  punchpass: 10,
},
{
  classID: 4,
  name: "Spin Xtreme 11",
  type: "spin",
  date: "2020-11-17",
  startTime: "11:00",
  duration: "1 hour",
  intensity: "high",
  location: "downtown",
  attendees: 2,
  max: 10,
  punchpass: 10,
},
{
  classID: 2,
  name: "Yoga Master",
  type: "yoga",
  date: "2020-11-17",
  startTime: "12:00",
  duration: "1.5 hour",
  intensity: "high",
  location: "FiDi",
  attendees: 10,
  max: 10,
  punchpass: 10,
}],
role: "instructor"
};

const userReducer = (state = initialState, action) => {
  let updatedClasses = [];
  switch (action.type) {
    case ADD_USER:
      return state;
    case UPDATE_CLASS_LIST:
      updatedClasses = [action.payload];
      // Axios.put(`${action.payload.id}`, updatedClasses);
      return {...state, classes: updatedClasses};
    case SKIP_ONBOARDING: 
      return {...state, classes: []};
    case DELETE_CLASS:
      console.log(state.classes)
      updatedClasses = state.classes.filter(el => {
        if (el.classID !== action.payload) {
          return true;
        } else return false;
      });
      return {...state, classes: updatedClasses};
    case EDIT_CLASS:
      // need to find the index of the object.id that matches payload.id
      // splice that out and replace with payload
      updatedClasses = [...state.classes]
      let index = updatedClasses.indexOf(el => el.id === action.payload.id);
      updatedClasses.splice(index, 1, action.payload);
      return {...state, classes: updatedClasses}
    default: return state;
  }
}

export default userReducer;