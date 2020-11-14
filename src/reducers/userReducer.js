import {ADD_USER} from "../actions/userActions";

const initialState = {
id: 0,
username: "",
password: "",
email: "",
type: "",
classes: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return state;
    default: return state;
  }
}

export default userReducer;