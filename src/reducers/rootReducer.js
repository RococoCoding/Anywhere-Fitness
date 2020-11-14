import { combineReducers } from "redux";

import classReducer from "./classReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
  classReducer,
  userReducer
});

export default rootReducer