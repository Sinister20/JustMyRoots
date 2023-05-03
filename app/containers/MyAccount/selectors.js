import { createSelector } from 'reselect';
import { initialState } from './reducer';

const myAccount = state => state.myAccount || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAccount = () =>
  createSelector(
    myAccount,
    myAccountState => myAccountState.myAccount,
  );

const makeSelectAddresses = () => {
  createSelector(
    myAccount,
    myAccountState => myAccountState.myAddress.items,
  );
};

const selectMyAccountStoreByKey = key =>
  createSelector(
    myAccount,
    myAccountState => myAccountState[key],
  );

export {
  makeSelectLocation,
  selectMyAccountStoreByKey,
  makeSelectAccount,
  makeSelectAddresses,
};
