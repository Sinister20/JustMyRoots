import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { checkImageURL } from '../../utils/utils';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import Slider from 'react-slick';
import '../SLICK/slick.min.css';
import '../SLICK/slick-theme.min.css';
import { ImageCardWithTitleBtn } from '../index';
import CommonHeading from '../../containers/HomePage/Components/CommonHeading';
import { TrendingDishes } from '../../containers/HomePage/Components';
import { getMetaListings } from '../../containers/HomePage/actions';
import {
  makeSelectHome,
  selectStoreByKey,
} from '../../containers/HomePage/selectors';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { PlaceholderImg } from '../../images/placeholder-img.png';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '20px auto 0',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  cityWrapper: {
    borderBottom: '1px solid #A3080C',
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
    },
  },
  appWrapper2: {
    maxWidth: 1064,
    margin: '40px auto 45px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      margin: 0,
      touchAction:'manipulation',

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
  cards: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px 20px !important',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 16,
  },
  SlickCarousel: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    },
    '& .slick-list': {
      margin: '0 80px',
      height: 50,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        margin: '0 40px',
      },
    },
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    '& .slick-initialized .slick-slide': {
      '& .slick-current-active': {
        background: theme.palette.primary.main,
        color: '#fff',
        padding: '5px 20px',
        borderRadius: '5px',
        fontSize: '13px',
        [theme.breakpoints.down('sm')]: {
          padding: '5px 10px',
        },
      },
      textAlign: 'center',
      margin: '0px 10px',
      minWidth: 130,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        minWidth: 90,
      },
    },
    '& .slick-prev': {
      height: 48,
      width: 48,
      left: 'unset',
      zIndex: 99,
      '&:before': {
        content: 'unset',
      },
      '& svg': {
        height: 48,
        width: 48,
        [theme.breakpoints.down('sm')]: {
          height: 25,
          width: 25,
        },
      },
      [theme.breakpoints.down('sm')]: {
        height: 25,
        width: 25,
      },
    },
    '& .slick-next': {
      height: 48,
      width: 48,
      right: 0,
      zIndex: 99,
      '&:before': {
        content: 'unset',
      },
      '& svg': {
        height: 48,
        width: 48,
        [theme.breakpoints.down('sm')]: {
          height: 25,
          width: 25,
        },
      },
      [theme.breakpoints.down('sm')]: {
        height: 25,
        width: 25,
      },
    },
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 5px',
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
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
    '& .owl-nav.disabled': {
      display: 'flex !important',
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },

    },
  },
  cardContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  btnContainer: {
    padding: '0 35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '22px 0',
    '& button': {
      height: 22,
      fontSize: 13,
      fontWeight: 300,
      color: '#333536',
      textTransform: 'capitalize',
    },
  },
  readmore: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 18,
    color: '#AC1715',
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  readMore: {
    color: '#AC1715',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 8
  },
  shortDesc: {
    maxWidth: 290,
    padding: '18px 0',
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: 300,
    width: 290,
    marginTop: -10,
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
    marginTop: '40px',
  },
}));

