import React, { useContext, Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  Hidden
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import Rectangle5 from '../../../../images/Rectangle5.jpg';
import ellipse80 from '../../../../images/Ellipse80.svg';
import vector5 from '../../../../images/Vector5.svg';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0 20px' : '0 35px')};
  margin: 0 auto;
  background-image: url(${Rectangle5});
  background-repeat: repeat;
`;

const useStyles = makeStyles(theme => ({
  nostalgiaContr: {
    padding: '60px 0',
    flexDirection: 'column',
    alignItems: 'center',
  },
  whoAreWeContainer: {
    padding: '60px 0',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white'
  },
  JMRbtn: {
    height: 30,
    marginRight: 30,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      marginRight: 'unset',
      width: 30,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  bt1: {
    border: '1px solid #20201f',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 20px auto',
    },
  },
  bt2: {
    color: '#B69C72',
    backgroundColor: '#333536',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 20px auto',
    },
  },
  bt3: {
    color: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  videoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
    cursor: 'pointer',
  },
  videoCss: {
    objectFit: 'fill',
    height: 517,
    [theme.breakpoints.down('sm')]: {
      height: 164,
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
  videoDesc: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: '30px',
    color: '#ffffff',
    textAlign: 'center',
  },
  h3: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 26,
    },
  },
  mobileButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const WhoWeARe = props => {
  const { data, aboutus } = props;
  const classes = useStyles({ aboutus });
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

  const { history } = useContext(HistoryContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fragment>
      {!aboutus ? (
        <AppWrapper isMobile={isMobile}>
          <AppWrapperContainer>
            <Grid
              container
              item
              justifyContent="center"
              className={classes.nostalgiaContr}
            >
              <Typography
                variant="button"
                display="block"
                component="div"
                style={{ letterSpacing: 5, fontWeight: 500 }}
              >
                WHO ARE WE
              </Typography>
              <Typography
                variant="h3"
                component="div"
                style={{
                  textAlign: isMobile && 'center',
                }}
                classes={{ h3: classes.h3 }}
              >
                <Typography
                  classes={{ h3: classes.h3 }}
                  variant="h3"
                  color="primary"
                  component="span"
                >
                  <b>We</b>
                </Typography>
                &nbsp;
                <Typography
                  classes={{ h3: classes.h3 }}
                  variant="h3"
                  color="secondary"
                  component="span"
                >
                  <b>quench nostalgia</b>
                </Typography>
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                style={{
                  maxWidth: 765,
                  marginTop: 20,
                  textAlign: isMobile && 'center',
                }}
              >
                Craving recepies from your childhood days? We got it.
              </Typography>
              <Typography
                variant="caption"
                style={{
                  maxWidth: 765,
                  marginTop: 10,
                  textAlign: isMobile ? 'center' : 'justify',
                  fontWeight: 300,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros,
                id scelerisque ipsum dictumst elementum at cursus pulvinar
                purus. Egestas id massa vestibulum ipsum orci. Viverra duis
                dolor libero, est varius ac sollicitudin imperdiet. Ante at
                pellentesque quisque metus, montes, lectus volutpat integer
                scelerisque. Purus sed ut fusce lorem. Enim ut. Egestas id massa
                vestibulum ipsum orci.
              </Typography>
              <br />
              <br />

              <Grid
                item
                container
                justifyContent="center"
                className={isMobile && classes.mobileButtons}
                gutterTop
              >
                {!aboutus && (
                  <Button
                    onClick={() => history.push('/about-us')}
                    variant="outlined"
                    className={`${classes.JMRbtn} ${classes.bt1}`}
                  >
                    Read More
                  </Button>
                )}
                <Button
                  onClick={() => history.push('/city')}
                  variant="contained"
                  color="secondary"
                  className={`${classes.JMRbtn} ${classes.bt2}`}
                >
                  Explore
                </Button>
                <Button
                  onClick={() => history.push('/offers')}
                  variant="contained"
                  color="primary"
                  className={`${classes.JMRbtn} ${classes.bt3}`}
                >
                  Offers
                </Button>
              </Grid>
              <br />
              <br />
              <Grid
                container
                className={classes.videoContainer}
                role="button"
                onClick={handleControlClick}
              >
                <Grid container className={classes.videoWrapper}>
                  <video
                    width="1074"
                    ref={player}
                    className={classes.videoCss}
                    loop
                    controls={isVideoInPlayState}
                  >
                    <source src={data.videoUrl} type="video/mp4" />
                    <source src={data.videoUrl} type="video/ogg" />
                    Your browser does not support HTML video.
                  </video>
                  <Hidden smUp>
                    <Typography style={{marginTop: 20,}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, id scelerisque ipsum dictumst elementum at cursus pulvinar purus. Egestas id massa vestibulum ipsum orci. Viverra duis dolor libero, est varius ac sollicitudin imperdiet. Ante at pellentesque quisque metus, montes, lectus volutpat integer scelerisque. Purus sed ut fusce lorem. Enim ut.
                    </Typography>
                  </Hidden>
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
                  {!isVideoInPlayState && (
                    <Grid item className={classes.videoDesc}>
                      <Typography
                        variant="caption"
                        style={{
                          maxWidth: 765,
                          marginTop: 10,
                          textAlign: 'justify',
                          fontWeight: 300,
                        }}
                      >
                        {data.description}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </AppWrapperContainer>
        </AppWrapper>
      ) : (
        <Fragment>
          <Grid
            container
            className={classes.videoContainer}
            role="button"
            onClick={handleControlClick}
          >
            <Grid container className={classes.videoWrapper}>
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
              {!isVideoInPlayState && (
                <Grid item className={classes.videoDesc}>
                  <Typography
                    variant="caption"
                    style={{
                      maxWidth: 765,
                      marginTop: 10,
                      textAlign: 'justify',
                      fontWeight: 300,
                    }}
                  >
                    {data.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            className={classes.whoAreWeContainer}
          >
            <Typography
              variant="h3"
              component="div"
              style={{
                textAlign: isMobile && 'center',
              }}
            >
              <Typography
                variant="h3"
                color="primary"
                component="span"
                style={{ fontSize: isMobile ? 28 : 80 }}
              >
                <b>Who</b>
              </Typography>
              &nbsp;
              <Typography
                variant="h3"
                color="secondary"
                component="span"
                style={{ fontSize: isMobile ? 28 : 80 }}
              >
                <b>are we ?</b>
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              style={{
                maxWidth: 765,
                marginTop: 10,
                textAlign: isMobile ? 'center' : 'justify',
                fontWeight: 300,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros,
              id scelerisque ipsum dictumst elementum at cursus pulvinar
              purus. Egestas id massa vestibulum ipsum orci. Viverra duis
              dolor libero, est varius ac sollicitudin imperdiet. Ante at
              pellentesque quisque metus, montes, lectus volutpat integer
              scelerisque. Purus sed ut fusce lorem. Enim ut. Egestas id massa
              vestibulum ipsum orci.
            </Typography>
          </Grid>
          <div style={{ backgroundColor: '#EDEBE9;' }}>
            <AppWrapperContainer >
              <Grid
                container
                item
                justifyContent="center"
                className={classes.nostalgiaContr}
              >
                <Typography
                  variant="button"
                  display="block"
                  component="div"
                  style={{ letterSpacing: 5, fontWeight: 500 }}
                >
                  WHO ARE WE
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  style={{
                    textAlign: isMobile && 'center',
                  }}
                  classes={{ h3: classes.h3 }}
                >
                  <Typography
                    classes={{ h3: classes.h3 }}
                    variant="h3"
                    color="primary"
                    component="span"
                  >
                    <b>We</b>
                  </Typography>
                  &nbsp;
                  <Typography
                    classes={{ h3: classes.h3 }}
                    variant="h3"
                    color="secondary"
                    component="span"
                  >
                    <b>quench nostalgia</b>
                  </Typography>
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  style={{
                    maxWidth: 765,
                    marginTop: 20,
                    textAlign: 'center',
                  }}
                >
                  Craving recepies from your childhood days? We got it.
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    maxWidth: 765,
                    marginTop: 10,
                    textAlign: isMobile ? 'center' : 'justify',
                    fontWeight: 300,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros,
                  id scelerisque ipsum dictumst elementum at cursus pulvinar
                  purus. Egestas id massa vestibulum ipsum orci. Viverra duis
                  dolor libero, est varius ac sollicitudin imperdiet. Ante at
                  pellentesque quisque metus, montes, lectus volutpat integer
                  scelerisque. Purus sed ut fusce lorem. Enim ut. Egestas id massa
                  vestibulum ipsum orci.
                </Typography>
                <br />
                <br />

                <Grid
                  item
                  container
                  justifyContent="center"
                  className={isMobile && classes.mobileButtons}
                  gutterTop
                >
                  {!aboutus && (
                    <Button
                      onClick={() => history.push('/about-us')}
                      variant="outlined"
                      className={`${classes.JMRbtn} ${classes.bt1}`}
                    >
                      Read More
                    </Button>
                  )}
                  <Button
                    onClick={() => history.push('/city')}
                    variant="contained"
                    color="secondary"
                    className={`${classes.JMRbtn} ${classes.bt2}`}
                  >
                    Explore
                  </Button>
                  <Button
                    onClick={() => history.push('/offers')}
                    variant="contained"
                    color="primary"
                    className={`${classes.JMRbtn} ${classes.bt3}`}
                  >
                    Offers
                  </Button>
                </Grid>
                <br />
                <br />
              </Grid>
            </AppWrapperContainer>
          </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default WhoWeARe;
