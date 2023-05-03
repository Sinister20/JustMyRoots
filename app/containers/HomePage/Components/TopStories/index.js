import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import { HistoryContext } from 'containers/App/HistoryContext';
import Rectangle210 from '../../../../images/Rectangle210.jpg';
import Rectangle5 from '../../../../images/Rectangle5.jpg';


const AppWrapperContainer = styled.div`
max-width: 1070px;
margin: 0 auto;
overflow : hidden;
`;


const AppWrapper = styled.div`
width: 100%;
padding: 0 35px;
margin: 0 auto;
background-color : #F5F5F5;
border-bottom : 1px solid #000000;
background-image : url(${Rectangle5});
background-repeat: repeat;
`;

const useStyles = makeStyles((theme) => ({
    nostalgiaContr: {
        padding: '60px 0',
        flexDirection: 'column',
        alignItems: 'center'

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
        cursor: 'pointer'
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
        alignItems: 'center'
    },
    playBtn: {
        position: 'absolute'
    },
    videoDesc: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: '30px',
        color: '#ffffff',
        textAlign: 'center'
    },
    cardsContianer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 30,
        paddingBottom: 40,
        borderRadius: 4,
    },
    maaKeHathKaKhanaContnr: {
        width: '100%',
        position: 'relative',
    },
    contentContr: {
        position: 'absolute',
        bottom: 0,
        right: '10%',
        left: '10%',
        color: '#ffffff'
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
        border: '2px solid #FFFFFF'
    }
}))


const TopStories = () => {
    const classes = useStyles();

    const { history } = useContext(HistoryContext);


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
                <Grid container item justifyContent="center" className={classes.nostalgiaContr}>
                    <Typography variant="h3" component="div"  >
                        <Typography variant="h3" color="primary" component="span" >
                            <b>Top</b>
                        </Typography>
                        &nbsp;
                        <Typography variant="h3" color="secondary" component="span" >
                            <b>Stories</b>
                        </Typography>
                    </Typography>
                </Grid>
                <OwlCarousel options={options} >
                    {[1, 2, 3].map(() => <AppWrapperContainer className={classes.cardsContianer}>
                        <Grid item className={classes.maaKeHathKaKhanaContnr}>
                            <img src={Rectangle210} width="100%" />
                            <Grid className={classes.contentContr} >
                                <Typography variant="caption" style={{ maxWidth: 765, marginTop: 10, textAlign: 'center', fontWeight: 300 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean nibh et ac vitae auctor posuere sit et.
                                    Proin vel orci nulla sed ante sapien. Quisque id varius nulla lacus,
                                    lectus pharetra, purus. Eu nibh sagittis, faucibus faucibus mauris lorem posuere duis.
                                    Ullamcorper sed in euismod nec varius placerat. Amet, feugiat sit tincidunt quis odio.
                                    Aliquet diam molestie at
                                </Typography>
                                <Button onClick={() => {
                                    history.push('/top-stories')
                                }} variant="outlined" className={classes.cardBtn}>Check out Top Restaurents of Kolkata</Button>
                            </Grid>
                        </Grid>
                    </AppWrapperContainer>)}
                </OwlCarousel>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default TopStories;
