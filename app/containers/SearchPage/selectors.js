/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.searchPageStore || initialState;


const selectSearchStoreByKey = (key) =>
  createSelector(
    selectGlobal,
    searchStore => searchStore[key],
  );


export {
  selectSearchStoreByKey
};
