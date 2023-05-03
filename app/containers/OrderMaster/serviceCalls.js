import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getOrderList = () => {
  const myAccountConfig = getConfig('Order.getOrders');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateOrder = payload => {
  const myAccountConfig = getConfig('Order.updateOrder');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
