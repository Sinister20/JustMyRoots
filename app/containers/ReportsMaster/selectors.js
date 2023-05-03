import { createSelector } from 'reselect';
import { initialState } from './reducer';

const reportsMaster = state => state.reportsMaster || initialState;

const selectRouter = state => state.router;

const makeSelectReports = () =>
  createSelector(
    selectRouter,
    routerState => routerState.reports,
  );

const selectReportsMasterStoreByKey = key => {
  return createSelector(
    reportsMaster,
    reportsMasterState => reportsMasterState[key],
  );
};

export { makeSelectReports, selectReportsMasterStoreByKey };
