import axios from "axios";

import config from "./serviceConfig";

class modalitysService {
  getModailtys = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/modalitys")
        .then((response) => {
          console.log("--------------------------------------------------------------")
          console.log(response.data)
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };
}

const instance = new modalitysService();

export default instance;
