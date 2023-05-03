import {
  BRAND_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_BRAND,
  ADD_BRAND,
  UPDATE_BRAND,
  GET_BRAND_LIST,
} from './constants';

export function updateBrandMasterStoreByKeyVal(payload) {
  return {
    type: BRAND_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteBrand = payload => ({
  type: DELETE_BRAND,
  payload,
});

export const addBrand = payload => ({
  type: ADD_BRAND,
  payload,
});

export const updateBrand = payload => ({
  type: UPDATE_BRAND,
  payload,
});

export const getBrandList = () => ({
  type: GET_BRAND_LIST,
});
