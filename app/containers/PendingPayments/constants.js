/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CART_STORE_UPDATE_BY_KEY = 'JMR/cart/GLOBAL_STORE_UPDATE_BY_KEY';
export const PLACE_ORDER_SUBMIT_CART = 'JMR/cart/PLACE_ORDER_SUBMIT_CART';
export const GET_COUPONS_ON_CART = 'JMR/cart/GET_COUPONS_ON_CART';
export const APPLY_COUPONS_ON_CART = 'JMR/cart/APPLY_COUPONS_ON_CART';
