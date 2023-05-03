import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { HistoryContext } from 'containers/App/HistoryContext';
import { Rating } from '@material-ui/lab';
import Ellipse1 from 'images/Ellipse1.png'





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
        padding: '0 0 30px',
        flexDirection: 'column',
        alignItems: 'center',

    },
    heroRestaurant: {
        marginTop: 20,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        flexBasis: '20%',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        marginBottom: 50
    },
    homeSlider1: {
        // background: '#fff',
        padding: 30,
        flexGrow: 1,
        width: '80%',
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
        width: '100%',
        textAlign: 'right',
        textAlign: 'center'
    },
    description: {
        textAlign: 'left',
        marginLeft: 'auto',
        rowGap: 20
    },
    ratings: {
        marginTop: 50
    },
    ratingRow: {
        display: 'grid',
        gridTemplateColumns: '15px 50px auto',
        marginTop: 10,
        '& > Div': {
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 900,
            fontSize: 20
        }
    },
    userProfile: {
        display: 'flex',
        '& > img': {
            marginRight: 30
        }
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
                    <Typography variant="h3" component="div"  >
                        <Typography variant="h4" color="primary" component="span" >
                            <b>Client</b>
                        </Typography>
                        &nbsp;
                        <Typography variant="h4" color="secondary" component="span" >
                            <b>Reviews</b>
                        </Typography>
                    </Typography>
                </Grid>
                <Divider />
                <Grid item container className={classes.heroRestaurant} >
                    <Grid item xs="12" sm="12" md="3" className={classes.homeSlider1}>
                        <Grid item className={classes.dateAvail}>
                            <Rating max={5} name="read-only" style={{ margin: 'auto' }} value={3} readOnly />
                            <Typography >5/5  Excellent</Typography>
                        </Grid>
                        <Grid item className={classes.ratings}>
                            <Grid item className={classes.ratingRow}>
                                <Typography component="div" >5</Typography>
                                <Rating max={1} name="read-only" value={1} readOnly />
                                <Slider
                                    defaultValue={5}
                                    getAriaValueText={() => { }}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={0}
                                    max={5}
                                    disabled
                                />
                            </Grid>
                            <Grid item className={classes.ratingRow}>
                                <Typography component="div" >3</Typography>
                                <Rating max={1} name="read-only" value={1} readOnly />
                                <Slider
                                    defaultValue={3}
                                    getAriaValueText={() => { }}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={0}
                                    max={5}
                                    disabled
                                />
                            </Grid>
                            <Grid item className={classes.ratingRow}>
                                <Typography component="div" >4</Typography>
                                <Rating max={1} name="read-only" value={1} readOnly />
                                <Slider
                                    defaultValue={4}
                                    getAriaValueText={() => { }}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={0}
                                    max={5}
                                    disabled
                                />
                            </Grid>
                            <Grid item className={classes.ratingRow}>
                                <Typography component="div" >2</Typography>
                                <Rating max={1} name="read-only" value={1} readOnly />
                                <Slider
                                    defaultValue={2}
                                    getAriaValueText={() => { }}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={0}
                                    max={5}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs="12" sm="12" md="9" className={classes.homeSlider2}>
                        <Grid item className={classes.description}>
                            <Grid item className={classes.userProfile}>
                                <img src={Ellipse1} width="90px" height="90px" />
                                <Grid item style={{ textAlign: 'left' }}>
                                    <Grid item >
                                        <Typography ><b>Name Surname</b></Typography>
                                        <span style={{ color: '#818181' }}>Date here</span>
                                    </Grid>
                                    <Rating max={5} name="read-only" value={3} readOnly />
                                </Grid>
                            </Grid>
                            <span style={{ display: 'block', fontSize: 14, marginTop: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam facilisis elit consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </span>
                            <Divider style={{ background: '#B69C72', margin: '20px 0' }} />
                        </Grid>
                        <Grid item className={classes.description}>
                            <Grid item className={classes.userProfile}>
                                <img src={Ellipse1} width="90px" height="90px" />
                                <Grid item style={{ textAlign: 'left' }}>
                                    <Grid item >
                                        <Typography ><b>Name Surname</b></Typography>
                                        <span style={{ color: '#818181' }}>Date here</span>
                                    </Grid>
                                    <Rating max={5} name="read-only" value={3} readOnly />
                                </Grid>
                            </Grid>
                            <span style={{ display: 'block', fontSize: 14, marginTop: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam facilisis elit consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </span>
                            <Divider style={{ background: '#B69C72', margin: '20px 0' }} />
                        </Grid>
                        <Grid item className={classes.description}>
                            <Grid item className={classes.userProfile}>
                                <img src={Ellipse1} width="90px" height="90px" />
                                <Grid item style={{ textAlign: 'left' }}>
                                    <Grid item >
                                        <Typography ><b>Name Surname</b></Typography>
                                        <span style={{ color: '#818181' }}>Date here</span>
                                    </Grid>
                                    <Rating max={5} name="read-only" value={5} readOnly />
                                </Grid>
                            </Grid>
                            <span style={{ display: 'block', fontSize: 14, marginTop: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam facilisis elit consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </span>
                            <Divider style={{ background: '#B69C72', margin: '20px 0' }} />
                        </Grid>
                    </Grid>
                </Grid>

            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default TheSchedule;
