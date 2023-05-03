/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  GET_ORDERS_REPORT,
  GET_SALES_REPORT,
  GET_INVOICE_REPORT,
} from './constants';

import { updateReportsMasterStoreByKeyVal } from './actions';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
// import { updateReportsMasterStoreByKeyVal } from './actions';

import {
  getInvoiceReportServiceCall,
  getOrdersReportServiceCall,
  getSalesReportServiceCall,
} from './serviceCalls';

export function* getOrdersReport(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const repos = yield call(getOrdersReportServiceCall, payload);
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getSalesReport(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const repos = yield call(getSalesReportServiceCall, payload);
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getInvoiceReport(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const repos = yield call(getInvoiceReportServiceCall, payload);
    if (repos.status === 200) {
      resolve(repos);
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
    takeLatest(GET_INVOICE_REPORT, getInvoiceReport),
    takeLatest(GET_ORDERS_REPORT, getOrdersReport),
    takeLatest(GET_SALES_REPORT, getSalesReport),
  ]);
}
