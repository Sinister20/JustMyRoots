import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getMetaList = () => {
  const myAccountConfig = getConfig('Meta.getMetaList');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteMeta = id => {
  const myAccountConfig = getConfig('Meta.deleteMeta');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addMeta = payload => {
  const myAccountConfig = getConfig('Meta.addMeta');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateMeta = payload => {
  const myAccountConfig = getConfig('Meta.updateMeta');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
