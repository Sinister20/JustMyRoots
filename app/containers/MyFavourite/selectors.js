import { createSelector } from 'reselect';
import { initialState } from './reducer';

const myFavorite = state => state.myFavorite || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectMyFavoriteStoreByKey = key =>
  createSelector(
    myFavorite,
    myFavoriteState => myFavoriteState[key],
  );

export { selectMyFavoriteStoreByKey, makeSelectLocation };
