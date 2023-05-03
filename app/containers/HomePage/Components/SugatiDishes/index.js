import React from 'react';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import ProductCard from '../ProductCard';
import CommonHeading from '../CommonHeading';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
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

const SugatiDishes = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  return (
    <div className={classes.appWrapper}>
      <CommonHeading heading="sugati potpourri" />
      <div className={classes.OwlCarousel}>
        <OwlCarousel options={options}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <ProductCard
            key={index}
              productData={{
              name: item.itemName,
              brand: item.brand,
              city: deliveryInLoc ? deliveryInLoc.name : '',
              type: item.itemType,
              ratings: item.ratings || "4.2",
              price: item.sellingPrice,
              UOM: item.UOM,
              webLink: `item/${item._id}`,
              }}
            imgSrc={
              item.productImages.length > 0 ? item.productImages[0] : "https://i.ibb.co/0FTjTZs/placeholder-img.png"
            }
          />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default SugatiDishes;
