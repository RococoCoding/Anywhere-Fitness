export const ADD_USER = "ADD_USER";
export const UPDATE_CLASS_LIST = "UPDATE_CLASS_LIST";
export const SKIP_ONBOARDING = "SKIP_ONBOARDING";
export const DELETE_CLASS = "DELETE_CLASS";
export const EDIT_CLASS = "EDIT_CLASS";
export const SAVE_ROLE = "SAVE_ROLE";

export const addUser = (value) => {
  return {type: ADD_USER, payload: value};
};

export const updateClassList = (value) => {
  return {type: UPDATE_CLASS_LIST, payload: value};
};

export const skipOnboarding = () => {
  return {type: SKIP_ONBOARDING};
}

export const deleteClass = (value) => {
  return {type: DELETE_CLASS, payload: value};
}

export const editClassAction = (value) => {
  return {type: EDIT_CLASS, payload: value}
}

export const saveRole = (value) => {
  return {type: SAVE_ROLE, payload: value}
}