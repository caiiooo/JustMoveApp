import * as actionTypes from '@actions/actionTypes';
const initialState = {
  modalitys: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_MODALITYS: {
      console.log('teste')
      return {
        ...state,
        modalitys: action.modalitys,
      };
    }
    default:
      return state;
  }
};
