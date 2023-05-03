import { call, put, all, takeLatest } from 'redux-saga/effects';
import {  SUBMIT_CONTACT_DETAILS } from './constants';
// import { updateMyFavoriteStoreByKeyVal, saveFavorite } from './actions';
import {
  submitContactDetailsServiceCall,
} from './serviceCalls';
export function* submitContactSaga(payload) {
 
  const {
    resolve,
    reject,
   } = payload;
  try {
    const repos = yield call(submitContactDetailsServiceCall,payload);
    
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    // //console.log(err);
    reject(err);
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(SUBMIT_CONTACT_DETAILS, submitContactSaga),
  ]);
}
