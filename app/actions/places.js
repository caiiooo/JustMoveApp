import * as actionTypes from './actionTypes';
import placeService from '../services/placeService';

const getPlaces = modalitys => {
  return {
    type: actionTypes.GET_MODALITYS,
    modalitys,
  };
};


export const onGetPlaces = () => dispatch => {
  console.log('placeService');
  console.log(placeService);
  placesService.getPlaces().then(data => {
    // console.log(data)
    dispatch(getPlaces(data.places));
  })
};
