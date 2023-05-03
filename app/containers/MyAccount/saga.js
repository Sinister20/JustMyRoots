/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { debug } from 'loglevel';
import {
  GET_ADDRESS_LIST,
  GET_ORDER_LIST,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  CANCEL_MY_ORDER,
  RE_ORDER
} from './constants';

import { setToLocalStorage } from '../../utils/localStorageUtils';
import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateMyAccountStoreByKeyVal, getOrderList } from './actions';
import { fetchCart } from '../HomePage/actions';
import {

  getOrderListServiceCall,
  getAddressListServiceCall,
  deleteAddress,
  addAddress,
  updateAddress,
  cancelOrderService,
  reOrderServiceCall
} from './serviceCalls';
import { getDeliveryAddress } from '../CartContainer/actions';

export function* getOrdersData() {
  try {
    const repos = yield call(getOrderListServiceCall);
    if (repos.status === 200) {
      yield put(
        updateMyAccountStoreByKeyVal({
          key: 'myOrders',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getData(action) {
  const {
    payload: { resolve, reject },
  } = action;
  // const { resolve, reject, id } = payload;
  try {
    const repos = yield call(getAddressListServiceCall);
    if (repos.status === 200) {
      resolve(repos.data.data);
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeAddress(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteAddress, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createAddress(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(addAddress, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyAddress(action) {
  const { payload } = action;

  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateAddress, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
    // eslint-disable-next-line no-console
  }
}

export function* cancelMyOrderSaga(action) {
  const { payload } = action;
  try {
    const res = yield call(cancelOrderService, payload);
    if (res.status === 200) {
      yield put(getOrderList());
    }
  } catch (err) {
    alert('somthing went wrong');
    // eslint-disable-next-line no-console
  }
}

export function* reOrderSaga(action) {
  // 
  const {payload:{orderId, resolve,reject}}= action

  try {
    const res = yield call(reOrderServiceCall, orderId);
    if (res.status === 200) {
      yield put(fetchCart());
      yield put(getDeliveryAddress())
      resolve(res);
     
    }
  } catch (err) {
    reject(err);
    // alert('somthing went wrong');
    // eslint-disable-next-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    takeLatest(GET_ORDER_LIST, getOrdersData),
    takeLatest(GET_ADDRESS_LIST, getData),
    takeLatest(DELETE_ADDRESS, removeAddress),
    takeLatest(ADD_ADDRESS, createAddress),
    takeLatest(UPDATE_ADDRESS, modifyAddress),
    takeLatest(CANCEL_MY_ORDER, cancelMyOrderSaga),
    takeLatest(RE_ORDER, reOrderSaga),
  ]);
}
