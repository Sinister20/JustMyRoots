/**
 * Gets the repositories of the user from Github
 */
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import {
  GET_BRAND_LIST,
  GET_PRODUCT_LIST,
  // GET_ORDER_LIST,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_LIST_BY_BRAND_ID,
} from './constants';

// import { setToLocalStorage } from '../../utils/localStorageUtils';
// import { updateHomeAppByKeyVal } from '../HomePage/actions';
import { updateProductMasterStoreByKeyVal } from './actions';

import {
  // getOrderListServiceCall,
  getProductListServiceCall,
  deleteProduct,
  getBrandListServiceCall,
  addProduct,
  getProductService,
  updateProduct,
} from './serviceCalls';

export function* getItems() {
  // const { resolve, reject, id } = payload;
  try {
    const repos = yield call(getProductListServiceCall);
    if (repos.status === 200) {
      // resolve(repos.data.data);
      yield put(
        updateProductMasterStoreByKeyVal({
          key: 'itemList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* getData() {
  // const { resolve, reject, id } = payload;
  try {
    const repos = yield call(getBrandListServiceCall);
    if (repos.status === 200) {
      // resolve(repos.data.data);
      yield put(
        updateProductMasterStoreByKeyVal({
          key: 'brandList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}

export function* removeProduct(action) {
  const { payload } = action;
  const { resolve, reject, id } = payload;
  try {
    const res = yield call(deleteProduct, id);
    if (res.status === 200) {
      resolve();
    }
  } catch (err) {
    //console.log(err);
    reject();
  }
}

export function* createProduct(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(addProduct, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* getProductListByIDSaga(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  //console.log(action);
  try {
    const res = yield call(getProductService, action.payload.selectedBrand._id);
    if (res.status === 200) {
      resolve(res.data.data);
    }
  } catch (err) {
    reject(err);
  }
}

export function* modifyProduct(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(updateProduct, payload.payload);
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
    takeLatest(GET_BRAND_LIST, getData),
    takeLatest(GET_PRODUCT_LIST_BY_BRAND_ID, getProductListByIDSaga),
    // takeLatest(GET_ORDER_LIST, getOrdersData),
    takeLatest(GET_PRODUCT_LIST, getItems),
    takeLatest(DELETE_PRODUCT, removeProduct),
    takeLatest(ADD_PRODUCT, createProduct),
    takeLatest(UPDATE_PRODUCT, modifyProduct),
  ]);
}
