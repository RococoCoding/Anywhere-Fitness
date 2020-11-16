export const ADD_USER = "ADD_USER";
export const UPDATE_CLASS_LIST = "UPDATE_CLASS_LIST";
export const SKIP_ONBOARDING = "SKIP_ONBOARDING";
export const DELETE_CLASS = "DELETE_CLASS";

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
