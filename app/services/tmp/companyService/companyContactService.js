import axios from "axios";
import FuseUtils from "@fuse/FuseUtils";
import config from "./companyServiceConfig";

class companyService extends FuseUtils.EventEmitter {
  create = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(config.databaseURL + "/companyContact", data)
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        }).catch(() => reject("Erro desconhecido"));
    });
  };

  update = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/companyContact/" + data.companyContactId, data)
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        }).catch(() => reject("Erro desconhecido"));
    });
  };

  getByCompanyId = (param) => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/companyContact/" + param)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        }).catch(() => reject("Erro desconhecido"));
    });
  };

  getSector = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/companyContactSector")
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        }).catch(() => reject("Erro desconhecido"));
    });
  };

  toggleCompanyActivation = (companyContactId) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/companyContact/toggleActivation", {companyContactId})
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        }).catch(() => reject("Erro desconhecido"));
    });
  };
}

const instance = new companyService();

export default instance;
