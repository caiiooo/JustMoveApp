import * as actionTypes from './actionTypes';
import authService from '@services/authService';
import { setUserToken, getUserToken, removeUSerToken } from '@utils/loginUtil'

const onLogin = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};
const onLogout = () => {
  return {
    type: actionTypes.LOGIN_ERROR,
  };
};

export const authentication = (email, password, callback) => dispatch => {
  authService
    .login(email, password)
    .then(data => {
      setUserToken(data.user.token);
      dispatch(onLogin());
      if (typeof callback === 'function') {
        callback({ success: true, message: data.message });
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

export const singOut = () => dispatch =>{
  removeUSerToken()
  dispatch(onLogout())
}

export const isUserAuthenticated = (callback) => dispatch => {
  //get token info
  getUserToken().then(token => {
    if (token) {
      dispatch(onLogin());
      if (typeof callback === 'function') {
        callback({ success: true });
      }
      return;
    }
    dispatch(onLogout());
  });
}