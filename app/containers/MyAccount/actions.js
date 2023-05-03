import {
  MY_ACCOUNT_STORE_UPDATE_BY_KEY,
  GET_ORDER_LIST,
  GET_ADDRESS_LIST,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  CANCEL_MY_ORDER,
  RE_ORDER
} from './constants';

export function updateMyAccountStoreByKeyVal(payload) {
  return {
    type: MY_ACCOUNT_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export function getOrderList(payload) {
  return {
    type: GET_ORDER_LIST,
    payload,
  };
}

export const deleteAddress = payload => ({
  type: DELETE_ADDRESS,
  payload,
});

export const getAddress = payload => ({
  type: GET_ADDRESS_LIST,
  payload,
});

export const addAddress = payload => ({
  type: ADD_ADDRESS,
  payload,
});

export const updateAddress = payload => ({
  type: UPDATE_ADDRESS,
  payload,
});


export const cancelMyOrder = payload => ({
  type: CANCEL_MY_ORDER,
  payload,
})
export const reOrder = (payload) => ({
  type: RE_ORDER,
  payload,
})