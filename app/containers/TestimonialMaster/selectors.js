import { createSelector } from 'reselect';
import { initialState } from './reducer';

const testimonialMaster = state => state.testimonialMaster || initialState;

const selectRouter = state => state.router;

const makeSelectTestimonial = () =>
  createSelector(
    selectRouter,
    routerState => routerState.testimonial,
  );

const makeSelectAccount = () =>
  createSelector(
    testimonialMaster,
    testimonialMasterState => testimonialMasterState.testimonialMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    testimonialMaster,
    testimonialMasterState => testimonialMasterState.myBrand.items,
  );
};

const selectTestimonialMasterStoreByKey = key => {
  return createSelector(
    testimonialMaster,
    testimonialMasterState => testimonialMasterState[key],
  );
};

export {
  makeSelectTestimonial,
  selectTestimonialMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
