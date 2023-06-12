import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import modalityReducer from './modality';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  modality: modalityReducer,
});
