import * as actionTypes from './actionTypes';
import placeService from '@services/placeService';

const getPlaces = places => {
  return {
    type: actionTypes.GET_PLACES,
    places,
  };
};

export const onGetPlaces = () => dispatch => {
  placeService.getPlaces().then(data => {
    // console.warn(data.places)
    dispatch(getPlaces(data.places));
  });
};
