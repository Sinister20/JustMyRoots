import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getBrandListServiceCall = () => {
  const myAccountConfig = getConfig('Brand.getBrandsList');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteBrand = id => {
  const myAccountConfig = getConfig('Brand.deleteBrand');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addBrand = payload => {
  const myAccountConfig = getConfig('Brand.addBrand');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateBrand = payload => {
  const myAccountConfig = getConfig('Brand.updateBrand');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
