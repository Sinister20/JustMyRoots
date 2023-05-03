import { createSelector } from 'reselect';
import { initialState } from './reducer';

const metaMaster = state => state.metaMaster || initialState;

const selectRouter = state => state.router;

const makeSelectMeta = () =>
  createSelector(
    selectRouter,
    routerState => routerState.meta,
  );

const makeSelectAccount = () =>
  createSelector(
    metaMaster,
    metaMasterState => metaMasterState.metaMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    metaMaster,
    metaMasterState => metaMasterState.myBrand.items,
  );
};

const selectMetaMasterStoreByKey = key => {
  return createSelector(
    metaMaster,
    metaMasterState => metaMasterState[key],
  );
};

export {
  makeSelectMeta,
  selectMetaMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
