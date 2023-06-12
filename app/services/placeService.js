import axios from "axios";
import config from "./serviceConfig";

class placeService {
  createPlace = (data) => {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('name', data.name);
      form.append('locationcoordinateslong', data.location.longitude);
      form.append('locationcoordinateslatt', data.location.latitude);
      form.append('modality', data.modality);
      axios
        .post(config.databaseURL + "/places", form)
        .then((response) => {
          if (response.data.createdPlace) resolve({ success: true, data: response.data });
          else reject(response.data.error);
        })
        .catch((error) => { console.log(error); reject("Erro desconhecido") });
    });
  };

  getPlaces = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.databaseURL + "/places")
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

}

const instance = new placeService();

export default instance;
