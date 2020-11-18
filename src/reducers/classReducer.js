import { ADD_CLASS, SEARCH_CLASS, SET_EDIT } from "../actions/classActions";

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

const initialState = [];

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return state
    case SEARCH_CLASS:
      function filterResults() {
        const inputCopy = {...action.payload.search_input};
        let results = action.payload.results;
        // console.log({inputCopy})
        // console.log({results})
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
        console.log(temp)
        return temp ? temp : results;
      }
      let results = filterResults()
      return results;
    case SET_EDIT:
      return action.payload;
    default: return state;
  }
}

export default classReducer;