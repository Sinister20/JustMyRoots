import { createSelector } from 'reselect';
import { initialState } from './reducer';

const customerFeedBack = state => state.customerFeedBack || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectCustomerFeedBackStoreByKey = key => {
  return createSelector(
    customerFeedBack,
    customerFeedBackState => customerFeedBackState[key],
  );
}
  

export { selectCustomerFeedBackStoreByKey, makeSelectLocation };
