import { createSelector } from 'reselect';
import { initialState } from './reducer';

const brandMaster = state => state.brandMaster || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAccount = () =>
  createSelector(
    brandMaster,
    brandMasterState => brandMasterState.brandMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    brandMaster,
    brandMasterState => brandMasterState.myBrand.items,
  );
};

const selectBrandMasterStoreByKey = key => {
  return createSelector(
    brandMaster,
    brandMasterState => brandMasterState[key],
  );
};

export {
  makeSelectLocation,
  selectBrandMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
