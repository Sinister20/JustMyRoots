import {
  ORDER_MASTER_STORE_UPDATE_BY_KEY,
  UPDATE_ORDER,
  GET_ORDER_LIST,
} from './constants';

export function updateOrderMasterStoreByKeyVal(payload) {
  return {
    type: ORDER_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const updateOrder = payload => {
  //console.log(payload, '====');
  return {
    type: UPDATE_ORDER,
    payload,
  };
};

export const getOrderList = () => {
  //console.log('boom');
  return {
    type: GET_ORDER_LIST,
  };
};
