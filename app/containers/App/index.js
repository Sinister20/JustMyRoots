/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Restaurants from 'containers/Restaurants/Loadable';
import ItemPage from 'containers/ItemPage/Loadable';
// import OfferPage from 'containers/OfferPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import OffersPage from 'containers/OfferPage/Loadable';
import CityPage from 'containers/CityPage/Loadable';
import FruitsPage from 'containers/FruitsPage/Loadable';
import TopStories from 'containers/TopStories/Loadable';
import Help from 'containers/Help/Loadable';
import Faq from 'containers/Faq';
import DiyPage from 'containers/DiyPage/Loadable';
import Cities from 'containers/Cities/Loadable';
import DiyDetails from 'containers/DiyDetails/Loadable';
import ProductSchedule from 'containers/ProductSchedule/Loadable';
import LoyaltyPoint from 'containers/LoyaltyPoint/Loadable';
import MyAccount from 'containers/MyAccount/Loadable';
import MyFavourite from 'containers/MyFavourite/Loadable';
import { useInjectReducer } from 'utils/injectReducer';
import CartContainer from 'containers/CartContainer/Loadable';
import Orders from 'containers/Orders/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { compose } from 'redux';
import MaaKeHathKaKhana from 'containers/MaaKeHaatKaKhana/Loadable';
import CustomerFeedback from 'containers/CustomerFeedback/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import EditProfile from 'containers/EditProfile';
import OurSafety from 'containers/OurSafety';
// import SafetyMeasures from 'containers/SafetyMeasures';
import GlobalStyle from '../../global-styles';
import {
  Header,
  MenuContainer,
  DeliveryInConfirm,
  Subheader,
  TopBar,
} from '../../components';
import Footer from '../../components/Footer';
import { HistoryContext } from './HistoryContext';
import ScrollToTop from './ScrollToTop';
import reducer from '../HomePage/reducer';
import cartReducer from '../CartContainer/reducer';
import brandMasterReducer from '../BrandMaster/reducer';
import productMasterReducer from '../ProductMaster/reducer';

import locationToLocationMasterReducer from '../LocationToLocationMaster/reducer';
import restaurentStoreReducer from '../Restaurants/reducer';
import locationMasterReducer from '../LocationMaster/reducer';
import orderMasterReducer from '../OrderMaster/reducer';
import metaMasterReducer from '../MetaMaster/reducer';
import testimonialMasterReducer from '../TestimonialMaster/reducer';
import couponMasterReducer from '../CouponMaster/reducer';
import reportsMasterReducer from '../ReportsMaster/reducer';
import AboutUs from '../AboutUs/Loadable';
import {
  setToLocalStorage,
  getFromLocalStorage,
  deleteKeyFromLocalStorage,
} from '../../utils/localStorageUtils';
import BrandMaster from '../BrandMaster';
import ProductMaster from '../ProductMaster';
import LocationToLocationMaster from '../LocationToLocationMaster';
import LocationMaster from '../LocationMaster';
import OrderMaster from '../OrderMaster';
import MetaMaster from '../MetaMaster';
import TestimonialMaster from '../TestimonialMaster';
import CouponMaster from '../CouponMaster';
import Payments from '../Payments';
import CityNewPage from '../CityNewPage';
import RestaurantAndBrand from '../RestaurantAndBrand';
import Category from '../Category';
import Cuisine from '../Cuisine';
import WishADish from '../WishADish';
import MemoryLane from '../MemoryLane';
import TermsCondition from '../Terms';
import PrivacyPolicy from '../PrivacyPolicy';
import ContactUs from '../ContactUs';
import ReportsMaster from '../ReportsMaster';
import ViewMore from '../ViewMore';
import ThankYouPage from '../ThankYouPage';
import PendingPayments from '../PendingPayments';
import SelectPaymentOptions from '../PendingPayments/page/SelectPaymentOptions';
import PaymentGatewayPage from '../PendingPayments/page/PaymentGatewayPage';
// import LoadingIndicator  from '../../../../../components/LoadingIndicator';
import LoadingIndicator  from '../../components/LoadingIndicator';
import { Tracking } from '../Tracking';
import GiftVouchers from '../GiftVouchers';
import axios from 'axios';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../config/environmentConfig'
import TopDishes from '../../components/TopDishes';
import { TrendingDishes } from '../HomePage/Components';
import Partner from '../Partner';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'myAccount';
const Homekey = 'home';
const cartKey = 'cart';
const brandMasterKey = 'brandMaster';
const productMasterKey = 'productMaster';
const locationToLocationMasterKey = 'locationToLocationMaster';
const locationMasterKey = 'locationMaster';
const orderMasterKey = 'orderMaster';
const metaMasterKey = 'metaMaster';
const testimonialMasterKey = 'testimonialMaster';
const couponMasterKey = 'couponMaster';
const reportsMasterKey = 'reportsMaster';
const restaurentStore = 'restaurentStore';

