import * as actionTypes from '@actions/actionTypes';
const initialState = {
  success: false,
  data: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        success: true,
        data:action.data,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        success: false,
        data: action.payload
      };
    default:
      return state;
  }
};
