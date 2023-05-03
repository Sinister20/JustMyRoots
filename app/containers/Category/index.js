import React, { Fragment, useState, memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
  makeStyles,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonHeading from '../HomePage/Components/CommonHeading';
import { getMetaListings } from '../HomePage/actions';
import { selectGlobelStoreByKey } from '../App/selectors';
import { ImageCardWithTitleBtn } from '../../components';
import { selectStoreByKey } from '../HomePage/selectors';
import { TrendingDishes } from '../HomePage/Components';
import { HeroRestaurant } from '../Restaurants/Components';
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

const Category = ({
  metaKey = 'category',
  location,
  getMetaListings,
  foodType,
  categories,
  deliveryInLoc,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [brandDetails, setBrandDetails] = useState();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    getMetaListings({ keyword: 'type', key: metaKey });
    // setLoading(false);
  }, [location, metaKey, foodType]);

  const categoryKey = window.location.pathname.split('/').pop();
  const detailsData =
    categories && categories.filter(cat => cat.name === categoryKey)[0];

  useEffect(() => {
    if (detailsData) {
      setBrandDetails({
        brandName: detailsData.name.split('_').join(' '),
        brandShortDescription: detailsData.description,
        brandLongDescription: '',
        brandImages: [detailsData.metaLogo],
      });
      setLoading(false);
    }
  }, [detailsData]);

  const CategoryParent = () => (
    <Container>
      <CommonHeading heading="CATEGORY" viewmore />
      <Box my={5}>
        <Grid container spacing={6}>
          {categories  ? categories &&
            categories.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ImageCardWithTitleBtn
                  productData={{
                    name: item.name.split('-').join(' '),
                    webLink: `category/${item.name}`,
                  }}
                  imgSrc={checkImageURL(item.metaLogo)}
                />
              </Grid>
            )) : <LoadingIndicator /> }
        </Grid>
      </Box>
      {/* {isloading && <LoadingIndicator />} */}
    </Container>
  );

  return (
    <div>
      <Helmet titleTemplate="JMR" defaultTitle=" Order online from different food categories in India - Justmyroots">
        <meta name="description" content=" Order Food Online from restaurants by category and get it delivered. Check prices, order and get it delivered." />
      </Helmet>
      <Switch>
        <Route exact path="/category" component={CategoryParent} />
        <Route
          exact
          path="/category/:categoryKey"
          render={() => (
            <Fragment>
              { brandDetails ? brandDetails && <HeroRestaurant brandDetails={brandDetails} /> : <LoadingIndicator />}
              <div className={classes.cuisineMain}>
          <div className={classes.itemLoader}> <LoadingIndicator /></div>
            <div className={classes.cuisineItems}>
              <TrendingDishes
                metaKey={categoryKey}
                key={categoryKey}
                location={deliveryInLoc}
                heading={categoryKey.split('-').join(' ')}
                sliderShow={false}
                viewmore
                brandDetails
              />
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
  categories: selectStoreByKey('category'),
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
)(Category);
