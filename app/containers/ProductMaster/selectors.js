import { createSelector } from 'reselect';
import { initialState } from './reducer';

const productMaster = state => state.productMaster || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAccount = () =>
  createSelector(
    productMaster,
    productMasterState => productMasterState.productMaster,
  );

const makeSelectProducts = () => {
  createSelector(
    productMaster,
    productMasterState => productMasterState.myProduct.items,
  );
};

const selectProductMasterStoreByKey = key => {
  return createSelector(
    productMaster,
    productMasterState => productMasterState[key],
  );
};

export {
  makeSelectLocation,
  selectProductMasterStoreByKey,
  makeSelectAccount,
  makeSelectProducts,
};
