import { ADD_CLASS, SEARCH_CLASS, SET_EDIT, DELETE_CLASS, EDIT_CLASS, SET_CLASS_LIST, FILTER_STATE, CLEAR_CLASSES, TOGGLE_PUNCH} from "../actions/classActions";

const initialState = {
  search_classes: [],
  class_list: [],
  edit_class: {},
  filtered_class_list: []
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return { ...state, "class_list": [...state.class_list, action.payload] }
    case SEARCH_CLASS:
      function filterResults() {
        const inputCopy = { ...action.payload.search_input };
        let results = action.payload.results;
        for (let i in inputCopy) { //deletes keys in fields that were left empty
          if (!inputCopy[i]) {
            delete inputCopy[i]
          };
        };
        let filteredResults = results.filter(el => {
          const keys = Object.keys(inputCopy);
          for (let i in keys) {
            if (el[keys[i]] !== inputCopy[keys[i]]) {
              return false;
            };
          };
          return true;
        }
        );
        return filteredResults ? filteredResults : results;
      }
      let results = filterResults()
      return { ...state, search_classes: results };
    case SET_EDIT:
      return { ...state, edit_class: action.payload };
    case DELETE_CLASS:
      let newClassList = [...state.class_list];
      // console.log("class list", newClassList)
      let index = newClassList.findIndex(el => el.id === action.payload);
      // console.log("index of class to delete", index)
      newClassList.splice(index, 1);
      return { ...state, class_list: newClassList }
    case EDIT_CLASS:
      let updatedClasses = [...state.class_list];
      let index2 = updatedClasses.findIndex(el => el.id === action.payload.id);
      updatedClasses.splice(index2, 1, action.payload);
      return { ...state, class_list: updatedClasses };
    case SET_CLASS_LIST:
      return { ...state, class_list: action.payload };
    case FILTER_STATE:
      let filtered = []
      action.payload.forEach(el => { //refactor: use cs algo method instead of nested loops?
        let tempClass = state.class_list.filter(el2 => el2.id === el.class_id)
        filtered.push(tempClass[0]);
      })
      // console.log("filtered class list", filtered)
      return { ...state, class_list: filtered, filtered_class_list: action.payload};
    case CLEAR_CLASSES:
      return initialState;
    case TOGGLE_PUNCH:
      let updatedState = {...state};
      if (updatedState.class_list[action.payload].punch_pass === "true") {
        updatedState.class_list[action.payload].punch_pass = "false";
      } else updatedState.class_list[action.payload].punch_pass = "true";
      return updatedState;
    default: return state;
  };
};

export default classReducer;