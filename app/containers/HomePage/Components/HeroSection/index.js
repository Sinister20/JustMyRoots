import React, { useRef, useState } from 'react';
import { Grid, makeStyles, Typography, Hidden } from '@material-ui/core';
import ellipse80 from '../../../../images/Ellipse80.svg';
import vector5 from '../../../../images/Vector5.svg';
import heroVideo from '../../../../images/hero.mp4';
import videoPlacholder from '../../../../images/video-placeholder.jpg';
import bgImage from '../../../../images/bg-image.jpg';
import Chole from '../../../../images/chole.jpg';

import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import {  sliderOptionsBanner } from '../../../../utils/utils';
const useStyles = makeStyles(theme => ({
  videoContainer: {
    maxWidth: 1500,
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      width: '100%',
    },
  },
  videoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: '0 120px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 60px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 10px',
    },
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
    alignItems: 'center',
  },
  topBarText: {
    textAlign: 'center',
    fontSize: '34px',
    '& span': {
      color: '#ac1715',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      padding: '0 10px',
    },
  },
  playBtn: {
    position: 'absolute',
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0px 0px 0px 0px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 5px',
      },
      '& .owl-stage-outer': {
        zIndex: 1,
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      justifyContent: 'space-between',
      zIndex: 10,
      left: '0px',
      transform: 'translateY(-50%)',
      display: 'flex !important',
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
    '& .owl-item': {
      padding: '20px 15px',
      '&.active:first': {
        paddingLeft: 20,
      },
       '& img':{
       borderRadius:'10px'
       },
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
    },
    '& .owl-prev': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .owl-next': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  voucherMain:{
    
    '& .terms': {
      background: '#D9D9D9',
      padding: 16,
      
    },
    '& h6': {
      margin: '0 0 6px 0',
          fontWeight: 'bold',
          fontSize: '13px',
    },
    '& p': {
      margin: '0 0 6px 0',
          fontWeight: 'normal',
          fontSize: '11px',
    },
  },
  voucherModal:{
    border:'12px solid #fca210',
    padding:  '0 0 0 20px',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      padding:  '0',
    },
    '& h3': {
      marginBottom: '0',
      marginTop: '12px',
      fontWeight: 'normal',
      fontSize: '40px',
      paddingLeft: 10,


    },
    '& .content': {
      color: '#fff',
      position: 'relative',
      zIndex: 1,
      '& .box-layout': {
        position: 'relative',
        '& span': {
          position: 'absolute',
          border: '6px solid #fca210',
          width: 150,
          height: 150,
          left: 10,
          top: 20,
          zIndex: 1,

        },
      },
      '& h1': {
        marginTop: '0',
        marginBottom: '0',
        position: 'relative',
        fontSize: '126px',
        paddingLeft: 60,
        paddingTop: 5,
        zIndex: 9,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
          fontSize: '110px',
        },
      },
      '& p': {
        color: '#fca210',
        fontSize: '64px',
        marginTop: '0',
        marginBottom: '0',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
          fontSize: '48px',
        },
      },
      '& .bottom-content': {
        [theme.breakpoints.down('xs')]: {
          padding:  '0 0 20px 0',
        },
        '& h4': {
          margin: '0 0 6px 0',
          fontWeight: 'normal',
          fontSize: '24px',
          [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
          },
        },
        '& .code': {
          fontSize: '40px',
          [theme.breakpoints.down('xs')]: {
            fontSize: '24px',
          },
          fontWeight: 'bold',
        },
        '& .primary': {
          color: '#fca210',
        },
      },
    },
  },
  voucherBG:{
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
    width: '100%',
  },
  cashback:{
      width:'100%',
      display:'flex',
      justifyContent:'center',
      fontSize:'24px',
      background:'#E8E8E8',
      fontWeight:'bold',
      padding:'5px 0 5px 0',

      [theme.breakpoints.down('sm')]: {
        fontSize: '7px',
        padding:'5px 0 5px 0',
      },
     
  },
  sp:{
   color:'#ac1715',
   fontWeight:'bolder',
   margin:'0 4px 0 4px'
  }
}));
const HeroSection = ({ data, heroHomeBanner,history }) => {
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
  };
  // const _renderVideoGrid = () => (<>

  //   <Grid className={[classes.videoWrapper, 'video-wrapper'].join(' ')}>
  //     <video
  //       width="100%"
  //       ref={player}
  //       className={classes.videoCss}
  //       loop
  //       poster={videoPlacholder}
  //       controls={isVideoInPlayState}
  //     >
  //       {/* <source src={data.videoUrl} type="video/mp4" />
  //           <source src={data.videoUrl} type="video/ogg" /> */}
  //       <source src={data && data.videoUrl ? data.videoUrl : heroVideo} type="video/mp4" />
  //       <source src={data && data.videoUrl ? data.videoUrl : heroVideo} type="video/ogg" />
  //       Your browser does not support HTML video.
  //     </video>
  //     {!isVideoInPlayState && (
  //       <Grid
  //         item
  //         container
  //         className={classes.playerControls}
  //         role="button"
  //       >
  //         <Grid item className={classes.controler}>
  //           <img src={ellipse80} />
  //           <Grid item className={classes.playBtn}>
  //             <img src={vector5} />
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     )}
  //   </Grid>
  // </>)
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Grid
        className={[classes.videoContainer, 'video-section-landing'].join(' ')}
        role="button"
        onClick={handleControlClick}
      >
        <Grid
          className="video-heading"
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
          <h1 className={classes.topBarText}>
             India's <span>FIRST & LARGEST INTER-CITY </span>
               Food Delivery Platform
            </h1>
           
          </Grid>
          <div className={classes.cashback}>
               Register Now to <span className={classes.sp}>Enjoy 100/- off</span> on your Order Value and Avail <span className={classes.sp}> Free Delivery</span> on Orders above 750/-
              </div>
        </Grid>

       
        <div className={classes.OwlCarousel}>
        <OwlCarousel options={sliderOptionsBanner} >
          {
            heroHomeBanner && heroHomeBanner.map((item, index) => (
              <div className={classes.pointer} onClick={()=>window.location.href=item.link} key={index}>
                <img src={item.imageUrl} alt="hero" />
              </div>
            ))
            }
          </OwlCarousel>
          </div> 

      </Grid>
    </div>
  );
};
export default HeroSection;




