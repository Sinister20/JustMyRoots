import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Rating, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
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
background-color: #edebe9;
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
        display: 'block',
        padding: '0px 35px',
        maxHeight: 25
    },
    JMRbtnRateCntrB1: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 700,
        color: '#fff !important'
    },
    grid2Sec: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 30,
    },
    homeSlider2: {
        paddingLeft: '60px !important'
    },
    quantityContainer: {
        padding: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& button': {
            color: '#000',
            padding: '0px 20px',
            fontWeight: 400,
            fontSize: 15,
            textTransform: 'capitalize'
            // border: 'none'
        }
    }

}))


const HeroRestaurant = () => {
    const classes = useStyles();

    const [quantity, setQuantity] = useState(0);


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
                    <Grid item xs={12} md={4} sm={6} justifyContent="center" alignItems="center" className={classes.homeSlider1}>
                        <OwlCarousel options={options} >
                            {[1, 2, 3].map(() => {
                                return [
                                    <Grid item className={classes.sliderCard1}>
                                        <img height="300px" alt="" src={Rectangle268} />
                                        {/* <p className="legend">Legend 1</p> */}
                                    </Grid>,
                                    <Grid item className={classes.sliderCard1}>
                                        <img height="300px" alt="" src={Rectangle268} />
                                        {/* <p className="legend">Legend 1</p> */}
                                    </Grid>
                                ]
                            })}
                        </OwlCarousel>
                        <Grid item className={classes.grid2Sec} >
                            <Grid item>  <img alt="" src={Rectangle268} width="100%" height="150px" /></Grid>
                            <Grid item>   <img alt="" src={Rectangle268} width="100%" height="150px" /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8} sm={6} className={classes.homeSlider2}>
                        <Typography variant="h3" component="div"  >
                            <Grid item>
                                <span style={{ fontSize: 30 }}>4.5</span> <Rating max={1} name="read-only" value={1} readOnly />
                            </Grid>
                            <Typography variant="h3" color="primary" component="span" >
                                <b>Name</b>
                            </Typography>
                            &nbsp;
                            <Typography variant="h3" color="secondary" component="span" >
                                <b>of the dish</b>
                            </Typography>
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, color: '#737373', marginTop: 10 }}>
                            <b>From:</b> Name of Restaurant
                        </Typography>
                        <Typography variant="caption" component="div" style={{ maxWidth: 290, marginTop: 10, fontSize: 14, textAlign: 'justify', fontWeight: 300, width: 290, color: '#333536' }}>
                            Name of the city
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 30 }}>
                            Main Ingredients
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 30 }}>
                            How is the recipie prepared?
                        </Typography>
                        <Typography variant="caption" component="div" className={classes.ratingContr} >
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus semper urna,
                                dis risus pretium, auctor eget mi. Sapien vitae, lacus, aliquam quam imperdiet.
                                Suspendisse aliquam amet leo arcu enim molestie. Aliquam morbi diam in laoreet faucibus convallis ac.
                                Id donec malesuada porttitor id aenean.
                            </span>
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, color: 'red', fontWeight: 100, marginTop: 30 }}>
                            <b>Get Up to 50% OFF</b>  |  Use code ABGD3FFG
                        </Typography>
                        <Typography variant="subtitle2" component="div" style={{ maxWidth: 765, marginTop: 30, fontWeight: 900 }}>
                            Quantity
                        </Typography>
                        <Grid container item style={{ marginTop: 20 }}>
                            <Grid item xs={12} md={10} sm={12} >
                                <Grid item className={classes.quantityContainer}>
                                    <ToggleButtonGroup
                                        className={classes.incrDecrGrp}
                                        exclusive
                                    >
                                        <ToggleButton onClick={() => { if (quantity > 0) setQuantity(quantity - 1) }}>-</ToggleButton>
                                        <ToggleButton >
                                            <Typography variant="dark" color="dark">
                                                {quantity}
                                            </Typography>
                                        </ToggleButton>
                                        <ToggleButton onClick={() => { setQuantity(quantity + 1) }} >+</ToggleButton>
                                    </ToggleButtonGroup>
                                    <Button variant="contained" color="primary" className={`${classes.JMRbtnRateCntr} ${classes.JMRbtnRateCntrB1}`}>Add to Cart</Button>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12} >
                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default HeroRestaurant;
