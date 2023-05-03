import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { placeholderImg } from '../../../../images/placeholder-img.png';
import { checkImageURL } from '../../../../utils/utils';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
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
    fontSize: 18,
    color: '#434343',
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
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
    textTransform:'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      margin: 10,
    },
  },

  readMore: {
    color: '#AC1715',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 16,
  },
  brandImg: {
    paddingRight: 60,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingBottom: 25,
      margin: '10px',
    },

  },

  brandDetail:{
    paddingLeft: 60,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingBottom: 25,
      margin: '10px',
    },
  }
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
    loop: false,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    responsiveRefreshRate: 80,
    // responsive: {
    //   0: {
    //     items: 1.5,
    //   },
    //   450: {
    //     items: 2,
    //   },
    //   600: {
    //     items: 2,
    //   },
    //   1000: {
    //     items: 1,
    //   },
    // },
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div className={classes.appWrapper}>
      <Grid container item>
        <Grid
          item
          md={4}
          sm={4}
          m={7}
          justifyContent="center"
          alignItems="center"
          className={classes.brandImg}
        >
          {brandImages && brandImages.length > 1 ? (
            <OwlCarousel options={options}>
              {brandImages.map((el, i) => (
                <img
                  key={i}
                  alt={el}
                  src={checkImageURL(el)}
                  width="100%"
                  height="270px"
                  style={{ borderRadius: 8 }}
                />
              ))}
            </OwlCarousel>
          ) : (
            
            // <Grid container spacing={4} >
            <Grid item>
              <img
                alt={brandName}
                src={checkImageURL(brandImages[0] ? brandImages[0] : null)}
                width="100%"
                height="270px"
                style={{ borderRadius: 8 }}
              />
                
            </Grid>
           
            
          )}
          {/* <img src={brandImg} height="100%" width="100%" /> */}
        {/* </Grid>
          <Grid item
          md={8}
          sm={6}
          justifyContent="center"
          alignItems="center"
          className={classes.brandDetail}>
            <div className={classes.brandName}>
              {brandName}
            </div>
            <div className={classes.brandDesc}>
              {brandShortDescription}
            </div> */}
          </Grid>
        <Grid item md={8} sm={8}>
          <Typography variant="h2" className={classes.brandName}>
            {window.location.href.includes('kaleidoscope') ? (
              <b>
                {/* {brandName} */}
                { brandName.includes("and") ? brandName[0].toUpperCase() +
                    brandName
                      .substring(1)
                      .split(' ')
                      .slice(0, 3)
                      .join(' ') :  brandName[0].toUpperCase() +
                      brandName
                        .substring(1)
                        .split(' ')
                        .slice(0, 2)
                        .join(' ') }
                {/* {brandName && !brandName.includes("&") &&
                  brandName[0].toUpperCase() +
                    brandName
                      .substring(1)
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')} */}
              </b>
            ) : (
              <b>
                {brandName &&
                  brandName[0].toUpperCase() +
                    brandName.substring(1).replaceAll('-', ' ')}
              </b>
            )}
          </Typography>
          {/* <Typography component="div" className={classes.brandDesc}>
            {readMore ? brandLongDescription : (brandLongDescription || []).slice(0, 350)}
          </Typography> */}
          <Typography component="div" className={classes.brandDesc}>
            {brandShortDescription && (
              <>
                {brandShortDescription &&
                  brandShortDescription.length > 400 &&
                  (!readMore ? (
                    <>
                      {brandShortDescription.slice(0, 400)}
                      <Link
                        className={classes.readMore}
                        onClick={toggleReadMore}
                      >
                        ...Read more
                      </Link>
                    </>
                  ) : (
                    <>
                      {brandShortDescription}
                      <Link
                        className={classes.readMore}
                        onClick={toggleReadMore}
                      >
                        ...Read less.
                      </Link>
                    </>
                  ))}
                {brandShortDescription && brandShortDescription.length < 400 && (
                  <>{brandShortDescription}</>
                )}
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeroRestaurant;
