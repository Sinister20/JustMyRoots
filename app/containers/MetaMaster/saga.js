/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  // GET_ORDER_LIST,
  DELETE_META,
  ADD_META,
  GET_META_LIST,
  UPDATE_META,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateMetaMasterStoreByKeyVal } from './actions';

import {
  // getOrderListServiceCall,
  deleteMeta,
  addMeta,
  getMetaList,
  updateMeta,
} from './serviceCalls';

export function* getMetaData() {
  try {
    const repos = yield call(getMetaList);
    if (repos.status === 200) {
      yield put(
        updateMetaMasterStoreByKeyVal({
          key: 'metaList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeMeta(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteMeta, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createMeta(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(addMeta, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyMeta(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateMeta, payload.payload);
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
    takeLatest(GET_META_LIST, getMetaData),
    takeLatest(ADD_META, createMeta),
    takeLatest(UPDATE_META, modifyMeta),
    takeLatest(DELETE_META, removeMeta),
  ]);
}
