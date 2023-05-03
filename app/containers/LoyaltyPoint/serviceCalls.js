import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getLoyaltyPointServiceCall = payload => {
  const { customerId } = payload.payload;

  const apiConfig = getConfig('LoyaltyPoint.getLoyaltyPointHistory');
  apiConfig.pathVariables = {
    customerId,
  };
  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
