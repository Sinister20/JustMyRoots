import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Rectangle5 from '../../../../images/Rectangle5.jpg';
import demo from '../../../../images/founder.png';
import demo2 from '../../../../images/founder2.png';
import CommonHeading from '../CommonHeading';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '50px auto 80px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  founderImg: {
    width: 418,
    height: 408,
    [theme.breakpoints.down('sm')]: {
      width: 282,
      height: 271,
      marginBottom: 63,
    },
  },
  founder2Img: {
    width: 437,
    height: 291,
    [theme.breakpoints.down('sm')]: {
      width: 296,
      height: 280,
    },
  },
  founderWrapper: {
    marginTop: 141,
    marginBottom: 69,
    [theme.breakpoints.down('sm')]: {
      marginTop: 62,
      marginBottom: 182,
    },
  },
  founderHead: {
    fontSize: 38,
    fontWeight: 400,
    color: '#737373',
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
      fontWeight: 700,
      marginBottom: 14,
      textAlign: 'center',
    },
  },
  founderDesc: {
    fontSize: 16,
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  founder2Head: {
    fontSize: 18.7,
    fontWeight: 700,
    color: '#333536',
    [theme.breakpoints.down('sm')]: {
      marginTop: 14,
    },
  },
}));

const OurFounders = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Fragment>
      <div className={classes.appWrapper}>
        <CommonHeading heading="Our founders" viewmore/>
        <Grid container item spacing={4} style={{marginTop: 40}}>
          <Grid md={6} sm={6} item>
            <img src={demo} className={classes.founderImg} />
          </Grid>
          <Grid md={6} sm={6} item>
            <div style={{ marginBottom: 52 }}>
              <Typography className={classes.founderHead}>
                What’s our story
              </Typography>
              <Typography className={classes.founderDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras adipiscing arcu, id non lectus eget at. Phasellus
                vestibulum nam facilisis elit consectetur. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Cras
                adipiscing arcu, id non lectus eget at. Phasellus
                vestibulum nam facilisis elit consectetur.
              </Typography>
            </div>
            <div>
              <Typography
                className={classes.founderHead}
              >
                What we believe in
              </Typography>
              <Typography className={classes.founderDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras adipiscing arcu, id non lectus eget at. Phasellus
                vestibulum nam facilisis elit consectetur. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Cras
                adipiscing arcu, id non lectus eget at. Phasellus
                vestibulum nam facilisis elit consectetur.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <div style={{ backgroundColor: '#ffffff' }}>
        <div className={classes.founderWrapper2}>
          <Grid container item>
            <Grid md={6} sm={6} item>
              <img src={demo2} className={classes.founder2Img} />
            </Grid>
            <Grid md={6} sm={6} item style={{ alignSelf: 'center' }}>
              <div>
                <Typography
                  className={classes.founder2Head}
                  style={{
                    
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras adipiscing arcu, id non lectus eget at. Phasellus
                  vestibulum nam facilisis elit consectetur. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Cras
                  adipiscing arcu, id non lectus eget at. Phasellus
                  vestibulum nam facilisis elit consectetur.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div> */}
    </Fragment>
  );
}


export default OurFounders;
