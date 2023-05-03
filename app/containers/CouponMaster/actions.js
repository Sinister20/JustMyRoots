import {
  COUPON_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_COUPON,
  UPDATE_COUPON,
  ADD_COUPON,
  GET_COUPON_LIST,
} from './constants';

export function updateCouponMasterStoreByKeyVal(payload) {
  return {
    type: COUPON_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteCoupon = payload => ({
  type: DELETE_COUPON,
  payload,
});

export const addCoupon = payload => {
  return {
    type: ADD_COUPON,
    payload,
  };
};

export const updateCoupon = payload => ({
  type: UPDATE_COUPON,
  payload,
});

export const getCouponList = () => ({
  type: GET_COUPON_LIST,
});
