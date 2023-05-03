/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';
import { FETCH_CITIES, FETCH_CITY_ITEMS } from './constants';

import { getCityList, getCityItems } from './serviceCalls';
import { updateGlobelStoreByKeyVal } from './actions';

export function* fetchCities(payload) {
  try {
    const repos = yield call(getCityList, payload);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({ key: 'cities', value: repos.data.data }),
      );
    }
  } catch (err) { }
}

export function* fetchCityItems(payload) {
  try {
    const repos = yield call(getCityItems, payload.payload);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({ key: 'cityItems', value: repos.data.data }),
      );
    }
  } catch (err) { }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_CITIES, fetchCities),
    takeLatest(FETCH_CITY_ITEMS, fetchCityItems),
  ]);
}
