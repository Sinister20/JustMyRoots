import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getDeliveryLocationList = () => {
  const myAccountConfig = getConfig('LocationToLocation.getDeliveryLocations');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteDeliveryLocation = id => {
  const myAccountConfig = getConfig(
    'LocationToLocation.deleteDeliveryLocation',
  );
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addDeliverylocation = payload => {
  const myAccountConfig = getConfig('LocationToLocation.addDeliverylocation');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateDeliveryLocation = payload => {
  const myAccountConfig = getConfig(
    'LocationToLocation.updateDeliveryLocation',
  );
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
