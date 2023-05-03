/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, Fragment, useState, memo } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, Box, Typography, Grid } from '@material-ui/core';

import { Route, Switch, withRouter } from 'react-router-dom';
// import { BestOfPlaces } from 'components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import reducer from './reducer';
import { Link } from 'react-router-dom';
import saga from './saga';
import { TrendingDishes } from '../HomePage/Components';
import { makeSelectHome, selectStoreByKey } from '../HomePage/selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import { getMetaListings } from '../HomePage/actions';
import { ImageCardWithTitleBtn, JMRActiveLocation } from '../../components';
import { HeroRestaurant } from '../Restaurants/Components';
import { PlaceholderImg } from '../../images/placeholder-img.png';
import { checkImageURL } from '../../utils/utils';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '0px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
  appWrapper2: {
    maxWidth: 1064,
    margin: '40px auto 45px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      margin: 0,
    },
    '& .owl-carousel': {
      '& .owl-stage': {
        display: 'flex',
        alignItems: 'stretch',
        '& .owl-item': {
          height: 'unset',
        },
      },
      '& .owl-dots .owl-dot span': {
        width: 49,
        height: '2.58px',
        background: '#22314A',
        opacity: 0.5,
      },
      '& .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span': {
        background: '#22314A',
        opacity: 1,
      },
    },
  },
  cardContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  cards: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px 20px !important',
    },
  },
  readMore: {
    color: '#AC1715',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 16,
  },
  longDesc: {
    textAlign: 'justify',
    fontWeight: 400,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: '1.3',
    color: '#666666',
  },
  sliderImg: {
    borderRadius: 8,
  },
}));

const key = 'cityPage';


