/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRestaurentStore = state => state.restaurentStore || {};


const selectRestaurentStoreByKey = (key) =>
  createSelector(
    selectRestaurentStore,
    restaurentStore => restaurentStore[key],
  );


export {
  selectGlobal,
  selectRestaurentStoreByKey
};
