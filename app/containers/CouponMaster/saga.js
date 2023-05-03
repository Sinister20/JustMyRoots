/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  // GET_ORDER_LIST,
  DELETE_COUPON,
  ADD_COUPON,
  GET_COUPON_LIST,
  UPDATE_COUPON,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateCouponMasterStoreByKeyVal } from './actions';

import {
  // getOrderListServiceCall,
  deleteCoupon,
  addCoupon,
  getCouponList,
  updateCoupon,
} from './serviceCalls';

export function* getCouponData() {
  try {
    const repos = yield call(getCouponList);
    if (repos.status === 200) {
      yield put(
        updateCouponMasterStoreByKeyVal({
          key: 'couponList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeCoupon(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteCoupon, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createCoupon(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(addCoupon, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyCoupon(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateCoupon, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
    // eslint-disable-next-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    // takeLatest(GET_ORDER_LIST, getOrdersData),
    takeLatest(GET_COUPON_LIST, getCouponData),
    takeLatest(ADD_COUPON, createCoupon),
    takeLatest(UPDATE_COUPON, modifyCoupon),
    takeLatest(DELETE_COUPON, removeCoupon),
  ]);
}
