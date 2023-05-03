import {
  GET_FAVORITE_LIST,
  SET_FAVORITE_LIST,
  MY_FAVORITE_STORE_UPDATE_BY_KEY,
  SAVE_FAVORITE,
} from './constants';
export function updateMyFavoriteStoreByKeyVal(payload) {
  return {
    type: MY_FAVORITE_STORE_UPDATE_BY_KEY,
    payload,
  };
}
export function getFavoriteList(payload) {
  return {
    type: GET_FAVORITE_LIST,
    payload,
  };
}

export function setFavoriteList(payload) {
  return {
    type: SET_FAVORITE_LIST,
    payload,
  };
}

export function saveFavorite(payload) {
  return {
    type: SAVE_FAVORITE,
    payload,
  };
}
