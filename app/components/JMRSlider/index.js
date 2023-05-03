import React from 'react';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel2';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    OwlCarousel: {
        touchAction:'manipulation',
        '& .owl-carousel': {
            padding: '0 80px',
            [theme.breakpoints.down('sm')]: {
                padding: '0 5px',
            },
            '& .owl-stage-outer': {
                zIndex: 1,
            },
        },
        '& .owl-nav': {
            position: 'absolute',
            top: '50%',
            width: '100%',
            justifyContent: 'space-between',
            zIndex: 0,
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
                padding: '10px',
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
}))
const itemx = window.matchMedia('(max-width: 700px)');
const options = {
    loop: false,
    nav: true,
    center: false,
    autoplay: true,
    dots: false,
    autoplay: false,
    startPosition: 0,
    rewind: true,
    lazyLoad: true,
    responsiveRefreshRate: 80,
    items: itemx.matches ? 2 : 4,
    navText: [
        `<div class='prev-slide'></div><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            items:1.4,
            nav:false,
            center:true
        },
        450: {
            items: 1.4,
             nav:false,
        },
        600: {
            items:3.4,
        },
        1000: {
            items: 4,
        },
    }
}
const JMRSlider = ({children}) => {
    const classes = useStyles();
   return <div className={classes.OwlCarousel}>
        <OwlCarousel options={{...options}}>
            {children}
        </OwlCarousel>
    </div>
}

export default JMRSlider;
JMRSlider.defaultProps = {
    sliderOptions: {},
    children:null
}
JMRSlider.propTypes = {
    sliderOptions: PropTypes.object,
    children: PropTypes.node
}