import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const brandItemApiFetchService = ({ payload: { brandID, filters } }) => {
  const apiConfig = getConfig('restaurent.fetchBrandItem');
  apiConfig.pathVariables.brandID = brandID;
  apiConfig.urlParams = filters;
  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};

export const brandDetailsApiFetchService = ({ payload }) => {
  const apiConfig = getConfig('restaurent.fetchBrandDetails');
  apiConfig.pathVariables.brandID = payload;
  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};

export const brandfeatureItemsService = ({ payload }) => {

  const apiConfig = getConfig('restaurent.featureItems');
  apiConfig.pathVariables.brandID = payload;
  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
