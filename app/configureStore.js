/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import saga from './containers/HomePage/saga';
import cart from './containers/CartContainer/saga';
import myAccount from './containers/MyAccount/saga';
import myFavorite from './containers/MyFavourite/saga';
import MaaKeHaatKaKhana from './containers/MaaKeHaatKaKhana/saga';
import ContactUs from './containers/ContactUs/saga';
import productMasterSaga from './containers/ProductMaster/saga';
import customerFeedbackSaga from './containers/CustomerFeedback/saga';
import brandMasterSaga from './containers/BrandMaster/saga';
import locationToLocationMasterSaga from './containers/LocationToLocationMaster/saga';
import locationMasterSaga from './containers/LocationMaster/saga';
import OrderMasterSaga from './containers/OrderMaster/saga';
import metaMasterSaga from './containers/MetaMaster/saga';
import testimonialMasterSaga from './containers/TestimonialMaster/saga';
import couponMasterSaga from './containers/CouponMaster/saga';
import ItemPageSaga from './containers/ItemPage/saga';
import RestaurantsSaga from './containers/Restaurants/saga';
import ReportsMasterSaga from './containers/ReportsMaster/saga';
import LoyaltyPoint from './containers/LoyaltyPoint/saga';
export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  [
    saga,
    cart,
    myAccount,
    myFavorite,
    productMasterSaga,
    brandMasterSaga,
    locationToLocationMasterSaga,
    locationMasterSaga,
    metaMasterSaga,
    testimonialMasterSaga,
    couponMasterSaga,
    ItemPageSaga,
    RestaurantsSaga,
    OrderMasterSaga,
    ReportsMasterSaga,
    LoyaltyPoint,
    customerFeedbackSaga,
    MaaKeHaatKaKhana,
    ContactUs
  ].every(s => store.runSaga(s));

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
