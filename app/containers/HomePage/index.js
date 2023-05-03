/* HomePage - This is the first thing users see of our App, at the '/' route */
import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { BestOfPlaces, OffersBar } from 'components';
import { Hidden } from '@material-ui/core';
import { makeSelectHome, selectStoreByKey } from './selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorageUtils';
import {
  fetchBannerData,
  fetchOffers,
  fetchHeroVideo,
  fetchCityItems,
  fetchDeliveryLocations,
  fetchOurPartners,
  getUserDetails,
} from './actions';
import { HistoryContext } from '../App/HistoryContext';
import {
  OfferCardsContainer,
  BackToRoots,
  OutTopClients,
  OurPartners,
  HeroSection,
  TrendingDishes,
  Sugati,
  SafetyProtocols,
  MemoryLane,
  WishDish,
  AboutUs,
} from './Components';
import MaaKeHaatKaKhana from '../MaaKeHaatKaKhana/components/index';
import RegisterVoucher from '../../components/Login/RegisterVoucher';
import { updateGlobelStoreByKeyVal } from '../App/actions';
import axios from 'axios';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../config/environmentConfig';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Subheader } from '../../components';
import TopDishes from '../../components/TopDishes';

export function HomePage(props) {
  const {
    history,
    fetchBannerData,
    heroHomeBanner,
    homeOffers,
    fetchOffers,
    fetchHeroVideo,
    heroVideo,
    cities,
    fetchCityItems,
    cityItems,
    fetchDeliveryLocations,
    deliveryInLoc,
    fetchOurPartners,
    ourPartners,
    updateGlobelStoreByKeyVal,
  authData,
   
  } = props;

  const [selectedCity, setSelectedCity] = useState();
  const [selectedCityId, setSelectedCityId] = useState();
  const [cityData, setCityData] = useState();
  const [metaList, setMetaList] = useState({});
  const [registerModal, setRegisterModal] = useState();
  const [registerMessage , setRegisterMessage] = useState('')
  const currentUrl = apiUrlPrefixes[currentEnvironment];
  const [bannerData , setBannerData] = useState([])
  const[loading , setLoading] = useState(false)
  const [impactBanner , setImpactBanner] = useState([])

  useEffect(() => {
    
    getMessage();
    setTimeout(()=>{
      setRegisterModal(true)
    },4000);
    // fetchBannerData();
    fetchOffers();
    fetchHeroVideo();
    fetchDeliveryLocations();
    fetchOurPartners();
  }, []);

  useEffect(()=>{
    getBannerData()
    getImpactBanner()
  },[deliveryInLoc])



  useEffect(() => {
    if (cities && cities.length) {
      setSelectedCity(cities[0].name);
      setCityData(cities[0]);
      setSelectedCityId(cities[0]._id);
      fetchCityItems(cities[0]._id);
    }
  }, [cities]);

  
  // useEffect(()=>{
  //   window.onload = function() {
  //       if(!window.location.hash) {
  //         window.location = window.location + '#home';
  //         window.location.reload(false);
  //       }
  //     }
  //  },[])
  
  const getImpactBanner = () =>{
    setLoading(true)
    axios.get(`${currentUrl}/api/web/impact-bannerlist?type=WEB&cityId=${deliveryInLoc ? deliveryInLoc._id:''}`,{

    })
    .then((res)=>{
      setImpactBanner(res.data.data)
      setLoading(false)

    })
  }

  const getBannerData = () =>{
    setLoading(true)
    axios.get(`${currentUrl}/api/web/bannerlist?type=WEB&cityId=${deliveryInLoc ? deliveryInLoc._id:''}`)
    .then((res)=>{
      setBannerData(res.data.data)
      setLoading(false)
    })
  }

  const getMessage =()=>{
    axios.get(`${currentUrl}/api/admin/commontemplate?type=popup`)
    .then((res)=>{
      setRegisterMessage(res.data.data.content)
    })
  }

  // const places = cities && cities.length && cities.map(c => c.name);
  const places = cities && cities.length && cities
  .filter(c => c.pickupAllowed === true)
  .map(c => c.name);

  const changeCity = city => {
    setSelectedCity(city);
    const cityDetails = cities.find(
      c => c.name.toLowerCase() === city.toLowerCase(),
    );
    setCityData(cityDetails);
    setSelectedCityId(cityDetails._id);
    fetchCityItems(cityDetails._id);
  };
  const onRegister =()=>{
    setRegisterModal(false);
    updateGlobelStoreByKeyVal({ key: 'isLoginOpen', value: true });
  }
  const onClose =()=>{
    setRegisterModal(false);

  }

  return (
    <article>
     <Helmet titleTemplate="JMR" defaultTitle="Intercity Food Delivery | Online Food delivery Intercity - Justmyroots">
     <meta name="description" content=" Just My Roots provides a facility for registering vendors to display their products on the website in all cities in India." />
      </Helmet>
      <HistoryContext.Provider value={{ history }}>
        <TopDishes 
        data={impactBanner}
        />
        <Subheader/>

        {loading && <LoadingIndicator/>}

        {
          bannerData && bannerData.length > 0 && (  <HeroSection  history={history}  heroHomeBanner={bannerData} />)
          }
        
    {registerModal && !authData && (
      <RegisterVoucher 
       onRegister ={onRegister}
       onClose={onClose} 
       message={registerMessage}
       />
    )}
        <TrendingDishes
          metaKey="trending-dishes"
          key="trending-dishes"
          location={deliveryInLoc}
          handleViewMore={() => {
            history.push('/view-more?keyword=trending-dishes');
          }}
        />

        <TrendingDishes
          heading="Popular Offers"
          metaKey="offer"
          key="offer"
          handleViewMore={() => {
            history.push('/offers');
          }}
        />
        <TrendingDishes
          metaKey="trending-restaurants"
          key="trending-restaurants"
          location={deliveryInLoc}
          restro
          handleViewMore={() => {
            history.push({
              pathname: '/view-more',
              search: '?keyword=trending-restaurants&restro=true',
            });
          }}
        />
        <OffersBar />
        <MaaKeHaatKaKhana />
        <TrendingDishes
          metaKey="new-addition"
          key="new-addition"
          location={deliveryInLoc}
          restro
          handleViewMore={() => {
            history.push({
              pathname: '/view-more',
              search: '?keyword=new-addition&restro=true',
            });
          }}
        />
        {/* City Speciality section */}
        {cities && cities.length && cityData && (
          <BestOfPlaces
            places={places}
            selectedCity={selectedCity}
            changeCity={changeCity}
            cityData={cityData}
            cityItems={cityItems}
            location={deliveryInLoc}
          />
        )}
        <OutTopClients />
        <Sugati />
        <TrendingDishes
          metaKey="sugati-potpourri"
          key="sugati-potpourri"
          location={deliveryInLoc}
          handleViewMore={() => {
            history.push('/view-more?keyword=sugati-potpourri');
          }}
        />
        <MemoryLane />
        <TrendingDishes
          metaKey="critics-choice"
          key="critics-choice"
          location={deliveryInLoc}
          handleViewMore={() => {
            history.push('/view-more?keyword=critics-choice');
          }}
        />
        <BackToRoots
          selectedCity={selectedCity}
          changeCity={changeCity}
          places={places}
        />
        <WishDish />
        <Hidden smDown>
          <AboutUs />
        </Hidden>
        <OurPartners ourPartners={ourPartners} />
        <SafetyProtocols />
      </HistoryContext.Provider>
    </article>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homeStore: makeSelectHome(),
  heroHomeBanner: selectStoreByKey('homeHeroBanner'),
  homeOffers: selectStoreByKey('homeOffers'),
  heroVideo: selectStoreByKey('heroVideo'),
  cities: selectStoreByKey('cities'),
  cityItems: selectStoreByKey('cityItems'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  ourPartners: selectStoreByKey('ourPartners'),
  authData: selectGlobelStoreByKey('userDetails'),

});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetails,
      fetchBannerData,
      fetchOffers,
      fetchHeroVideo,
      fetchCityItems,
      fetchOurPartners,
      fetchDeliveryLocations,
      getUserDetails,
      updateGlobelStoreByKeyVal,

    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(HomePage);
