import * as actionTypes from '@actions/actionTypes';
const initialState = {
  places: []
};

export default (state = initialState, action = {}) => {
  // console.log("actionactionaction", action)
  switch (action.type) {
    case actionTypes.GET_PLACES: {
      console.log('aa')
      return {
        ...state,
        places: action.places,
      };
    }
    default:
      return state;
  }
};
