import React from 'react';
import { makeStyles, useTheme, useMediaQuery, Box } from '@material-ui/core';
import safety from '../../../../images/safety.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '63px auto 97px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
      textAlign: 'center',
    },
  },
  content: {
    maxWidth: 525,
  },
  description: {
    fontSize: 30,
    fontWeight: 400,
    color: '#7D7B7B;',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  readmore: {
    color: '#AC1715',
    fontSize: 18,
    fontWeight: 400,
    textDecoration: 'none',
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 56,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 10,
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: 136,
      height: 86,
    },
  }
}));

const SafetyProtocols = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div className={classes.appWrapper}>
        <Box mt={4} display="grid" gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'} gridColumnGap="35px" alignItems="center">
          <div>
            <img src={safety} alt="Top Image" height="100%" width="100%" className={classes.image} />
          </div>
          <div className={classes.content}>
            <h1 className={classes.title}>OUR SAFETY PROTOCOLS</h1>
            <p className={classes.description}>
              In order to minimize the low risk of transmission, during these difficult Covid times, here are a few of the
            </p>
            <Link to="/safety-protocols" className={classes.readmore}>Read More</Link>
          </div>
        </Box>
      </div>
    </>

  );
};

export default SafetyProtocols;


