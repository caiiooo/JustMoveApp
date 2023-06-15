import * as actionTypes from './actionTypes';
import modalitysService from '../services/modalitysService';

const getModalitys = modalitys => {
  return {
    type: actionTypes.GET_MODALITYS,
    modalitys,
  };
};

export const onGetModalitys = modality => dispatch => {
  // console.log('modalitysService');
  // console.log(modalitysService);
  modalitysService.getModailtys().then(data => {
    // console.log("+======")
    // console.log(data)
    // console.log("+======")
    dispatch(getModalitys(data.modalitys));
  });
};
