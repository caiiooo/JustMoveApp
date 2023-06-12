import axios from "axios";
import jwtDecode from "jwt-decode";

import config from "./jwtServiceConfig";

class jwtService {
  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(config.databaseURL + "/user/login", {
          email,
          password
        })
        .then(response => {
          console.log(response)
          if (response.data.user && response.data.token) {
            this.setUserToken(response.data.token);
            axios.defaults.headers.common = {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + response.data.token,
            };
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        }).catch(error => {
          console.log(error)
          reject("Erro desconhecido");
        });
    });
  };

  setUserToken = async token => {
    try {
      return await AsyncStorage.setItem('@BitApp:userToken', token);
    } catch (e) {
      throw e;
    }
  };

  getUserToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem('@BitApp:userToken');

        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  };

  removeUSerToken = async () => {
    try {
      return await AsyncStorage.removeItem('@BitApp:userToken');
    } catch (e) {
      throw e;
    }
  };

  isUserAuthenticated = () => {
    return new Promise(async (resolve, reject) => {
      // return false;
      const userToken = await this.getUserToken();
      //console.log("getUsetToken", userToken)
      if (userToken) {
        // headers: {
        // 	'Content-Type' : 'application/json',
        // 	'Authorization': 'Bearer ' + this.getAccessToken()
        // }
        axios.defaults.headers.common = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        };
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


  ///old

  createUser = data => {
    return new Promise((resolve, reject) => {
      axios.post("/api/auth/register", data).then(response => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };



  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(config.databaseURL + "/token", {
          access_token: this.getAccessToken()
        })
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  updateUserData = user => {
    return axios.post("/api/auth/user/update", {
      user: user
    });
  };

  setSession = access_token => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = access_token => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;
