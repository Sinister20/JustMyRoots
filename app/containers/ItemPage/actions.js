import {
  RESTAURENT_STORE_UPDATE_BY_KEY,
  FETCH_ITEM_BY_ID,
  FETCH_CUSTOMER_BROUGHT_ITEM,
} from './constants';

export function updateRestaurentStoreByKey(payload) {
  return {
    type: RESTAURENT_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export function fetchItemById(payload) {
  return {
    type: FETCH_ITEM_BY_ID,
    payload,
  };
}
export function fetchCustomerBroughtItem(payload) {
  return {
    type: FETCH_CUSTOMER_BROUGHT_ITEM,
    payload,
  };
}
