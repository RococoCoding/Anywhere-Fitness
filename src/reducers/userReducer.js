import { UPDATE_CLASS_LIST, SKIP_ONBOARDING, ADD_USER, DELETE_CLASS, EDIT_CLASS, SAVE_ROLE } from "../actions/userActions";
import Axios from "axios";

const initialState = {
id: 0,
username: "",
password: "",
email: "",
classes: "",
role: ""
};

const userReducer = (state = initialState, action) => {
  let updatedClasses = [];
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case UPDATE_CLASS_LIST:
      updatedClasses = [action.payload];
      // Axios.put(`${action.payload.id}`, updatedClasses);
      return {...state, classes: updatedClasses};
    case SKIP_ONBOARDING: 
      return {...state, classes: []};
    case SAVE_ROLE:
      return {...state, role: action.payload};
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