import { createSelector } from 'reselect';
import { initialState } from './reducer';

const maaKeHathKaKhana = state => state.loyaltyPoint || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectMaaKeHathKaKhanaStoreByKey = key =>
  createSelector(
    maaKeHathKaKhana,
    maaKeHathKaKhanaState => maaKeHathKaKhanaState[key],
  );

export { selectMaaKeHathKaKhanaStoreByKey, makeSelectLocation };
