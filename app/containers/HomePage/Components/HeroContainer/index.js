import React, { useContext } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import styled from 'styled-components';
import {
  Grid,
  makeStyles,
  Paper,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

import image1slider1 from '../../../../images/image1slider1.png';
import Rectangle198 from '../../../../images/Rectangle198.png';
import Rectangle188 from '../../../../images/Rectangle188.png';
import Rectangle155 from '../../../../images/Rectangle155.png';
import Rectangle199 from '../../../../images/Rectangle199.png';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: ${props => (props.isMobile ? '8px' : '23px')};
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0' : '0 35px')};
  margin: 0 auto;
  overflow: hidden;
`;

const useStyles = makeStyles(theme => ({
  sliderCard1: {
    '& img': {
      borderRadius: 10,
      [theme.breakpoints.down('sm')]: {
        borderRadius: 'unset',
        height: 200,
      },
    },
  },
  
}));

const HeroContainer = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { large, small } = data;


  const { history } = useContext(HistoryContext);

  const handleBannerClick = (path) => {
    if (path) {
      history.push(`${path}`);
    }
  }

  const options = {
    margin: 10,
    nav: false,
    items: 1,
    dots: false,
    autoHeight: false,
    autoplay: true,
    loop: true,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    responsiveRefreshRate: 80,
    responsive: {
      // 0: {
      //   items: 1,
      // },
      // 450: {
      //   items: 1,
      // },
      // 600: {
      //   items: 1,
      // },
      // 1000: {
      //   items: 1,
      // },
    },
  };

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer isMobile={isMobile}>
        <Grid container item spacing={5}>
          <Grid item xs={12} md={6} sm={6} className={classes.homeSlider1}>
            <OwlCarousel options={options}>
              {Array.isArray(large) && large.map((el) => <Grid
                item
                className={classes.sliderCard1}
                onClick={() => handleBannerClick(el.webPath)}
              >
                <img alt="" src={el.imageUrl} />
              </Grid>)}
            </OwlCarousel>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            style={{ padding: isMobile && '10px 35px' }}
            className={classes.homeSlider2}
          >
            <OwlCarousel options={options}>
              {Array.isArray(small) && small.map((elm) =>
              (<Grid container item spacing={5}>
                {

                  elm.banners.map((el) => (
                    <Grid item className={classes.fourCard} xs={6} >
                      <img src={el.imageUrl} onClick={() => handleBannerClick(el.webPath)} />
                    </Grid>
                  ))
                }
              </Grid>))}
            </OwlCarousel>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default HeroContainer;
