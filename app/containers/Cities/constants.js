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

export const GLOBAL_STORE_UPDATE_BY_KEY = 'JMR/App/GLOBAL_STORE_UPDATE_BY_KEY';
export const FETCH_CITIES = 'JMR/App/FETCH_CITIES';
export const FETCH_CITY_ITEMS = 'JMR/App/FETCH_CITY_ITEMS';