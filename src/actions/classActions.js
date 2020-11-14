export const ADD_CLASS = "ADD_CLASS"

export const addClass = (value) => {
  return {type: ADD_CLASS, payload: value}
}
