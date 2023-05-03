/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const TEST_ACTION_HOME = 'homePage/Home/TEST_ACTION_HOME';
export const BANNER_DATA_CALL = 'homePage/Home/BANNER_DATA_CALL';
export const UPDATE_HOME_APP_BY_KEY = 'homePage/Home/UPDATE_HOME_APP_BY_KEY';
export const GET_OFFERS = 'homePage/Home/GET_OFFERS';
export const GET_HERO_VIDEO = 'homePage/Home/GET_HERO_VIDEO';
export const FETCH_CITIES = 'homePage/Home/FETCH_CITIES';
export const FETCH_CITY_ITEMS = 'JMR/App/FETCH_CITY_ITEMS';
export const SUBMIT_OTP = 'homePage/Home/SUBMIT_OTP';
export const SEND_OTP = 'homePage/Home/SEND_OTP';
export const ADD_ITEM_TO_CART = 'homePage/Home/ADD_ITEM_TO_CART';
export const FETCH_CART = 'homePage/Home/FETCH_CART';
export const FETCH_DELIVERY_LOC = 'homePage/Home/FETCH_DELIVERY_LOC';
export const FETCH_DELIVERY_STATE = 'homePage/Home/FETCH_DELIVERY_STATE';
export const FETCH_CITY_BY_STATE = 'homePage/Home/FETCH_CITY_BY_STATE';
export const SET_DELIVERY_LOCATION = 'homePage/Home/SET_DELIVERY_LOCATION';
export const FETCH_PINCODE_BY_CITY = 'homePage/Home/FETCH_PINCODE_BY_CITY';
export const DO_CCAVENUE_PAYMENT = 'homePage/Home/DO_CCAVENUE_PAYMENT';
export const SUBMIT_USER_DETAILS = 'homePage/Home/SUBMIT_USER_DETAILS';
export const GET_USER_DETAILS = 'homePage/Home/GET_USER_DETAILS';
export const GET_USER_LIST = 'homePage/Home/GET_USER_LIST';
export const GET_REPAYMENT_DETAILS = 'homePage/Home/GET_REPAYMENT_DETAILS';
export const GET_META_LISTING = 'homePage/Home/GET_META_LISTING';
export const GET_TESTIMONIAL_LISTING = 'homePage/Home/GET_TESTIMONIAL_LISTING';
export const SUBSCRIBE_EMAIL = 'homePage/Home/SUBSCRIBE_EMAIL';
export const FETCH_UOM_META = 'homePage/Home/FETCH_UOM_META';
export const CREATE_MAA_KE_HATH_KA_KHANA_CART =
  'homePage/Home/CREATE_MAA_KE_HATH_KA_KHANA_CART';
export const CREATE_WISH_A_DISH = 'homePage/Home/CREATE_WISH_A_DISH';
export const APPLY_LOYALTY = 'homePage/Home/APPLY_LOYALTY';
export const GET_OUR_PARTNERS = 'homePage/Home/GET_OUR_PARTNERS';
