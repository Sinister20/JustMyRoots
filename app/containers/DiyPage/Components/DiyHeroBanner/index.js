import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Typography,
  Hidden,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardHero from '../Assets/CardHero';
import imagehu15 from 'images/imagehu15.png';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? 0 : '0 35px')};
  margin: 0 auto;
  background-color: #eeebe9;
  border-bottom: ${props => !props.isMobile && '3px solid #b69c72'};
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 20%), 0 0 10px 1px rgb(255 255 255 / 20%);
  font-family: Roboto;
`;

const useStyles = makeStyles(theme => ({
  diyHero: {
    padding: '30px 0',
    minHeight: '600px',
    position: 'relative',
  },
  fixedHeloLabel: {
    minHeight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  grid3Sec: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 260px',
    height: '100%',
    textAlign: 'left',
  },
  OfferLabelWrapper: {
    color: '#fff',
    fontSize: 100,
    fontWeight: 900,
    textTransform: 'uppercase',
    lineHeight: 1,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      textAlign: 'center',
    },
  },
  overLayText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    // top: '45%',
    padding: 25,
  },
  search: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flex: '20px auto',
    padding: '5px 10px',
  },
  styledInputBase: {
    marginLeft: 10,
    flex: 1,
    color: 'inherit',
    '& .MuiInputBase-input': {},
  },
  rightHero: {
    padding: 20,
    paddingBottom: 0,
    height: '100%',
    paddingTop: 0,
  },
  mobileImage: {
    backgroundImage: props => props.imgSrc && `url(${props.imgSrc})`,
    position: 'relative',
    backgroundSize: 'cover',
    borderRadius: 10,
    height: 300,
    width: '100%',
    textAlign: 'center',
  },
  trendingItems: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 20,
    padding: '10px 10px 20px 10px',
  },
}));

const HeroRestaurant = ({ imgSrc, heroText1 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ imgSrc });

  const { history } = useContext(HistoryContext);

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Hidden smDown>
          <Grid container item>
            <Grid item xs={12} className={classes.diyHero}>
              <Grid item className={classes.fixedHeloLabel}>
                <Grid item container className={classes.grid3Sec}>
                  <Grid
                    item
                    style={{
                      backgroundImage: `url(${imgSrc})`,
                      position: 'relative',
                      height: '100%',
                      backgroundSize: 'cover',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <Grid className={classes.overLayText}>
                      <Grid item className={classes.OfferLabelWrapper}>
                        <Grid item className={classes.OfferLabel}>
                          {heroText1}
                        </Grid>
                      </Grid>
                      <Typography
                        variant="caption"
                        component="div"
                        style={{
                          fontSize: 16,
                          paddingLeft: 8,
                          lineHeight: 1,
                          color: '#fff',
                          fontWeight: 400,
                          textTransform: 'uppercase',
                        }}
                      >
                        DO IT YOURSELF
                      </Typography>
                      <Typography
                        variant="caption"
                        component="div"
                        style={{
                          fontSize: 16,
                          paddingLeft: 8,
                          lineHeight: 1,
                          color: '#fff',
                          fontWeight: 300,
                          marginTop: 20,
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean nibh et ac vitae auctor posuere sit et. Proin vel
                        orci nulla sed ante sapien. Quisque id varius nulla
                        lacus, lectus pharetra, purus. Eu nibh sagittis,
                        faucibus faucibus mauris lorem posuere duis. Ullamcorper
                        sed in euismod nec varius placerat. Amet, feugiat sit
                        tincidunt quis odio. Aliquet diam molestie at nullam
                        donec aliquam massa.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.rightHero}>
                    <Typography
                      variant="caption"
                      color="primary"
                      component="div"
                      style={{
                        fontSize: 16,
                        paddingLeft: 8,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      Trending Cuisine you can try at home
                    </Typography>
                    <Divider
                      style={{
                        marginTop: 10,
                        height: 3,
                        background: '#B69C72',
                      }}
                    />
                    <CardHero imgSrc={imagehu15} />
                    <CardHero imgSrc={imagehu15} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.mobileImage}>
            <Grid className={classes.overLayText}>
              <Grid item className={classes.OfferLabelWrapper}>
                <Grid item className={classes.OfferLabel}>
                  {heroText1}
                </Grid>
              </Grid>
              <Typography
                variant="caption"
                component="div"
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  lineHeight: 1,
                  color: '#fff',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  marginTop: 10,
                }}
              >
                DO IT YOURSELF
              </Typography>
              <Typography
                variant="caption"
                component="div"
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  lineHeight: 1,
                  color: '#fff',
                  fontWeight: 300,
                  marginTop: 20,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                nibh et ac vitae auctor posuere sit et. Proin vel orci nulla sed
                ante sapien. Quisque id varius nulla lacus, lectus pharetra,
                purus. Eu nibh sagittis, faucibus faucibus mauris lorem posuere
                duis.
              </Typography>
            </Grid>
          </div>
          <div>
            <Grid item>
              <Typography
                variant="caption"
                color="primary"
                component="div"
                style={{
                  fontSize: 16,
                  paddingLeft: 8,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginTop: 20,
                }}
              >
                Trending Cuisine you can try at home
              </Typography>
              <Divider
                style={{
                  marginTop: 10,
                  height: 3,
                  background: '#B69C72',
                }}
              />
              <div className={classes.trendingItems}>
                <CardHero imgSrc={imagehu15} />
                <CardHero imgSrc={imagehu15} />
              </div>
            </Grid>
          </div>
        </Hidden>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default HeroRestaurant;
