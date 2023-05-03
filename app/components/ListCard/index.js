import React, { useEffect, useState, useRef ,memo} from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Card,
  Box,
  CardMedia,
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Typography,
  withStyles,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup, Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FavoriteBorderIcon, FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { parseInt } from 'lodash';
import veg from '../../images/veg.svg';
import nonveg from '../../images/nonveg.svg';
import starImg from '../../images/star2.svg';
import share from '../../images/share.png';
import close from '../../images/close.png';
import PlaceholderImg from '../../images/placeholder-img.png';
import { saveFavoriteItemServiceCall } from '../../containers/MyFavourite/serviceCalls';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { updateGlobelStoreByKeyVal } from '../../containers/DiyPage/actions';
import { deleteKeyFromLocalStorage } from '../../utils/localStorageUtils';
const useStyles = makeStyles(theme => ({
  root({ cart }) {
    return {
      position: 'relative',
      minHeight: !cart ? 331 : 250,
      boxShadow: '0px 4px 20px #CFCFCF',
      gridTemplateColumns: '192px 1fr',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: '20px 30px',
      [theme.breakpoints.down('sm')]: {
        padding: '20px 20px',
      },
      '&:not(:last-child)': {
        marginBottom: !cart ? 0 : 30,
      },
    };
  },

  cover({ cart }) {
    return {
      width: !cart ? 220 : 200,
      height: 163,
      borderRadius: 8,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 217,
        marginBottom: 10,
      },
    };
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  descItem({ cart }) {
    return {
      fontWeight: 400,
      fontSize: !cart ? 16 : 12,
      color: '#646464',
    };
  },
  incrDecrGrp({ cart }) {
    return {
      maxWidth: !cart ? 200 : 200,
      border: '1px solid #AC1715',
      borderRadius: 10,
      '& button': {
        color: '#000',
        padding: '0px 10px',
        border: 'none',
        fontSize: !cart ? 18 : 14,
        fontWeight: 700,
      },
      '& .MuiToggleButton-root': {
        minWidth: !cart ? 65 : 33,
        height: 35,
        '& span.MuiTypography-root': {
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        marginTop: '15px',
        marginBottom: '-5px',
        padding: '0px 5px',
        maxWidth :!cart ? 300 : 300,
      },
    };
  },
  addtoandquantitybutton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 15,
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      marginLeft: '-8px',
      marginTop: 0,
    },
  },
  
  addtoandquantitybuttoncheckout: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    // marginTop: '-110px',
    marginRight: '-10px',
    '& button': {
      textTransform: 'none',
      marginLeft: '15px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      marginLeft: '-8px',
      marginTop: '10px',
      marginRight: '0px',
    },
  },
  price({ cart }) {
    return {
      fontSize: !cart ? 24 : 16,
      fontWeight: 500,
      '& span': {
        color: '#22314A',
        fontWeight: 300,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        marginTop: '-8px',
      },
    };
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
  dishName({ cart }) {
    return {
      fontSize: !cart ? 24 : 16,
      fontWeight: !cart ? 500 : 700,
      color: '#000',
      textTransform: 'capitalize',
    };
  },
  ratingDiv({ cart }) {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 5,
      '& img': {
        height: !cart ? 18 : 13,
        width: !cart ? 18 : 13,
      },
      '& span': {
        fontWeight: 400,
        fontSize: !cart ? 18 : 14,
        marginLeft: 5,
        marginTop: 3,
      },
      [theme.breakpoints.down('sm')]: {
        display:'block',
      },
    };
  },
  addCartBtn({ cart }) {
    return {
      minWidth: !cart ? 200 : 100,
      borderRadius: 10,
      fontSize: !cart ? 18 : 14,
      fontWeight: 500,
      textTransform: 'uppercase',
      minHeight: 38,
      marginLeft: 30,
      border: '1px solid #AC1715',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        marginBottom: '10px',
        marginLeft: !cart ? 11 : 30,
      },
    };
  },
  text({ cart }) {
    return {
      '& .MuiTypography-root': {
        fontSize: !cart ? 18 : 14,
        fontWeight: 300,
      },
      '& b': {
        fontWeight: 500,
        marginRight: 5,
      },
    };
  },
  priceCart: {
    marginTop: 30,
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      padding: '1px',
      marginBottom:'10px',
    },
  },
  shareLink: {
    fontSize: 14,
    fontWeight: 500,
    color: '#616161',
    textDecoration: 'none',
    marginLeft: 25,
    '& img': {
      marginRight: 5,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      '& img': {
        marginRight: 5,
        width:'20px',
        height:'20px',
      },
      // marginBottom: '5px',
    },
  },
  tabWrapper: {
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .MuiTabs-flexContainer': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridColumnGap: 20,
      [theme.breakpoints.down('sm')]: {
        gridColumnGap: 10,
      },
    },
    
  },
  tabTitle: {
    backgroundColor: '#F7F5F5',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 500,
    minHeight: 34,
    '&.Mui-selected': {
      backgroundColor: '#00913E',
      color: '#ffffff',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '8px',
    },
  },
  hidetabs: {
    display: 'none',
  },
  contentDesc({ cart }) {
    return {
      fontSize: !cart ? 14 : 13,
      fontWeight: 400,
      marginBottom: 10,
      marginTop: 5,
    };
  },
  contentHead: {
    fontSize: 20,
    fontWeight: 700,
  },
  readMore: {
    color: '#AC1715',
    textDecoration: 'none',
    fontWeight: 500,
  },
  totalPrice: {
    textDecoration: 'line-through',
    fontSize: 16,
    marginRight: 5,
  },
  coverinfo: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gridColumnGap: '30px',
    marginBottom: '-50px',
    [theme.breakpoints.down('sm')]: {
      display: 'contents',
    },
  },
  coverBox: {
    boxShadow: '2px 0px 4px 3px #CFCFCF',
    margin: -18,
    padding: 13,
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      // margin: 0,
      // padding: 0,
      boxShadow: 'none',
    },
  },
  tabsWrapper: {
    boxShadow: '0px 4px 20px #CFCFCF',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '0px 30px',
    marginTop: 10,
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      marginTop: 5,
      marginBottm: 5,
      padding: '0px 15px',
      // fontSize: 'small',
      maxWidth: 'fit-content',
    },
  },
  qtyInput: {
    width: '100%',
    height: '100%',
    border: 'none',
    fontSize: 16,
    textAlign: 'center',
    appearance: 'none',
    margin: 0,
    webkitAppearance: 'none',
    mozAppearance: 'textfield',
    '&:focus': {
      outline: 'none',
      border: 'none',
    },
  },
  qtyError: {
    color: 'red',
    fontSize: 10,
    marginTop: 5,
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography style={{ padding: '10px 0' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ListCard = ({
  id,
  secTitle,
  cart,
  productData,
  imgSrc,
  addItemToCart,
  cartData,
  notAvailable,
  saveFavorite,
  isFavorite,
  myLoader=false,
  myFavComponent = false,
  authData,
  updateGlobelStoreByKeyVal
}) => {
  const classes = useStyles({ cart });
  const [quantity, setQuantity] = useState(1);
  const [qtyError, setqtyError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const qtyInputRef = useRef(null);
  const [refresh, setRefresh] = useState();
  const [itempage, setitempage] = useState(classes.addtoandquantitybutton);
  const [coverBox, setcoverBox] = useState(classes.coverBox);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: 'success',
  });

  // const refreshfunc = () => {
  //   // re-renders the component
  //   const timer = setTimeout(() => {
  //     window.location.reload(false);
  //   }, 1000);
  //   timer();
  //   setRefresh({});
  // };

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
      const timer = () => setTimeout(() => setCopied(false), 1000);
      const timerId = timer();
      return () => {
        clearTimeout(timerId);
      };
  }

  const url = window.location.href;
  const includesItem = url.includes('item') 
  const includesMyFav = url.includes('my-favourite');
  const includesCheckout = url.includes('checkout');
  let mtop = productData.shortDescription.length;
  mtop = mtop+"px"

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleItemClick = (type, removeItem = false) => {
    setIsLoading(true);
    new Promise((res, rej) => {
      if (removeItem) {
        addItemToCart({ itemId: productData._id, quantity: 0, res, rej });
        return true;
      }
      if (type === 'SUBSTRACT' && quantity > 0) {
        setQuantity(quantity - 1);
        addItemToCart({
          itemId: productData._id,
          quantity: quantity - 1,
          res,
          rej,
        });
      } else if (type === 'ADD_TO_CART') {
        addItemToCart({
          itemId: productData._id,
          quantity: quantity + 0,
          res,
          rej,
        });
      } else if (type === 'ADD') {
        addItemToCart({
          itemId: productData._id,
          quantity: quantity + 1,
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
  useEffect(() => {
     setIsLoading(myLoader);
  },[myLoader])

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
              if (element._id === productData._id) {
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

  const [value, setValue] = React.useState();

  useEffect(() => {
 if (includesCheckout !== true) {
setitempage(classes.addtoandquantitybutton);
setcoverBox();
} else {
setitempage(classes.addtoandquantitybutton);
 }
}, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleQtyInput = e => {
    const { value } = e.target;
    const isValidNum = /^[0-9]+$/.test(value);
    if (qtyError) setqtyError(null);
    if (isValidNum) {
      if (parseInt(value) > 0 ) {
        setQuantity(parseInt(value));
      } else {
        setQuantity(parseInt(value));
        setqtyError('Quantity should be greater than 0 ');
      }
    } else {
      setQuantity("");
      setqtyError('Quantity should be greater than 0 ');
    }

  };
  const handleFavSet = () => {
    if (!authData) {
      setSnackbar({
        open: true,
        message: 'Please login to save this item as favorite',
        variant: 'error',
      });
      updateGlobelStoreByKeyVal({
        key: 'isLoginOpen',
        value: true,
      })
    } else {
      setIsLoading(true);
    new Promise((res, rej) => {
      saveFavoriteItemServiceCall({
        itemId: productData._id,
        isFavourite: !isFavorite,
        authData,
        res,
        rej,
      })
    }).then((res) => {
      setIsLoading(false);
      if (res.status === 200) { 
        if (res.data.success) {
          saveFavorite()
          setSnackbar({
            open: true,
            message: res.data.data[0].isFavourite? 'Item added to favorite' : 'Item removed from favorite',
            variant: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: 'Something went wrong',
            variant: 'error',
          });
        }
      } else {
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          variant: 'error',
        });
      }
     
    }).catch(errorArr => {  
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        variant: 'error',
      });    
    });
      
  };
    
}

  // console.log("savefac0", saveFavorite)
return (
  <>
    <Helmet>
      <title>{productData ? productData.itemName : 'product name'}</title>
      <meta
        name="description"
        content={productData ? productData.itemName : 'product name'}
      />
    </Helmet>
    <Card
      className={classes.root}
      style={{
        ...(cart ? { boxShadow: 'none' } : {}),
        border: notAvailable ? '1px solid red' : 'inherit',
      }}
    >
      <Box className={classes.coverinfo}>
        <CardMedia
          className={classes.cover}
          image={
            (productData && productData.productImage) ||
            imgSrc ||
            PlaceholderImg
          }
          title={(productData && productData.itemName) || 'Product Name'}
        />
          <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width="85%">
              <Typography variant="h3" className={classes.dishName}>
                {productData
                  ? productData.itemName.split('-').join(' ')
                    : 'product name'}
              </Typography>
              { !includesCheckout ? 
              <Typography variant="p" className={classes.descItem}>
                  {includesItem ? (`${productData.brand}, ${productData.brandCity}`) : (`${productData.brand.brandName}, ${productData.itemName.split("-")[2]}`)}
              </Typography>
: (`${productData.brandId.brandName}, ${productData.brandId.brandCity.name}`) }
              <Typography className={classes.descItem}>
                {productData ? productData.city : 'brand name'}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Box>
                <img
                  src={
                    productData && productData.itemType === 'nonveg'
                      ? nonveg
                      : veg
                  }
                  alt="food type"
                  height={!cart ? 25 : 16}
                />
              </Box>
              {includesCheckout !== true
                ? productData &&
                productData.ratings && (
                  <Typography className={classes.ratingDiv}>
                    <img src={starImg} alt="ratings" />
                    <span> {productData.ratings} </span>
                  </Typography>
                )
                : ''}
            </Box>
          </Box>
          <Typography className={classes.contentDesc}>
            {isReadMore && productData && productData.fullDescription
              ? (productData.fullDescription || []).slice(0, 350)
              : productData && productData.fullDescription}
            {productData &&
              productData.fullDescription &&
              productData.fullDescription.length >= 352 ? (
              <Link className={classes.readMore} onClick={toggleReadMore}>
                {isReadMore ? '...Read' : ' Less'}
              </Link>
            ) : (
              ` ${productData && includesCheckout ?  productData.shortDescription : ''}`
            )}
          </Typography>
        </Box>
      </Box>
      {/* // ? productData.price && productData.price[0].priceId.mrp   */}
      <Box className={itempage}>
        {/* Price cart */}
        <div className={classes.priceCart} >
          <Box display="flex" justifyContent="center">
            {productData && productData.discount > 0 && (
              <Typography className={classes.totalPrice} color="primary">
                 {/* <Box>
                    ₹{productData ? (productData.sellingPrice).toFixed(2) : "Error" }
                  </Box> */}
                {!cart && (
                  <Box>
                    ₹{productData ? (productData.sellingPrice).toFixed(2) : "Error" }
                  </Box>
                )}
              {cart && (
                <Box>
                    ₹{productData ? (productData.sellingPrice + productData.discount).toFixed(2) : "Error" }
                  </Box>
              )}
              </Typography>
            )}
            <Typography className={classes.price}>
              ₹             
              { includesItem && productData.discount ?  (productData.sellingPrice - productData.discount).toFixed(2) : productData.sellingPrice.toFixed(2) }
              {/* { includesItem || includesCheckout ?  productData.sellingPrice.toFixed(2) : productData._defaultPrice.toFixed(2) }*/}
              / <span>{productData.UOM.replaceAll('|',' ')}</span>
            </Typography>
                   {/* Price cart ends */}
          </Box>
   
          {/* Toggle buttons checkout/itemdetail */}
          {(includesItem !== true && !includesMyFav)? (
            <>
              <Box display={isMobile ? 'flex':''} justifyContent={isMobile ? 'center':''} mt={2} marginBottom={isMobile ? '16px' : ''} >
                <ToggleButtonGroup className={classes.incrDecrGrp} exclusive>
                  <ToggleButton
                    disabled={quantity <= 1}
                    onClick={() => handleItemClick('SUBSTRACT')}
                  >
                    -
                  </ToggleButton>
                  <ToggleButton disableRipple={false} disableFocusRipple={false} selected={false} disableTouchRipple={false} >
                    {
                      quantity
                    }
                  </ToggleButton>
                  <ToggleButton onClick={() => handleItemClick('ADD')}>
                    +
                  </ToggleButton>
                </ToggleButtonGroup>
                {qtyError && (
                  <Typography color="error" className={classes.qtyError}>
                    {qtyError}
                  </Typography>
                )}
              </Box>
            </>
          ) : (
            <>
              <Box mt={1}  display={isMobile ? 'flex':''} justifyContent={isMobile ? 'center':''} marginBottom={isMobile ? '16px' : ''}>
                <Box display="flex" alignItems="center" className={classes.incrDecrGrp} exclusive>
                  <ToggleButton
                    disabled={quantity <= 1}
                    onClick={() =>
                      handleQtyInput({
                        target: {
                          value: (quantity - 1).toString(),
                        },
                      })
                    }
                  >
                    -
                  </ToggleButton>
                  <>

                    <input
                      autoFocus
                      // ref={qtyInputRef}
                      className={classes.qtyInput}
                      type="text"
                      value={quantity.toString()}
                      onChange={handleQtyInput}
                      style={{
                        webkitAppearance: 'none',
                        border: 'none',
                        outline: 'none',
                      }}
                      min="1"
                      max="999"
                    />
                  </>
                  <ToggleButton
                    onClick={() =>
                      handleQtyInput({
                        target: {
                          value: (quantity + 1).toString(),
                        },
                      })
                    }
                  >
                    +
                  </ToggleButton>
                </Box>
                {qtyError && (
                  <Typography color="error" className={classes.qtyError}>
                    {qtyError}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </div>
        <Box
          sx={{
            alignItems: 'center',
            display:'flex',
            
            // flexDirection: 'row',

            // marginLeft: '125px',
          }}
        >
          <IconButton onClick={handleFavSet}>
            {isFavorite ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorder color="default" />
            )}
          </IconButton>
          <Link className={classes.shareLink} onClick={copy}>
            <img src={share} width="10px" height="10px" />
            {/* <span>{!copied ? 'Share' : 'Copied'}</span> */}
          </Link>
          {!cart && productData && productData.stockQuantity >= 1 ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.addCartBtn}
              onClick={() => handleItemClick('ADD_TO_CART')}
            >
              Add to cart
            </Button>
          ) : (
            <>
              {includesItem === true || includesMyFav ? (
                <Button
                  variant="outlined"
                  color="primary"
                  disabled
                  className={classes.addCartBtn}
                  mb={isMobile ? '5px' : '10px'}
                >
                  OUT OF STOCK
                </Button>
              ) : (
                ''
              )}
            </>
          )}
          {cart && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.addCartBtn}
              onClick={() => {
                handleItemClick(null, true);

                {
                  refreshfunc();
                }
                {deleteKeyFromLocalStorage('cartCount')}
              }}
            >
              Remove
            </Button>
          )}
        </Box>

 

      </Box>
      {!cart && (
        <Box mt={4} className={classes.tabWrapper}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {productData &&
              productData.ingredient != null &&
              productData.ingredient !== 'undefined' &&
              productData.ingredient !== '' ? (
              <Tab
                label="Ingredients"
                {...a11yProps(0)}
                className={classes.tabTitle}
              />
            ) : (
              <Tab
                label="&#8205;"
                {...a11yProps(0)}
                className={classes.hidetabs}
              />
            )}

            {productData &&
              productData.aboutSeller != null &&
              productData.aboutSeller !== 'undefined' &&
              productData.aboutSeller !== '' ? (
              <Tab
                label="About Seller"
                {...a11yProps(1)}
                className={classes.tabTitle}
              />
            ) : (
              <Tab
                label="&#8205;"
                {...a11yProps(1)}
                className={classes.hidetabs}
              />
            )}
            {productData &&
              productData.handlingDetail != null &&
              productData.handlingDetail !== 'undefined' &&
              productData.handlingDetail !== '' ? (
              <Tab
                label="Handling"
                {...a11yProps(2)}
                className={classes.tabTitle}
              />
            ) : (
              <Tab
                label="&#8205;"
                {...a11yProps(2)}
                className={classes.hidetabs}
              />
            )}
            {productData &&
              productData.disclaimer != null &&
              productData.disclaimer !== 'undefined' &&
              productData.disclaimer !== '' ? (
              <Tab
                label="Disclaimer"
                {...a11yProps(3)}
                className={classes.tabTitle}
              />
            ) : (
              <Tab
                label="&#8205;"
                {...a11yProps(3)}
                className={classes.hidetabs}
              />
            )}
          </Tabs>
        </Box>
      )}
      {isLoading && (
        <Grid className={classes.loader}>
          <CircularProgress />
        </Grid>
      )}
    </Card>
    <div className={classes.tabsWrapper}>
      <TabPanel value={value} index={0}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.contentHead}>Ingredients</Typography>
          <img
            src={close}
            style={{ cursor: 'pointer' }}
            onClick={() => setValue()}
          />
        </Box>
        <Typography className={classes.contentDesc}>
          {productData &&
            productData.ingredient != null &&
            productData.ingredient !== 'undefined' &&
            productData.ingredient !== ''
            ? `${productData.ingredient}`
            : 'Ingredient data not available'}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.contentHead}>
            About Seller
          </Typography>
          <img
            src={close}
            style={{ cursor: 'pointer' }}
            onClick={() => setValue()}
          />
        </Box>
        <Typography className={classes.contentDesc}>
          {productData &&
            productData.aboutSeller != null &&
            productData.aboutSeller !== 'undefined' &&
            productData.aboutSeller !== ''
            ? productData.aboutSeller
            : 'Seller'}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.contentHead}>Handling</Typography>
          <img
            src={close}
            style={{ cursor: 'pointer' }}
            onClick={() => setValue()}
          />
        </Box>
        <Typography className={classes.contentDesc}>
          {productData &&
            productData.handlingDetail != null &&
            productData.handlingDetail !== 'undefined' &&
            productData.handlingDetail !== '' ? (
            <>
              <p>{productData.handlingDetail.split('|')[0]}</p>
              <p>{productData.handlingDetail.split('|')[1]}</p>
            </>
          ) : (
            ''
          )}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.contentHead}>Disclaimer</Typography>
          <img
            src={close}
            alt="close button"
            style={{ cursor: 'pointer' }}
            onClick={() => setValue()}
          />
        </Box>
        <Typography className={classes.contentDesc}>
          {productData &&
            productData.disclaimer != null &&
            productData.disclaimer !== 'undefined' &&
            productData.disclaimer !== ''
            ? productData.disclaimer
            : ''}
        </Typography>
      </TabPanel>
    </div>
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbar.open}
      onClose={() => setSnackbar({ ...snackbar, open: false})}
      autoHideDuration={1000}
    >
      <Alert  severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
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
)(ListCard);