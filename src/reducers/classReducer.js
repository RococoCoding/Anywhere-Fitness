import { ADD_CLASS, SEARCH_CLASS, SET_EDIT, DELETE_CLASS, EDIT_CLASS, SET_CLASS_LIST, FILTER_STATE} from "../actions/classActions";

// const initialState = {
//   classID: 0, 
//   name: "",
//   type: "",
//   date: 0,
//   startTime: 0,
//   duration: "",
//   intensity: "",
//   location: "",
//   attendees: 0,
//   max: 0,
//   punchpass: "",
//   };

const initialState = {
  search_classes: [],
  class_list: [],
  edit_class: {},
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return {...state, "class_list": [...state.class_list, action.payload]}
    case SEARCH_CLASS:
      function filterResults() {
        const inputCopy = {...action.payload.search_input};
        let results = action.payload.results;
        for (let i in inputCopy) {
          if (!inputCopy[i]) {
            delete inputCopy[i] //delete empty search fields
          };
        };
        
        let temp = results.filter(el => {
          const keys = Object.keys(inputCopy);
            for (let i in keys) {
              if (el[keys[i]] !==  inputCopy[keys[i]]) {
                return false;
              };
            };
            return true;
          }
        );
        return temp ? temp : results;
      }
      let results = filterResults()
      return {...state, search_classes: results};
    case SET_EDIT:
      return {...state, edit_class: action.payload};
    case DELETE_CLASS:
      let newClassList = [...state.class_list];
      let index = newClassList.findIndex(el => el.id === action.payload);
      newClassList.splice(index, 1);
      return {...state, class_list: newClassList}
    case EDIT_CLASS:
      let updatedClasses = [...state.class_list];
      let index2 = updatedClasses.findIndex(el => el.id === action.payload.id);
      console.log(action.payload)
      updatedClasses.splice(index2, 1, action.payload);
      return {...state, class_list: updatedClasses};
    case SET_CLASS_LIST:
      return action.payload;
    case FILTER_STATE: 
      //action.payload === array with class_ids
      action.payload.filter(el => el.id === state.class_list.id)
      return 
    default: return state;
  }
}

export default classReducer;