import React, { useRef, useState } from 'react';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import aboutUs from '../../../../images/about.png';
import ellipse80 from '../../../../images/Ellipse80.svg';
import vector5 from '../../../../images/Vector5.svg';
import CommonHeading from '../CommonHeading';
import playImg from '../../../../images/playImg.png';
import heroVideo from '../../../../images/about-us.mp4';

const useStyles = makeStyles(theme => ({
  mdContainer: {
    maxWidth: 925,
    margin: '0 auto',
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    fontWeight: 300,
    color: '#7D7B7B',
  },
  subTitle: {
    fontSize: 25,
    fontWeight: 700,
  },
  readmore: {
    fontSize: 18,
    fontWeight: 700,
    color: '#A11E23',
  },
  videoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: '0 120px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 60px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 10px',
    },
  },
  videoCss: {
    objectFit: 'fill',
    // height: 485,
    [theme.breakpoints.down('sm')]: {
      height: 298,
    },
  },
  playerControls: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controler: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    position: 'absolute',
  },
  aboutImg: {
    height: '100%',
    width: '100%',
    marginTop: 46,
  },
  playImg: {
    position: 'absolute',
    zIndex: 99,
  },
  appWrapper: {
    maxWidth: 1200,
    margin: '20px auto 67px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
}));
const AboutUs = ({ data }) => {
  const classes = useStyles();
  const player = useRef();
  const [isVideoInPlayState, setIsVideoInPlayState] = useState(false);

  const handleControlClick = () => {
    const JMRVideo = player.current;
    if (JMRVideo.paused) {
      JMRVideo.play();
      setIsVideoInPlayState(true);
    } else {
      JMRVideo.pause();
      setIsVideoInPlayState(false);
    }
  };
  return (
    <>
      <CommonHeading heading="ABOUT US" viewmore />
      <div className={classes.mdContainer}>
        <Typography className={classes.subTitle}>
          Craving recepies from your childhood days? We got it.
        </Typography>
        <p className={classes.desc}>
          We are a food tech platform,proud pioneers in intercity perishable and
          non perishable food delivery, which aims to connect people ,back to
          their roots through food,delivering from iconic brands and restaurants
          from more than 20 cities all over the country. Our specialized cold
          chain logistics keep the food uber fresh till doorstep delivery.
        </p>
        <p className={classes.desc}>
          Justmyroots Is a food revolution, envisioned and created by a group of
          ex- corporates and ex-bankers with a fervent passion for good food.
        </p>

        <p className={classes.desc}>
          We are currently working with 500+ top brands with a premium portfolio
          of 5000+ products. We’re delivering in 20000+pin codes across
          Metros,Tier1 &amp; Tier2 cities and expanding!
        </p>
        {/* <Link className={classes.readmore} to="/about-us">...Read</Link> */}
      </div>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.appWrapper}
      >
        <Grid
          className={[classes.videoWrapper, 'video-wrapper'].join(' ')}
          onClick={handleControlClick}
        >
          <video
            width="100%"
            ref={player}
            className={classes.videoCss}
            loop
            controls={isVideoInPlayState}
          >
            {/* <source src={data.videoUrl} type="video/mp4" />
            <source src={data.videoUrl} type="video/ogg" /> */}
            <source src={heroVideo} type="video/mp4" />
            <source src={heroVideo} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
          {!isVideoInPlayState && (
            <Grid
              item
              container
              className={classes.playerControls}
              role="button"
            >
              <Grid item className={classes.controler}>
                <img src={ellipse80} />
                <Grid item className={classes.playBtn}>
                  <img src={vector5} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* <Grid
        className={classes.videoContainer}
        role="button"
        onClick={handleControlClick}
      >
        <Grid className={classes.videoWrapper}>
          <video
            width="100%"
            ref={player}
            className={classes.videoCss}
            loop
            controls={isVideoInPlayState}
          >
            <source src={data.videoUrl} type="video/mp4" />
            <source src={data.videoUrl} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
          {!isVideoInPlayState && (
            <Grid
              item
              container
              className={classes.playerControls}
              role="button"
            >
              <Grid item className={classes.controler}>
                <img src={ellipse80} />
                <Grid item className={classes.playBtn}>
                  <img src={vector5} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid> */}
    </>
  );
};
export default AboutUs;
