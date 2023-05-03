/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_RESTAURENT_DETAILS,
  FETCH_RESTAURENT_ITEMS,
  FETCH_FEATURE_ITEMS
} from './constants';

import {
  brandItemApiFetchService,
  brandDetailsApiFetchService,
  brandfeatureItemsService
} from './serviceCalls';

import { selectRestaurentStoreByKey } from './actions';

export function* getBrandDetailsData(payload) {
 
  try {
    const repos = yield call(brandDetailsApiFetchService, payload);
    if (repos.status === 200) {
      yield put(
        selectRestaurentStoreByKey({ key: 'brandDetails', value: repos.data.data }),
      );
    }
  } catch (err) { }
}

export function* getBrandItemsData(payload) {
  
  try {
    const repos = yield call(brandItemApiFetchService, payload);
  if (repos.status === 200) {
    yield put(
      selectRestaurentStoreByKey({ key: 'brandItems', value: repos.data.data }),
    );
  }
  } catch (err) {
    console.log("brand item error",err);
  }
  
}

export function* getFeatureItemsData(payload) {
  try {
    const repos = yield call(brandfeatureItemsService, payload);
  if (repos.status === 200) {
    yield put(
      selectRestaurentStoreByKey({ key: 'featureItems', value: repos.data.data }),
    );
  }
  }catch(err){
    console.log("feature item error",err);
  }
  
}



export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_RESTAURENT_DETAILS, getBrandDetailsData),
    takeLatest(FETCH_RESTAURENT_ITEMS, getBrandItemsData),
    takeLatest(FETCH_FEATURE_ITEMS, getFeatureItemsData),
  ]);
}
