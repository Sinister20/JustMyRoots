import {
  RESTAURENT_STORE_UPDATE_BY_KEY,
  FETCH_RESTAURENT_DETAILS,
  FETCH_RESTAURENT_ITEMS,
  FETCH_FEATURE_ITEMS
} from './constants';


export function selectRestaurentStoreByKey(payload) {
  return {
    type: RESTAURENT_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export function fetchBrandDetails(payload) {
  return {
    type: FETCH_RESTAURENT_DETAILS,
    payload,
  };
}

export function fetchBrandItems(payload) {
  return {
    type: FETCH_RESTAURENT_ITEMS,
    payload,
  };
}

export function fetchFeatureItems(payload) {
  return {
    type: FETCH_FEATURE_ITEMS,
    payload,
  };
}