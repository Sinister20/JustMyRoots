import React, { Fragment, useState, memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import { makeStyles, Box, useTheme, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import CommonHeading from '../HomePage/Components/CommonHeading';
import { getMetaListings } from '../HomePage/actions';
import { selectGlobelStoreByKey } from '../App/selectors';
import { ImageCardWithTitleBtn } from '../../components';
import { selectStoreByKey } from '../HomePage/selectors';
import { TrendingDishes } from '../HomePage/Components';
import { HeroRestaurant } from '../Restaurants/Components';
import { PlaceholderImg } from '../../images/placeholder-img.png';
import { checkImageURL } from '../../utils/utils';
import LoadingIndicator from '../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '35px auto 50px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  cuisinesBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '30px',
    padding: 8,
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
  cuisineMain: {
    position: 'relative',
    minHeight: '220px',
  },
  itemLoader: {
    position: 'absolute',
    top: '20px',
    width: '100%',
    zIndex: '-1',
  },
  cuisineItems: {
    zIndex: '9',
    background: '#fff',
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

const Cuisine = ({
  metaKey = 'cuisine',
  location,
  getMetaListings,
  foodType,
  cuisines,
  deliveryInLoc,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [brandDetails, setBrandDetails] = useState();
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    getMetaListings({ keyword: 'type', key: metaKey });
  }, [location, metaKey, foodType,deliveryInLoc]);

  const cuisineKey = window.location.pathname.split('/').pop();

  const detailsData =
    cuisines && cuisines.filter(cat => cat.name === cuisineKey)[0];
  useEffect(() => {
    if (detailsData) {
      setBrandDetails({
        brandName: detailsData.name.split('_').join(' '),
        brandShortDescription: detailsData.description,
        brandLongDescription: detailsData.description,
        brandImages: [detailsData.metaLogo],
      });
    }
  }, [detailsData,deliveryInLoc]);

  // console.log('>>', detailsData);

  const CuisineParent = () => (
    <div className={classes.appWrapper}>
      <CommonHeading heading="CUISINE" viewmore />
      <Box my={5} className={classes.cuisinesBox} >
        {cuisines ? cuisines && 
          cuisines.length > 0 &&
          cuisines
            .sort((a, b) => {})
            .map((item, index) => (
              <ImageCardWithTitleBtn
                productData={{
                  name: item.name.split('-').join(' '),
                  webLink: `cuisine/${item.name}`,
                }}
                imgSrc={checkImageURL(item.metaLogo)}
                key={index}
              />
            )) : <Box style={{position:'relative',  minHeight:'80px'}}>  <Box style={{position:'absolute', left:'210%'}}> <LoadingIndicator /></Box></Box> }
      </Box>
      {/* {isloading && <LoadingIndicator />} */}
    </div>
  );

  return (
    <div>
      <Helmet titleTemplate="JMR" defaultTitle="Choose your Cuisine & Order Food- Justmyroots ">
        <meta name="description" content=" JustMyRoots lets you order from popular cuisines. Select a cuisine to find popular dishes & restaurants. " />
      </Helmet>
      <Switch>
        <Route exact path="/cuisine" component={CuisineParent} />
        <Route
          exact
          path="/cuisine/:cuisineName"
          render={() => (
            <Fragment>
              {console.log('>>', brandDetails)}
              {brandDetails ? brandDetails && <HeroRestaurant brandDetails={brandDetails} /> : <LoadingIndicator />}
              <div>
           {/* {cuisineKey !== '' ?  <TrendingDishes
                metaKey={cuisineKey}
                key={cuisineKey}
                location={deliveryInLoc}
                heading={cuisineKey.split('_').join(' ')}
                sliderShow={false}
                viewmore
              />  
          } */}
          
         <div className={classes.cuisineMain}>
          <div className={classes.itemLoader}> <LoadingIndicator /></div>
            <div className={classes.cuisineItems}>
            {cuisineKey ? <TrendingDishes
                    metaKey={cuisineKey}
                    key={cuisineKey}
                    location={deliveryInLoc}
                    heading={cuisineKey.split('_').join(' ')}
                    sliderShow={false}
                    viewmore
                  />  : <LoadingIndicator />}
            </div>
          </div>
          </div>
            </Fragment>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cuisines: selectStoreByKey('cuisine'),
  foodType: selectGlobelStoreByKey('foodType'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMetaListings,
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
)(Cuisine);
