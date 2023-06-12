import * as actionTypes from '@actions/actionTypes';
const initialState = {
  login: {
    success: false,
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          success:true
        },
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        login: {
          success:false
        },
      };
    default:
      return state;
  }
};

