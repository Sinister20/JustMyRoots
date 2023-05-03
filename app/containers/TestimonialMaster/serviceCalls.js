import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getTestimonialList = () => {
  const myAccountConfig = getConfig('Testimonial.getTestimonialList');
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const deleteTestimonial = id => {
  const myAccountConfig = getConfig('Testimonial.deleteTestimonial');
  myAccountConfig.pathVariables = {
    id,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const addTestimonial = payload => {
  const myAccountConfig = getConfig('Testimonial.addTestimonial');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const updateTestimonial = payload => {
  const myAccountConfig = getConfig('Testimonial.updateTestimonial');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
