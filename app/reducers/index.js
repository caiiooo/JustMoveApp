import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import ModalityReducer from './modality';
import PlaceReducer from './place';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  modality: ModalityReducer,
  place: PlaceReducer,
});
