import axios from 'axios';
import config from './serviceConfig';
import moment from 'moment';

class placeService {
  createUser = data => {
    return new Promise((resolve, reject) => {
      bodyFormData = new FormData();

      bodyFormData.append('username', data.username);
      bodyFormData.append('password', data.password);
      bodyFormData.append('email', data.email);
      bodyFormData.append('photo', {
        uri: data.photo.replace('file://', ''),
        type: 'image/jpg',
        name: `${data.username.replace(' ', '-')}_${moment().get()}.jpg`,
      });
      axios
        .post(config.databaseURL + '/user/singup', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response.data) resolve({success: true, data: response.data});
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

  // getPlaces = () => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(config.databaseURL + '/places')
  //       .then(response => {
  //         if (response.data) {
  //           resolve(response.data);
  //         } else {
  //           reject(response.error);
  //         }
  //       })
  //       .catch(() => reject('Erro desconhecido'));
  //   });
  // };
}

const instance = new placeService();

export default instance;
