import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { withRouter, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { itemStoreByKey } from './selectors';
import { selectRestaurentStoreByKey } from '../Restaurants/selectors';
import reducer from './reducer';
import { selectStoreByKey } from '../HomePage/selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import { fetchBrandDetails, fetchFeatureItems } from '../Restaurants/actions';
import { fetchItemById, fetchCustomerBroughtItem } from './actions';
import { addItemToCart } from '../HomePage/actions';
import { HeroRestaurant, CustomerBought } from './Components';
import { CommonHeading } from '../HomePage/Components';
import { ListCard } from '../../components';
import { saveFavoriteItemServiceCall } from '../MyFavourite/serviceCalls';
import { Skeleton } from '@material-ui/lab';
import { Container, Card, Box, CircularProgress } from '@material-ui/core';
import { checkImageURL,searchQueryParser } from '../../utils/utils';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
 
`;

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 50px auto;
  overflow: hidden;
  padding: 20px;
`;

const key = 'ItemPage';

function ItemPage(props) {
  const [itemLoading, setItemLoading] = useState(true);
  const {
    fetchBrandDetails,
    brandDetails = {},
    addItemToCart,
    cartData,
    fetchItemById,
    itemDetail,
    fetchCustomerBroughtItem,
    deliveryInLoc,
    customerBrought,
    foodType
  } = props;


  useInjectReducer({ key, reducer });

  const params = useParams();
  
  const itemId = searchQueryParser("itemId")
  const brandId = searchQueryParser("brandId")

  const [filters, setFilters] = useState({
    cost: [0, 7000],
    offer: '',
    sortBy: '',
  });

  useEffect(() => {
    getItemsDetails()
    
  }, [itemId,brandId,deliveryInLoc]);
  useEffect(() => {  
    if (deliveryInLoc) {
      fetchCustomerBroughtItem({ itemId: itemId, cityId: deliveryInLoc._id });
    }
  
  },[itemId,deliveryInLoc,foodType]);
  
  const getItemsDetails = () => {
    setItemLoading(true);
    new Promise((resolve, reject) => {
      fetchItemById({ resolve, reject, brandId,itemId });
    }).then(res => {
      setItemLoading(false);
    }).catch(err => {
      setItemLoading(false);

    });
  }
  const handleSaveFavorite = () => {
    getItemsDetails()
  };

  // const validatecustomerBrought = () => {
  //   customerBrought !== {};
  //   // Object.entries(customerBrought).length !== 0 &&
  //   // Object.entries(customerBrought).length !== undefined && 
  //   // Object.entries(customerBrought).length !== null
  //   // customerBrought.length !== 0
  //   return true;
  // };

  return (
    <>
      <Helmet titleTemplate="Item Page" defaultTitle="Item Page">
        <meta name="description" content="JMR application" />
      </Helmet>
      <Container style={{
        marginTop: '5rem',
        marginBottom: '0rem',
      }}
        maxWidth="md">
        {itemDetail && itemDetail.length > 0  && (
          <>
            <ListCard
              cartData={cartData}
              myLoader={itemLoading}
              addItemToCart={addItemToCart}
              key="product-"
              productData={itemDetail[0]}
              imgSrc={checkImageURL(itemDetail[0].productImages && itemDetail[0].productImages[0])}
              cartStyle
              isFavorite={
                itemDetail[0].isFavourite
                  ? itemDetail[0].isFavourite.isFavourite
                  : false
              }
              saveFavorite={handleSaveFavorite}
            />
          </>
        )}
        
       
       
      </Container>
 { customerBrought &&
            customerBrought !== null &&
            customerBrought !== undefined &&
            customerBrought !== {} &&
            Object.entries(customerBrought).length !== 0 &&
            customerBrought.length !== 0 ?  
      <CustomerBought
        customerBrought={customerBrought}
          deliveryInLoc={deliveryInLoc}
          foodType={foodType}
          addItemToCart={addItemToCart}
      /> : ''} 
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  brandDetails: selectRestaurentStoreByKey('brandDetails'),
  itemDetail: itemStoreByKey('itemDetail'),
  cartData: selectStoreByKey('cartData'),
  featureItems: selectRestaurentStoreByKey('featureItems'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  foodType: selectGlobelStoreByKey('foodType'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  customerBrought: selectRestaurentStoreByKey('customerBrought'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchBrandDetails,
      fetchItemById,
      addItemToCart,
      fetchFeatureItems,
      fetchCustomerBroughtItem,
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
)(ItemPage);
