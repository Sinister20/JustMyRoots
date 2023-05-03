import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getFavoriteListServiceCall = (payload) => {

  const MyFavoriteConfig = getConfig('MyFavorite.getFavorite');
  MyFavoriteConfig.pathVariables = {
    id:payload.payload,
  };
  const apiInstance = new ApiService(MyFavoriteConfig);
  const response = apiInstance.call();
  return response;
};

export const saveFavoriteItemServiceCall = payload => {
  const {rej,res,...rest} =payload
  const addItemConfig = getConfig('MyFavorite.saveFavorite');
  addItemConfig.data = rest;
  try {
    const apiInstance = new ApiService(addItemConfig);
    const response = apiInstance.call();
    res(response);
    
  } catch (error) {
    rej(error);
  }
  
  // return response;
};
