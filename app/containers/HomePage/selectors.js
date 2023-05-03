/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectHome = () =>
  createSelector(
    selectHome,
    homeState => homeState,
  );

const selectStoreByKey = key =>
  createSelector(
    selectHome,
    homeState => homeState[key],
  );

export { selectHome, makeSelectHome, selectStoreByKey };
