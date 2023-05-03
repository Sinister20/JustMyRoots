import {
  TEST_ACTION_HOME,
  BANNER_DATA_CALL,
  UPDATE_HOME_APP_BY_KEY,
  GET_OFFERS,
  GET_HERO_VIDEO,
  FETCH_CITIES,
  FETCH_CITY_ITEMS,
  SUBMIT_OTP,
  ADD_ITEM_TO_CART,
  FETCH_CART,
  FETCH_DELIVERY_LOC,
  FETCH_DELIVERY_STATE,
  FETCH_CITY_BY_STATE,
  FETCH_PINCODE_BY_CITY,
  SET_DELIVERY_LOCATION,
  SEND_OTP,
  DO_CCAVENUE_PAYMENT,
  SUBMIT_USER_DETAILS,
  GET_USER_DETAILS,
  GET_REPAYMENT_DETAILS,
  GET_USER_LIST,
  GET_META_LISTING,
  GET_TESTIMONIAL_LISTING,
  SUBSCRIBE_EMAIL,
  FETCH_UOM_META,
  CREATE_MAA_KE_HATH_KA_KHANA_CART,
  CREATE_WISH_A_DISH,
  APPLY_LOYALTY,
  GET_OUR_PARTNERS,
} from './constants';

export function applyLoyaltyAction(payload) {
  return {
    type: APPLY_LOYALTY,
    payload,
  };
}

export function createWishADish(payload) {
  return {
    type: CREATE_WISH_A_DISH,
    payload,
  };
}

export function createMaaKeHathKaKhana(payload) {
  return {
    type: CREATE_MAA_KE_HATH_KA_KHANA_CART,
    payload,
  };
}

export function fetchUomMeta(payload) {
  return {
    type: FETCH_UOM_META,
    payload,
  };
}

export function subscribeEmail(payload) {
  return {
    type: SUBSCRIBE_EMAIL,
    payload,
  };
}

export function getMetaListings(payload) {
  return {
    type: GET_META_LISTING,
    payload,
  };
}

export function getTestimonialListings(payload) {
  return {
    type: GET_TESTIMONIAL_LISTING,
    payload,
  };
}

export function testAction(username) {
  return {
    type: TEST_ACTION_HOME,
    data,
  };
}

export function fetchBannerData(payload) {
  return {
    type: BANNER_DATA_CALL,
    data: payload,
  };
}

export function fetchOffers(payload) {
  return {
    type: GET_OFFERS,
    data: payload,
  };
}

export function fetchHeroVideo(payload) {
  return {
    type: GET_HERO_VIDEO,
    data: payload,
  };
}
export function fetchOurPartners(payload) {
  return {
    type: GET_OUR_PARTNERS,
    data: payload,
  };
}

export function updateHomeAppByKeyVal(payload) {
  return {
    type: UPDATE_HOME_APP_BY_KEY,
    data: payload,
  };
}

export function fetchCities(payload) {
  return {
    type: FETCH_CITIES,
    payload,
  };
}

export function fetchCityItems(payload) {
  return {
    type: FETCH_CITY_ITEMS,
    payload,
  };
}

export function submitOtp(payload) {
  return {
    type: SUBMIT_OTP,
    payload,
  };
}

export function sendOtp(payload) {
  return {
    type: SEND_OTP,
    payload,
  };
}

export function addItemToCart(payload) {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
}

export function fetchCart(payload) {
  return {
    type: FETCH_CART,
    payload,
  };
}

export function fetchDeliveryLocations() {
  return {
    type: FETCH_DELIVERY_LOC,
  };
}

export function fetchDeliveryStates() {
  return {
    type: FETCH_DELIVERY_STATE,
  };
}

export function fetchCityByState(payload) {
  return {
    type: FETCH_CITY_BY_STATE,
    payload,
  };
}

export function fetchPincodeByCity(payload) {
  return {
    type: FETCH_PINCODE_BY_CITY,
    payload,
  };
}

export function setSeliveryLocation(payload) {
  return {
    type: SET_DELIVERY_LOCATION,
    payload,
  };
}

export function getPaymentDetails(payload) {
  return {
    type: DO_CCAVENUE_PAYMENT,
    payload,
  };
}

export function submitUserDetails(payload) {
  return {
    type: SUBMIT_USER_DETAILS,
    payload,
  };
}

export function getUserDetails() {
  return {
    type: GET_USER_DETAILS,
  };
}

export function getUserList() {
  return {
    type: GET_USER_LIST,
  };
}

export function retryPayment(payload) {
  return {
    type: GET_REPAYMENT_DETAILS,
    payload,
  };
}