function App({ history, location }) {
  useInjectReducer({ key: Homekey, reducer });
  useInjectReducer({ key: cartKey, reducer: cartReducer });
  useInjectReducer({ key: brandMasterKey, reducer: brandMasterReducer });
  useInjectReducer({ key: orderMasterKey, reducer: orderMasterReducer });
  useInjectReducer({ key: reportsMasterKey, reducer: reportsMasterReducer });
  useInjectReducer({ key: productMasterKey, reducer: productMasterReducer });
  useInjectReducer({ key: restaurentStore, reducer: restaurentStoreReducer });
  useInjectReducer({
    key: locationToLocationMasterKey,
    reducer: locationToLocationMasterReducer,
  });
  useInjectReducer({
    key: locationMasterKey,
    reducer: locationMasterReducer,
  });
  useInjectReducer({ key: metaMasterKey, reducer: metaMasterReducer });
  useInjectReducer({
    key: testimonialMasterKey,
    reducer: testimonialMasterReducer,
  });
  useInjectReducer({ key: couponMasterKey, reducer: couponMasterReducer });
  const [isOpenDelvry, deliveryInConfmClose] = useState(false);
  const [isOpenRegister, setIsOpenRegister] =useState(false)
  const currentUrl = apiUrlPrefixes[currentEnvironment]
  const sessionId = getFromLocalStorage('sessionId')
 const cartCount = getFromLocalStorage('cartCount')

let cartId = setInterval(() => {
    axios.put(`${currentUrl}/api/web/cart/emptycart`,{
      sessionId:sessionId
    })
    .then((res)=>{
      deleteKeyFromLocalStorage('cartCount')
      // window.location.reload(false)
    })
},3600000)

if(cartCount ==={} || !cartCount){
  clearInterval(cartId)
}

  useEffect(() => {
    if (location.pathname !== '/my-orders/order-placed/') {

      if (!getFromLocalStorage('selectedLocation')) {
        setTimeout(() => {
          deliveryInConfmClose(true);
        }, 1000);
      }
    }
  }, []);

  const isComponentwillMount = useRef(false);
  useEffect(() => {
    const sessionId = getFromLocalStorage('sessionId');
    if (!isComponentwillMount.current && !sessionId) {
      isComponentwillMount.current = true;
      setToLocalStorage('sessionId', uuid());
    }
  });

  return (
    <>
      <ScrollToTop>
        <AppWrapper>
          <Helmet titleTemplate="JMR" defaultTitle=" Intercity Food Delivery | Online Food delivery Intercity - Justmyroots">
            <meta name="description" content="JMR application" />
          </Helmet>
          <HistoryContext.Provider value={{ history }}>
            {window.location.href.includes('order-placed') ? (
              ''
            ) : (
              <>
                <Header />
                {/* <TopDishes/> */}
                {/* <TrendingDishes 
                // heading="Popular Offers"
                metaKey="offer"
                key="offer"
                /> */}
                 {/* <Subheader /> */}
              </>
            )}
            <TopBar />
            <Suspense fallback={<div><LoadingIndicator/></div>}>
            <Switch>
            
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about-us" component={AboutUs} />

              {/* <Route exact path="/gift-vouchers" component={GiftVouchers} /> */}
              <Route path="/pending-payment" component={PendingPayments} />
              <Route path="/payment-options" component={SelectPaymentOptions} />
              <Route path="/payment-gateway" component={PaymentGatewayPage} />
              <Route path="/brand-and-restaurants/:slug" component={Restaurants} />
              <Route
                path="/brand-and-restaurants/:slug"
                component={Restaurants}
              />
              <Route path="/item/:itemSlug/:brandSlug/" component={ItemPage} />
              <Route path="/payments/:paymentData" component={Payments} />
              <Route path="/thank-you/" component={ThankYouPage} />
              <Route path="/checkout" component={CartContainer} />
              <Route path="/my-orders" component={Orders} />
              <Route exact path="/search" component={SearchPage} />
              <Route path="/offers" component={OffersPage} />
              <Route path="/cities" component={Cities} />
              {/* <Route exact path="/city" component={CityPage} /> */}
              <Route exact path="/fruits" component={FruitsPage} />
              <Route exact path="/top-stories" component={TopStories} />
              <Route exact path="/diy-kits" component={DiyPage} />
              <Route exact path="/diy-details" component={DiyDetails} />
              <Route
                exact
                path="/product-schedule"
                component={ProductSchedule}
              />
              <Route exact path ="/partners" component={Partner} />
              <Route path="/t/:orderNumber" component={Tracking} />
              <Route path="/cuisine" component={Cuisine} />
              <Route path="/category" component={Category} />
              <Route
                exact
                path="/restaurant-and-brand"
                component={RestaurantAndBrand}
              />
              <Route
                path="/maa-ke-haat-ka-khana"
                component={MaaKeHathKaKhana}
              />
              <Route path="/memory-lane" component={MemoryLane} />
              <Route path="/wish-a-dish" component={WishADish} />
              <Route exact path="/brand-master" component={BrandMaster} />
              <Route exact path="/item-master" component={ProductMaster} />
              <Route
                exact
                path="/location-to-location-master"
                component={LocationToLocationMaster}
              />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/policies" component={PrivacyPolicy} />
              <Route
                exact
                path="/terms-and-condition"
                component={TermsCondition}
              />
              <Route exact path="/contact-us" component={ContactUs} />
              <Route exact path="/location-master" component={LocationMaster} />
              <Route exact path="/order-master" component={OrderMaster} />
              <Route exact path="/meta-master" component={MetaMaster} />
              <Route path="/safety-protocols" component={OurSafety} />
              <Route
                exact
                path="/testimonial-master"
                component={TestimonialMaster}
              />
              <Route exact path="/coupon-master" component={CouponMaster} />
              <Route path="/reports" component={ReportsMaster} />
              <Route path="/profile/edit-profile" component={EditProfile} />
              <Route path="/my-profile" component={MyAccount} />
              <Route path="/my-favourite" component={MyFavourite} />
              <Route path="/loyalty-points" component={LoyaltyPoint} />
              <Route path="/help" component={Help} />
              <Route path="/faq" component={Faq} />
              {/* <Route path="/safety-measures" component={SafetyMeasures} /> */}
              <Route path="/customer-feedback" component={CustomerFeedback} />
              <Route path="/view-more" component={ViewMore} />
              <Route path="" component={NotFoundPage} />
            </Switch>
            </Suspense>
            <GlobalStyle />
            {window.location.href.includes('order-placed') ? '' : <>
              {/* <MenuContainer /> */}
            </>
            }
            {window.location.href.includes('order-placed') ? (
              ''
            ) : (
              <>
                <Footer />
                <MenuContainer />
              </>
            )}
          </HistoryContext.Provider>
        </AppWrapper>
      </ScrollToTop>
      {isOpenDelvry && (
        <DeliveryInConfirm open={isOpenDelvry} setOpen={deliveryInConfmClose} />
      )}
    </>
  );
}

export default compose(withRouter)(App);
