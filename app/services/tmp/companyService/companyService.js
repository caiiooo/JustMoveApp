import axios from "axios";
import FuseUtils from "@fuse/FuseUtils";
import config from "./companyServiceConfig";

class companyService extends FuseUtils.EventEmitter {
  createCompany = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(config.databaseURL + "/create", data)
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  updateCompany = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/update/" + data.companyId, data)
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  getCompanies = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/")
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };
  getParentCompanies = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/parent")
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  getFiscalClassification = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/FiscalClassification")
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  getCompany = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/" + data.id)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  getFiscalClassification = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/FiscalClassification")
        .then((response) => {
          if (response.data) resolve(response.data);
          else reject(response.error);
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  toggleCompanyActivation = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(config.databaseURL + "/toggleActivation", data)
        .then((response) => {
          if (response.data.message) resolve(response.data);
          else reject(response.data.error);
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };

  cpnjQuery = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/cnpj/" + data)
        .then((response) => {
          if (response.data.message) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch(() => reject("Erro desconhecido"));
    });
  };
}

const instance = new companyService();

export default instance;
