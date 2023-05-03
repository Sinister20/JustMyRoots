
import {
  SEARCH_STORE_UPDATE_BY_KEY,
  SEARCH_BY_KEYWORD,
  FETCH_RESULTS_BY_KEYWORD
} from './constants';


export function updateSearchStoreByKeyVal(payload) {
  return {
    type: SEARCH_STORE_UPDATE_BY_KEY,
    payload
  };
}

export function searchByKey(payload) {
  return {
    type: SEARCH_BY_KEYWORD,
    payload
  };
}



export function fetchResults(payload) {
  return {
    type: FETCH_RESULTS_BY_KEYWORD,
    payload
  };
}


