import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Box, Button, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
    cardTop:{
        width: '100%',
        boxShadow: '0px 2px 15px #CFCFCF',
        borderRadius: 12,
        padding: 10,
        height: '100%',
        
        [theme.breakpoints.down('sm')]: {
          padding: 15,
        }, 
    },
    cardOfferTop:{
        width: '100%',
        boxShadow: '0px 2px 15px #CFCFCF',
        borderRadius: 10,
        padding: 8,
        height: '100%',

        
        [theme.breakpoints.down('sm')]: {
          padding: 15,
        },
      },
      offerCardMainTop:{
        textDecoration:'none',
        textAlign:'left',
        fontSize:'16px',
        fontWeight:'bold',
       },
       descTop:{
        color:'black',
        padding:'5px',
       },
       imgCardTop: {
          width: '100%',
          height: 180,
          borderRadius: 8,
          // border: '1px solid #D3D3D3',
          objectFit:'fill',
          // backgroundColor:'black',
    
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            // height: 128,         
        }
      },

})

const TopCards = ({
    classes,
  imgSrc,
  productData,
  subHeader,
  homecard,
  offerCard,
  ...rest
}) => {

  return (
    <Card  className={classes.cardOfferTop}>
    <Link to={productData.webLink} {...rest} className={classes.offerCardMainTop}>
    {/* <div className={classes.descTop}>{subHeader}</div> */}
      <img src={imgSrc} className={classes.imgCardTop} alt={productData.name} />
    </Link>
    </Card>  )
}

export default withStyles(styles)(TopCards);
