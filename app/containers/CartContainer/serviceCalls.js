import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const submitCartNdPlaceOrderService = payload => {
  const submitCartConfig = getConfig('Cart.submitCart');
  submitCartConfig.data = {
    cartId: payload,
  };
  const apiInstance = new ApiService(submitCartConfig);
  const response = apiInstance.call();
  return response;
};

export const getCouponServiceCall = payload => {
  const getCouponConfig = getConfig('Cart.getCoupon');
  // getCouponConfig.urlParams = {
  //   "brandId": payload
  // };
  const apiInstance = new ApiService(getCouponConfig);
  const response = apiInstance.call();
  return response;
};

export const applyCouponServiceCall = payload => {
  const applyCouponConfig = getConfig('Cart.applyCoupon');
  applyCouponConfig.data = payload;
  const apiInstance = new ApiService(applyCouponConfig);
  const response = apiInstance.call();
  return response;
};

export const setDeliverAddrsServiceCall = payload => {
  const setDelvrAddrsConfig = getConfig('Cart.setDeliveryAddrs');
  setDelvrAddrsConfig.data = {
    addressId: payload._id,
  };
  const apiInstance = new ApiService(setDelvrAddrsConfig);
  const response = apiInstance.call();
  return response;
};

export const getDeliverAddrsServiceCall = payload => {
  const getDelvrAddrsConfig = getConfig('Cart.getDeliveryAddrs');
  const apiInstance = new ApiService(getDelvrAddrsConfig);
  const response = apiInstance.call();
  return response;
};
