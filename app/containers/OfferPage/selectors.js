/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );



const selectGlobelStoreByKey = (key) =>
  createSelector(
    selectGlobal,
    globalState => globalState[key],
  );


export {
  selectGlobal,
  makeSelectLocation,
  selectGlobelStoreByKey
};
