/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  // GET_ORDER_LIST,
  DELETE_LOCATION,
  ADD_LOCATION,
  GET_LOCATION_LIST,
  UPDATE_LOCATION,
  GET_LOCATION_LIST_BY_STATE_ID,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateLocationMasterStoreByKeyVal } from './actions';

import {
  // getOrderListServiceCall,
  deleteLocation,
  addLocation,
  getLocationList,
  updateLocation,
  getLocationService,
} from './serviceCalls';

export function* getLocationData() {
  try {
    const repos = yield call(getLocationList);
    if (repos.status === 200) {
      yield put(
        updateLocationMasterStoreByKeyVal({
          key: 'locationList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeLocation(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteLocation, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* addLoc(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(addLocation, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* getLocationListByIDSaga(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(
      getLocationService,
      action.payload.selectedState._id,
    );
    if (res.status === 200) {
      resolve(res.data.data);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyLocation(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateLocation, payload.payload);
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
    takeLatest(GET_LOCATION_LIST, getLocationData),
    takeLatest(GET_LOCATION_LIST_BY_STATE_ID, getLocationListByIDSaga),
    takeLatest(ADD_LOCATION, addLoc),
    takeLatest(UPDATE_LOCATION, modifyLocation),
    takeLatest(DELETE_LOCATION, removeLocation),
  ]);
}
