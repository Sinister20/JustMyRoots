import React from 'react';
import styled from 'styled-components';
import { Grid, makeStyles, Hidden } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import _ from 'lodash';

import CommonHeading from '../CommonHeading';
import { checkImageURL, sliderOptions } from '../../../../utils/utils';
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '40px auto 57px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
    },
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 10px',
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
  ourPratnr: {
    width: 240,
    display: 'flex',
    flexDirection: 'column',
    gridGap: 30,
    margin: '0 auto',
    '& img': {
      objectFit: 'contain',
      border: '1px solid #CECECE',
      borderRadius: 5,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      gridGap: 20,
    },
  },

  partnersContainer: {
    // display: 'flex',
    // flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto',
    justifyContent: 'space-around',
  },
}));

const MistiAffair = ({ about, ourPartners = [] }) => {
  const classes = useStyles({ about });
  const [brands, setBrands] = React.useState([]);


  React.useEffect(() => {
    const partnerImages = [];
    if (ourPartners.length > 0) {
      ourPartners[0].brands.forEach(partner => {
        // debugger
        //
        // partner.map(brand => partnerImages.push(brand.brandImage));
        partnerImages.push(partner);
      })
    }
    const brands =
      partnerImages.length % 2 === 0
        ? [...partnerImages]
        : [...partnerImages, partnerImages[0]];
    setBrands(brands);
  }, [ourPartners]);


  const options = {
    margin: 25,
    nav: true,
    dots: false,
    startPosition: "#1",
    center: false,
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
        items: 1,
        nav: false,
      },
      450: {
        items: 3,
        nav: false,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 4,
      },
    },
  };


  return (
    <div className={classes.appWrapper}>
      <CommonHeading heading="OUR PARTNERS" viewmore />
      <div id="ourPartners" className={classes.OwlCarousel}>
        {/* <OwlCarousel options={options}>
          {ourPartners &&
            ourPartners.map(
              (a, index) =>
                a &&
                a.brands &&
                a.brands.map((img, key) => (
                  <Grid key={index} >
                    <img key={key} alt="brandLogo" src={checkImageURL(img.brandImage)} />
                  </Grid>
                )
                ),
            )}
        </OwlCarousel> */}
        {
          brands.length > 0 && (
            <OwlCarousel options={sliderOptions}>
              {
                // console.log("brands", brands)
              }
              {_.chunk(brands, 2).map((a, index) => (
                <Grid key={index} className={classes.ourPratnr}>

                  {a.length > 0 && a.map((img, key) => (
                    <img key={key} alt="brandLogo" src={checkImageURL(img.brandImage)} />
                  ))}
                </Grid>
              ))}

            </OwlCarousel>)
        }

        {/* <Hidden mdUp>
          <div className={classes.partnersContainer}>
            <Grid className={classes.ourPratnr}>
              {partnerImages.map(img => (
                <img alt="brandLogo" src={img} />
              ))}
            </Grid>
          </div>
        </Hidden> */}
      </div>
    </div>
  );
};

export default MistiAffair;
