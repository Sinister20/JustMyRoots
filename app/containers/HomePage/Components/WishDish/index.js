import React, { useContext } from 'react';
import { makeStyles, useTheme, useMediaQuery, Box, Button, } from '@material-ui/core';
import wishdish from '../../../../images/wishdish.png'
import { Link } from 'react-router-dom';
import { HistoryContext } from 'containers/App/HistoryContext';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '20px auto 67px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  sugatiDesc: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'justify',
    color: '#8A8888',
    margin: 0,
  },
  readmore: {
    color: '#AC1715',
    fontSize: 18,
    fontWeight: 700,
    textDecoration: 'none',
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 27,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      fontWeight: 900,
      marginBottom: 12,
    },
  },
  subtitle: {
    color: '#7D7B7B',
    fontSize: 28,
    fontWeight: 500,
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginBottom: 30,
    },
  },
  desc: {
    color: '#7D7B7B',
    fontSize: 24,
    fontWeight: 300,
    lineHeight: 1.5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  wishButton: {
    height: 54,
    borderRadius: 10,
    fontWeight: 700,
    minWidth: 166,
    fontSize: 25,
    [theme.breakpoints.down('sm')]: {
      minWidth: 80,
      height: 20,
      fontSize: 12,
    },
  },
}));

const WishDish = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { history } = useContext(HistoryContext);




  return (
    <>
      <div className={classes.appWrapper}>
        <Box mt={4} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={isMobile ? "10px" : "28px"} alignItems="center">
          <div>
            <img src={wishdish} alt="Top Image" height="100%" width="100%" />
          </div>
          <div>
            <h1 className={classes.title}>WISH A DISH</h1>
            <h4 className={classes.subtitle}>Craving Recipes From Your Childhood Days? We Got It.</h4>
            <p className={classes.desc}>
              Tell us ,which awesome dish you are craving and locations you wish we existed in.
              <br />
              Your every wish is our command!
            </p>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" className={classes.wishButton} onClick={() => history.push('/wish-a-dish')}>Wish
              </Button>
            </Box>
          </div>

        </Box>
      </div>
    </>

  );
};

export default WishDish;


