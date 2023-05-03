import React, { memo, useEffect, useState } from 'react';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import OwlCarousel from 'react-owl-carousel2';
import { addItemToCart } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { addItemToCart, fetchCart } from '../../../HomePage/actions';
import ProductCard from '../ProductCard';
import CommonHeading from '../CommonHeading';
import { getMetaListings, fetchCart } from '../../actions';
import { makeSelectHome } from '../../selectors';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import { ImageCardWithTitleBtn } from '../../../../components';
import placeholderImg from '../../../../images/placeholder-img.png';
import { updateGlobelStoreByKeyVal } from '../../../App/actions';
import JMRSlider from '../../../../components/JMRSlider/index';
import LoadingIndicator  from '../../../../components/LoadingIndicator';
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '35px auto 50px',
    width: '100%',
    overflow: 'hidden',
    padding: 11,
    [theme.breakpoints.down('sm')]: {
      margin: '30px auto 20px',
      marginBottom: '1px',
    },
  },
  hiddenCard: {
    display: 'none',
  },
  rawItems: {
    display: 'flex',
    justifyContent: 'space-between',
    // paddingBottom: 20,
    flexFlow: 'wrap',
    //border: '1px solid red',
    [theme.breakpoints.down('sm')]: {
      display: 'block', 
      // paddingTop: 15,
    }
  }
}));
const CustomGridOrSlider = props =>
  props.grid ? (
    <Grid spacing={3} {...props}>
      <Box mx={3} my={3}>
        {' '}
        {props.children}
      </Box>
    </Grid>
  ) : (
    <React.Fragment>{props.children}</React.Fragment>
  );
