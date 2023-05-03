import { call, put, all, takeLatest } from 'redux-saga/effects';
import { GET_FAVORITE_LIST, SAVE_FAVORITE } from './constants';
import { updateMyFavoriteStoreByKeyVal, saveFavorite } from './actions';
import {
  getFavoriteListServiceCall,
  saveFavoriteItemServiceCall,
} from './serviceCalls';
export function* getFavoriteData(payload) {

  try {
    const repos = yield call(getFavoriteListServiceCall,payload);

    if (repos.status === 200) {
      yield put(
        updateMyFavoriteStoreByKeyVal({
          key: 'myFavorite',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}
export function* saveFavoriteItem(payload) {
  try {
    const repos = yield call(saveFavoriteItemServiceCall, payload);
    if (repos.status === 200) {
      yield put(saveFavorite(repos.data.data));
    }
  } catch (err) {
    //console.log(err);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_FAVORITE_LIST, getFavoriteData),
    takeLatest(SAVE_FAVORITE, saveFavoriteItem),
  ]);
}
