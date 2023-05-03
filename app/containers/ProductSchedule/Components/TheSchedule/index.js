import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

import Rectangle5 from '../../../../images/Rectangle5.jpg';
import ellipse80 from '../../../../images/Ellipse80.svg';
import vector5 from 'images/Vector5.svg';
import Ellipse152 from 'images/Ellipse152.png';
import { Description } from '@material-ui/icons';





const AppWrapperContainer = styled.div`
max-width: 1070px;
margin: 0 auto;
overflow : hidden;
`;


const AppWrapper = styled.div`
width: 100%;
padding: 0 35px;
margin: 0 auto;
background-color : #fff;
`;

const useStyles = makeStyles((theme) => ({
    nostalgiaContr: {
        padding: '30px 0',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,

    },
    heroRestaurant: {
        marginTop: 20,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        flexBasis: '50%',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        marginBottom: 50
    },
    homeSlider1: {
        // background: '#fff',
        padding: 30,
        flexGrow: 1,
        width: '50%',
        borderRight: '1px solid #B69C72'
    },
    homeSlider2: {
        // background: '#f6f5f4',
        padding: 30,
        flexGrow: 1,
        width: '50%',
    },
    dateAvail: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '50%',
        marginLeft: 'auto',
        textAlign: 'right',
        rowGap: 20
    },
    description: {
        textAlign: 'left',
        marginLeft: 'auto',
        rowGap: 20
    }

}))


const TheSchedule = () => {
    const classes = useStyles();

    const { history } = useContext(HistoryContext);

    const weekDays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]


    return (
        <AppWrapper>
            <AppWrapperContainer >
                <Grid container item justifyContent="center" className={classes.nostalgiaContr}>
                    <Typography variant="h4" component="div"  >
                        <Typography variant="h4" color="primary" component="span" >
                            <b>The</b>
                        </Typography>
                        &nbsp;
                        <Typography variant="h4" color="secondary" component="span" >
                            <b>Schedule</b>
                        </Typography>
                    </Typography>
                    <Typography variant="caption" component="div" className={classes.ratingContr} >
                        This restaurant is operational on these days...
                    </Typography>
                </Grid>
                <Grid item container className={classes.heroRestaurant} >
                    <Grid item xs="12" sm="12" md="6" className={classes.homeSlider1}>
                        <Grid item className={classes.dateAvail}>
                            {weekDays.map((el, i) => <>
                                <Grid item style={{ textAlign: 'left' }}><b >{el}</b></Grid>
                                <Grid item>{i % 2 ? <span style={{ color: '#ccc' }}>Unavailable</span> : '9 am -12 pm'}</Grid>
                            </>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs="12" sm="12" md="6" className={classes.homeSlider2}>
                        <Grid item className={classes.description}>
                            <span style={{ display: 'block', color: 'red', fontSize: 12 }}>The item is unavailable at the moment!</span>
                            <span style={{ display: 'block', fontSize: 14 }}>Your order will be picked up on <b>Tomorrow, 23 - Jul - 2021</b></span>
                            <Divider style={{ background: '#B69C72', margin: '20px 0' }} />
                            <span style={{ display: 'block', fontSize: 14 }}><b>Why?</b></span>
                            <span style={{ display: 'block', fontSize: 14 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam facilisis elit consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </span>
                            <Divider style={{ background: '#B69C72', margin: '20px 0' }} />
                            <Button color="primary" variant="outlined">Order Now</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default TheSchedule;
