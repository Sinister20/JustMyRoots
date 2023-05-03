import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Box, Button, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { HistoryContext } from 'containers/App/HistoryContext';
import { Link } from 'react-router-dom';
import { PlaceholderImg } from '../../images/placeholder-img.png';

const styles = theme => ({
  card: {
    width: '100%',
    boxShadow: '0px 2px 15px #CFCFCF',
    borderRadius: 12,
    padding: 20,
    height: '100%',
    
    [theme.breakpoints.down('sm')]: {
      padding: 15,
    },
  },
  cardOffer:{
    width: '100%',
    boxShadow: '0px 2px 15px #CFCFCF',
    borderRadius: 12,
    padding: 8,
    height: '100%',
    
    [theme.breakpoints.down('sm')]: {
      padding: 15,
    },
  },
  offerCardMain:{
   textDecoration:'none',
   textAlign:'left',
   fontSize:'16px',
   fontWeight:'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#7D7B7B',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'capitalize',
    padding: 0,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    '& h3': {
      marginBottom: 10,
      fontSize: 14,
    },
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: 300,
  },
  cardBtn: {
    marginTop: 20,
    height: 35,
    padding: '5px 10px',
  },
  imgCard({ offerCard }) {
    return {
      width: '100%',
      height: offerCard ? 231 : 188,
      borderRadius: 8,
      // border: '1px solid #D3D3D3',
      objectFit:'fill',
      // backgroundColor:'black',

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        // height: 128,
      },
    };
  },
  desc:{
   color:'black',
   padding:'5px',
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: '14px',
    fontWeight: 400,
    marginTop: 16,
    color: '#666666',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
  readmore: {
    color: '#AC1715',
    fontSize: 12,
    fontWeight: 700,
    textDecoration: 'none',
  },
});

const RecipeReviewCard = ({
  classes,
  imgSrc,
  productData,
  subHeader,
  homecard,
  offerCard,
  ...rest
}) => {
  const { history } = useContext(HistoryContext);
   
  
  return offerCard ? (
    <Card  className={classes.cardOffer}>
    <Link to={productData.webLink} {...rest} className={classes.offerCardMain}>
      <img src={imgSrc} className={classes.imgCard} alt={productData.name} />
      <div className={classes.desc}>{subHeader}</div>
    </Link>
    </Card>
  ) : (
    <Card
      className={classes.card}
      onClick={() => {
        history.push(`/${productData.webLink}`);
      }}
      {...rest}
    >
      <Tooltip
        title={productData && productData.name}
        aria-label="disabled button"
      >
        <div>
          {productData && productData.name.length <= 18 ? (
            <CardHeader
              classes={{
                title: classes.titleText,
                subheader: classes.subHeaderText,
              }}
              className={classes.cardTitle}
              title={
                <h3>{productData && productData.name}</h3> || 'Name not mapped'
              }
              subheader={subHeader}
            />
          ) : (
            <CardHeader
              classes={{
                title: classes.titleText,
                subheader: classes.subHeaderText,
              }}
              className={classes.cardTitle}
              title={
                (
                  <h3>
                    {productData && `${productData.name.substring(0, 18)}...`}
                  </h3>
                ) || 'Name not mapped'
              }
              subheader={subHeader}
            />
          )}
        </div>
      </Tooltip>
      <img
        src={productData && imgSrc ? imgSrc : PlaceholderImg}
        className={classes.imgCard}
        alt={
          productData && productData.name ? productData.name : 'RestaurantImg'
        }
      />
      {homecard && (
        <Typography
          variant="caption"
          component="div"
          className={classes.cardDesc}
        >
          {(productData && productData.description) ||
            'The Kolkata biryani is more similar to a Persian pulao than any of its brothers and sisters'}
        </Typography>
      )}
      {!homecard && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              history.push(`/${productData.webLink}`);
            }}
            variant="outlined"
            color="primary"
            className={classes.cardBtn}
          >
            Order Now
            {productData &&
              productData.sellingPrice &&
              `₹${productData.sellingPrice}`}
          </Button>
        </Box>
      )}
    </Card>
  );
};

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
