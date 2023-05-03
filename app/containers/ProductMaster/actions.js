import {
  PRODUCT_MASTER_STORE_UPDATE_BY_KEY,
  GET_PRODUCT_LIST,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_BRAND_LIST,
  GET_PRODUCT_LIST_BY_BRAND_ID,
} from './constants';

export function updateProductMasterStoreByKeyVal(payload) {
  return {
    type: PRODUCT_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteProduct = payload => ({
  type: DELETE_PRODUCT,
  payload,
});

export const getProduct = payload => ({
  type: GET_PRODUCT_LIST,
  payload,
});

export const addProduct = payload => {
  return {
    type: ADD_PRODUCT,
    payload,
  };
};

export const getBrand = payload => ({
  type: GET_BRAND_LIST,
  payload,
});

export const getProductListById = payload => ({
  type: GET_PRODUCT_LIST_BY_BRAND_ID,
  payload,
});

export const updateProduct = payload => ({
  type: UPDATE_PRODUCT,
  payload,
});
