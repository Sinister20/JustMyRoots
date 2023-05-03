import React, { useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Hidden,
} from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Ellipse1 from '../../../../images/Ellipse1.png';
import Ellipse2 from '../../../../images/Ellipse5.png';
import Ellipse3 from '../../../../images/Ellipse6.png';
import CommonHeading from '../CommonHeading';

import { getTestimonialListings } from '../../actions';
import { selectStoreByKey } from '../../selectors';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '50px auto 60px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto',
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
    },
    '& .owl-item': {
      padding: '20px 15px',
      '&.active:first': {
        paddingLeft: 20,
      },
    },
    '& .owl-prev': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
      '& svg': {
        width: 48,
        height: 49,
        [theme.breakpoints.down('sm')]: {
          height: 25,
          width: 25,
        },
      },
    },
    '& .owl-next': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
      '& svg': {
        width: 48,
        height: 49,
        [theme.breakpoints.down('sm')]: {
          height: 25,
          width: 25,
        },
      },
    },
    '& .owl-dots .owl-dot span': {
      width: '2.58px',
      height: '2.58px',
      background: '#22314A',
      opacity: 0.5,
    },
    '& .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span': {
      background: '#22314A',
      opacity: 1,
    },
  },
  subTitle: {
    letterSpacing: 5,
    fontWeight: 500,
    textAlign: 'center',
    margin: 0,
    fontSize: 22,
    color: '#AAAAAA',
    marginTop: '-14px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
  cardsMobile: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center !important',
    },
  },
  cardsContianer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    margin: '23px 0 0',
    color: '#FF1313',
  },
  cardCity: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 400,
    margin: '0 0 10px',
    color: '#22314A',
  },
  cardDesc: {
    maxWidth: 880,
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.9,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  cardLink: {
    color: '#FF1313',
    textDecoration: 'none',
  },
  cardImg: {
    width: '15px !important',
    height: 15,
    display: 'inline',
  },
  arrows: {
    fontSize: 75,
    fontWeight: 500,
    color: '#D0D0D0',
    height: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },
  },
}));

const OutTopClients = ({ getTestimonialListings, testimonials }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    getTestimonialListings();
  }, []);

  useEffect(() => {
    // console.log('testimonials', testimonials);
  }, [testimonials]);

  const options = {
    margin: 0,
    nav: true,
    dots: true,
    autoplay: false,
    loop: true,
    navText: [
      `<div class='prev-slide'><svg viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
        <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
      `<div class='next-slide'>
        <svg viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
        <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      450: {
        items: 1,
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
      },
    },
  };

  return testimonials && testimonials.data && testimonials.data.length > 0 ? (
    <div className={classes.appWrapper}>
      <CommonHeading heading="CLIENT SPEAK" viewmore />
      <Typography display="block" component="div" className={classes.subTitle}>
        TESTIMONIALS
      </Typography>
      <div className={classes.OwlCarousel}>
        <OwlCarousel options={options}>
          {testimonials.data.map((feedback, index) => (
            <div key={index} className={classes.cardsContianer}>
              <Box
                display="flex"
                justifyContent="center"
                width={isMobile ? '100%' : '80%'}
                className={classes.cardsMobile}
              >
                {/* <Hidden smDown>
                  <div>
                    <img
                      src={Ellipse2}
                      width="43px"
                      height="43px"
                      alt="user"
                      style={{ borderRadius: '50%', marginTop: 30 }}
                    />
                  </div>
                </Hidden> */}
                <div>
                  <img
                    src={(feedback && feedback.picture) || Ellipse1}
                    width="156px"
                    height="156px"
                    alt="user"
                    style={{
                      borderRadius: '50%',
                      width: '156px',
                      height: '156px',
                    }}
                  />
                </div>
                {/* <Hidden smDown>
                  <div>
                    <img
                      src={Ellipse3}
                      width="43px"
                      height="43px"
                      alt="user"
                      style={{ borderRadius: '50%', marginTop: 30 }}
                    />
                  </div>
                </Hidden> */}
              </Box>
              <Typography
                variant="h3"
                className={classes.cardName}
                component="div"
              >
                {feedback && feedback.name.replace('_', ' ')}
              </Typography>
              <Typography
                variant="h3"
                className={classes.cardCity}
                component="div"
              >
                {feedback && feedback.cityId && feedback.cityId.name}
              </Typography>
              <Typography component="div" className={classes.cardDesc}>
                <span
                  className={classes.arrows}
                  style={{
                    top: isMobile ? '-18px' : '-35px',
                    left: '18px',
                    transform: 'scaleX(-1) translateX(50px)',
                  }}
                >
                  ”
                </span>
                {feedback.feedback && feedback.feedback}
                <span
                  className={classes.arrows}
                  style={{ bottom: isMobile ? '18px' : '48px', right: '-35px' }}
                >
                  ”
                </span>
              </Typography>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  ) : (
    ''
  );
};

const mapStateToProps = createStructuredSelector({
  testimonials: selectStoreByKey('testimonials'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTestimonialListings,
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
)(OutTopClients);
