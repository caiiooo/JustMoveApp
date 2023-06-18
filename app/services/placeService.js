import axios from 'axios';
import config from './serviceConfig';
import moment from 'moment';
class placeService {
  createPlace = data => {
    return new Promise((resolve, reject) => {
      try {
        bodyFormData = new FormData();
        bodyFormData.append('name', data.name);
        bodyFormData.append('locationcoordinateslong', data.location.longitude);
        bodyFormData.append('locationcoordinateslatt', data.location.latitude);
        bodyFormData.append('modality', data.modality);
        data.photo.forEach((o, index) => {
          bodyFormData.append('placeImages', {
            uri: o.uri.replace('file://', ''),
            type: 'image/jpg',
            name: `${data.name.replace(
              ' ',
              '-',
            )}_${moment().get()}_${index}.jpg`,
          });
        });

        console.log(bodyFormData);
      } catch (error) {
        console.log(error);
      }

      axios
        .post(config.databaseURL + '/places', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data.createdPlace)
            resolve({success: true, data: response.data});
          else reject(response.data.error);
        })
        .catch(error => {
          if (error?.response) {
            console.log('1');
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            reject(error?.response.data);
            // console.log(error?.response.status);
            // console.log(error?.response.headers);
          } else if (error?.request) {
            console.log('2');
            // The request was made but no response was received
            // `error?.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject(error?.request);
          } else {
            console.log('3');
            // Something happened in setting up the request that triggered an Error?
            reject('Error', error?.message);
          }
          reject(error?.config);
        });
    });
  };

  getPlaces = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + '/places')
        .then(response => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject('Erro desconhecido'));
    });
  };
  getPlace = (_id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.databaseURL}/places/${_id}`)
        .then(response => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject('Erro desconhecido'));
    });
  };
}

const instance = new placeService();

export default instance;
