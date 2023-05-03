import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

import Rectangle5 from '../../../../images/Rectangle5.jpg';
import ellipse80 from '../../../../images/Ellipse80.svg';
import vector5 from 'images/Vector5.svg';
import Ellipse152 from 'images/Ellipse152.png';





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
background-repeat: repeat;
border-bottom : 3px solid #B69C72;
`;

const useStyles = makeStyles((theme) => ({
    nostalgiaContr: {
        padding: '30px 0',
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
    grid4Sec: {
        display: 'inline-grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridGap: 100,
        margin: 'auto',
        marginTop: 30,
        justifyItems: 'center',

    },
    iconDiv: {
        display: 'inline-grid',
        padding: 10,
        background: '#B69C72',
        borderRadius: '100%',
        margin: 'auto',
    },
    iconContnr: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#737373',
        fontSize: 16

    }

}))


const WhoWeARe = () => {
    const classes = useStyles();
    const player = useRef();
    const [isVideoInPlayState, setIsVideoInPlayState] = useState(false);

    const handleControlClick = () => {
        const JMRVideo = player.current;
        if (JMRVideo.paused) {
            JMRVideo.play();
            setIsVideoInPlayState(true);
        } else {
            JMRVideo.pause();
            setIsVideoInPlayState(false);
        }
    }

    const { history } = useContext(HistoryContext);


    return (
        <AppWrapper>
            <AppWrapperContainer >
                <Grid container item justifyContent="center" className={classes.nostalgiaContr}>
                    <Typography variant="h3" component="div"  >
                        <Typography variant="h3" color="primary" component="span" >
                            <b>How do</b>
                        </Typography>
                        &nbsp;
                        <Typography variant="h3" color="secondary" component="span" >
                            <b>I make this?</b>
                        </Typography>
                    </Typography>
                    <br />
                    <Grid container className={classes.videoContainer} role="button" onClick={handleControlClick}>
                        <Grid container className={classes.videoWrapper} >
                            <video width="1074" height="517" ref={player} className={classes.videoCss} loop controls={isVideoInPlayState}>
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/ogg" />
                                Your browser does not support HTML video.
                            </video>
                            {!isVideoInPlayState && <Grid item container className={classes.playerControls} role="button" >
                                <Grid item className={classes.controler} >
                                    <img src={ellipse80} />
                                    <Grid item className={classes.playBtn}>
                                        <img src={vector5} />
                                    </Grid>
                                </Grid>
                            </Grid>}
                            {!isVideoInPlayState && <Grid item className={classes.videoDesc}>
                                <Typography variant="caption" style={{ maxWidth: 765, marginTop: 10, textAlign: 'justify', fontWeight: 300 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, id scelerisque ipsum
                                    dictumst elementum at cursus pulvinar purus. Egestas id massa vestibulum ipsum orci.
                                    Viverra duis dolor libero, est varius ac sollicitudin imperdiet. Ante at pellentesque quisque metus,
                                    montes, lectus volutpat integer scelerisque. Purus sed ut fusce lorem. Enim ut. Egestas id massa vestibulum ipsum orci.
                                </Typography>
                            </Grid>}
                        </Grid>
                    </Grid>
                    <Typography color="primary" component="div" style={{ marginTop: 30 }}>
                        <b>Things you need in your kitchen</b>
                    </Typography>
                    <Grid item className={classes.grid4Sec}>
                        <Grid item className={classes.iconContnr} >
                            <Grid item className={classes.iconDiv}><img src={Ellipse152} /></Grid>
                            <Typography component="div" style={{ maxWidth: 765, marginTop: 10, textAlign: 'justify', fontWeight: 300 }}>
                                Microwave oven
                            </Typography>
                        </Grid>
                        <Grid item className={classes.iconContnr} >
                            <Grid item className={classes.iconDiv} ><img src={Ellipse152} /></Grid>
                            <Typography component="div" style={{ maxWidth: 765, marginTop: 10, textAlign: 'justify', fontWeight: 300 }}>
                                Microwave oven
                            </Typography></Grid>
                        <Grid item className={classes.iconContnr} >
                            <Grid item className={classes.iconDiv} ><img src={Ellipse152} /></Grid>
                            <Typography component="div" style={{ maxWidth: 765, marginTop: 10, textAlign: 'justify', fontWeight: 300 }}>
                                Microwave oven
                            </Typography></Grid>
                        <Grid item className={classes.iconContnr} >
                            <Grid item className={classes.iconDiv} ><img src={Ellipse152} /></Grid>
                            <Typography component="div" style={{ maxWidth: 765, marginTop: 10, textAlign: 'justify', fontWeight: 300 }}>
                                Microwave oven
                            </Typography></Grid>
                    </Grid>
                </Grid>

            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default WhoWeARe;
