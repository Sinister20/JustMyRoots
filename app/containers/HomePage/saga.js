/**
 * Gets the repositories of the user from Github
 */

import {
  call,
  put,
  all,
  select,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  BANNER_DATA_CALL,
  GET_OFFERS,
  GET_HERO_VIDEO,
  FETCH_CITIES,
  FETCH_CITY_ITEMS,
  SUBMIT_OTP,
  SEND_OTP,
  ADD_ITEM_TO_CART,
  FETCH_CART,
  FETCH_DELIVERY_LOC,
  FETCH_DELIVERY_STATE,
  FETCH_CITY_BY_STATE,
  FETCH_PINCODE_BY_CITY,
  SET_DELIVERY_LOCATION,
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
} from 'containers/HomePage/constants';
import { makeSelectHome } from 'containers/HomePage/selectors';
import { setToLocalStorage } from '../../utils/localStorageUtils';
import {
  bannerApiFetchService,
  offersApiFetchService,
  videoApiFetchService,
  getCityList,
  getCityItems,
  submitOtpServiceCall,
  sendOtpServiceCall,
  addItemToCartServiceCall,
  fetchCartServiceCall,
  fetchDeliveryLocServiceCall,
  fetchDeliveryStateServiceCall,
  fetchCityByStateServiceCall,
  fetchPincodeByCityServiceCall,
  setDeliveryAddressServiceCall,
  ccAvanuePaymentService,
  submitUserDetailsServiceCall,
  getUserDetailsServiceCall,
  retryPaymentService,
  getUserListServiceCall,
  getMetaListingServiceCall,
  getTestimonialListingServiceCall,
  subscribeEmailServiceCall,
  fetchUomMetaServiceCall,
  maaDeliveryFoodCartServiceCall,
  creatWishADishServiceCall,
  applyLoyaltyServiceCall,
  getOurPartnersServiceCall,
} from './serviceCalls';
import {
  getTestimonialListings,
  subscribeEmail,
  updateHomeAppByKeyVal,
  fetchCart as fetchCartAct,
  fetchOurPartners,
} from './actions';
import { updateGlobelStoreByKeyVal } from '../App/actions';

import { setDeliveryAddress } from '../CartContainer/actions';

export function* getMetaListing(payload) {
  try {
    const res = yield call(getMetaListingServiceCall, payload.payload);
    if (res.status === 200) {
      yield put(
        updateHomeAppByKeyVal({
          key: payload.payload.key,
          value: payload.payload.keyword
            ? payload.payload.keyword === 'type'
              ? res.data.data
              : res.data.data[0]
            : res.data.data.length > 1
              ? res.data.data
              : res.data.data[0],
        }),
      );
    }
  } catch (err) {
    // reject(err);
  }
}

export function* subscribeEmailSaga(action) {
  const { payload } = action;
  const { resolve, reject } = action.payload;
  try {
    const res = yield call(subscribeEmailServiceCall, payload.payload);
    if (res.status === 200) {
      resolve(res);
    }
  } catch (err) {
    reject(err);
  }
}

export function* getTestimonialListing(payload) {
  try {
    const res = yield call(getTestimonialListingServiceCall, payload.payload);
    if (res.status === 200) {
      yield put(
        updateHomeAppByKeyVal({
          key: 'testimonials',
          value: res.data,
        }),
      );
    }
  } catch (err) {
    // reject(err);
  }
}

