import React, { memo, useEffect } from 'react';
import { Container, Grid, Box, Divider, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { addItemToCart } from '../HomePage/actions';
import { withRouter } from 'react-router-dom';
import { makeSelectHome } from '../HomePage/selectors';
import { getMetaListings } from '../HomePage/actions';
import { ProductCard } from '../HomePage/Components';
import { ImageCardWithTitleBtn } from '../../components';
import { selectGlobelStoreByKey } from '../App/selectors';
import placeholderImg from '../../images/placeholder-img.png';
import { checkImageURL } from '../../utils/utils';
const ViewMore = ({ getMetaListings, data = [], foodType,deliveryInLoc ,addItemToCart}) => {
  // get querrry params from url
  const query = new URLSearchParams(window.location.search);
  //
  const META_KEY = query.get('keyword');
  //
  const resto = query.get('restro') ? Boolean(query.get('restro')) : false;

  //
  React.useEffect(() => {
    getMetaListings({
      key: META_KEY,
      keyword: META_KEY === 'offer' ? 'type' : 'keyword',
    });
  }, [META_KEY, resto, foodType,deliveryInLoc]);

  // React.useEffect(() => {
  //   getMetaListings({ keyword: 'type', key: metaKey });
  // }, [location, metaKey, foodType]);
  return (
    <>
    <Container fixed>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        style={{ textTransform: 'uppercase', display: 'flex', justifyContent: 'center', marginTop: '36px'}}
      >
        {META_KEY ? META_KEY.replaceAll('-', ' ') : ' '}
      </Typography>
      <Box mt={10}>
        <Typography variant="h2" component="h2" gutterBottom>
          {data[META_KEY] ? data[META_KEY].description : ''}
          {META_KEY === 'offer' && ' OFFERS'}
        </Typography>
      </Box>
      <Box my={5}>
        {
          // console.log("view more", foodType)
        }
        <Grid container spacing={6}>
          {!resto &&
            data[META_KEY] &&
            data[META_KEY].items &&
            data[META_KEY].items
            .filter(type=>foodType.indexOf(type.itemType) >= 0)
            .map((item, index) => (
              <Grid key={index} item xs={12} md={3}>
                <ProductCard
                  productData={{
                    name: item.itemName,
                    brand: item.brand.brandName,
                    city: item.location.locationName,
                    type: item.itemType,
                    discount: item.discount,
                    ratings: item.ratings,
                    price: item.sellingPrice,
                    UOM: item.UOM,
                    itemId: item._id,
                    webLink: `item/${item.brand.brandSlug}/${
                      item.slug
                    }?brandId=${item.brand._id}&itemId=${item._id}`,
                  }}
                  imgSrc={checkImageURL(item.itemImage)}
                  addItemToCart={addItemToCart}

                />
              </Grid>
            ))}
          {META_KEY === 'offer' &&
            data[META_KEY].length > 0 &&
            data[META_KEY].map((item, index) => (
              <Grid key={index} item xs={12} md={3}>
                <ImageCardWithTitleBtn
                  productData={{
                    name: item.brandName,
                    webLink: `offers/${item.name}`,
                  }}
                  imgSrc={item.metaLogo || placeholderImg}
                  offerCard
                />
              </Grid>
            ))}
          {resto &&
            data[META_KEY] &&
            data[META_KEY].brands &&
            data[META_KEY].brands.map((item, key) => (
              <Grid item xs={12} md={3} key={key}>
                <ImageCardWithTitleBtn
                  productData={{
                    name: item.brandName,
                    description: item.brandDescription
                      ? item.brandDescription
                      : item.brandShortDescription,
                    webLink: `brand-and-restaurants/${item.brandSlug}?brandId=${
                      item._id
                    }`,
                  }}
                  subHeader={item.city}
                  imgSrc={
                    Array.isArray(item.brandImages)
                      ? item.brandImages[0]
                      : item.brandImage
                  }
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectHome(),
  // foodType: selectGlobelStoreByKey('foodType'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  foodType: selectGlobelStoreByKey('foodType'),
});


export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMetaListings,
      addItemToCart,

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
)(ViewMore);