import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Button, Divider, Grid } from '@material-ui/core';
import { Rating, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Rectangle160 from '../../images/Rectangle160.jpg';
import Desserts from '../../images/Desserts.svg';
import { HistoryContext } from '../../containers/App/HistoryContext';
import PlaceholderImg from '../../images/placeholder-img.png';

const styles = theme => ({
  card: {
    width: '98%',
    boxShadow: '0px 4px 20px 0px #DAE1E4',
    borderRadius: 10,
    minHeight: '200px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    // paddingBottom: 20,
    // color: '#f5f5f5',
    // boxShadow: '0px 2px 4px 0px #dae1e4',
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  cardTitle: {
    '& .MuiCardHeader-content': {
      textAlign: 'center',
    },
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: 300,
  },
  cardBtn: {
    marginTop: 5,
    height: 30,
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#fff',
  },
  addtocart: {
    pading: '5px 15px',
  },
  bottomSection: {
    minHeight: 100,
    padding: 5,
    marginTop: -15,
    marginLeft: 7,
  },
  discountBanner: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    background: '#B69C72',
    color: '#fff',
    fontWeight: 700,
    paddingLeft: 25,
    paddingRight: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    minWidth: 110,
    textTransform: 'uppercase',
  },
  priceTag: {
    // borderTop: '1px solid #B69C72',
    // borderBottom: '1px solid #B69C72',
    textAlign: 'left',
    padding: 5,
    fontSize: 15,
    marginTop: 5,
    marginLeft: -5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    padding: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    border: '#dae1e4',
    color: '#dae1e4',
  },
});

const JmrCardType1 = ({
  classes,
  itemData = {},
  filters,
  restaurant,
  style,
  addItemToCart,
}) => {
  // 
  const [quantity, setQuantity] = useState(0);

  const { history } = useContext(HistoryContext);

  const type = filters.type !== 'all';

  return (
    <Card className={classes.card} style={style}>
      {/* <Box  padding={ restaurant ?2:0}>
        {itemData  && itemData.itemImage ?
        <>
        <img
          src={itemData.itemImage || PlaceholderImg}
          // width="100%"
          // style={{ borderRadius: 8, height: 216, width: 193 }}
          onClick={() => {
            history.push(`/item/${itemData._id}`);
          }}
        />
        {filters.offerDiscount && (
          <Grid className={classes.discountBanner}>
            {filters.offerDiscount} % off
          </Grid>
        )}
        </> :
        <>
        <img
          src={itemData.brandImage || ''}
          width="100%"
          style={{ borderRadius: 2 }}
          onClick={() => {
            history.push(`/brand/${itemData._id}`);
          }}
        />
        {filters.offerDiscount && (
          <Grid className={classes.discountBanner}>
            {filters.offerDiscount} % off
          </Grid>
        )} 
        </>
        }

      </Box> */}
      <CardActions className={classes.actions} disableActionSpacing>
        {!restaurant && (
          <Typography
            onClick={() => {
              history.push(`/item/${itemData._id}`);
            }}
            variant="caption"
            component="div"
            color="primary"
            style={{
              fontSize: 18,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              textAlign: 'left',
              width: '100%',
              fontWeight: 500,
            }}
          >

            <span
              style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                color: '#333536',
              }}
            >
              {/* <img src={Desserts} style={{ width: 16, height: 16 }} />{' '} */}
            </span>
          </Typography>
        )}
        <Typography
          variant="caption"
          component="div"
          color="primary"
          style={{
            fontSize: 18,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            width: '100%',
            fontWeight: 500,
          }}
        // onClick={() => {
        //   history.push(`/brand/${itemData._id}`);
        // }}
        >
          {restaurant && (
            <>
              <span onClick={() => {
                history.push(`/brand/${itemData._id}`);
              }}
              >
                <strong
                  style={{
                    color: '#000000',
                    marginBottom: -1,
                    fontSize: 14,

                  }}
                >
                  {itemData.brandName}
                </strong>
              </span>{' '}
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#333536',
                }}
              >
                {/* {' '}
                4.5 <Rating max={1} name="read-only" value={1} readOnly />{' '} */}
              </span>
            </>
          )}
          {!restaurant && (
            <>
              <span
                style={{
                  lineHeight: 1,
                }}
                onClick={() => {
                  history.push(`/item/${itemData._id}`);
                }}
              >
                <strong
                  style={{
                    color: '#000000',
                    marginBottom: -25,
                    fontSize: 16,
                  }}
                >
                  {itemData.itemName.split('-')[0]}
                </strong>{' '}
              </span>
            </>
          )}
        </Typography>
        <Typography
          // variant="caption"
          component="div"
          color="primary"
          style={{
            fontSize: 12,
            textAlign: 'left',
            marginTop: 5,
            marginLeft: 0,
            fontWeight: 500,
          }}
        >
          {/* {itemData.itemDescription} */}
        </Typography>
        {restaurant && (
          <Typography
            variant="caption"
            component="div"
            style={{
              fontSize: 16,
              marginTop: 10,
              color: '#333536',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left',
              width: '100%',
              fontWeight: 500,
            }}
          >
            {itemData.location && itemData.location.locationName}
          </Typography>
        )}
      </CardActions>
      {restaurant && (
        <Grid item className={classes.bottomSection}>
          <Typography
            variant="caption"
            component="div"
            style={{
              fontSize: 12,
              textAlign: 'left',
              marginTop: 5,
              marginBottom: 20,
              marginLeft: 0,
              fontWeight: 500,
              color: '#646464',
            }}
            onClick={() => {
              history.push(`/brand/${itemData._id}`);
            }}
          >
            {itemData.brandDescription}
          </Typography>
          {/* <Typography variant="caption" component="div" style={{ fontSize: 12, textAlign: 'left', marginTop: 5, marginLeft: 0, fontWeight: 300, }}>
                    Name of the dish (3 options)
                </Typography> */}
          <Button
            onClick={() => {
              history.push(`/brand/${itemData._id}`);
            }}
            variant="contained"
            color="primary"
            className={classes.cardBtn}
          >
            Order Now
          </Button>
        </Grid>
      )}
      {!restaurant && (
        <Grid item className={classes.bottomSection}
          onClick={() => {
            history.push(`/item/${itemData._id}`);
          }}>
          <Typography
            variant="caption"
            component="div"
            style={{
              fontSize: 14,
              textAlign: 'left',
              marginTop: 5,
              marginBottom: 0,
              marginLeft: 0,
              fontWeight: 500,
              color: '#646464',
              lineHeight: 1,
            }}
          >
            {itemData.brand && itemData.brand.brandName}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            style={{
              fontSize: 14,
              textAlign: 'left',
              marginTop: 0,
              marginLeft: 0,
              fontWeight: 500,
              color: '#646464',
              lineHeight: 1.5,
            }}
          >
            {itemData.location && itemData.location.locationName}
          </Typography>
          <Grid item className={classes.priceTag}>
            {/* {itemData.itemDescription} */}
            <span style={{ color: 'black' }}>
              <strong>₹{itemData.sellingPrice}</strong>{' '}
              <span style={{ fontWeight: 300 }}>/ Per Unit</span>
            </span>
            <Button
              variant="outlined"
              color="primary"
              style={{ minHeight: '0px', padding: '5px 2px', borderRadius: 5 }}
              // className={classes.addCartBtn}
              onClick={() => {
                history.push(`/item/${itemData._id}`);
              }}
            >
              View
            </Button>
          </Grid>
          <Grid item className={classes.quantityContainer}>
            {/* 
                        <ToggleButtonGroup
                            // value={alignment}
                            className={classes.incrDecrGrp}
                            exclusive
                        // onChange={handleChange}
                        >
                            <ToggleButton onClick={() => { if (quantity > 0) { setQuantity(quantity - 1); addItemToCart({ itemId: itemData._id, quantity: quantity - 1 }); } }}>-</ToggleButton>
                            <ToggleButton >
                                <Typography variant="dark" color="dark">
                                    {quantity}
                                </Typography>
                            </ToggleButton>
                            <ToggleButton onClick={() => { setQuantity(quantity + 1); addItemToCart({ itemId: itemData._id, quantity: quantity + 1 }); }} >+</ToggleButton>
                        </ToggleButtonGroup> */}

          </Grid>
        </Grid>
      )}
    </Card>
  );
};

JmrCardType1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JmrCardType1);
