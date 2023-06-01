import axios from "axios";
import FuseUtils from "@fuse/FuseUtils";
import config from "./userServiceConfig";

class userService extends FuseUtils.EventEmitter {
  createUser = data => {
    return new Promise((resolve, reject) => {
      axios.post(config.databaseURL + "/createUser ", data).then(response => {
        if (response.data.message) resolve(response.data);
        else reject(response.data.error);
      });
    });
  };

  updateUser = data => {
    return new Promise((resolve, reject) => {
      axios.patch(config.databaseURL + "/updateUser ", data).then(response => {
        if (response.data.message) resolve(response.data);
        else reject(response.data.error);
      });
    });
  };

  updateUserRoles = data => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/createUserRole ", data)
        .then(response => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        });
    });
  };

  toogleUserActivation = data => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/toggleActivation", data)
        .then(response => {
          if (response.data) resolve(response.data.message);
          else reject(response.data.error);
        });
    });
  };

  getUsers = () => {
    return new Promise((resolve, reject) => {
      axios.get(config.databaseURL + "/getUser").then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  getUser = params => {
    return new Promise((resolve, reject) => {
      axios.get(config.databaseURL + "/getUser/" + params.id).then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  getRoles = () => {
    return new Promise((resolve, reject) => {
      axios.get(config.databaseURL + "/getRole").then(response => {
        if (response.data) resolve(response.data);
        else reject(response.error);
      });
    });
  };
}

const instance = new userService();

export default instance;
