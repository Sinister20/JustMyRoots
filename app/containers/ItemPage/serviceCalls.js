import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const brandItemByIdFetchService = (itemId, brandId) => {

  const apiConfig = getConfig('restaurent.fetchItemById');
  apiConfig.pathVariables = {
    itemId,
    brandID: brandId,
  }
  const apiInstance = new ApiService(apiConfig);

  const response = apiInstance.call();
 
  return response;
};
export const brandFetchCustomerBrought = payload => {
  const { itemId, cityId } = payload.payload;
  const apiConfig = getConfig('restaurent.fetchCustomerBoughtItem');
  // apiConfig.pathVariables.itemId = itemId;
  apiConfig.pathVariables = {
    cityId,
    itemId,
  };
  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
