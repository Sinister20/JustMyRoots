import React from 'react';
import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Grid
} from '@material-ui/core';
import image from '../../../../../images/imagehu15.png';
import Group261 from '../../../../../images/Group 261.svg';
import Star from '../../../../../images/Star 7.svg';
import veg from '../../../../../images/veg.svg';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: '20px 0',
    borderBottom: '1px solid gray',
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 'unset',
      paddingRight: 'unset',
      flexDirection: 'column',
    },
  },
  rightContainer: {
    marginLeft: 35,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5,
    },
  },
  starContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
  },
  dishName: {
    fontSize: 22,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  nameofRestaurantText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: '#333536',
    marginTop: 5,
  },
  reOrderButton: {
    fontSize: 16,
    color: '#B69C72',
    textTransform: 'capitalize',
    height: 26,
  },
  price: {
    color: '#737373',
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 60,
  },
  rightContainerMobile: {
    width: '100%',
    marginLeft: 10,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 5,
    marginTop: 5,
  },
  pointer: {
    cursor: 'pointer',
  }
}));

const ItemCard = props => {
  const { id, cardData,onClick } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {
        //console.log(cardData)
      }
      <Grid onClick={onClick} container spacing={2} className={classes.pointer}>
        <Grid item xs={12} md={3} >
          <img
            style={{ height: 150, marginBottom: isMobile ? "10px" : 0, width: isMobile ? '100%' : "100%" }}
            alt="food"
            src={cardData.productImage || image}
          // height="150px"
          />
        </Grid>
        <Grid item xs={12} md={9} spacing={4} >
          <div className={classes.flexContainer} >
            <Typography variant='h3' color='primary' >  {cardData.itemName}</Typography>
            {
              cardData.itemType  && <img
              src={cardData.itemType ==="veg"?veg:Group261}
              alt="food type"
              height={20}
            />
            }
            
          </div>
          <div className={classes.flexContainer}   >
            <Typography variant='h4'  >   {cardData.shortDescription}</Typography>
            {cardData.ratings && (
              <>
                <span style={{ marginRight: 6, color: '#333536' }}>{cardData.ratings}</span>
                <img src={Star} alt="star" />
              </>
            )}
          </div>
          <div className={classes.flexContainer}>
            <Grid container alignItems='center'>
              <Typography variant='h5' component="span">From: </Typography>&nbsp;
              <Typography variant='h5' component="span">{cardData.brand}</Typography>
            </Grid>
          </div>
          <div className={classes.flexContainer}>
            <Grid container alignItems='center'>
              <Typography variant='h5' component="span">Quantity: </Typography>&nbsp;
              <Typography variant='h5' component="span">{cardData.quantity}</Typography>
            </Grid>
          </div>
          <div className={classes.flexContainer}>
            <Grid container alignItems='center'>
              <Typography style={{marginLeft:"auto"}} variant='h5' component="span">₹{cardData.itemPrice}</Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
      

    </>
  );
};

export default ItemCard;
