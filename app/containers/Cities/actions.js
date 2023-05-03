import {
  GLOBAL_STORE_UPDATE_BY_KEY,
  FETCH_CITIES,
  FETCH_CITY_ITEMS,
} from './constants';

export function updateGlobelStoreByKeyVal(payload) {
  return {
    type: GLOBAL_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export function fetchCities(payload) {
  return {
    type: FETCH_CITIES,
    payload,
  };
}

export function fetchCityItems(payload) {
  return {
    type: FETCH_CITY_ITEMS,
    payload,
  };
}
