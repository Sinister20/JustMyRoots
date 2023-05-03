import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getCouponList = () => {
  const myAccountConfig = getConfig('Coupon.getCouponList');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteCoupon = id => {
  const myAccountConfig = getConfig('Coupon.deleteCoupon');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addCoupon = payload => {
  const myAccountConfig = getConfig('Coupon.addCoupon');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateCoupon = payload => {
  const myAccountConfig = getConfig('Coupon.updateCoupon');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
