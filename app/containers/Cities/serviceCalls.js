import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getCityList = payload => {
  const cityListConfig = getConfig('cities.fetchCities');
  const apiInstance = new ApiService(cityListConfig);
  const response = apiInstance.call();
  return response;
};

export const getCityItems = id => {
  const cityListConfig = getConfig('cities.fetchCityItems');
  cityListConfig.pathVariables.id = id;
  const apiInstance = new ApiService(cityListConfig);
  const response = apiInstance.call();
  return response;
};
