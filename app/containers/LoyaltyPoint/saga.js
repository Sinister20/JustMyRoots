import { call, put, all, takeLatest } from 'redux-saga/effects';
import { GET_LOYALTY_POINT } from './constants';
import { updateLoyaltyPointStoreByKeyVal } from './actions';
import { getLoyaltyPointServiceCall } from './serviceCalls';

export function* getLoyaltyPointHistory(payload) {
  const repos = yield call(getLoyaltyPointServiceCall, payload);
  if (repos.status === 200) {
    yield put(
      updateLoyaltyPointStoreByKeyVal({
        key: 'loyaltyPoint',
        value: repos.data.data,
      }),
    );
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_LOYALTY_POINT, getLoyaltyPointHistory)]);
}
