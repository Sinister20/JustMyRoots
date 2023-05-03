import { createSelector } from 'reselect';
import { initialState } from './reducer';

const locationToLocationMaster = state =>
  state.locationToLocationMaster || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAccount = () =>
  createSelector(
    locationToLocationMaster,
    locationToLocationMasterState =>
      locationToLocationMasterState.locationToLocationMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    locationToLocationMaster,
    locationToLocationMasterState =>
      locationToLocationMasterState.myBrand.items,
  );
};

const selectLocationToLocationMasterStoreByKey = key => {
  return createSelector(
    locationToLocationMaster,
    locationToLocationMasterState => locationToLocationMasterState[key],
  );
};

export {
  makeSelectLocation,
  selectLocationToLocationMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
