export const ADD_CLASS = "ADD_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
export const SEARCH_CLASS = "SEARCH_CLASS";
export const SET_EDIT = "SET_EDIT";

export const addClass = (value) => {
  return {type: ADD_CLASS, payload: value};
};

export const searchClass = (value) => {
  return {type: SEARCH_CLASS, payload: value};
};

export const setEdit = (value) => {
  return {type: SET_EDIT, payload: value}
}
