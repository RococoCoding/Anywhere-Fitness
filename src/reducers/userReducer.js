import { UPDATE_CLASS_LIST, SKIP_ONBOARDING, ADD_USER, DELETE_CLASS, SAVE_USER, EDIT_CLASS} from "../actions/userActions";
import Axios from "axios";

const initialState = {
id: 0,
username: "",
password: "",
email: "",
classes: [],
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
    case SAVE_USER:
      return action.payload;
    case DELETE_CLASS:
      updatedClasses = state.classes.filter(el => {
        console.log(action.payload, el.id)
        if (el.id !== action.payload) {
          return true;
        } else return false;
      });
      return {...state, classes: updatedClasses};
    case EDIT_CLASS:
      updatedClasses = [...state.classes];
      let index = updatedClasses.findIndex(el => el.id === action.payload.id);
      updatedClasses.splice(index, 1, action.payload);
      return {...state, classes: updatedClasses};
    default: return state;
  }
}

export default userReducer;