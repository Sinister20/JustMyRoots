/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  GET_BRAND_LIST,
  DELETE_BRAND,
  ADD_BRAND,
  UPDATE_BRAND,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateBrandMasterStoreByKeyVal } from './actions';

import {
  getBrandListServiceCall,
  deleteBrand,
  addBrand,
  updateBrand,
} from './serviceCalls';

export function* getBrandList() {
  try {
    const repos = yield call(getBrandListServiceCall);
    if (repos.status === 200) {
      yield put(
        updateBrandMasterStoreByKeyVal({
          key: 'brandList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeBrand(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteBrand, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createBrand(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(addBrand, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyBrand(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateBrand, payload.payload);
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
    takeLatest(GET_BRAND_LIST, getBrandList),
    takeLatest(DELETE_BRAND, removeBrand),
    takeLatest(ADD_BRAND, createBrand),
    takeLatest(UPDATE_BRAND, modifyBrand),
  ]);
}
