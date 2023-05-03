import React, { useState, useEffect, memo } from 'react';
import {
  makeStyles, Box, useTheme,
  useMediaQuery
} from '@material-ui/core';
import BestOfPlaces from '../../components/BestOfPlaces';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectStoreByKey } from '../HomePage/selectors';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import {
  fetchCityItems,
  fetchDeliveryLocations
} from '../HomePage/actions';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(theme => ({
  sliderCard1: {
    '& img': {
      borderRadius: 10,
    },
  },
  homeSlider2: {},
  heroOffer: {
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
  },
  hrVer: {
    height: 20,
    background: '#000000',
    margin: 20,
  },
}));

export function RestaurantAndBrand(props) {
  const {
    cities,
    fetchCityItems,
    cityItems,
    fetchDeliveryLocations,
    deliveryInLoc,
  } = props;

  const classes = useStyles();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCityId, setSelectedCityId] = useState();
  const [cityData, setCityData] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchDeliveryLocations();
  }, [deliveryInLoc]);

  useEffect(() => {
    if (cities && cities.length) {
      setSelectedCity(cities[0].name);
      setCityData(cities[0]);
      setSelectedCityId(cities[0]._id);
      fetchCityItems(cities[0]._id);
    }
  }, [cities]);

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

  return (
    <>
    <Helmet titleTemplate="JMR" defaultTitle="Best Restaurants and Brands For Online Food Delivery - Justmyroots ">
        <meta name="description" content="Find popular restaurants & brands online and get food delivered at the lowest cost with Justmyroots." />
      </Helmet>
    <Box my={isMobile ? 0 : 8}>
      {cities && cities.length && cityData && (
        <BestOfPlaces
          places={places}
          selectedCity={selectedCity}
          changeCity={changeCity}
          cityData={cityData}
          cityItems={cityItems}
          resto
        />
      )}
    </Box>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  cities: selectStoreByKey('cities'),
  cityItems: selectStoreByKey('cityItems'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCityItems,
      fetchDeliveryLocations,
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
)(RestaurantAndBrand);
