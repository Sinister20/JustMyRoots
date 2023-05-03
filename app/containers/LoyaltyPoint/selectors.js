import { createSelector } from 'reselect';
import { initialState } from './reducer';

const loyaltyPoint = state => state.loyaltyPoint || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectLoyaltyStoreByKey = key =>
  createSelector(
    loyaltyPoint,
    loyaltyPointState => loyaltyPointState[key],
  );

export { selectLoyaltyStoreByKey, makeSelectLocation };
