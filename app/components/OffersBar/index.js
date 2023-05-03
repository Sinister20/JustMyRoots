import React from 'react';
import styled from 'styled-components';
import { Grid, makeStyles, Box, Typography } from '@material-ui/core';
import star from '../../images/star2.svg';

const AppWrapperContainer = styled.div`
  max-width: 1064px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '60px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  offerWrapper: {
    background: theme.palette.secondary.main,
    height: 50,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.main,
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 19,
    },
    [theme.breakpoints.down('sm')]: {
      height: 20,
    },
  },
  offerText: {
    fontSize: 24,
    fontWeight: 400,
    color: '#434343',
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
      marginLeft: 5,
    },
  },
  offerImg: {
    height: "29px",
    width: "29px",
    [theme.breakpoints.down('sm')]: {
      height: "10px",
      width: "10px",
    },
  }
}));

const OffersBar = () => {
  const classes = useStyles();
  const offers = [
    { text: '500+ TOP BRANDS' },
    { text: '5000+ PREMIUM PRODUCTS' },
    { text: 'DELIVERING IN 20000+ PIN CODES' },
  ];
  return (
    <Box
      className={classes.offerWrapper}
      display="flex"
      alignItems="center"
    >
      <div className={classes.appWrapper}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {offers.map(offer => (
            <Box display="flex">
              <img src={star} className={classes.offerImg} />
              <Typography className={classes.offerText}>{offer.text}</Typography>
            </Box>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default OffersBar;
