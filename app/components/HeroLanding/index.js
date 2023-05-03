import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Frame from 'images/Frame.svg';





const AppWrapperContainer = styled.div`
max-width: 1070px;
margin: 0 auto;
overflow : hidden;

`;


const AppWrapper = styled.div`
width: 100%;
padding: 0 35px;
margin: 0 auto;
background-color : #edebe9;
background-repeat: no-repeat;
background-size: cover;
`;

const useStyles = makeStyles((theme) => ({
    searchHero: {
        padding: '40px 0',
        minHeight: '300px',
        position: 'relative',
    },
    fixedHeloLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        minHeight: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid3Sec: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '150px 1fr',
    },
    OfferLabelWrapper: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 100,
        fontWeight: 900,
        textTransform: 'uppercase'
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
        '& .MuiInputBase-input': {

        }
    },

}))


const HeroRestaurant = ({ imgSrc, heroText1 }) => {
    const classes = useStyles();

    const { history } = useContext(HistoryContext);


    return (
        <AppWrapper style={{ backgroundImage: `url(${imgSrc})` }}>
            <AppWrapperContainer >
                <Grid container item >
                    <Grid item xs={12} className={classes.searchHero}>
                        <Grid item className={classes.fixedHeloLabel}>
                            <Grid item container className={classes.grid3Sec}>
                                <Grid item justifyContent="center" alignItems="center" container >
                                    <IconButton
                                        style={{ color: '#fff' }}
                                        onClick={() => {
                                            history.push('/');
                                        }}
                                    >
                                        <ArrowBackIcon /> Home
                                    </IconButton>
                                </Grid>
                                <Grid item >
                                    <Grid item className={classes.OfferLabelWrapper}>
                                        <Grid item className={classes.OfferLabel}>
                                            {heroText1}
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" component="div" style={{ fontSize: 16, maxWidth: 600, margin: 'auto', color: '#fff', marginTop: 10, textAlign: 'center', fontWeight: 400, }}>
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit. Cras adipiscing arcu, id non lectus eget at.
                                        Phasellus vestibulum nam facilisis elit consectetur.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default HeroRestaurant;
