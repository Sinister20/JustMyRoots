/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { SEARCH_BY_KEYWORD, FETCH_RESULTS_BY_KEYWORD } from './constants';

import {
  searchByKeyServiceCall,
  searchResultsByKeyServiceCall,
} from './serviceCalls';

import { updateSearchStoreByKeyVal } from './actions';

export function* applyCouponOnCart({ payload }) {
  const { searchKey, resolve, reject } = payload;

  try {
    const repos = yield call(searchByKeyServiceCall, searchKey);
    if (repos.status === 200) {
      resolve(repos.data.data.keywords);
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getSearchResult({ payload }) {
  try {
    const repos = yield call(searchResultsByKeyServiceCall, payload);
    if (repos.status === 200) {
      yield put(
        updateSearchStoreByKeyVal({
          key: 'searchResult',
          value: repos.data.data,
        }),
      );
    } else {
      yield put(
        updateSearchStoreByKeyVal({ key: 'searchResult', value: null }),
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
    takeLatest(SEARCH_BY_KEYWORD, applyCouponOnCart),
    takeLatest(FETCH_RESULTS_BY_KEYWORD, getSearchResult),
  ]);
}
