import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const setUserToken = async token => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return await AsyncStorage.setItem('@JustMove:userToken', token);
  } catch (e) {
    throw e;
  }
};

export const getUserToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await AsyncStorage.getItem('@JustMove:userToken');
      console.log("token", token);
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return resolve(token);
      }
      return reject(false);
    } catch (e) {
      reject (false);
    }
  });
};
export const removeUSerToken = async () => {
  try {
    delete axios.defaults.headers.common['Authorization'];
    return await AsyncStorage.removeItem('@JustMove:userToken');
  } catch (e) {
    throw e;
  }
};
