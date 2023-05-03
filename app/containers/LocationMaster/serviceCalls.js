import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getLocationList = () => {
  const myAccountConfig = getConfig('Location.getLocations');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteLocation = id => {
  const myAccountConfig = getConfig('Location.deleteCity');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addLocation = payload => {
  const myAccountConfig = getConfig('Location.addLocation');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateLocation = payload => {
  const myAccountConfig = getConfig('Location.updateLocation');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getLocationService = id => {
  const getLocationConfig = getConfig('Location.locationListById');
  getLocationConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(getLocationConfig);
  const response = apiInstance.call();
  return response;
};
