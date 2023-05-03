import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getOrderListServiceCall = () => {
  const myAccountConfig = getConfig('Product.getOrders');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getProductListServiceCall = () => {
  const myAccountConfig = getConfig('Product.getItem');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getBrandListServiceCall = () => {
  const myAccountConfig = getConfig('Brand.getBrand');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteProduct = id => {
  const myAccountConfig = getConfig('Product.deleteItem');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addProduct = payload => {
  const myAccountConfig = getConfig('Product.addItem');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getProductService = payload => {
  const getProductConfig = getConfig('Product.productListById');
  getProductConfig.urlParams = {
    brandId: payload,
  };
  const apiInstance = new ApiService(getProductConfig);
  const response = apiInstance.call();
  return response;
};

export const updateProduct = payload => {
  const myAccountConfig = getConfig('Product.updateItem');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
