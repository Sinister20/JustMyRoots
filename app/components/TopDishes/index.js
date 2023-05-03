import React, { useEffect } from 'react'
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';
import JMRSlider from '../JMRSlider';
import LoadingIndicator from '../LoadingIndicator';
import ImageCardWithTitleBtn from '../ImageCardWithTitleBtn';
import { useState } from 'react';
import CuisineImg from '../../images/Cuisine.jpg'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import { sliderOptions2 } from '../../utils/utils';
import TopCards from './components/TopCards';
import foodGif from '../../images/foodGif.gif'


const useStyles = makeStyles(theme =>({
  topWrapper:{
    maxWidth: 1424,
    margin: '0px auto 10px',
    width: '100%',
    overflow: 'hidden',
    padding: 11,
    [theme.breakpoints.down('sm')]: {
      margin: '0px auto 20px',
      marginBottom: '1px',
    },
  },
  OwlCarousel:{
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 9999,
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
      [theme.breakpoints.down('sm')]: {
        padding: '20px 10px',
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
    '& .overlay': {
       overflow: 'scroll',
    },
  },
  // topItems:{
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   // paddingBottom: 20,
  //   flexFlow: 'wrap',
  //   //border: '1px solid red',
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'block', 
  //     // paddingTop: 15,
  //   }
  // },

}))

const CustomGridOrSlider = props =>
props.grid ? (
  <Grid container spacing ={1} {...props}>
    <Box mx={3} my={3}>
      {''}
      {props.children}
    </Box>
  </Grid>
) : (
  <>{props.children}</>
)

// const data = [
//   {
//     imageUrl:'https://jmr-prod-01.s3.amazonaws.com/mango-web-banner-final-final.jpg',
//     link:'https://justmyroots.com/cuisine/Directly-from-goa',
//     id:1,
//   },
//   {
//     imageUrl:'https://jmr-prod-01.s3.amazonaws.com/mango-web-banner-final-final.jpg',
//     link:'https://justmyroots.com/cuisine/Directly-from-goa',
//     id:2,
//   },
//   {
//     imageUrl:'https://jmr-prod-01.s3.amazonaws.com/mango-web-banner-final-final.jpg',
//     link:'https://justmyroots.com/cuisine/Directly-from-goa',
//     id:3,
//   },
//   {
//     imageUrl:'https://jmr-prod-01.s3.amazonaws.com/mango-web-banner-final-final.jpg',
//     link:'https://justmyroots.com/cuisine/Directly-from-goa',
//     id:4,
//   },
//   {
//     imageUrl:'https://jmr-prod-01.s3.amazonaws.com/mango-web-banner-final-final.jpg',
//     link:'https://justmyroots.com/cuisine/Directly-from-goa',
//     id:5,
//   },
// ]

const TopDishes = ({
data=[],
}) => {
  const classes = useStyles({});
 const [slider , setSlider] = useState(true)
  useEffect(() =>{
    console.log(data)
  },[])

  return (
    <div className={classes.topWrapper}>
      <div className={classes.OwlCarousel}>
        {data.length>0 && 
      <OwlCarousel options={sliderOptions2} > 
      {
        data && data.map((item,index)=>(
          <Box my={1} key={item.sequence}>
          <TopCards 
          productData={{
            name:'test',
            description:'Test Cards',
            webLink:item.link,
          }}
          imgSrc={item.imageUrl}
          subHeader='Test Card'
          />
          </Box>
        ))
      }
      
          {/* <Box my={1}>
           
           <TopCards 
           productData={{
            name:'test',
            description:'test',
            weblink:''
            
           }}
           imgSrc={CuisineImg}
           subHeader={'test'}
           />
          </Box>
      
          <Box my={1}>
          <TopCards 
           productData={{
            name:'test',
            description:'test',
            weblink:''
            
           }}
           imgSrc={CuisineImg}
           subHeader={'test'}
           />
          </Box>
          <Box my={1}>
          <TopCards 
           productData={{
            name:'test',
            description:'test',
            weblink:''
            
           }}
           imgSrc={CuisineImg}
           subHeader={'test'}
           />
          </Box>
       
          <Box my={1}>
          <TopCards 
           productData={{
            name:'test',
            description:'test',
            weblink:''
            
           }}
           imgSrc={CuisineImg}
           subHeader={'test'}
           />
          </Box>
       
          <Box my={1}>
          <TopCards 
           productData={{
            name:'test',
            description:'test',
            weblink:''
            
           }}
           imgSrc={CuisineImg}
           subHeader={'test'}
           />
          </Box> */}

         
         
       </OwlCarousel>
}
       </div>

    </div>
  )
}

export default TopDishes