import { createSelector } from 'reselect';
import { initialState } from './reducer';

const locationMaster = state =>
  state.locationMaster || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAccount = () =>
  createSelector(
    locationMaster,
    locationMasterState =>
      locationMasterState.locationMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    locationMaster,
    locationMasterState =>
      locationMasterState.myBrand.items,
  );
};

const selectLocationMasterStoreByKey = key => {
  return createSelector(
    locationMaster,
    locationMasterState => locationMasterState[key],
  );
};

export {
  makeSelectLocation,
  selectLocationMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
