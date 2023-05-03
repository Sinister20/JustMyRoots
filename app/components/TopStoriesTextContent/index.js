import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
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

    paragraph: {
        fontWeight: 300,
        fontSize: 15,
        color: '#737373',
        marginBottom: 30,
        textAlign: 'center'
    }

}))


const TopStoriesTextContent = () => {
    const classes = useStyles();



    return (
        <AppWrapper>
            <AppWrapperContainer >
                <Grid container item justifyContent="center" className={classes.nostalgiaContr}>
                    <Grid item style={{ textAlign: 'center' }}  >
                        <Typography variant="h3" color="primary" component="span" >
                            <b>The Name of </b>
                        </Typography>
                        &nbsp;
                        &nbsp;
                        <Typography variant="h3" color="secondary" component="span" >
                            <b>the Story</b>
                        </Typography>
                    </Grid>
                </Grid>
                <AppWrapperContainer>
                    <Typography className={classes.paragraph} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est diam facilisis vulputate ultrices est, ut.
                        Nunc quam egestas iaculis felis nulla orci.
                        Nulla semper urna sapien ut viverra vulputate varius sit.
                        Nunc amet lacus volutpat pellentesque pellentesque pellentesque nec, nibh.
                        Euismod integer pretium, convallis diam.
                        Risus fringilla at dictum dignissim id. Morbi mauris velit eros, ut proin accumsan tincidunt.
                        Elit pharetra tellus mauris interdum.
                        Integer odio ipsum donec diam vitae duis. Donec accumsan blandit a pellentesque eget et, a.
                        Scelerisque massa lectus sed risus. Felis, donec tellus risus sem ut commodo sodales.
                        Quis pulvinar gravida eget odio diam.
                    </Typography>

                    <Typography className={classes.paragraph} >
                        Scelerisque massa lectus sed risus. Felis, donec tellus risus sem ut commodo sodales. Quis pulvinar gravida eget odio diam.
                    </Typography>

                    <Typography className={classes.paragraph} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Est diam facilisis vulputate ultrices est, ut.
                        Nunc quam egestas iaculis felis nulla orci. Nulla semper urna sapien ut viverra vulputate varius sit.
                        Nunc amet lacus volutpat pellentesque pellentesque pellentesque nec, nibh. Euismod integer pretium, convallis diam.
                        Risus fringilla at dictum dignissim id. Morbi mauris velit eros, ut proin accumsan tincidunt.
                        Elit pharetra tellus mauris interdum. Integer odio ipsum donec diam vitae duis. Donec accumsan </Typography>
                </AppWrapperContainer>
            </AppWrapperContainer>
        </AppWrapper >
    );
}

export default TopStoriesTextContent;
