import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Rectangle5 from '../../../../images/Rectangle5.jpg';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import Ellipse152 from 'images/Ellipse152.png';
import ListContr from '../Assets/ListContr';





const AppWrapper = styled.div`
width: 100%;
margin: 0 auto;
`;

const useStyles = makeStyles((theme) => ({
    heroRestaurant: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        flexBasis: '50%',
        minHeight: 460,
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
    },
    homeSlider1: {
        background: '#fff',
        flexGrow: 1,
        width: '50%',
        borderRight: '1px solid #B69C72'
    },
    homeSlider2: {
        background: '#f6f5f4',
        flexGrow: 1,
        width: '50%',
    },
    leftSec: {
        maxWidth: 535,
        marginLeft: 'auto',
        padding: 40,
    },
    rightSec: {
        maxWidth: 535,
        marginRight: 'auto',
        padding: 40,

    },
    iconDiv: {
        padding: 10,
        background: '#B69C72',
        borderRadius: '100%',
        height: 60,
        width: 60
    },
    iconContnr: {
        display: 'flex',
        flexDirection: 'row',
        color: '#737373',
        fontSize: 16,
        marginTop: 40,
        alignItems: 'center'
    }

}))


const HeroRestaurant = () => {
    const classes = useStyles();





    return (
        <AppWrapper>
            <Grid container item className={classes.heroRestaurant}>
                <Grid justifyContent="center" alignItems="center" className={classes.homeSlider1}>
                    <Grid item className={classes.leftSec}>
                        <Typography color="primary" component="div" style={{ fontSize: 26 }}>
                            <b>Things you need in your kitchen</b>
                        </Typography>
                        <Typography variant="caption" component="div" style={{ marginTop: 15, marginBottom: 15 }} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus semper urna, dis risus pretium, auctor eget mi.
                        </Typography>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Grid item className={classes.iconContnr} >
                                <Grid item className={classes.iconDiv}><img src={Ellipse152} /></Grid>
                                <Grid component="div" style={{ width: '100%', paddingLeft: 15, textAlign: 'justify', fontWeight: 300 }}>
                                    <Typography component="div" style={{ fontWeight: 300, fontSize: 16 }}>
                                        Step {i}
                                    </Typography>
                                    <Typography component="div" color="primary" style={{ fontSize: 16, fontWeight: 500 }} >
                                        Feugiat mauris metus aliquam erat egestas.
                                    </Typography>
                                    <Typography component="div" color="primary" style={{ fontSize: 16, fontWeight: 300 }} >
                                        Time: 15 mins
                                    </Typography>
                                </Grid>
                            </Grid>))}
                    </Grid>

                </Grid>
                <Grid className={classes.homeSlider2}>
                    <Grid item className={classes.rightSec}>
                        <Typography color="primary" component="div" style={{ fontSize: 26 }}>
                            <b>Things you need in your kitchen</b>
                        </Typography>
                        <Typography variant="caption" component="div" style={{ marginTop: 15, marginBottom: 15 }} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus semper urna, dis risus pretium, auctor eget mi.
                        </Typography>
                        <br />
                        <ListContr />
                        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                        <ListContr />
                        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                        <ListContr />
                        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                        <ListContr />

                    </Grid>
                </Grid>
            </Grid>
        </AppWrapper >
    );
}

export default HeroRestaurant;
