/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  GET_DELIVERY_LOCATIONS,
  UPDATE_DELIVERY_LOCATION,
  DELETE_DELIVERY_LOCATION,
  ADD_DELIVERY_LOCATION,
  // UPDATE_BRAND,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateLocationToLocationMasterByKeyVal } from './actions';

import {
  getDeliveryLocationList,
  deleteDeliveryLocation,
  addDeliverylocation,
  updateDeliveryLocation,
} from './serviceCalls';

export function* getDeliveryLocationsData() {
  try {
    const repos = yield call(getDeliveryLocationList);
    if (repos.status === 200) {
      yield put(
        updateLocationToLocationMasterByKeyVal({
          key: 'deliveryLocationsList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeDeliveryLocation(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteDeliveryLocation, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* addDeliveryloc(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(addDeliverylocation, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyDeliveryLocation(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateDeliveryLocation, payload.payload);
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
    takeLatest(GET_DELIVERY_LOCATIONS, getDeliveryLocationsData),
    takeLatest(DELETE_DELIVERY_LOCATION, removeDeliveryLocation),
    takeLatest(ADD_DELIVERY_LOCATION, addDeliveryloc),
    takeLatest(UPDATE_DELIVERY_LOCATION, modifyDeliveryLocation),
  ]);
}