const Cities = ({ deliveryInLoc, getMetaListings, foodType, data, cities }) => {
  useInjectReducer({ key, reducer });
  const classes = useStyles();
  useInjectSaga({ key, saga });
  const [readMore, setReadMore] = useState(false);
  const [brandDetails, setBrandDetails] = useState();
  const [cityCatDetails, setCityCatDetails] = useState();

  const locArr = window.location.pathname.split('/');
  const cityKey =
    locArr.indexOf('cities') > 0 && locArr.length === 3
      ? locArr.pop().replaceAll('-', '')
      : undefined;

  const cityCatKey =
    locArr.indexOf('cities') > 0 && locArr.length === 4
      ? locArr.pop()
      : undefined;

  useEffect(() => {
    const typeKey = cityKey;
    typeKey && getMetaListings({ keyword: 'type', key: typeKey });
  }, [cityCatKey, foodType, cityKey]);

  const detailsData =
    cityKey &&
    cities &&
    cities.filter(
      cat =>
        cat.name && cat.name.toLowerCase() === cityKey.split('kaleidoscope')[0],
    )[0];

  useEffect(() => {
    if (detailsData) {
      setBrandDetails({
        brandName: detailsData.name.split('-').join(' '),
        brandShortDescription: detailsData.descriptionLong,
        brandLongDescription: '',
        brandImages: [detailsData.imageUrls] || [],
      });
    }
  }, [detailsData]);

  const cityCatDetailsData = cityCatKey && data[cityCatKey];

  useEffect(() => {
    if (cityCatDetailsData) {
      setCityCatDetails({
        brandName: cityCatDetailsData.name.split('-').join(' '),
        brandShortDescription: cityCatDetailsData.description,
        brandLongDescription: '',
        brandImages: [cityCatDetailsData.metaLogo] || [''],
      });
    }
  }, [cityCatDetailsData]);

  useEffect(() => {
    // fetchCities();
  }, []);

  // useEffect(() => {
  //   if (cities && cities.length) {
  //     setSelectedCity(cities[0].name);
  //     setCityData(cities[0]);
  //     setSelectedCityId(cities[0]._id);
  //     fetchCityItems(cities[0]._id);
  //   }
  // }, [cities]);

  // const places = cities && cities.length && cities.map(c => c.name);

  // const changeCity = city => {
  //   setSelectedCity(city);
  //   const cityDetails = cities.find(
  //     c => c.name.toLowerCase() === city.toLowerCase(),
  //   );
  //   setCityData(cityDetails);
  //   setSelectedCityId(cityDetails._id);
  //   fetchCityItems(cityDetails._id);
  // };

  // //console.log(">>>>",cityKey.split('kaleidoscope')[0])


let x = window.matchMedia("(max-width: 700px)")
const toggleReadMore = () => {
  setReadMore(!readMore);
};
  return (
    <div className={classes.appWrapper}>
      <Helmet titleTemplate="JMR" defaultTitle="Online Food Delivery to 31 Indian Cities - Justmyroots" defaultDescription=" JustMyRoots let's registered restaurants list their menu on the website and deliver to 30 cities in India.">
      </Helmet>

      <Switch>
        <Route
          exact
          path="/cities"
          render={() => <JMRActiveLocation backtoRoots />}
        />
        <Route
          exact
          path="/cities/:cityKey"
          render={() => (
            <Fragment>
              {brandDetails && (
                <div className={classes.appWrapper2}>
                  <Grid
                    className={classes.cardContainer}
                    container
                    item
                    spacing={10}
                    justifyContent="flex-start"
                    alignItems="start"
                  >
                    <Grid xs={12} md={6} item className={classes.cards}>
                      <Typography className={classes.title}>
                        {brandDetails.brandName}
                      </Typography>
                      <Typography className={classes.longDesc}>
                      {brandDetails.brandShortDescription && (
                          <>
                            {brandDetails.brandShortDescription &&
                              brandDetails.brandShortDescription.length > 650 &&
                              (!readMore ? (
                                <>
                                  {brandDetails.brandShortDescription.slice(0, 650)}
                                  <Link
                                    className={classes.readMore}
                                    onClick={toggleReadMore}
                                  >
                                     Read More
                                  </Link>
                                </>
                              ) : (
                                <>
                                  {brandDetails.brandShortDescription}
                                  <Link
                                    className={classes.readMore}
                                    onClick={toggleReadMore}
                                  >
                                     Read Less
                                  </Link>
                                </>
                              ))}
                            {brandDetails.brandShortDescription && brandDetails.brandShortDescription.length < 650 && (
                              <>{brandDetails.brandShortDescription}</>
                            )}
                          </>
                        )}
                        {/* {brandDetails.brandShortDescription} */}
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6} item style={{ padding: 0 }}>
                      {brandDetails.brandImages && (
                        <OwlCarousel
                          options={{
                            margin: 10,
                            nav: false,
                            items: 1,
                            dots: true,
                            autoHeight: false,
                            autoplay: true,
                            // loop: true,
                            responsiveRefreshRate: 80,
                            responsive: {},
                          }}
                        >
                          {brandDetails.brandImages[0].map((i, index) => (
                            <Grid item key={i}>
                              <img
                                alt="City Image"
                                src={i}
                                className={classes.sliderImg}
                              />
                            </Grid>
                          ))}
                        </OwlCarousel>
                      )}
                    </Grid>
                  </Grid>
                </div>
              )}
              {cityKey && (
                <Typography
                  variant="h1"
                  align="center"
                  className={classes.title}
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    marginBottom: 16,
                    textTransform: 'uppercase',
                  }}
                >
                  {`${
                    cityKey
                      .split('%20')
                      .join(' ')
                      .split('kaleidoscope')[0]
                  } kaleidoscope`}
                </Typography>
              )}
              <Box
                display="grid"
                gridTemplateColumns={x.matches ? '1fr' : '1fr 1fr 1fr 1fr '}
                gridGap="30px"
                px={5}
                my={10}
              >
                {data &&
                  data[cityKey] &&
                  data[cityKey].length > 0 &&
                  data[cityKey].map(i => (
                    <ImageCardWithTitleBtn
                      imgSrc={i.metaLogo || 'https://i.ibb.co/0FTjTZs/placeholder-img.png'}
                      subHeader={i.city}
                      productData={{
                        name: i.name
                          .split(' ')
                          .slice(0, 2)
                          .join(' ')
                          .replaceAll('-', ' '),
                        webLink: `cities/${cityKey}/${i.name.replaceAll(
                          '_',
                          '-',
                        )}`,
                      }}
                    />
                  ))}
              </Box>
            </Fragment>
          )}
        />
        <Route
          exact
          path="/cities/:cityKey/:metaKey"
          render={() => (
            <Fragment>
              {cityCatDetails && (
                <HeroRestaurant brandDetails={cityCatDetails} />
              )}
              <TrendingDishes
                metaKey={cityCatKey}
                key={cityCatKey}
                location={deliveryInLoc}
                kaleidoscope
                sliderShow={false}
                viewmore
              />
            </Fragment>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cities: selectStoreByKey('cities'),
  // cityItems: makeSelectKey('cityItems'),
  data: makeSelectHome(),
  foodType: selectGlobelStoreByKey('foodType'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // fetchCities,
      // fetchCityItems,
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
)(Cities);
