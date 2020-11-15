import { UPDATE_CLASS_LIST, SKIP_ONBOARDING, ADD_USER } from "../actions/userActions";
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
  switch (action.type) {
    case ADD_USER:
      return state;
    case UPDATE_CLASS_LIST:
      let updatedClasses = [action.payload];
      // Axios.put(`${action.payload.id}`, updatedClasses);
      return {...state, classes: updatedClasses};
    case SKIP_ONBOARDING: 
      return {...state, classes: []};
    default: return state;
  }
}

export default userReducer;