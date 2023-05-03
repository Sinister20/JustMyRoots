import { createSelector } from 'reselect';
import { initialState } from './reducer';

const couponMaster = state => state.couponMaster || initialState;

const selectRouter = state => state.router;

const makeSelectCoupon = () =>
  createSelector(
    selectRouter,
    routerState => routerState.coupon,
  );

const makeSelectAccount = () =>
  createSelector(
    couponMaster,
    couponMasterState => couponMasterState.couponMaster,
  );

const makeSelectBrands = () => {
  createSelector(
    couponMaster,
    couponMasterState => couponMasterState.myBrand.items,
  );
};

const selectCouponMasterStoreByKey = key => {
  return createSelector(
    couponMaster,
    couponMasterState => couponMasterState[key],
  );
};

export {
  makeSelectCoupon,
  selectCouponMasterStoreByKey,
  makeSelectAccount,
  makeSelectBrands,
};
