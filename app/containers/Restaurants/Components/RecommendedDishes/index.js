import React from 'react';
import { Box, makeStyles, Grid ,Container} from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ProductCard from '../../../HomePage/Components/ProductCard';
import CommonHeading from '../../../HomePage/Components/CommonHeading';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import { fetchCart } from '../../actions';
import { checkImageURL, getItemsSortedByPriorityName } from '../../../../utils/utils';
import { selectRestaurentStoreByKey } from '../../selectors';
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '50px auto 0px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  cardContainer: {
    paddingTop: 40,
    paddingBottom: 40,
    fontSize: 21,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',

    '& > div': {
      flex: '300px 1 0',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 20,
      maxWidth: 369,
      width: '100%',
    },
  },
  hrVer: {
    height: 20,
    background: '#000000',
    margin: 20,
  },
  dishesHeading: {
    '& .MuiTypography-h3': {
      fontSize: 48,
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
  },
  dishcard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '30px',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gap: '15px',
      marginTop: '25px',
      paddingLeft: '25px',
      marginBottom: '25px',
      paddingRight: '25px',
      gridTemplateColumns: '1fr 1fr',
    },
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 9999,
      left: '0px',
      transform: 'translateY(-50%)',
      display: 'flex !important',
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
    '& .owl-item': {
      padding: '20px 15px',
      '&.active:first': {
        paddingLeft: 20,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '20px 10px',
      },
    },
    '& .owl-prev': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .owl-next': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },

    },
  },
}));

const RecommendedDishes = ({ foodType, featureItems=null, addItemToCart }) => {
  const classes = useStyles();
  const options = {
    margin: 0,
    nav: true,
    dots: false,
    autoplay: false,
    loop: false,
    navText: [
      `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
        <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
      `<div class='next-slide'>
        <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
        <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
    ],
    responsive: {
      0: {
        items: 1.6,
        nav: false,
      },
      450: {
        items: 1.6,
        nav: false,
      },
      600: {
        items: 1.6,
        nav: false,
      },
      1000: {
        items: 4,
      },
    },
  };

  //   const brandid = window.location.pathname.split('/');
  // console.log(">>", brandid[2] )

  const handleSaveFavorite = () => {
    fetchCart();
  }
  console.log('>> ewfeds', featureItems);
  return (
    <Container fixed >
      <CommonHeading heading="dishes" viewmore />
      <Grid container spacing={4}>
        {featureItems &&
          featureItems.items && featureItems.items.length > 0 &&
          featureItems.items.filter(type => foodType.indexOf(type.itemType) >= 0)
          && window.location.href.includes('Express-restaurant-Delivery') ?
           featureItems.items.filter(t=>t.expressDel === true)
            .map((p,index) => (
              <Grid key={index} item md={3} xs={12} sm={4} xl={3}>
                <ProductCard
                  productData={{
                    name: p.itemName ? p.itemName : "",
                    brand: p.brandName ? p.brandName : "",
                    city: p.brandCity ? p.brandCity : '',
                    type: p.itemType,
                    ratings: p.ratings,
                    // price: p.sellingPrice-(p.discount ? p.discount : '') ,
                    price: p.sellingPrice,
                    discount: p.discount,
                    UOM: p.UOM ? p.UOM : '',
                    webLink: `item/${p.brandSlug}/${p.slug}?brandId=${p.brandId
                      }&itemId=${p._id}`,
                    itemId: p._id,
                    brandId: p.brandId ? p.brandId : null,
                  }}
                  isFavorite={p && p.isFavourite ? p.isFavourite.isFavourite:null }

                  saveFavorite={() => handleSaveFavorite()}
                  imgSrc={p.productImages.length>0 && p.productImages[0]?p.productImages[0]:null}
                
                  addItemToCart={addItemToCart}
                  />
              </Grid>

            )) : 
            featureItems &&
            featureItems.items && featureItems.items.length > 0 &&
            featureItems.items.filter(type => foodType.indexOf(type.itemType) >= 0)
              .map((p,index) => (
                <Grid key={index} item md={3} xs={12} sm={4} xl={3}>
                  <ProductCard
                    productData={{
                      name: p.itemName ? p.itemName : "",
                      brand: p.brandName ? p.brandName : "",
                      city: p.brandCity ? p.brandCity : '',
                      type: p.itemType,
                      ratings: p.ratings,
                      // price: p.sellingPrice-(p.discount ? p.discount : '') ,
                      price: p.sellingPrice,
                      discount: p.discount,
                      UOM: p.UOM ? p.UOM : '',
                      webLink: `item/${p.brandSlug}/${p.slug}?brandId=${p.brandId
                        }&itemId=${p._id}`,
                      itemId: p._id,
                      brandId: p.brandId ? p.brandId : null,
                    }}
                    isFavorite={p && p.isFavourite ? p.isFavourite.isFavourite:null }
  
                    saveFavorite={() => handleSaveFavorite()}
                    imgSrc={p.productImages.length>0 && p.productImages[0]?p.productImages[0]:null}
                  
                    addItemToCart={addItemToCart}
                    />
                </Grid>
  
              ))
            
            }
            
      </Grid>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  foodType: selectGlobelStoreByKey('foodType'),
  featureItems: selectRestaurentStoreByKey('featureItems'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCart,
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
)(RecommendedDishes);
