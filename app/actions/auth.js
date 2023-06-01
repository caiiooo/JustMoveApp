import * as actionTypes from './actionTypes';
import jwtService from '../services/jwtService';

const onLogin = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
};

export const authentication = (email, password, callback) => dispatch => {
  //call api and dispatch action case
 jwtService
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      dispatch(onLogin(data));
      if (typeof callback === 'function') {
        callback({success: true});
      }
    })
    .catch(error => {
      console.warn(error)
      return dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: error,
      });
    });
};
