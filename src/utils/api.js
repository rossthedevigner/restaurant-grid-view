import ky from 'ky';
import {API_URL} from '../utils/constants';

async function getRestaurantData() {
  try {
    return await ky(API_URL, {method: 'GET'}).json();
  } catch (e) {
    return Promise.reject({message: 'Could not retrieve restaurant list!'});
  }
}

export {getRestaurantData};
