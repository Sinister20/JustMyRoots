import React from 'react';
import { makeStyles, useTheme, useMediaQuery, Box, Grid } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import Rectangle1160 from '../../../../images/Rectangle1160.jpg';
import { ImageCardWithTitleBtn } from '../../../../components';
import CommonHeading from '../CommonHeading';
import designImg from '../../../../images/design.png'
import sugatiImg from '../../../../images/sugati.jpg'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '0px auto 68px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  designImg: {
    position: 'absolute',
  },
  readmore: {
    color: '#AC1715',
    fontSize: 18,
    fontWeight: 700,
    marginTop: 10,
    textDecoration: 'none',
  },
  sugatiDesc: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'justify',
    color: '#8A8888'
  },
  cardContainer: {
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
      flexDirection: 'column-reverse',
    },
  }
}));

const Sugati = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <img src={designImg} alt="Top Image" className={classes.designImg} />
      <div className={classes.appWrapper}>
        <CommonHeading heading="sugati" viewmore />
        <Grid
          className={classes.cardContainer}
          container
          item
          spacing={10}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid xs={12} md={6} item>
            <p className={classes.sugatiDesc}>Our own indigenous brand of unadulterated ,fresh and aromatic Spices,Ghee,Gur and our star attraction the new Gur Chocolates made with love and utmost care from our hearts to yours. This brand has been launched to support the Atma Nirbhar Project of India,whereby Products come directly from the Villages and Women Self Help Groups from Different parts of the Country.Come,be a part of this noble cause and enjoy life the “Sugati way!”</p>
            {/* <Link className={classes.readmore}>...Read</Link> */}
          </Grid>
          <Grid xs={12} md={6} item style={{ padding: isMobile ? 20 : 0 }}>
            <img src={sugatiImg} alt="Top Image" height="100%" width="100%" />
          </Grid>
        </Grid>
      </div>
    </>

  );
};

export default Sugati;


