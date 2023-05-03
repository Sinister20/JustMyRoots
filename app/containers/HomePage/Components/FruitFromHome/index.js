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
import imaged15 from '../../../../images/imaged15.png';
import { ImageCardWithTitleBtn, JMRCard } from '../../../../components';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0 15px' : '0 35px')};
  margin: 0 auto;
  background-color: #f5f5f5;
`;

const useStyles = makeStyles(theme => ({
  nostalgiaContr: {
    padding: '60px 0',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '80%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '60px 0 30px 0',
    },
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
  maaKeHathKaKhanaContnr: {
    width: '100%',
    position: 'relative',
    marginBottom: 45,
  },
  contentContr: {
    position: 'absolute',
    bottom: 0,
    right: '10%',
    left: '10%',
    color: '#ffffff',
  },
  cardBtn: {
    border: '1px solid #FFFFFF',
    fontSize: 30,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    height: 33,
    display: 'block',
    margin: '30px auto',
    minWidth: '60%',
    minHeight: 65,
    border: '2px solid #FFFFFF',
  },
  textBtn: {
    letterSpacing: 5,
    fontWeight: 500,
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      marginTop: 30,
    },
  },
  cardsContianer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 30,
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      gridGap: 20,
      gridTemplateColumns: '1fr 1fr',

    },
  },
}));

const MaaKeHathKaKhana = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid
          container
          item
          justifyContent="center"
          className={classes.nostalgiaContr}
        >
          <Typography style={{ textAlign: 'center' }} component="div">
            <Typography
              color="primary"
              component="span"
              style={{ fontSize: isMobile ? 28 : 80, fontFamily: 'Roboto' }}
            >
              <b>Your Favourite fruits from your </b>
            </Typography>
            &nbsp;
            <Typography
              color="secondary"
              component="span"
              style={{ fontSize: isMobile ? 28 : 80, fontFamily: 'Roboto' }}
            >
              <b>Hometown</b>
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            style={{
              maxWidth: 765,
              marginTop: 10,
              textAlign: !isMobile && 'center',
              fontWeight: 300,
              color: '#737373',
              fontSize: isMobile && 16,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nibh
            et ac vitae auctor posuere sit et. Proin vel orci nulla sed ante
            sapien. Quisque id varius nulla lacus, lectus pharetra, purus. Eu
            nibh sagittis, faucibus faucibus mauris lorem posuere duis.
            Ullamcorper sed in euismod nec varius placerat. Amet, feugiat sit
            tincidunt quis odio. Aliquet diam molestie at
          </Typography>
          <Button variant="text" className={classes.textBtn}>
            VIEW ALL
          </Button>
        </Grid>
        <AppWrapperContainer>
          <Grid item className={classes.cardsContianer}>
            <JMRCard src={imaged15} height="auto" noOverlay path="fruits" />
            <JMRCard src={imaged15} height="auto" noOverlay path="fruits" />
            <JMRCard src={imaged15} height="auto" noOverlay path="fruits" />
          </Grid>
        </AppWrapperContainer>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default MaaKeHathKaKhana;
