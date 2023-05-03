/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  // GET_ORDER_LIST,
  DELETE_TESTIMONIAL,
  ADD_TESTIMONIAL,
  GET_TESTIMONIAL_LIST,
  UPDATE_TESTIMONIAL,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateTestimonialMasterStoreByKeyVal } from './actions';

import {
  // getOrderListServiceCall,
  deleteTestimonial,
  addTestimonial,
  getTestimonialList,
  updateTestimonial,
} from './serviceCalls';

export function* getTestimonialData() {
  try {
    const repos = yield call(getTestimonialList);
    if (repos.status === 200) {
      yield put(
        updateTestimonialMasterStoreByKeyVal({
          key: 'testimonialList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeTestimonial(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteTestimonial, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createTestimonial(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(addTestimonial, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyTestimonial(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateTestimonial, payload.payload);
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
    takeLatest(GET_TESTIMONIAL_LIST, getTestimonialData),
    takeLatest(ADD_TESTIMONIAL, createTestimonial),
    takeLatest(UPDATE_TESTIMONIAL, modifyTestimonial),
    takeLatest(DELETE_TESTIMONIAL, removeTestimonial),
  ]);
}
