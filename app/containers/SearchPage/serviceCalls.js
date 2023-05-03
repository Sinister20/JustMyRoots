import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';



export const searchByKeyServiceCall = payload => {
  const searchByKeyCouponConfig = getConfig('SearchPage.searchByKey');
  searchByKeyCouponConfig.urlParams = { searchKey: payload };
  const apiInstance = new ApiService(searchByKeyCouponConfig);
  const response = apiInstance.call();
  return response;
};



export const searchResultsByKeyServiceCall = payload => {
  const searchByKeyCouponConfig = getConfig('SearchPage.searchResultsByKey');
  searchByKeyCouponConfig.urlParams = payload;
  const apiInstance = new ApiService(searchByKeyCouponConfig);
  const response = apiInstance.call();
  return response;
};


