import { createSelector } from 'reselect';
import { initialState } from './reducer';

const orderMaster = state => state.orderMaster || initialState;

const selectRouter = state => state.router;

const makeSelectOrder = () =>
  createSelector(
    selectRouter,
    routerState => routerState.order,
  );

const selectOrderMasterStoreByKey = key => {
  return createSelector(
    orderMaster,
    orderMasterState => orderMasterState[key],
  );
};

export { makeSelectOrder, selectOrderMasterStoreByKey };
