import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getOrderListServiceCall = () => {
  const myAccountConfig = getConfig('MyAccount.getOrders');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getAddressListServiceCall = () => {
  const myAccountConfig = getConfig('MyAccount.getAddress');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteAddress = id => {
  const myAccountConfig = getConfig('MyAccount.deleteAddress');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addAddress = payload => {
  const myAccountConfig = getConfig('MyAccount.addAddress');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const cancelOrderService = payload => {
  const myAccountConfig = getConfig('MyAccount.cancelMyOrder');
  myAccountConfig.data = {
    orderId: payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateAddress = payload => {
  const {
    id,
    name,
    landmark,
    stateId,
    cityId,
    pinId,
    addressLineOne,
    addressLineTwo,
    isDefault,
    mobile,
    email,
  } = payload;
  const myAccountConfig = getConfig('MyAccount.updateAddress');
  myAccountConfig.data = {
    name,
    landmark,
    cityId,
    stateId,
    pinId,
    addressLineOne,
    addressLineTwo,
    isDefault,
    phoneNumber: mobile,
    email,
  };
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const reOrderServiceCall = payload => {
  const myAccountConfig = getConfig('MyAccount.reOrder');
  myAccountConfig.data = {
    cartId: payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;

}