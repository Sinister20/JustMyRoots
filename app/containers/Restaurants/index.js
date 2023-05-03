/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import HomePage from 'containers/HomePage/Loadable';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Button } from '@material-ui/core';
import { selectRestaurentStoreByKey } from './selectors';
import reducer from './reducer';
import { selectStoreByKey } from '../HomePage/selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import { TrendingDishes } from '../HomePage/Components';

import {
  fetchBrandDetails,
  fetchBrandItems,
  fetchFeatureItems,
} from './actions';
import { addItemToCart } from '../HomePage/actions';
import {
  HeroRestaurant,
  RecommendedDishes,
  RestaurentItems,
  CustomerBought,
} from './Components';
import { searchQueryParser } from '../../utils/utils';
import backButton from '../../images/back.png';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'restaurentStore';

function Restaurants(props) {
  const {
    fetchBrandDetails,
    fetchBrandItems,
    brandDetails = {},
    brandItems = {},
    addItemToCart,
    history,
    cartData,
    featureItems = [],
    fetchFeatureItems,
    deliveryInLoc,
    foodType,
  } = props;

  const brandID = searchQueryParser('brandId');

  const [filters, setFilters] = useState({
    cost: [0, 7000],
    offer: '',
    sortBy: '',
  });

  useEffect(() => {
    if (brandID) fetchBrandDetails(brandID);
  }, [brandID]);

  useEffect(() => {
    if (brandID) fetchFeatureItems(brandID);
  }, [deliveryInLoc, brandID]);

  useEffect(() => {
    if (brandID) {
      fetchBrandItems({
        brandID,
        filters: {
          filter: Array.isArray(foodType)
            ? foodType.length > 1
              ? ''
              : foodType
            : foodType,
        },
      });
    }
  }, [deliveryInLoc, foodType]);

  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="Best Restaurants and Brands For Online Food Delivery - Justmyroots
">
        <meta name="description" content="Expand jmr our restaurant and brand business quickly at the best lowest cost with Justmyroots. Know more about Online food delivery." />
      </Helmet>
      {/* <button className="backButton" onClick={() => history.goBack()}>
        <img src={backButton} alt="back" />
      </button> */}
      <HeroRestaurant brandDetails={brandDetails} />
      <RecommendedDishes addItemToCart={addItemToCart} />
      {/* <RestaurentItems
        brandItems={brandItems}
        setFilters={setFilters}
        filters={filters}
        cartData={
          cartData &&
          brandDetails &&
          brandDetails._id &&
          cartData[brandDetails._id] &&
          cartData[brandDetails._id].cartInfo
        }
        addItemToCart={addItemToCart}
      /> */}
      {/* <TrendingDishes
        metaKey="TRENDING_DISHES"
        key="TRENDING_DISHES"
        heading="CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHT"
        location={deliveryInLoc}
      /> */}
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  brandDetails: selectRestaurentStoreByKey('brandDetails'),
  brandItems: selectRestaurentStoreByKey('brandItems'),
  cartData: selectStoreByKey('cartData'),
  featureItems: selectRestaurentStoreByKey('featureItems'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  foodType: selectGlobelStoreByKey('foodType'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchBrandDetails,
      fetchBrandItems,
      addItemToCart,
      fetchFeatureItems,
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
)(Restaurants);
