import axios from "axios";
import jwtDecode from "jwt-decode";
import * as loginUtil from "@utils/loginUtil"
import config from "./serviceConfig";

class authService {
  login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(config.databaseURL + "/user/login", {
          email,
          password
        })
        .then(response => {
          if (response?.data?.user?.token) {
            resolve(response.data);
          } else {
            reject(response?.data?.error);
          }
        }).catch(error => {
          console.log(error)
          reject("Erro desconhecido");
        });
    });
  };

  isUserAuthenticated = () => {
    return new Promise(async (resolve, reject) => {
      const userToken = await loginUtil.getStorageUserToken();
      if (userToken) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  getTokenData = () => {
    return new Promise((resolve, reject) => {
      this.getUserToken()
        .then(token => {
          const decoded = jwtDecode(token);
          if (!decoded) {
            return reject(null);
          }
          return resolve(decoded);
        })
        .catch(err => reject(null));
    });
  };

  getUserInfo = () => {
    return new Promise((resolve, reject) => {
      this.getTokenData().then(userData => {
        axios
          .get(config.databaseURL + '/userInfo/' + userData.data._id)
          .then(response => {
            if (response.data) resolve(response.data);
            else reject(response.data.error);
          })
          .catch(err => {
            console.log(err);
            reject(err.response.data.message);
          });
      });
    });
  };
}

const instance = new authService();

export default instance;
