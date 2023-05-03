/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  PLACE_ORDER_SUBMIT_CART,
  GET_COUPONS_ON_CART,
  APPLY_COUPONS_ON_CART,
  SET_DELIVERY_ADDRESS_ON_CART,
  GET_DELIVERY_ADDRESS_ON_CART,
} from './constants';

import { setToLocalStorage } from '../../utils/localStorageUtils';
import { updateHomeAppByKeyVal, fetchCart } from '../HomePage/actions';
import { updateCartStoreByKeyVal } from './actions';

import {
  submitCartNdPlaceOrderService,
  getCouponServiceCall,
  applyCouponServiceCall,
  setDeliverAddrsServiceCall,
  getDeliverAddrsServiceCall,
} from './serviceCalls';

export function* submitCartNdCreateOrder({ payload }) {
  try {
    const cartId = payload && payload.data._id;
    if (!cartId) {
      return true;
    }
    const repos = yield call(submitCartNdPlaceOrderService, cartId);
   
    if (repos.status === 200) {
      setToLocalStorage('info',repos.data)
      setToLocalStorage('info1',8989)
      yield put(
        updateHomeAppByKeyVal({
          key: 'cartData',
          value: { brandId: '', data: repos.data.data },
        }),
      );
      // window.location.href = 'http://localhost:3000/orders/order-placed';
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getCouponOnCart({ payload }) {
  try {
    const repos = yield call(getCouponServiceCall, payload);
    if (repos.status === 200) {
      yield put(
        updateCartStoreByKeyVal({ key: 'couponData', value: repos.data.data }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* applyCouponOnCart({ payload }) {
  const { cartData, selectedCoupon, isRemove } = payload;
  const requestData = {
    cartId: cartData[Object.keys(cartData)[0]].cartInfo._id,
    couponId: selectedCoupon.couponId
      ? selectedCoupon.couponId
      : selectedCoupon._id,
    isRemove,
  };
  try {
    const repos = yield call(applyCouponServiceCall, requestData);
    if (repos.status === 200) {
      yield put(fetchCart());
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* setDeliverAddrs({ payload }) {
  
  try {
    const repos = yield call(setDeliverAddrsServiceCall, payload);
    if (repos.status === 200) {
      // yield put(fetchCart());
      yield put(
        updateCartStoreByKeyVal({
          key: 'getDefaultAddress',
          value: {...payload,isDefault:true},
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getDeliverAddrs({ payload }) {
  try {
    const repos = yield call(getDeliverAddrsServiceCall, payload);
    if (repos.status === 200) {
      yield put(
        updateCartStoreByKeyVal({
          key: 'getDefaultAddress',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    takeLatest(PLACE_ORDER_SUBMIT_CART, submitCartNdCreateOrder),
    takeLatest(GET_COUPONS_ON_CART, getCouponOnCart),
    takeLatest(APPLY_COUPONS_ON_CART, applyCouponOnCart),
    takeLatest(SET_DELIVERY_ADDRESS_ON_CART, setDeliverAddrs),
    takeLatest(GET_DELIVERY_ADDRESS_ON_CART, getDeliverAddrs),
  ]);
}