const TrendingDishes = ({
  metaKey,
  location,
  getMetaListings,
  fetchCart,
  addItemToCart,
  updateGlobelStoreByKeyVal,
  authData,
  data,
  foodType,
  restro,
  heading,
  deliveryInLoc,
  kaleidoscope,
  handleViewMore,
  brandDetails,
  sliderShow = true,
  ...rest
}) => {
  const classes = useStyles({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [kaleidoscopeData, setKaleidoscopeData] = useState([]);
  const [loading, setLoading] = useState(false);

  // setTimeout(() => {
  //   setLoading(false)
  // },2000)

  useEffect(() => {
    // getMetaListings(metaKey);
    console.log(metaKey)
    getMetaListings({
      keyword: metaKey === 'offer' ? 'type' : 'keyword',
      key: metaKey,
    });
  }, [location, metaKey, foodType, deliveryInLoc]);

  useEffect(() => {
    setLoading(true)
    if (data && data[metaKey] && kaleidoscope) {
      const temp = [
        ...data[metaKey].brands.map(b => ({ ...b, isbrand: true })),
        ...data[metaKey].items.map(b => ({ ...b, isbrand: false })),
      ];
      setKaleidoscopeData(temp);
      setLoading(false)
    } else {
      setKaleidoscopeData([]);
      setLoading(false)
    }  ;
  }, [data, metaKey, location, foodType, kaleidoscope, deliveryInLoc]);

  const handleSaveFavorite = _ => {
    fetchCart(); 
  };

  const options = {
    responsive: {
      0: {
        items: metaKey === 'offer' ? 1.4 : 1.4,
        nav: false,
      },
      450: {
        items: metaKey === 'offer' ? 1.4 : 2.4,
        nav: false,
      },
      600: {
        items: metaKey === 'offer' ? 1 : 3,
        nav: false,
      },
      1000: {
        items: metaKey === 'offer' ? 2 : 4,
      },
    },
  };

  const _renderUi = () =>
    metaKey === 'offer'
      ? 
      data[metaKey] &&
        data[metaKey].length > 0 ?
        data[metaKey]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, index) => (
            <React.Fragment key={index}>
              <ImageCardWithTitleBtn
                productData={{
                  name: item.name,
                  webLink: `offers/${item.name}`,
                }}
                imgSrc={item.metaLogo || placeholderImg}
                offerCard
                subHeader={item.longDescription ? item.longDescription:''}
              />
            </React.Fragment>
          ))
      : <Skeleton variant="rectangular" width={210} height={118} /> : kaleidoscope
        ? kaleidoscopeData.length > 0 &&
        kaleidoscopeData
          .filter(a => foodType.indexOf(a.itemType) >= 0)
            .sort((a, b) => a.itemName.localeCompare(b.itemName))
          .map((item, index) =>
            item.isbrand ? (
              <Grid item xs={12} md={4} key={index}>
                <ImageCardWithTitleBtn
                  productData={{
                    name: item.brandName,
                    description: item.brandDescription
                      ? item.brandDescription
                      : item.brandShortDescription,
                    webLink: `item/${item.brand.brandSlug}/${item.slug}?brandId=${
                      item.brand._id
                    }&itemId=${item._id}`,
                  }}
                  subHeader={item.city}
                  imgSrc={
                    Array.isArray(item.brandImages)
                      ? item.brandImages[0]
                      : item.brandImage
                  }
                />
              </Grid>
            ) : (
              <CustomGridOrSlider grid={!sliderShow} xs={12} md={3}>
                <ProductCard
                  productData={{
                    name: item.itemName,
                    brand: item.brand.brandName,
                    city: item.location.locationName,
                    type: item.itemType,
                    discount: item.discount,
                    ratings: '',
                    price: item.sellingPrice,
                    UOM: item.UOM,
                    itemId: item._id,
                    webLink: `item/${item.brand.brandSlug}/${
                      item.slug
                    }?brandId=${item.brand._id}&itemId=${item._id}`,
                  }}
                  imgSrc={item.itemImage}
                  addItemToCart={addItemToCart}
                />
              </CustomGridOrSlider>
            ),
          )
        : !restro
          ? data[metaKey].items
            .filter(type => foodType.indexOf(type.itemType) >= 0)
            //   .sort((a, b) => {
                
            //   if (a.priority === b.priority) {
            //       return a.itemName.localeCompare(b.itemName);
            //   }
            //     return parseInt(b.priority) - parseInt(a.priority);
            // })
            .map((item, index) => (
              <CustomGridOrSlider key={index} grid={!sliderShow} xs={12} md={3}>
                <ProductCard
                  productData={{
                    name: item.itemName,
                    brand: item.brand.brandName,
                    city: item.location.locationName,
                    type: item.itemType,
                    ratings: item.ratings,
                    price: item.sellingPrice,
                    discount: item.discount,
                    UOM: item.UOM,
                    webLink: `item/${item.brand.brandSlug}/${item.slug}?brandId=${
                      item.brand._id
                    }&itemId=${item._id}`,
                    itemId: item._id,
                    brandId: item.brand._id,
                    quantity:item.quantity
                  }}
                  isFavorite={
                    item && item.isFavourite && item.isFavourite.isFavourite
                  }
                  saveFavorite={handleSaveFavorite}
                  imgSrc={item.itemImage}
                  addItemToCart={addItemToCart}

                />
              </CustomGridOrSlider>
            ))
          : data[metaKey].brands
            .map((item, index) => (
              <CustomGridOrSlider grid={!sliderShow} xs={12} md={3}>
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
              </CustomGridOrSlider>
            ));
  return (
  data &&
    data[metaKey] && (
      <div>
       {/* {loading && <LoadingIndicator/>} */}
      <div className={classes.appWrapper}>
        <CommonHeading
          heading={
            heading ||
            (data[metaKey] && data[metaKey].name.split('-').join(' '))
          }
          handleViewMore={handleViewMore}
          {...rest}
        />
        <div className={classes.rawItems}>
          
        <Grid container spacing={4}>
         {
              window.location.href.includes('rest') || window.location.href.includes('eater')|| window.location.href.includes('Brands') ? kaleidoscopeData
              .sort((a, b) => a.brandName.localeCompare(b.brandName))
              .map((item, index) => 
                  <>
                  <Grid item xs={12} md={3}>
                  <Box my={3}>
                <ImageCardWithTitleBtn
                  productData={{
                    name: item.brandName,
                    description: item.brandDescription
                      ? item.brandDescription
                      : item.brandShortDescription,
                    webLink: `brand-and-restaurants/${item.brandSlug}/${metaKey}?brandId=${
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
              </Box>
              </Grid>
                  </> 
                ) : ""
              }
              </Grid>
              </div>
              <div className={classes.rawItems}>
              <Grid container spacing={4}>
              {
            //raw and fresh
              window.location.href.includes('raw') ? kaleidoscopeData
              .sort((a, b) => a.itemName.localeCompare(b.itemName))
              .map((item, index) => 
                  <>
                  <Grid item md={3} className={classes.hiddenCard}>
                    <Box>
                    <ProductCard
                    productData={{
                      name: item.itemName,
                      brand: item.brand.brandName,
                      city: item.location.locationName,
                      type: item.itemType,
                      ratings: item.ratings,
                      price: item.sellingPrice,
                      discount: item.discount,
                      UOM: item.UOM,
                      webLink: `item/${item.brand.brandSlug}/${item.slug}?brandId=${
                        item.brand._id
                      }&itemId=${item._id}`,
                      itemId: item._id,
                      brandId: item.brand._id,
                    }}
                    isFavorite={
                      item && item.isFavourite && item.isFavourite.isFavourite
                    }
                    saveFavorite={handleSaveFavorite}
                    imgSrc={item.itemImage}
                    addItemToCart={addItemToCart}
                  />
                </Box>
              </Grid>
                  </> 
                ) : ""
              }
               </Grid>
              </div>
        <>
         {sliderShow ? (
            <JMRSlider sliderOptions={{ ...options }}>{_renderUi()}</JMRSlider>
          ) : (
            <>
            {loading && <LoadingIndicator/>}
            <Grid container spacing={3}>
              { _renderUi() }             
            </Grid>           
            
            </>
          )}
        </>
      </div>
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectHome(),
  foodType: selectGlobelStoreByKey('foodType'),
  authData: selectGlobelStoreByKey('userDetails'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMetaListings,
      fetchCart,
      updateGlobelStoreByKeyVal,
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
)(TrendingDishes);