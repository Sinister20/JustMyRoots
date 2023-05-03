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

export const RESTAURENT_STORE_UPDATE_BY_KEY = 'restaurent/RESTAURENT_STORE_UPDATE_BY_KEY';
export const FETCH_RESTAURENT_DETAILS = 'restaurent/FETCH_RESTAURENT_DETAILS';
export const FETCH_RESTAURENT_ITEMS = 'restaurent/FETCH_RESTAURENT_ITEMS';
export const FETCH_FEATURE_ITEMS = 'restaurent/FETCH_FEATURE_ITEMS';




