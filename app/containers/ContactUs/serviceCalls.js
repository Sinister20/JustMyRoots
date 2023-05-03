import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const submitContactDetailsServiceCall = (payload) => {

  const { resolve, reject, data } = payload;
  try {
    const MyFavoriteConfig = getConfig('ContactUs.submitContact');
    MyFavoriteConfig.data = payload.data;
    const apiInstance = new ApiService(MyFavoriteConfig);
    const response = apiInstance.call();
    resolve(response);

  } catch (err) {
    reject(err);
  }

};


