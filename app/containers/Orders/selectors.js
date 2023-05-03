/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectcart = state => state.cart || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectCartStoreByKey = key =>
  createSelector(
    selectcart,
    cartState => cartState[key],
  );

export { makeSelectLocation, selectCartStoreByKey };