const BestOfPlaces = props => {
  const {
    changeCity,
    places,
    selectedCity,
    cityData,
    cityItems,
    resto,
    location,
    getMetaListings,
    data,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [readMore, setReadMore] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const offerKey = `${selectedCity.toLowerCase()}kaleidoscope`;
  useEffect(() => {
    getMetaListings({ keyword: 'type', key: offerKey });
  }, [location, selectedCity]);

  const options = {
    margin: 10,
    nav: false,
    items: 1,
    dots: true,
    autoHeight: false,
    autoplay: true,
    loop: true,
    responsiveRefreshRate: 80,
    responsive: {
      
    },
  };

  // const [isReadMore, setIsReadMore] = useState(true);
  const itemx = window.matchMedia('(max-width: 700px)');
  const slider = {
    margin: 0,
    nav: true,
    dots: false,
    autoplay: false,
    loop: false,
    responsiveRefreshRate: 80,
    items: itemx.matches ? 2 : 4,
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
        items: 1.4,
        nav: false,
        center:true,
      },
      450: {
        items: 1.4,
        nav: false,
      },
      600: {
        items: 2.4,
        nav: false,
      },
      1000: {
        items: 4,
      },
    },
  };
  const cities = {
    dots: false,
    focusOnSelect: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide:true,

    variableWidth: true,
    prevArrow: (
      <div className="prev-slide">
        <svg viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="23.6456"
            cy="24.6417"
            r="23.6474"
            transform="rotate(-180 23.6456 24.6417)"
            fill="#D0D0D0"
          />
          <path
            d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="next-slide">
        <svg viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0" />
          <path
            d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
  };
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <Fragment>
       {/* <Helmet titleTemplate="JMR" defaultTitle="Best Restaurants and Brands For Online Food Delivery - Justmyroots
">
        <meta name="description" content="Expand yjmr our restaurant and brand business quickly at the best lowest cost with Justmyroots. Know more about Online food delivery." />
      </Helmet> */}
      <div className={classes.cityWrapper}>
        <CommonHeading
          heading={[
            resto ? <h3>RESTAURANT/BRAND</h3> : <h3>CITY SPECIALITIES</h3>,
          ]}
          viewmore
        />

      </div>
      <div className={classes.appWrapper}>
        <div>
          {places && (
            <Grid item container>
              <div className={classes.SlickCarousel}>
                <Slider {...cities}>
                  {/* <div
                    onClick={() => {
                      changeCity('All India Locations');
                    }}
                    onKeyPress={() => {}}
                    role="button"
                    // tabIndex="-1"
                    style={{ width: 'auto' }}
                    className={
                      selectedCity === 'All India Locations'
                        ? 'slick-current-active'
                        : ''
                    }
                  >
                    All India Locations
                  </div> */}
                  {places
                    .sort((a, b) => a.localeCompare(b))
                    .map(
                      (p, i) =>
                        p !== 'All India Locations' && (
                          <div
                            onClick={() => {
                              changeCity(p);
                            }}
                            key={i}
                            onKeyPress={() => {}}
                            role="button"
                            // tabIndex="-1"
                            style={{ width: 'auto' }}
                            className={
                              p === selectedCity ? 'slick-current-active' : ''
                            }
                          >
                            {p && p.startsWith('Chandigarh')
                              ? p.split(' ')[0]
                              : p[0].toUpperCase() + p.substring(1)}
                          </div>
                        ),
                    )}
                </Slider>
              </div>
            </Grid>
          )}
        </div>
        {!resto && (
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
                <Typography variant="h3" className={classes.title}>
                  {cityData &&  cityData.name.toUpperCase()}
                </Typography>
                {/* <Typography className={classes.longDesc}>
                  {cityData.descriptionLong}
                </Typography> */}
                {/* <Typography className={classes.longDesc}>
                  {isReadMore && cityData.descriptionLong
                    ? (cityData.descriptionLong || []).slice(0, 50)
                    : cityData.descriptionLong}

                  {cityData.descriptionLong &&
                  cityData.descriptionLong.length >= 50 ? (
                    <Link className={classes.readmore} onClick={toggleReadMore}>
                      {isReadMore ? ' Read' : ' Less'}
                    </Link>
                  ) : (
                    ''
                  )}
                </Typography> */}
                <Typography className={classes.longDesc}>
                      {cityData.descriptionLong && (
                          <>
                            {cityData.descriptionLong &&
                              cityData.descriptionLong.length > 650 &&
                              (!readMore ? (
                                <>
                                  {cityData.descriptionLong.slice(0, 650)}
                                  <Link
                                    className={classes.readMore}
                                    onClick={toggleReadMore}
                                  >
                                     Read More
                                  </Link>
                                </>
                              ) : (
                                <>
                                  {cityData.descriptionLong}
                                  <Link
                                    className={classes.readMore}
                                    onClick={toggleReadMore}
                                  >
                                     Read Less
                                  </Link>
                                </>
                              ))}
                            {cityData.descriptionLong && cityData.descriptionLong.length < 650 && (
                              <>{cityData.descriptionLong}</>
                            )}
                          </>
                        )}
                        {/* {brandDetails.brandShortDescription} */}
                      </Typography>
                {/* <Link className={classes.readmore}>...Read</Link> */}
              </Grid>
              <Grid
                xs={12}
                md={6}
                item
                style={{ padding: isMobile ? 20 : '0px 32px' }}
              >
                {cityData && (
                  <OwlCarousel options={options}>
                    {cityData.imageUrls.map((i, index) => (
                      <Grid key={index} item>
                        <img
                          alt="image"
                          src={i || PlaceholderImg}
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
        {resto ? (
          <Box
            display="grid"
            gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr 1fr 1fr'}
            gridGap={isMobile ? '15px' : '30px'}
            px={5}
            my={isMobile ? 5 : 10}
          >
            {cityItems &&
              cityItems.items &&
              cityItems.items.sort().map((i, index) => (
                <ImageCardWithTitleBtn
                  key={index}
                  imgSrc={checkImageURL(i.imageUrl)}
                  subHeader={i.city}
                  productData={
                    {
                      ...i,
                      webLink:`brand-and-restaurants/${i.brandSlug}?brandId=${i._id}`,
                    
                    }

                  }
                  homecard
                />
              ))}
          </Box>
        ) : (
          <div className={classes.appWrapper}>
            <CommonHeading heading={`${selectedCity} kaleidoscope`} viewmore />
            <div className={classes.OwlCarousel}>
              {data && data[offerKey] && data[offerKey].length > 0 && (
                <OwlCarousel options={slider}>
                  {data[offerKey].map((i, key) => (
                    <React.Fragment key={key}>
                      <ImageCardWithTitleBtn
                        imgSrc={checkImageURL(i.metaLogo)}
                        subHeader={i.city}
                        productData={{
                          name: i.name.startsWith('raw') 
                          ? i.name.split('-')[0]+' ' +i.name.split('-')[1]+' ' + i.name.split('-')[2]+' '  : i.name.split('-')[0]+' ' +i.name.split('-')[1],
                          webLink: `cities/${
                            offerKey.split('kaleidoscope')[0]
                          }-kaleidoscope/${i.name}`,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectHome(),
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
)(BestOfPlaces);
