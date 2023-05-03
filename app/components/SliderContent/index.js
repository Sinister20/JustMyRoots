import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import { HistoryContext } from 'containers/App/HistoryContext';
import Rectangle1160 from 'images/Rectangle1160.jpg';
import { JmrCardType1 } from 'components';


const AppWrapperContainer = styled.div`
max-width: 1070px;
margin: 0 auto;
overflow : hidden;
`;


const AppWrapper = styled.div`
width: 100%;
padding: 0 35px 10px;
margin: 0 auto;
background-color : #f5f5f5;
`;

const useStyles = makeStyles((theme) => ({
    nostalgiaContr: {
        padding: '60px 0 30px',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 720,
        margin: 'auto',
    },

    btnContainer: {
        padding: '0 35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '22px 0',
        '& button': {
            height: 22,
            fontSize: 13,
            fontWeight: 300,
            color: '#333536',
            textTransform: 'capitalize',
            margin: 5
        }
    },
    heroOffer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 21,
        marginBottom: 100
    },
    cardBtn: {
        border: '1px solid #B8ADA5',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'capitalize',
        color: '#B8ADA5',
        height: 33,
        marginLeft: 20
    }

}))


const BestMarketPlace = ({ imgSrc }) => {
    const classes = useStyles();

    const { history } = useContext(HistoryContext);


    const options = {
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        loop: true,
        // autoplayHoverPause: true,
        // animateOut: 'slideOutDown',
        // animateIn: 'flipInX',
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        },
    };

    return (
        <AppWrapper>
            <AppWrapperContainer >
                <Grid container item justifyContent="center" className={classes.nostalgiaContr}>
                    <Grid item style={{ textAlign: 'center' }}  >
                        <Typography variant="h3" color="primary" component="span" >
                            <b>The Best </b>
                        </Typography>
                        &nbsp;
                        &nbsp;
                        <Typography variant="h3" color="secondary" component="span" >
                            <b>Marketplace</b>
                        </Typography>
                    </Grid>
                </Grid>
                <AppWrapperContainer>
                    <OwlCarousel options={options} >
                        {[1, 2, 3, 4, 5, 6, 7].map(() => <JmrCardType1 history={history} style={{ marginBottom: 30 }} filters={{}} imgSrc={imgSrc || Rectangle1160} />
                        )}
                    </OwlCarousel>
                </AppWrapperContainer>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default BestMarketPlace;
