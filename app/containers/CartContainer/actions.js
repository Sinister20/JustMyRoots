
import {
  CART_STORE_UPDATE_BY_KEY,
  PLACE_ORDER_SUBMIT_CART,
  GET_COUPONS_ON_CART,
  APPLY_COUPONS_ON_CART,
  SET_DELIVERY_ADDRESS_ON_CART,
  GET_DELIVERY_ADDRESS_ON_CART
} from './constants';


export function updateCartStoreByKeyVal(payload) {
  return {
    type: CART_STORE_UPDATE_BY_KEY,
    payload
  };
}

export function submitCartndPleceOrder(payload) {
  return {
    type: PLACE_ORDER_SUBMIT_CART,
    payload
  };
}

export function getCoupons(payload) {
  return {
    type: GET_COUPONS_ON_CART,
    payload
  };
}

export function applySelectedCoupon(payload) {
  return {
    type: APPLY_COUPONS_ON_CART,
    payload
  };
}

export function setDeliveryAddress(payload) {
  return {
    type: SET_DELIVERY_ADDRESS_ON_CART,
    payload
  };
}

export function getDeliveryAddress(payload) {
  return {
    type: GET_DELIVERY_ADDRESS_ON_CART,
    payload
  };
}
