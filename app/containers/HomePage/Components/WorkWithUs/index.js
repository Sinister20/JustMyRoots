import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import Rectangle210 from '../../../../images/Rectangle210.jpg';
import Ellipse1 from '../../../../images/Ellipse1.png';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: 0 35px;
  margin: 0 auto;
  background-color: #ffffff;
`;

const useStyles = makeStyles(theme => ({
  topClintsContr: {
    padding: '60px 0 80px',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1080,
    borderBottom: '1px solid #000000',
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
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 30,
    borderRadius: 4,
  },
  maaKeHathKaKhanaContnr: {
    width: '100%',
    position: 'relative',
  },
  contentContr: {
    color: '#00000',
  },
  cardBtn: {
    border: '1px solid #FFFFFF',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    display: 'block',
    margin: '30px auto',
    minWidth: '60%',
    border: '2px solid #FFFFFF',
  },
  h3: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
}));

const WorkWithUs = () => {
  const classes = useStyles();

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <Grid item>
          <Grid
            container
            item
            justifyContent="center"
            className={classes.topClintsContr}
          >
            <Typography
              classes={{ h3: classes.h3 }}
              variant="h3"
              component="div"
            >
              <Typography
                classes={{ h3: classes.h3 }}
                variant="h3"
                color="primary"
                component="span"
              >
                <b>Work with</b>
              </Typography>
              &nbsp;
              <Typography
                classes={{ h3: classes.h3 }}
                variant="h3"
                color="secondary"
                component="span"
              >
                <b>us?</b>
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              style={{
                maxWidth: 500,
                marginTop: 10,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 300,
                color: '#333536',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              adipiscing arcu, id non lectus eget at.
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{
                maxWidth: 500,
                marginTop: 12,
                textAlign: 'center',
                lineHeight: 1,
                fontWeight: 600,
                fontSize: 16,
                color: '#333536',
              }}
            >
              Email us at:
            </Typography>
            <Typography
              variant="caption"
              component="div"
              style={{
                maxWidth: 500,
                margin: '0',
                textAlign: 'center',
                lineHeight: 1.5,
                fontWeight: 600,
                fontSize: 16,
                color: '#333536',
              }}
            >
              abc@abc.com
            </Typography>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default WorkWithUs;