export function* getBannerData(payload) {
  try {
    const repos = yield call(bannerApiFetchService, payload);
    if (repos.status === 200) {
      yield put(
        updateHomeAppByKeyVal({
          key: 'homeHeroBanner',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) { }
}

export function* getOffers(payload) {
  try {
    const repos = yield call(offersApiFetchService, payload);
    if (repos.status === 200) {
      yield put(
        updateHomeAppByKeyVal({ key: 'homeOffers', value: repos.data }),
      );
    }
  } catch (err) { }
}

export function* getheroVideo(payload) {
  try {
    const repos = yield call(videoApiFetchService, payload);
    if (repos.status === 200) {
      yield put(updateHomeAppByKeyVal({ key: 'heroVideo', value: repos.data }));
    }
  } catch (err) { }
}

export function* fetchCities() {
  try {
    const repos = yield call(getCityList);
    if (repos.status === 200) {
      yield put(
        updateHomeAppByKeyVal({ key: 'cities', value: repos.data.data.items }),
      );
    }
  } catch (err) { }
}

export function* sendOtp(payload) {
  try {
    const repos = yield call(sendOtpServiceCall, payload);
    if (repos.status === 200) {
      // setToLocalStorage('userData', payload.payload.phoneNumber);
      yield put(
        updateHomeAppByKeyVal({ key: 'authData', value: repos.data.data }),
      );
      // alert(`your otp is ${repos.data.data.tempOTP}`)
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* submitOtp(payload) {
  const {
    payload: { resolve, reject },
  } = payload;
  try {
    const repos = yield call(submitOtpServiceCall, payload);
    if (repos.status === 200 && repos.data.success) {
      setToLocalStorage('HKTWQ', repos.data.data.token);
      setToLocalStorage('userData', payload.payload.phoneNumber);
      setToLocalStorage('showVoucher' , repos.data.data.voucherShow);
      setToLocalStorage('voucherCode', repos.data.data.vCode.text);
      setToLocalStorage('voucherExpiry', repos.data.data.vExpiry.text);
      setToLocalStorage('voucherAmount', repos.data.data.vamount.text);
      yield put(
        updateHomeAppByKeyVal({ key: 'authData', value: repos.data.data }),
      );
      resolve();
    } else {
      reject();
      alert('please enter valid otp');
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* submitUserDetailsSaga(data) {
  try {
    const repos = yield call(submitUserDetailsServiceCall, data.payload);
    if (repos.status === 200) {
      data.payload.resolve();
    } else {
      data.payload.reject();
      alert('invalid data');
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* getUserDetailsSaga() {
  try {
    const repos = yield call(getUserDetailsServiceCall);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'userDetails',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* getUserListSaga() {
  try {
    const repos = yield call(getUserListServiceCall);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'usersList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}
export function* getOurPartners() {
  try {
    const repos = yield call(getOurPartnersServiceCall);
    if (repos.status === 200) {
      yield put(
        updateHomeAppByKeyVal({ key: 'ourPartners', value: repos.data.data }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* addItemToCart(payload) {
  const { res, rej, itemId, quantity } = payload.payload;
  try {
    const repos = yield call(addItemToCartServiceCall, {
      payload: { itemId, quantity },
    });
    if (repos.status === 200 && repos.data.success) {
      const formatedCart = repos.data.data.reduce(
        (acc, cart) => ({
          ...acc,
          ...(cart.cartInfo && cart.cartInfo.brandId
            ? { [cart.cartInfo.brandId._id]: cart }
            : {}),
        }),
        {},
      );

      yield put(
        updateHomeAppByKeyVal({
          key: 'cartData',
          value: formatedCart,
        }),
      );
      setToLocalStorage('cartCount', formatedCart)
      res && res();
    } else if (repos.data && repos.data.error) {
      rej && rej(repos.data.error);
    }
    rej && rej();
  } catch (err) {
    rej && rej();
    // console.log(err);
  }
}

export function* fetchCityItems(payload) {
  try {
    const repos = yield call(getCityItems, payload.payload);
    if (repos.status === 200 && repos.data.success) {
      yield put(
        updateHomeAppByKeyVal({ key: 'cityItems', value: repos.data.data }),
      );
    } else {
      yield put(updateHomeAppByKeyVal({ key: 'cityItems', value: undefined }));
    }
  } catch (err) { }
}

export function* fetchCart() {
  try {
    const repos = yield call(fetchCartServiceCall);
    if (repos.status === 200 && repos.data.success) {
      const formatedCart = repos.data.data.reduce(
        (acc, cart) => ({
          ...acc,
          ...(cart.cartInfo.brandId
            ? { [cart.cartInfo.brandId._id]: cart }
            : {}),
        }),
        {},
      );

      yield put(
        updateHomeAppByKeyVal({
          key: 'cartData',
          value: formatedCart,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchDeliveryLoc() {
  try {
    const repos = yield call(fetchDeliveryLocServiceCall);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'deliveryInLocations',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchDeliveryStates() {
  try {
    const repos = yield call(fetchDeliveryStateServiceCall);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'deliveryInStates',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchCityByState(payload) {
  try {
    const repos = yield call(fetchCityByStateServiceCall, payload);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'deliveryInLocations',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchPincodeByCity(payload) {
  try {
    const repos = yield call(fetchPincodeByCityServiceCall, payload);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'deliveryInPincode',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* setDeliveryAddressSaga(payload) {
  try {
    const repos = yield call(setDeliveryAddressServiceCall, payload);
    if (repos.status === 200) {
      setToLocalStorage('selectedLocation', payload.payload);
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* doCCAvenuePayment(payload) {
  const {
    payload: {
      resolve,
      reject,
      cartId,
      payMode,
      billingAddress,
      maaKeHathMode = false,
      deliveryDates = [],
    },
  } = payload;
  try {
    const repos = yield call(
      ccAvanuePaymentService,
      cartId,
      payMode,
      billingAddress,
      maaKeHathMode,
      deliveryDates,
    );
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* getRepaymentDetails(payload) {
  const {
    payload: { resolve, reject, TranscationID, payMode },
  } = payload;
  try {
    const repos = yield call(retryPaymentService, TranscationID, payMode);
    if (repos.status === 200) {
      resolve(repos);
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchUomMetaSaga() {
  try {
    const repos = yield call(fetchUomMetaServiceCall);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'uomMeta',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* createCartForMKHKKN({ payload }) {
  const { data, res, rej } = payload;
  try {
    const repos = yield call(maaDeliveryFoodCartServiceCall, data);
    if (repos.status === 200 && data.success) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'maaDeliveryFoodCart',
          value: repos.data.data,
        }),
      );
      res && res();
    }
  } catch (err) {
    rej && rej(err);
    // console.log(err);
  }
}

export function* creatWishADish({ payload }) {
  const { resolve, reject, wishADishPayload } = payload
  try {
    const repos = yield call(creatWishADishServiceCall, wishADishPayload);
    resolve(repos);
    if (repos.status === 200) {
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'creatWishADishData',
          value: repos.data.data,
        }),
      );
      yield put(
        updateGlobelStoreByKeyVal({
          key: 'wishADishFormData',
          value: undefined,
        }),
      );

    }
  } catch (err) {
    // console.log(err);
    reject(err);
  }
}

export function* applyLoyalty({ payload }) {
  const { data, res, rej, isRemove } = payload;
  try {
    const repos = yield call(applyLoyaltyServiceCall, data);
    if (repos.status === 200) {
      yield put(fetchCartAct());
      res && res(isRemove);
    }
  } catch (err) {
    // console.log(err);
    rej && rej();
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(BANNER_DATA_CALL, getBannerData),
    takeLatest(GET_OFFERS, getOffers),
    takeLatest(GET_HERO_VIDEO, getheroVideo),
    takeLatest(FETCH_CITIES, fetchCities),
    takeLatest(FETCH_CITY_ITEMS, fetchCityItems),
    takeLatest(SUBMIT_OTP, submitOtp),
    takeLatest(SEND_OTP, sendOtp),
    takeLatest(ADD_ITEM_TO_CART, addItemToCart),
    takeLatest(FETCH_CART, fetchCart),
    takeLatest(FETCH_DELIVERY_LOC, fetchDeliveryLoc),
    takeLatest(FETCH_DELIVERY_STATE, fetchDeliveryStates),
    takeLatest(FETCH_CITY_BY_STATE, fetchCityByState),
    takeLatest(FETCH_PINCODE_BY_CITY, fetchPincodeByCity),
    takeLatest(SET_DELIVERY_LOCATION, setDeliveryAddressSaga),
    takeLatest(DO_CCAVENUE_PAYMENT, doCCAvenuePayment),
    takeLatest(SUBMIT_USER_DETAILS, submitUserDetailsSaga),
    takeLatest(GET_USER_DETAILS, getUserDetailsSaga),
    takeLatest(GET_USER_LIST, getUserListSaga),
    takeLatest(GET_REPAYMENT_DETAILS, getRepaymentDetails),
    takeEvery(GET_META_LISTING, getMetaListing),
    takeLatest(GET_TESTIMONIAL_LISTING, getTestimonialListing),
    takeLatest(SUBSCRIBE_EMAIL, subscribeEmailSaga),
    takeLatest(FETCH_UOM_META, fetchUomMetaSaga),
    takeLatest(CREATE_MAA_KE_HATH_KA_KHANA_CART, createCartForMKHKKN),
    takeLatest(CREATE_WISH_A_DISH, creatWishADish),
    takeLatest(APPLY_LOYALTY, applyLoyalty),
    takeLatest(GET_OUR_PARTNERS, getOurPartners),
  ]);
}
