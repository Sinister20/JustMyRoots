/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const itemStore = state => state.ItemPage || {};


const itemStoreByKey = (key) =>
  createSelector(
    itemStore,
    itemStoreData => itemStoreData[key],
  );


export {
  selectGlobal,
  itemStoreByKey
};
