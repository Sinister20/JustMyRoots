import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getMetaListingServiceCall = ({ keyword, key }) => {
  let homePageApiConfig;
  if (keyword === 'type') {
    homePageApiConfig = getConfig('HomePage.metaByType');
    homePageApiConfig.urlParams = { type: key };
  } else {
    homePageApiConfig = getConfig('HomePage.metaByKeyword');
    homePageApiConfig.urlParams = { keyword: key };
  }
  const apiInstance = new ApiService(homePageApiConfig);
  const response = apiInstance.call();
  return response;
};

export const subscribeEmailServiceCall = payload => {
  const myAccountConfig = getConfig('HomePage.subscribe');
  myAccountConfig.data = {
    ...payload,
  };
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getTestimonialListingServiceCall = payload => {
  const homePageApiConfig = getConfig('HomePage.testimonials');
  const apiInstance = new ApiService(homePageApiConfig);
  const response = apiInstance.call();
  return response;
};
export const getOurPartnersServiceCall = payload => {
  const homePageApiConfig = getConfig('HomePage.ourPartners');
  const apiInstance = new ApiService(homePageApiConfig);
  const response = apiInstance.call();
  return response;
};

export const bannerApiFetchService = payload => {
  const bannerApiConfig = getConfig('Banner.getBannerData');
  const apiInstance = new ApiService(bannerApiConfig);
  const response = apiInstance.call();
  return response;
};

export const offersApiFetchService = payload => {
  const offersApiConfig = getConfig('Banner.offersFetch');
  const apiInstance = new ApiService(offersApiConfig);
  const response = apiInstance.call();
  return response;
};

export const videoApiFetchService = payload => {
  const offersApiConfig = getConfig('Banner.heroVideoFetch');
  const apiInstance = new ApiService(offersApiConfig);
  const response = apiInstance.call();
  return response;
};

export const getCityList = () => {
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

export const submitOtpServiceCall = ({ payload }) => {
  const otpVals = Object.values(payload.otp).reduce((acc, val) => acc + val);
  const authConfig = getConfig('Auth.sendOtp');
  authConfig.data = {
    phoneNumber: `${payload.phoneNumber}`,
    otp: parseInt(otpVals),
    email: payload.email,
    firstName:payload.firstName,
    lastName:payload.lastName,
    city:payload.city,
    referedCode:payload.referedCode,
  };
  const apiInstance = new ApiService(authConfig);
  const response = apiInstance.call();
  return response;
};

export const submitUserDetailsServiceCall = payload => {
  const authConfig = getConfig('MyAccount.addUserDetails');
  authConfig.data = payload.merged;
  const apiInstance = new ApiService(authConfig);
  const response = apiInstance.call();
  return response;
};

export const getUserDetailsServiceCall = payload => {
  const authConfig = getConfig('MyAccount.getUserDetails');
  const apiInstance = new ApiService(authConfig);
  const response = apiInstance.call();
  return response;
};

export const getUserListServiceCall = payload => {
  const authConfig = getConfig('MyAccount.getUserList');
  const apiInstance = new ApiService(authConfig);
  const response = apiInstance.call();
  return response;
};

export const sendOtpServiceCall = ({ payload }) => {
  const authConfig = getConfig('Auth.requestOtp');
  authConfig.data = {
    phoneNumber: `${payload.phoneNumber}`,
    ...(payload.email ? { email: payload.email } : {}),
  };
  const apiInstance = new ApiService(authConfig);
  const response = apiInstance.call();
  return response;
};

export const addItemToCartServiceCall = ({ payload }) => {
  const addItemConfig = getConfig('Cart.addItemToCart');
  addItemConfig.data = payload;
  const apiInstance = new ApiService(addItemConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchCartServiceCall = () => {
  const fetchCartConfig = getConfig('Cart.fetchCart');
  const apiInstance = new ApiService(fetchCartConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchDeliveryLocServiceCall = () => {
  const fetchDeliveryInConfig = getConfig('Banner.deliveryInLoc');
  const apiInstance = new ApiService(fetchDeliveryInConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchDeliveryStateServiceCall = () => {
  const fetchDeliveryInConfig = getConfig('Banner.deliveryInState');
  const apiInstance = new ApiService(fetchDeliveryInConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchCityByStateServiceCall = ({ payload }) => {
  const fetchDeliveryInConfig = getConfig('Banner.cityByState');
  fetchDeliveryInConfig.data = payload;
  const apiInstance = new ApiService(fetchDeliveryInConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchPincodeByCityServiceCall = ({ payload }) => {
  const fetchDeliveryInConfig = getConfig('Banner.pincodeByCity');
  fetchDeliveryInConfig.data = { cityId: payload._id };
  const apiInstance = new ApiService(fetchDeliveryInConfig);
  const response = apiInstance.call();
  return response;
};

export const setDeliveryAddressServiceCall = ({ payload }) => {
  const setDeliveryInConfig = getConfig('Banner.setDeliveryLoc');
  setDeliveryInConfig.data = {
    city: payload.name,
    cityId: payload._id,
  };
  const apiInstance = new ApiService(setDeliveryInConfig);
  const response = apiInstance.call();
  return response;
};

export const ccAvanuePaymentService = (
  cartId,
  payMode,
  billingAddress,
  maaKeHathMode = false,
  deliveryDates,
) => {
  const ccAvenueConfig = maaKeHathMode
    ? getConfig('Payment.maaCcAvenue')
    : getConfig('Payment.ccAvanue');
  ccAvenueConfig.data = {
    cartId,
    payMode,
    billingAddress,
    deliveryDates,
  };
  const apiInstance = new ApiService(ccAvenueConfig);
  const response = apiInstance.call();
  return response;
};

export const retryPaymentService = (TranscationID, payMode) => {

  const ccAvenueConfig = getConfig('Payment.retryPayments');
  ccAvenueConfig.data = {
    transactionId: TranscationID,
    payMode,
  };
  const apiInstance = new ApiService(ccAvenueConfig);
  const response = apiInstance.call();
  return response;
};

export const fetchUomMetaServiceCall = () => {
  const UomConfig = getConfig('MaKHathKaKhana.uomMetaFetch');
  const apiInstance = new ApiService(UomConfig);
  const response = apiInstance.call();
  return response;
};

export const creatWishADishServiceCall = data => {
  const wishADishCreateConfig = getConfig('MaKHathKaKhana.wishADish');
  wishADishCreateConfig.data = data;
  const apiInstance = new ApiService(wishADishCreateConfig);
  const response = apiInstance.call();
  return response;
};

export const applyLoyaltyServiceCall = data => {
  const applyLoyaltyConfig = getConfig('Cart.applyLoyalty');
  applyLoyaltyConfig.data = data;
  const apiInstance = new ApiService(applyLoyaltyConfig);
  const response = apiInstance.call();
  return response;
};

export const maaDeliveryFoodCartServiceCall = data => {
  const MaKHathKaKhanaCreateConfig = getConfig(
    'MaKHathKaKhana.MaKHathKaKhanaCreate',
  );
  MaKHathKaKhanaCreateConfig.data = {
    pickupCity: data.mkhkFrom.cityId._id,
    pickupAddress: data.mkhkFrom._id,
    deliveryCity: data.mkHFAddr.cityId._id,
    deliveryAddress: data.mkHFAddr._id,
    deliveryDate: data.deliveryDate,
    deliverySlot: data.deliveryTime,
    items: data.productListWthDetails
      .filter(item => item.prdType)
      .map(item => ({
        quantity: item.prdQty,
        uom: item.prdType.name,
        itemDescription: item.prdDesc,
      })),
  };
  const apiInstance = new ApiService(MaKHathKaKhanaCreateConfig);
  const response = apiInstance.call();
  return response;
};
