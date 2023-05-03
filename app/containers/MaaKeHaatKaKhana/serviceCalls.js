import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const validateDFHCity = payload => {
  const apiConfig = getConfig('MaKHathKaKhana.validateDFHCity');
  apiConfig.data = payload.data;

  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
export const addToDFHCartServiceCall = payload => {
  const apiConfig = getConfig('MaKHathKaKhana.MaKHathKaKhanaCreate');
  apiConfig.data = payload.payload;

  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
export const validateDFHServiceCall = payload => {
  // 
  const apiConfig = getConfig('MaKHathKaKhana.validateDFH');
  apiConfig.data = payload.values;

  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
export const deleteMaaKeHathKaKhana = () => {
  const apiConfig = getConfig('MaKHathKaKhana.MaKHathKaKhanaDelete');

  const apiInstance = new ApiService(apiConfig);
  const response = apiInstance.call();
  return response;
};
