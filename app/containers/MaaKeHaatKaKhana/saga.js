import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ADD_TO_DFH_CART, VALIDATE_DFH, VALIDATE_DFH_CITY } from './constants';
import { updateMaaKeHathKaKhanaKByKeyVal } from './actions';
import { updateGlobelStoreByKeyVal } from '../App/actions';
import {
  validateDFHCity,
  addToDFHCartServiceCall,
  validateDFHServiceCall,
  deleteMaaKeHathKaKhana,
} from './serviceCalls';
export function* validateDFHCitySaga(payload) {
  const { resolve, reject } = payload.payload;
  try {
    const repos = yield call(validateDFHCity, payload.payload);

    if (repos.status === 200) {
      if (repos.data.success) {
        yield put(
          updateGlobelStoreByKeyVal({
            key: 'validateDFHCity',
            value: repos.data.data,
          }),
        );
      }
      resolve(repos);
    }
  } catch (err) {
    reject(err);
  }
}
export function* addToDFHCartSaga(payload) {
  const { resolve, reject } = payload.payload;
  try {
    const repos = yield call(addToDFHCartServiceCall, payload.payload);
    if (repos.status === 200) {
      if (repos.data.success) {
        yield put(
          updateGlobelStoreByKeyVal({
            key: 'DFHCart',
            value: repos.data.data,
          }),
        );
        resolve(repos);
      } else if (repos.data.data.alreadyExist) {
        const res = yield call(deleteMaaKeHathKaKhana);
        if (res.status === 200) {
          if (res.data.success) {
            const r = yield call(addToDFHCartServiceCall, payload.payload);
            if (r.data.success) {
              yield put(
                updateGlobelStoreByKeyVal({
                  key: 'DFHCart',
                  value: r.data.data,
                }),
              );
              resolve(r);
            }
          }
        }
      }
    }
  } catch (err) {
    reject(err);
  }
}
export function* validateDFHSaga(payload) {
  //    
  const { resolve, reject } = payload.payload;
  try {
    const repos = yield call(validateDFHServiceCall, payload.payload);
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    reject(err);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(VALIDATE_DFH_CITY, validateDFHCitySaga),
    takeLatest(ADD_TO_DFH_CART, addToDFHCartSaga),
    takeLatest(VALIDATE_DFH, validateDFHSaga),
  ]);
}
