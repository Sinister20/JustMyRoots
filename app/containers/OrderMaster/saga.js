/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { GET_ORDER_LIST, UPDATE_ORDER } from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateOrderMasterStoreByKeyVal } from './actions';

import { getOrderList, updateOrder } from './serviceCalls';

export function* getOrderData() {
  try {
    const repos = yield call(getOrderList);
    if (repos.status === 200) {
      yield put(
        updateOrderMasterStoreByKeyVal({
          key: 'orderList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* modifyOrder(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateOrder, payload.payload);
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
    takeLatest(GET_ORDER_LIST, getOrderData),
    takeLatest(UPDATE_ORDER, modifyOrder),
  ]);
}
