import { UPDATE_CLASS_LIST, SKIP_ONBOARDING, ADD_USER, DELETE_CLASS } from "../actions/userActions";
import Axios from "axios";

const initialState = {
id: 0,
username: "",
password: "",
email: "",
classes: false,
role: ""
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
      updatedClasses = [...state.classes].filter(el => el.ClassID === action.payload);
      return {...state, classes: updatedClasses};
    default: return state;
  }
}

export default userReducer;