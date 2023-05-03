/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;
const cityListKey = state => state.cityPage || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectGlobelStoreByKey = key =>
  createSelector(
    selectGlobal,
    globalState => globalState[key],
  );

const makeSelectKey = key =>
  createSelector(
    cityListKey,
    cityPage => cityPage[key],
  );

export {
  selectGlobal,
  makeSelectLocation,
  selectGlobelStoreByKey,
  makeSelectKey,
};
