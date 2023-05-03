import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import Rectangle1160 from '../../../../images/Rectangle1160.jpg';
import { ImageCardWithTitleBtn } from '../../../../components';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0 15px' : '0 35px')};
  margin: 0 auto;
  background-color: #eeebe9;
  border-bottom: 1px solid #000000;
`;

const useStyles = makeStyles(theme => ({
  nostalgiaContr: {
    padding: '60px 0 30px',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 720,
    margin: 'auto',
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
      margin: 5,
    },
  },
  heroOffer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
    marginBottom: 100,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  cardBtn: {
    border: '1px solid #B8ADA5',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#B8ADA5',
    height: 33,
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'unset',
      width: 148,
    },
  },
  h3: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  text: {
    fontSize: 20,
    color: '#515151',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
}));

const BestMarketPlace = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const options = {
    margin: 30,
    nav: false,
    dots: true,
    autoplay: true,
    loop: true,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid
          container
          item
          justifyContent="center"
          className={classes.nostalgiaContr}
        >
          <Grid item style={{ textAlign: 'center' }}>
            <Typography variant="h3" color="primary" component="span">
              <b>The Best </b>
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h3" color="secondary" component="span">
              <b>Marketplace</b>
            </Typography>
          </Grid>
          <Divider
            flexItem
            style={{ height: 1, marginTop: 30, backgroundColor: '#000000' }}
          />
          <Grid item container className={classes.btnContainer}>
            <Button variant="text">india</Button>
            <Button variant="text">Delhi</Button>
            <Button variant="text">gurugram</Button>
            <Button variant="text">Bengaluru</Button>
            <Button variant="text">Mumbai</Button>
            <Button variant="text">hyderabad</Button>
            <Button variant="text">lucknow</Button>
            <Button variant="text">chenni</Button>
            <Button variant="outlined">kolkata</Button>
          </Grid>
        </Grid>
        <AppWrapperContainer>
          <OwlCarousel options={options}>
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
            ))}
          </OwlCarousel>
        </AppWrapperContainer>
      </AppWrapperContainer>
      <AppWrapperContainer style={{ textAlign: 'center' }}>
        <Button
          variant="text"
          style={{ letterSpacing: 5, marginBottom: 30, marginTop: 20 }}
        >
          View All
        </Button>
      </AppWrapperContainer>
      <Divider
        flexItem
        style={{
          height: 1,
          marginTop: 30,
          backgroundColor: '#000000',
          width: '30%',
          margin: 'auto',
        }}
      />
      <Grid
        container
        item
        justifyContent="center"
        className={classes.nostalgiaContr}
      >
        <Grid item style={{ textAlign: 'center' }}>
          <Typography
            classes={{ h3: classes.h3 }}
            variant="h3"
            color="primary"
            component="span"
          >
            <b>Trending </b>
          </Typography>
          &nbsp; &nbsp;
          <Typography
            classes={{ h3: classes.h3 }}
            variant="h3"
            color="secondary"
            component="span"
          >
            <b>Keywords</b>
          </Typography>
        </Grid>
        <Grid item container className={classes.btnContainer}>
          <Button variant="outlined">india</Button>
          <Button variant="outlined">Delhi</Button>
          <Button variant="outlined">gurugram</Button>
          <Button variant="outlined">Bengaluru</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
          <Button variant="outlined">Bengaluru</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
        </Grid>
      </Grid>
      <Grid className={classes.heroOffer}>
        <Typography variant="h6" component="p" className={classes.text}>
          Can’t find a dish you are looking for?
        </Typography>
        <Button variant="outlined" className={classes.cardBtn}>
          Contact Us
        </Button>
      </Grid>
    </AppWrapper>
  );
};

export default BestMarketPlace;
