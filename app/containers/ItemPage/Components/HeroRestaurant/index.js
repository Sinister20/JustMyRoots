import React, { useState } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { Link } from 'react-router-dom';
import brandImg from '../../../../images/brandImg.jpg';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '50px auto 40px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  title: {
    marginBottom: 50,
  },
  brandDesc: {
    marginTop: 20,
    fontSize: 22,
    color: '#8A8888',
  },
  ratingContr: {
    maxWidth: 290,
    fontSize: 14,
    textAlign: 'justify',
    fontWeight: 300,
    width: 290,
    color: '#333536',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    rowGap: 20,
    marginTop: 10,
  },
  brandLink: {
    fontSize: 16,
    fontWeight: 700,
    color: '#AC1715',
    textDecoration: 'none',
    marginLeft: 5,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  brandImg: {
    paddingRight: 60,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingBottom: 25,
    },
  },
}));

const HeroRestaurant = props => {
  const classes = useStyles();
  const [readMore, setReadMore] = useState(false);
  const {
    brandDetails: {
      brandName,
      brandShortDescription,
      brandLongDescription,
      brandImages = [],
      brandCity,
      ratings,
    },
  } = props;

  const options = {
    margin: 10,
    nav: false,
    items: 1,
    dots: true,
    autoHeight: false,
    autoplay: true,
    loop: true,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    responsiveRefreshRate: 80,
    responsive: {
      0: {
        items: 1.5,
      },
      450: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <div className={classes.appWrapper}>
      <Typography variant="h1" align="center" className={classes.title}>
        RESTAURANT/BRAND
      </Typography>
      <Grid container item>
        <Grid
          item
          xs={12}
          md={6}
          sm={6}
          justifyContent="center"
          alignItems="center"
          className={classes.brandImg}
        >
          {/* <OwlCarousel options={options} >
                        {brandImages.map((el) => <Grid key={el} item >
                            <img alt="" src={el} />
                        </Grid>
                        )}
                    </OwlCarousel> */}
          <img src={brandImg} height="100%" width="100%" />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <Typography variant="h3" className={classes.brandName}>
            <b>{brandName}</b>
          </Typography>
          <Typography component="div" className={classes.brandDesc}>
            {readMore ? brandLongDescription : brandShortDescription}
          </Typography>
          <Link
            onClick={() => setReadMore(!readMore)}
            className={classes.brandLink}
          >
            {`...Read ${!readMore ? 'More' : 'Less'}`}
          </Link>
          {/* <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 10 }}>
                        {brandCity}
                    </Typography> */}
          {/* <Typography variant="caption" component="div" className={classes.ratingContr} >
                        <span>Customer Ratings</span> &nbsp;&nbsp;
                        <Rating
                            style={{ color: '#B69C72' }}
                            name="simple-controlled"
                            value={ratings}
                        />
                    </Typography> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default HeroRestaurant;
