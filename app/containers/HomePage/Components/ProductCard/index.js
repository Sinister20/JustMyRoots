import React, { useContext, memo,useState,useEffect } from 'react';
import { HistoryContext } from 'containers/App/HistoryContext';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Tooltip,
  makeStyles,
  Grid
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FavoriteBorderIcon, FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { saveFavoriteItemServiceCall } from '../../../MyFavourite/serviceCalls';
import { updateGlobelStoreByKeyVal } from '../../../App/actions';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import placeholderImg from '../../../../images/placeholder-img.png';
import veg from '../../../../images/veg.svg';
import nonveg from '../../../../images/nonveg.svg';
import star from '../../../../images/star.svg';
import { checkImageURL } from '../../../../utils/utils';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    boxShadow: '0px 2px 15px #CFCFCF',
    borderRadius: 12,
    padding: 10,
    minHeight: 300,
    minWidth: '250px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      // height: 95,
      minWidth: '200px',
      minHeight: '250px !important',
    },
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: '#f5f5f58c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegImg: {
    // width: '12px !important'
    height: 'auto !important',
    width: '12px !important',
    margin: '1px auto',
  },
  totalPrice: {
    textDecoration: 'line-through',
    fontSize: 12,
    marginRight: 1,
    marginTop: -5,
    color: '#ac1715',
  },
  productHeading: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 6,
    cursor: 'pointer',
    paddingBottom: '1px',
    textTransform: 'capitalize',
    clear: 'both',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    width: '90%',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginBottom: 5,
    },
  },
  addBtn: {
    minHeight: 25,
    height: 25,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: theme.spacing(1),
    color: '#A3080C',
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
  },
  imgCard: {
    cursor: 'pointer',
    borderRadius: '8px',
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    aspectRatio: "1:1",
    height: '250px',
    marginBottom: '9px',
    [theme.breakpoints.down('sm')]: {
      // height: '95px !important',
      marginBottom: '15px',
    },
    // [th]
  },
  ratio: {
    position: 'relative',
    display: 'block',
    '&:before': {
      content: '',
      display: 'block',
      width: '100%',
      height: '10vw',
      paddingBottom: '56.25%',
      background: '#e5e4e2',
    },
  },
  restoName: {
    color: '#646464',
    fontSize: 14,
    fontWeight: 500,
    paddingBottom: '2px',
    lineHeight: 1,
    marginBottom: 0,
    textTransform: 'capitalize',
    clear: 'both',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  productPricePer: {
    fontSize: 13,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  rating: {
    color: '#909090',
    fontSize: 12,
    fontWeight: 400,
    marginRight: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  starImg: {
    width: '12px !important',
    marginTop: '-3px',
  },
  productBox: {
    minHeight: '126px',
  },
  perUnit: {
    color: '#22314A',
    fontSize:9,
    fontWeight: 400,
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  tempClass: {
    height: 125,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const ProductCard = props => {
  const {
    imgSrc = null,
    productData,
    isFavorite = false,
    saveFavorite,
    myLoader = false,
    myFavComponent = false,
    authData,
    updateGlobelStoreByKeyVal,
    addItemToCart,
    cartData,
  } = props;
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [localFav, setLocalFav] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    setLocalFav(isFavorite);
  }, [isFavorite]);
  const handleFavSet = () => {
    if (!authData) {
      updateGlobelStoreByKeyVal({
        key: 'showSnackbar',
        value: {
          open: true,
          message: 'Please login to add to favorites',
          severity: 'warning',
        },
      });
      updateGlobelStoreByKeyVal({
        key: 'isLoginOpen',
        value: true,
      });
    } else {
      new Promise((res, rej) => {
        saveFavoriteItemServiceCall({
          itemId: productData.itemId,
          isFavourite: true,
          res,
          rej,
        });
      }).then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            setLocalFav(true);
            updateGlobelStoreByKeyVal({
              key: 'showSnackbar',
              value: {
                open: true,
                message: 'Item added to favorites',
                severity: 'success',
              },
            });
          }
          if (res.data.error.length > 0) {
            updateGlobelStoreByKeyVal({
              key: 'showSnackbar',
              value: {
                open: true,
                message: 'Something went wrong',
                severity: 'error',
              },
            });
          }
        }
      });
    }
  };
  useEffect(() => {
    setQuantity(1);
    if (productData) {
      if (productData.quantity) {

        setQuantity(productData.quantity);
      }

      if (cartData) {
        const keys = Object.keys(cartData);
        if (keys.length > 0) {
          keys.map(key => {
            const { items } = cartData[key].cartInfo;
            const index = items.findIndex(element => {
              if (element._id === productData.itemId) {
                return true;
              }
            });
            if (index !== -1) {
              setQuantity(items[index].quantity);
            }
          });
        }
      }
    }
  }, [productData]);

  const handleItemClick = (type, removeItem = false) => {
    setIsLoading(true);
    new Promise((res, rej) => {
      // if (removeItem) {
      //   addItemToCart({ itemId: productData._id, quantity: 0, res, rej });
      //   return true;
      // }
      // if (type === 'SUBSTRACT' && quantity > 0) {
      //   setQuantity(quantity - 1);
      //   addItemToCart({
      //     itemId: productData._id,
      //     quantity: quantity - 1,
      //     res,
      //     rej,
      //   });
    // }
      if (type === 'ADD_TO_CART') {
        addItemToCart({
          itemId: productData.itemId ? productData.itemId : productData._id,
          quantity: quantity + 0,
          res,
          rej,
        });
      } 
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(errorArr => {
        //console.log(errorArr);
        if (Array.isArray(errorArr)) {
          alert(JSON.stringify(errorArr));
        } else {
          alert('Something went wrong');
        }
      });
  };

  // ;
  return (
    <>
      <div className={classes.card}>
        <img
          src={checkImageURL(imgSrc)}
          alt={
            productData && productData.name ? productData.name : 'productImg'
          }
          className={classes.imgCard}
          onClick={() => history.push(`/${productData.webLink}`)}
        />
        <Box className={classes.productBox}>
          <Box
            onClick={() => history.push(`/${productData.webLink}`)}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Tooltip title={productData ? productData.name : 'Product Name'}>
              <Typography
                variant="h3"
                className={classes.productHeading}
                noWrap
              >
                {productData && productData.name}
              </Typography>
            </Tooltip>

            <Box width="10%">
              {productData && productData.type && (
                <img
                  src={
                    productData && productData.type === 'nonveg' ? nonveg : veg
                  }
                  className={classes.vegImg}
                  alt="Product Type"
                />
              )}
            </Box>
          </Box>
          {productData && productData.brand && productData.city && (
            <Box my="2px">
              <Typography
                variant="caption"
                component="h4"
                className={classes.restoName}
              >
                {productData && productData.brand}
              </Typography>
              <Typography
                variant="caption"
                component="h6"
                className={classes.restoName}
              >
                {productData && productData.city}
              </Typography>
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {productData && productData.discount > 0 ? (
              <Typography className={classes.productPrice}>
                <span className={classes.totalPrice}>
                  {' '}
                  ₹{productData.price.toFixed(2)}
                </span>
                <Typography
                  variant="caption"
                  component="span"
                  className={classes.productPrice}
                >
                  ₹{' '}
                  {productData &&
                    parseInt(productData.price - productData.discount).toFixed(2)}
                  {productData && productData.UOM && (
                    <span className={classes.perUnit}>
                      {' '}
                      / {productData.UOM.replace('|', '')}{' '}
                    </span>
                  )}
                </Typography>
              </Typography>
            ) : (
              <Typography
                variant="caption"
                component="span"
                className={classes.productPrice}
              >
                ₹{productData && parseInt(productData.price)}
                {productData && productData.UOM && (
                  <span className={classes.perUnit}>
                    {' '}
                    / {productData.UOM.replace('|', '')}{' '}
                  </span>
                )}
              </Typography>
            )}
            {productData && productData.ratings && (
              <Box display="flex" alignItems="center">
                <span className={classes.rating}>
                  {productData && productData.ratings}
                </span>
                <img
                  src={star}
                  height={isMobile ? '10px' : '12px'}
                  className={classes.starImg}
                  alt="ratings"
                />
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            my="4px"
            justifyContent="space-between"
          >
            {(
              <Box
                sx={{
                  cursor: 'pointer',
                }}
                onClick={handleFavSet}
              >
                <Tooltip title="Add to my favorite.">
                  {localFav ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorder color="default" />
                  )}
                </Tooltip>
              </Box>
            )}
 <Button
              onClick={() => handleItemClick('ADD_TO_CART')}
              variant="outlined"
              className={classes.addBtn}
              color="primary"
            >
              Add to Cart
            </Button>
            <Button
              onClick={() => {
                history.push(`/${productData.webLink}`);
              }}
              variant="outlined"
              className={classes.addBtn}
              color="primary"
            >
              View
            </Button>
          </Box>
          {isLoading && (
        <Grid className={classes.loader}>
          <CircularProgress />
        </Grid>
      )}
        </Box>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  authData: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateGlobelStoreByKeyVal,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductCard);
