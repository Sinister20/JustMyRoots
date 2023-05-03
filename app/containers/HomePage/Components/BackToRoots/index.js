import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CommonHeading from '../CommonHeading';
import backAbout from '../../../../images/backRootsAbout.svg';
import JMRActiveLocation from '../../../../components/JMRActiveLocation';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '80px auto 0',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
  backtoRoutSelectSec: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto 50px',
    [theme.breakpoints.down('sm')]: {
      margin: '30px auto',
    },
  },
  cardBtn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'capitalize',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#7D7B7B',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    textDecoration: 'none',
    minWidth: 213,
    paddingTop: 14,
    background:'#AC1715',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'unset',
      height: 30,
      minWidth: 100,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 4,
      fontSize: 14,
    },
    '&:hover': {
      backgroundColor: '#706f6f',
    },
  },
  selectBox: {
    padding: 3,
    fontSize: 12,
    border: '1.2px solid #7D7B7B',
    color: '#AAAAAA',
    fontWeight: 700,
    background: 'transparent',
    minWidth: 383,
    textAlign: 'left',
    borderRadius: 18,
    height: 55,
    marginRight: 38,
    [theme.breakpoints.down('sm')]: {
      minWidth: 119,
      marginRight: 20,
      height: 30,
    },
  },
  subHeadingAbout: {
    fontSize: 36,
    letterSpacing: 5,
    fontWeight: 300,
    marginTop: 45,
    marginBottom: 13,
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  rootsDesc: {
    maxWidth: 765,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 18,
    color: '#7D7B7B',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  title: {
    fontWeight: 900,
    fontSize: 35,
    textAlign: 'center',
    '& span': {
      color: '#A11E23',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  cityList: {
    border: '2px solid #818181',
    borderRadius: 30,
    padding: '15px 20px',
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#7D7B7B',
        listStyleType: 'none',
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  subTitle: {
    letterSpacing: 5,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
    },
  },
}));

const BackToRoots = ({ aboutus }) => {
  const classes = useStyles({ aboutus });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div aboutus={aboutus} className={classes.appWrapper}>
      <div>
        <CommonHeading heading="Route back to Roots" viewmore />
        {!aboutus && (
          <Typography
            display="block"
            component="div"
            align="center"
            className={classes.subTitle}
          >
            OUR NRI PROMISE
          </Typography>
        )}
      </div>
      <Grid container item justifyContent="center">
        <Typography variant="caption" className={classes.rootsDesc}>
          Are you living abroad and want to send your favourite cuisine to your
          loved ones. Just My Roots allows you to order food from any country.
          We accept 20+ currencies.
        </Typography>
        {!aboutus && (
          <Grid container className={classes.backtoRoutSelectSec}>
            {/* <select className={classes.selectBox}>
              <option value="" disabled selected>
                Select the delivery cities
              </option>
              <option>Kolkata</option>
              <option>Delhi</option>
              <option>Mumbai</option>
            </select> */}
            <Link
              variant="outlined"
              className={classes.cardBtn}
              to="/contact-us"
            >
              Contact Us
            </Link>
          </Grid>
        )}
      </Grid>
      {!aboutus && <JMRActiveLocation backtoRoots />}
      {aboutus && (
        <Box display="flex" justifyContent="center" my={8}>
          <img src={backAbout} width="100%" alt="about us" />
        </Box>
      )}
    </div>
  );
};

export default BackToRoots;
