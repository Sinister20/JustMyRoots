import {
  LOYALTY_POINT_STORE_UPDATE_BY_KEY,
  GET_LOYALTY_POINT,
} from './constants';
export function updateLoyaltyPointStoreByKeyVal(payload) {
  return {
    type: LOYALTY_POINT_STORE_UPDATE_BY_KEY,
    payload,
  };
}
export function getLoyaltyPoint(payload) {
  return {
    type: GET_LOYALTY_POINT,
    payload,
  };
}
