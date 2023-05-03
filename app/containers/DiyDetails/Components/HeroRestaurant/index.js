import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Rectangle5 from '../../../../images/Rectangle5.jpg';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import Rectangle268 from '../../../../images/Rectangle268.jpg';
import Group98434 from '../../../../images/Group98434.svg';



const AppWrapperContainer = styled.div`
max-width: 1070px;
margin: 0 auto;
overflow : hidden;

`;


const AppWrapper = styled.div`
width: 100%;
padding: 0 35px;
margin: 0 auto;
background-image : url(${Rectangle5});
background-repeat: repeat;
`;

const useStyles = makeStyles((theme) => ({
    heroRestaurant: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
        minHeight: '460px'
    },
    ratingContr: {
        fontSize: 14,
        textAlign: 'justify',
        fontWeight: 300,
        width: '100%',
        color: '#333536',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        rowGap: 20,
        marginTop: 10
    },
    JMRbtnRateCntr: {
        width: '100%',
        minHeight: 45,
        display: 'block',
        padding: '5px auto'
    },
    JMRbtnRateCntrB1: {
        fontSize: 16,
        fontWeight: 700,
        border: '2px solid #B69C72',
        color: '#B69C72'
    },
    grid2Sec: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 30,
    }
}))


const HeroRestaurant = () => {
    const classes = useStyles();

    const options = {
        margin: 10,
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
        <AppWrapper>
            <AppWrapperContainer >
                <Grid container item spacing={10} className={classes.heroRestaurant}>
                    <Grid item xs={12} md={6} sm={6} justifyContent="center" alignItems="center" className={classes.homeSlider1}>
                        <OwlCarousel options={options} >
                            {[1, 2, 3].map(() => {
                                return [
                                    <Grid item className={classes.sliderCard1}>
                                        <img alt="" src={Rectangle268} />
                                        {/* <p className="legend">Legend 1</p> */}
                                    </Grid>,
                                    <Grid item className={classes.sliderCard1}>
                                        <img alt="" src={Rectangle268} />
                                        {/* <p className="legend">Legend 1</p> */}
                                    </Grid>
                                ]
                            })}
                        </OwlCarousel>
                        <Grid item className={classes.grid2Sec} >
                            <Grid item>  <img alt="" src={Rectangle268} width="100%" height="200px" /></Grid>
                            <Grid item>   <img alt="" src={Rectangle268} width="100%" height="200px" /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} className={classes.homeSlider2}>
                        <Typography variant="h3" component="div"  >
                            <Typography variant="h3" color="primary" component="span" >
                                <b>The </b>
                            </Typography>
                            <Typography variant="h3" color="secondary" component="span" >
                                <b>Cuisine</b>
                            </Typography>
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 10 }}>
                            Name of the origin city
                        </Typography>
                        <Typography variant="caption" component="div" style={{ maxWidth: 290, marginTop: 10, fontSize: 14, textAlign: 'justify', fontWeight: 300, width: 290, color: '#333536' }}>
                            550 g - Serves 2
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 30 }}>
                            About the Cuisine
                        </Typography>
                        <Typography variant="caption" component="div" className={classes.ratingContr} >
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus semper urna,
                                dis risus pretium, auctor eget mi. Sapien vitae, lacus, aliquam quam imperdiet.
                                Suspendisse aliquam amet leo arcu enim molestie. Aliquam morbi diam in laoreet faucibus convallis ac.
                                Id donec malesuada porttitor id aenean.
                            </span>
                        </Typography>
                        <Typography variant="caption" component="div" style={{ marginTop: 30, fontSize: 24, textAlign: 'justify', fontWeight: 300, width: 290, color: '#737373' }}>
                            <img src={Group98434} style={{ marginRight: 5 }} /> 45 mins to prepare
                        </Typography>
                        <Grid container item spacing={3} style={{ marginTop: 20 }}>
                            <Grid item xs={12} md={6} sm={6} className={classes.homeSlider2}>
                                <Button variant="outlined" color="primary" className={`${classes.JMRbtnRateCntr} ${classes.JMRbtnRateCntrB1}`}>Order the Ingredients</Button>
                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default HeroRestaurant;
