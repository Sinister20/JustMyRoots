/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { FETCH_ITEM_BY_ID, FETCH_CUSTOMER_BROUGHT_ITEM } from './constants';

import {
  brandItemByIdFetchService,
  brandFetchCustomerBrought,
} from './serviceCalls';

import { updateRestaurentStoreByKey } from './actions';

export function* getFeatureItemByID({ payload: { itemId, brandId, resolve, reject } }) {


  const repos = yield call(brandItemByIdFetchService, itemId,brandId);
  try {
    if (repos.status === 200) {
      yield put(
        updateRestaurentStoreByKey({ key: 'itemDetail', value: repos.data.data.items }),
      );
      resolve(repos)
    }
  } catch (error) {
    reject(error);
  }
  
}
export function* getCustomerBroughtItem(payload) {
  const repos = yield call(brandFetchCustomerBrought, payload);
  if (repos.status === 200) {
    yield put(
      updateRestaurentStoreByKey({
        key: 'customerBrought',
        value: repos.data.data,
      }),
    );
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_ITEM_BY_ID, getFeatureItemByID),
    takeLatest(FETCH_CUSTOMER_BROUGHT_ITEM, getCustomerBroughtItem),
  ]);
}
