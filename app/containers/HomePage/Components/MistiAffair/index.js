import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
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
  padding: 0 35px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-bottom: ${props => (props.isMobile ? 'none' : '1px solid #000000')};
`;

const useStyles = makeStyles(theme => ({
  nostalgiaContr: {
    padding: '60px 0',
    flexDirection: 'column',
    alignItems: 'center',
  },
  JMRbtn: {
    height: 30,
    marginRight: 30,
    minWidth: 135,
  },
  bt1: {
    border: '1px solid #20201f',
  },
  bt2: {
    color: '#B69C72',
    backgroundColor: '#333536',
  },
  bt3: {
    color: '#ffffff',
  },
  videoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
    cursor: 'pointer',
  },
  videoCss: {
    objectFit: 'fill',
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
  cardsContianer: {
    paddingBottom: 40,
  },
  h3: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
}));

const MistiAffair = () => {
  const classes = useStyles();
  const player = useRef();
  const [isVideoInPlayState, setIsVideoInPlayState] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const options = {
    margin: 30,
    nav: false,
    items: 1,
    dots: true,
    autoHeight: false,
    autoplay: true,
    loop: true,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    responsiveRefreshRate: 80,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
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
          <Typography classes={{ h3: classes.h3 }} variant="h3" component="div">
            <Typography
              classes={{ h3: classes.h3 }}
              variant="h3"
              color="primary"
              component="span"
            >
              <b>The ‘Misti’</b>
            </Typography>
            &nbsp;
            <Typography
              classes={{ h3: classes.h3 }}
              variant="h3"
              color="secondary"
              component="span"
            >
              <b>Affair</b>
            </Typography>
          </Typography>
          <Typography
            variant="button"
            display="block"
            component="div"
            style={{
              letterSpacing: 5,
              fontWeight: 500,
              marginTop: 5,
              textAlign: isMobile && 'center',
            }}
          >
            SWEETS FROM ALL OVER THE COUNTRY
          </Typography>
        </Grid>
        <OwlCarousel options={options}>
          {[1, 2, 3, 4, 5].map(() => (
            <AppWrapperContainer className={classes.cardsContianer}>
              <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
            </AppWrapperContainer>
          ))}
        </OwlCarousel>
      </AppWrapperContainer>
      <AppWrapperContainer style={{ textAlign: 'center' }}>
        <Button
          variant="text"
          style={{ letterSpacing: 5, marginBottom: 50, marginTop: 20 }}
        >
          View All
        </Button>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default MistiAffair;
