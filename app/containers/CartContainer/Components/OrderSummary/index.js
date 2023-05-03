import React, { useState, memo, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  makeStyles,
  Box,
  Typography,
  Divider,
  Stack,
  CardMedia,
  Snackbar
} from '@material-ui/core';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { HistoryContext } from 'containers/App/HistoryContext';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import { SelectAddressList } from '../../../../components';
import TaxesIndex from '../YourCart/TaxInfo/Taxes.index';
import CouponDialog from '../../../../components/CouponDialog';
import { selectStoreByKey } from '../../../HomePage/selectors';
import { selectCartStoreByKey } from '../../selectors';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import { addItemToCart, applyLoyaltyAction, fetchCart } from '../../../HomePage/actions';
import { updateGlobelStoreByKeyVal } from '../../../App/actions';
import { checkImageURL } from '../../../../utils/utils';
import {
  submitCartndPleceOrder,
  getCoupons,
  applySelectedCoupon,
  setDeliveryAddress,
  getDeliveryAddress,
} from '../../actions';
import { ToggleButton, ToggleButtonGroup, Alert } from '@material-ui/lab';
import back from '../../../../images/back.png';
import offer from '../../../../images/offer.png';
import points from '../../../../images/earnedpoints.png';
import axios from 'axios';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../../../config/environmentConfig';
import VoucherMessage from '../VoucherMessage';
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/localStorageUtils';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1144,
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    padding: '20px 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
  mainHead: {
    fontSize: 25,
    fontWeight: 500,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  billingHead: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 20,
    textTransform: 'uppercase',
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 12,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 10,
    boxShadow: '0px 4px 20px #CFCFCF',
  },
  billingHead2: {
    fontSize: 10,
    fontWeight: 700,
    height: '28%',
    marginBottom: 20,
    textTransform: 'uppercase',
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 12,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 10,
    overflow: 'auto',
    boxShadow: '0px 4px 20px #CFCFCF',
  },
  voucherBox: {
    paddingTop: 20,
  },
  formHeaders: {
    paddingBottom: 6,
    fontWeight: 'bold',
  },
  formMain: {
    display: 'flex',
  },
  formInputBox: {
    '& input': {
      padding: '5px 0 0 10px',
      border: 'none',
    },
    '& fieldset': {
      padding: 0,
      border: 'none',
    },
  },
  button: {
    background: '#AC1715',
    color: '#fff',
    borderRadius: '12px',
    marginLeft: 18,
    minWidth: 90,
    height: '8px',
    padding: '0',
    minHeight: '27px',
    '&:hover': {
      background: '#AC1715',
      color: '#fff',
    },
  },
  couponList: {
    border: '1px solid #CCCCCC',
    borderRadius: 5,
    background: '#fff',
    padding: 10,
    width: '100%',
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  couponDesc: {
    color: '#717171',
    fontSize: 16,
    fontWeight: 500,
  },
  applyCoupon: {
    fontSize: 16,
    fontWeight: 500,
    padding: 0,
  },
  cartTotal: {
    boxShadow: '0px 4px 20px #CFCFCF',
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  orderlist: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  taxesPopup: {
    marginLeft: 5,
    verticalAlign: 'text-bottom',
    cursor: 'pointer',
  },
  itemHeading: {
    fontSize: 30,
    fontWeight: 700,
    color: '#070707',
    margin: '40px 0 20px',
  },
  totalHead: {
    color: '#AC1715',
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
  },
  md: {
    '& .MuiDialog-paper': {
      minWidth: 420,
    },
    '& label': {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  itemFont: {
    fontSize: 18,
    fontWeight: 400,
    color: '#737373',
    textAlign: 'left',
  },
  coupons: {
    fontWeight: 500,
    fontSize: 20,
    marginTop: 20,
  },
  cartList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px',
    marginBottom: 20,
    '& .MuiTypography-body1': {
      fontSize: 18,
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    '& .MuiTypography-body1:first-child': {
      color: '#717171',
      fontSize: 16,
      marginLeft: 15,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  descItem({ cart }) {
    return {
      fontWeight: 400,
      fontSize: !cart ? 16 : 12,
      color: '#646464',
    };
  },
  offerWrapper: {
    border: '1px solid #CCCCCC',
    borderRadius: 5,
    padding: '5px 15px',
    minHeight: 35,
  },
  viewLink: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  couponButton: {
    padding: '3px 8px',
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.primary.main,
    textDecoration: 'none',

  },
  taxWrapper: {
    '& > div:last-child': {
      color: theme.palette.primary.main,
    },
  },
  offerWrapperHead: {
    fontSize: 25,
    fontWeight: 700,
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  nameOfCity: {
    fontSize: 20,
    fontWeight: 500,
  },
  noOfProduct: {
    border: '1px solid #AC1715',
    borderRadius: 10,
    minWidth: 54,
    minHeight: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 500,
  },
  noOfTotalProduct: {
    backgroundColor: '#AC1715 !important',
    color: '#ffffff',

  },
  productWrapper: {
    width: '100%',
    '& div': {
      marginBottom: theme.spacing(2),
    },
  },
  removeCoupon: {
    color: 'red',
    display: 'inline-block',
    cursor: 'pointer',
    marginLeft: 3,
    border: '1px solid',
    padding: '0px 4px',
    borderRadius: 20,
    fontSize: 10,
  },

  savedcoupon: {
    backgroundColor: '#D5ECD9',
    padding: 15,
    color: '#006400',
  },
  itemTitle: {
    fontWeight: 700,
  },
  hStack: {
    flexDirection: 'row',
  },

  cover({ cart }) {
    return {
      width: !cart ? 130 : 90,
      height: 90,
      borderRadius: 8,
      marginRight: '20px',
      [theme.breakpoints.down('sm')]: {
        width: 42,
        height: 32,
        marginRight: '20px',
      },
    };
  },

  contentDesc: {
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 14,
  },

  dishName({ cart }) {
    return {
      fontSize: !cart ? 18 : 12,
      fontWeight: !cart ? 500 : 700,
      color: '#000',
      textTransform: 'capitalize',
    };
  },

  readMore: {
    color: '#AC1715',
    textDecoration: 'none',
    fontWeight: 500,
  },
}));

const OrderSummary = props => {
  const {
    cartData,
    authData,
    couponData,
    getCoupons,
    deliveryInLoc,
    updateGlobelStoreByKeyVal,
    applySelectedCoupon,
    isLoyalty,
    applyLoyaltyAction,
    fetchCart,
    defaultAddress,
    selectedBillingAddr,
    selectedShiping,

  } = props;

  const classes = useStyles();
  const [isReadMore, setIsReadMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [opentax, setOpentax] = useState(false);
  const [invoiceDataInfo, setInvoiceDataInfo] = useState(null);
  const [coupan, setCoupan] = useState();
  const [voucher, setVoucher] = useState(false);
  const [voucherAmount, setVoucherAmount] = useState()
  const [voucherMessage, setVoucherMessage] = useState()
  const history = useHistory();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [showMessage, setShowMessage] = useState(false)
  const currentUrl = apiUrlPrefixes[currentEnvironment];
  const [voucherCode, setVoucherCode] = useState('');
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: 'success',
  });
  const deliveryDates = window.localStorage.getItem('deliveryDates');
  const token = JSON.parse(localStorage.getItem('lscache-HKTWQ'));
  const finalToken = token.replaceAll('"', '');
  const sessionId = JSON.parse(localStorage.getItem('lscache-sessionId'));
  const finalSession = sessionId.replaceAll('"', '');
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };


  const result = Object.values(cartData).reduce((r, { cartInfo }) => r + cartInfo.voucher.amount, 0);
  const cartCount = getFromLocalStorage('cartCount')
  useEffect(() => {

    // console.log('itemTotal' ,((getCount(cartData, 'itemTotal') -getCount(cartData, 'coupon') + getCount(cartData, 'shipping') +
    // getCount(cartData, 'taxes')) + getCount(cartData, 'coupon')).toFixed(2))

    if (cartData && Object.keys(cartData).length) {
      setVoucher(cartData[Object.keys(cartData)[0]].cartInfo.voucherApplied);
      if (cartData[Object.keys(cartData)[0]].cartInfo.voucherApplied) {
        setVoucherCode(cartData[Object.keys(cartData)[0]].cartInfo.voucher.voucherCode);
      }

      const cartCouponInfo = Object.entries(cartData).filter(
        ([, crt]) => crt.cartInfo.coupon.couponCode ? crt.cartInfo.coupon.couponCode : '',
      );
      if (cartCouponInfo && cartCouponInfo.length) {
        setCoupan(cartCouponInfo[0][1].cartInfo.coupon);
      } else {
        setCoupan(null);
      }
    } else {
      setCoupan(null);
    }
  }, [cartData]);

  // const voucherA = Object.keys(cartData);
  //  const totalAmount = voucherA.reduce(function(count,o){
  //   // return count + o.cartInfo.voucher.amount;
  //   return console.log(count)
  //  })

  useEffect(() => {
    fetchCart();
  }, [])

  const getCount = (cartInfo, key) => {

    if (cartInfo && key) {
      return Object.entries(cartInfo).reduce(
        (acc, [, brandCart]) => acc + brandCart.cartInfo.invoice[key],
        0,
      );
    }
    return 0;
  };


  const applyCoupon = (val, isRemove = false) => {
    applySelectedCoupon({ selectedCoupon: val, cartData, isRemove });
  };

  const applyVoucher = (id, val, isRemove = false) => {
    voucherApply({ val, cartData, isRemove })
  }
  const applyLoyaltyPoint = () => {
    alert('Loyalty Applied!');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpentax = () => {
    setOpentax(true);
  };

  const handleClosetax = () => {
    setOpentax(false);
  };

  const voucherApply = () => {
    axios.post(`${currentUrl}/api/web/cart/applyVoucherToCart`, {
      cartId: cartData[Object.keys(cartData)[0]].cartInfo._id,
      voucherCode: voucherCode,
      isRemove: false
    })
      .then((res) => {
        if (res.data.success == false) {
          setVoucherMessage(res.data.error[0])
          setShowMessage(true)
        }
        else {
          setVoucher(true);
          setShowMessage(true)
          setVoucherMessage(res.data.data.message === "" ? res.data.message[0] : res.data.data.message)
          setVoucherCode('')
        }
        fetchCart();

      })
      .catch((err) => {
        setVoucher(false);
      })
  }
  const removeVoucher = () => {
    axios.post(`${currentUrl}/api/web/cart/applyVoucherToCart`, {
      cartId: cartData[Object.keys(cartData)[0]].cartInfo._id,
      voucherCode: voucherCode,
      isRemove: true
    })
      .then((res) => {
        setVoucherCode('');
        setVoucher(false);
        fetchCart();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const placeOrder = () => {
    if (cartCount === {} || !cartCount) {
      alert('Cart session expired')
    }
    else {

      axios.post(`${currentUrl}/api/payment/placeOrder`, {
        cartId: cartData[Object.keys(cartData)[0]].cartInfo._id,
        billingAddress: selectedShiping._id,
        deliveryDates: deliveryDates ? JSON.parse(deliveryDates) : [],
      },
        {
          headers: {
            'Authorization': `Bearer ${finalToken}`,
            'sessionId': finalSession,
          }
        }

      )
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            setToLocalStorage('itemTotal', ((getCount(cartData, 'itemTotal') - getCount(cartData, 'coupon') + getCount(cartData, 'shipping') +
              getCount(cartData, 'taxes')) + getCount(cartData, 'coupon')).toFixed(2))
            history.push('/my-orders/order-placed')
          }
        })
    }
  }


  const continueToPay = () => {
    if (cartCount === {} || !cartCount) {
      alert('Cart session expired! ')
    }
    else {
      history.push('/checkout/payments')

      setToLocalStorage('itemTotal', ((getCount(cartData, 'itemTotal') - getCount(cartData, 'coupon') + getCount(cartData, 'shipping') +
        getCount(cartData, 'taxes')) + getCount(cartData, 'coupon')).toFixed(2))
    }
  }

  let count = 0;
  const loyaltycheck = getCount(cartData, 'loyalty') !== 0 ? true : false

  return (
    <>
      {showMessage && (
        <VoucherMessage
          onClose={() => setShowMessage(false)}
          message={voucherMessage}
        />
      )}

      <div className={classes.appWrapper}>

        <Box display="flex" alignItems="center" mb={4}>

          <Typography variant="h1">Order Summary</Typography>
        </Box>
        <Grid item container spacing={6}>
          <Grid sm={8} item>
            <div className={classes.offerWrapper}>
              <Typography
                variant="h2"
                color="primary"
                className={classes.mainHead}
              >
                number of items
              </Typography>
              <Box mb={4} className={classes.productWrapper}>
                {cartData &&
                  Object.entries(cartData).map(
                    ([brandID, brandCart], cartIndex) => (
                      <Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            variant="p"
                            className={classes.nameOfCity}
                          >
                            {' '}
                            {brandCart.cartInfo &&
                              brandCart.cartInfo.brandId &&
                              brandCart.cartInfo.brandId.brandCity &&
                              brandCart.cartInfo.brandId.brandCity.name}
                            {'  '}
                            To {deliveryInLoc.name}
                          </Typography>
                          <div className={classes.noOfProduct}>
                            {brandCart.cartInfo &&
                              brandCart.cartInfo.items.length}
                            <span style={{ display: 'none' }}>
                              {(count += brandCart.cartInfo.items.length)}
                            </span>
                          </div>
                        </Box>
                        {brandCart.cartInfo.items.map(item => (
                          <Box className={classes.orderlist}>
                            <Box>
                              <img className={classes.cover} src={checkImageURL(item.productImage)} alt="product" />
                            </Box>
                            <Box ml={1}>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Box width="85%">
                                  <Typography
                                    variant="h3"
                                    className={classes.dishName}
                                  >
                                    {item.itemName}
                                  </Typography>
                                  <Typography
                                    variant="p"
                                    className={classes.descItem}
                                  >
                                    {item.brandInfo.brandName}
                                    {/* {item
                                      ? `${item.itemName.split('-')[1]},  ${item.itemName.split('-')[2]
                                        ? item.itemName.split('-')[2]
                                        : ''
                                      }`
                                      : 'product name'} */}
                                  </Typography>
                                  <br />
                                  <Typography
                                    variant="p"
                                    className={classes.contentDesc}
                                  >
                                    {isReadMore
                                      ? item.shortDescription.slice(0, 350)
                                      : item.shortDescription}

                                    {item.shortDescription.length > 350 && (
                                      <Link
                                        className={classes.readMore}
                                        onClick={toggleReadMore}
                                      >
                                        {isReadMore ? '...Read' : ' Less'}
                                      </Link>
                                    )}
                                  </Typography>
                                </Box>
                              </Box>

                            </Box>
                            <hr />
                          </Box>
                        ))}
                        <hr />
                      </Box>
                    ),
                  )}


                <Box display="flex" justifyContent="space-between">
                  <Typography className={classes.nameOfCity} color="primary">
                    Total
                  </Typography>
                  <div
                    className={`${classes.noOfProduct} ${classes.noOfTotalProduct
                      }`}
                  >
                    {count}
                  </div>
                </Box>
              </Box>
            </div>

            <Box
              mt={4}
              // display="flex"
              // justifyContent="space-between"
              alignItems="center"
              className={classes.offerWrapper}
            >
              <Box alignItems="center">
                <Box className={classes.formMain}>
                  <img
                    src={offer}
                    alt="Coupon Offer"
                    height="28px"
                    width="28px"
                  />
                  <TextField
                    type="text"
                    id="voucher"
                    autoComplete="none"
                    fullWidth
                    className={classes.formInputBox}
                    placeholder='Enter Voucher Code'
                    variant="outlined"
                    hintText="Voucher Code"
                    onChange={(e) => setVoucherCode(e.target.value)}


                  />
                  {!voucher ?
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="outlined"
                      onClick={voucherApply}
                      disabled={voucherCode === '' ? true : false}
                    >
                      Apply
                    </Button> :
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="outlined"
                      onClick={removeVoucher}
                    >
                      Remove
                    </Button>

                  }
                </Box>
              </Box>
              {/* <Button
                onClick={() => setOpen(true)}
                className={classes.couponButton}
              >
                View Coupons
              </Button> */}
            </Box>
            <Typography color="primary" className={classes.voucherBox}>
              <div className={classes.formInput}>
                {open ? (
                  <CouponDialog
                    applyLoyaltyPoint={applyLoyaltyPoint}
                    applyCoupon={applyCoupon}
                    open={open}
                    setOpen={setOpen}
                    getCoupons={getCoupons}
                    cartData={cartData}
                    couponData={couponData}
                  />
                ) : (
                  <p style={{ display: 'none', }}></p>
                )}
              </div>
            </Typography>

            <Box className={classes.offerWrapper} mt={4}>
              <Typography className={classes.offerWrapperHead}>
                {authData && authData.loyaltyPoint
                  ? authData.loyaltyPoint
                  : 0}{' '}
                Loyalty Points
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={points}
                    alt="Loyalty points"
                    height="28px"
                    width="28px"
                  />
                  <Typography style={{ marginLeft: 10 }}>
                    Use Loyalty Points
                  </Typography>
                </Box>
                <Switch
                  defaultChecked={loyaltycheck}
                  // defaultChecked={isLoyalty}
                  disabled={authData && !authData.loyaltyPoint}
                  value={isLoyalty}
                  color="primary"
                  onChange={event => {
                    if (event.target) {
                      new Promise((res, rej) => {
                        applyLoyaltyAction({
                          data: {
                            cartId:
                              cartData[Object.keys(cartData)[0]].cartInfo._id,
                            loyaltyPoint: authData.loyaltyPoint,
                            isRemove: !event.target.checked,
                          },
                          res,

                        });
                      }).then(type => {

                        updateGlobelStoreByKeyVal({
                          key: 'isLoyalty',
                          value: type,
                        });

                      })

                    }
                  }}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </Box>
            </Box>
            <div>
              {getCount(cartData, 'grandTotal').toFixed(2) > 0 ?
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  disabled={getCount(cartData, 'grandTotal') < 0}
                  onClick={continueToPay}
                  fullWidth

                >

                  <b>
                    PAY (₹
                    {getCount(cartData, 'grandTotal').toFixed(2)})
                  </b>
                </Button> :
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"

                  // disabled={getCount(cartData, 'grandTotal') < 0}
                  onClick={placeOrder}
                  fullWidth
                >

                  <b>
                    PLACE ORDER
                  </b>
                </Button>
              }
            </div>
          </Grid>
          {/* Billing Part -*/}
          <Grid sm={4} item>
            <Typography color="primary" className={classes.billingHead}>
              billing amount
            </Typography>
            <div className={classes.cartTotal}>
              <Grid item>
                <Typography className={classes.totalHead}>
                  Order Summary
                </Typography>
                {coupan && (
                  <div className={classes.cartList}>
                    <Typography className={classes.itemFont}>
                      Applied Coupon:
                    </Typography>
                    <Typography
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {coupan.couponCode}
                      <span
                        className={classes.removeCoupon}
                        onClick={() => applyCoupon(coupan, true)}
                        title="Remove Coupon"
                      >
                        X
                      </span>
                    </Typography>
                  </div>
                )}
                {voucher && (
                  <div className={classes.cartList}>
                    <Typography className={classes.itemFont}>
                      Applied Voucher:
                    </Typography>
                    <Typography
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {cartData[Object.keys(cartData)[0]].cartInfo.voucher.voucherCode}
                      <span
                        className={classes.removeCoupon}
                        onClick={removeVoucher}
                        title="Remove Voucher"
                      >
                        X
                      </span>
                    </Typography>
                  </div>
                )}
                <div className={classes.cartList}>
                  <Typography style={{ color: '#AC1715', fontWeight: 700 }}>
                    Order Total:
                  </Typography>
                  <Typography>
                    <b>₹{getCount(cartData, 'itemTotal').toFixed(2)}</b>
                  </Typography>
                </div>
                <div className={classes.cartList}>
                  <Typography>Shipping</Typography>
                  <Typography>
                    <b>₹{getCount(cartData, 'shipping').toFixed(2)}</b>
                  </Typography>
                </div>
                <div className={classes.cartList}>
                  <Typography>Taxes</Typography>

                  <Typography>
                    <b>₹{getCount(cartData, 'taxes').toFixed(2)}</b>
                    <span
                      className={classes.taxesPopup}
                    >

                      <TaxesIndex />
                    </span>
                  </Typography>

                </div>

                <div className={classes.cartList}>
                  <Typography>Handling </Typography>

                  <Typography>
                    <b>₹{getCount(cartData, 'handlingCharge').toFixed(2)}</b>
                    <span
                      className={classes.taxesPopup}
                    >
                    </span>
                  </Typography>

                </div>

                <div className={classes.cartList}>
                  <Typography>Coupon</Typography>
                  <Typography>
                    <b>
                      {+getCount(cartData, 'coupon').toFixed(2) ? '-' : ''} ₹
                      {Math.abs(getCount(cartData, 'coupon').toFixed(2))}
                    </b>
                  </Typography>
                </div>
                {voucher &&

                  <div className={classes.cartList}>
                    <Typography>Voucher</Typography>
                    <Typography>
                      <b>
                        ₹ {result}

                      </b>
                    </Typography>
                  </div>}
                <div className={classes.cartList}>
                  <Typography>Loyalty</Typography>
                  <Typography>
                    <b>
                      {+getCount(cartData, 'loyalty').toFixed(2) ? '-' : ''} ₹
                      {-1 * getCount(cartData, 'loyalty').toFixed(2)}
                    </b>
                    {/* <b>-₹{-1 * getCount(cartData, 'loyalty').toFixed(2)}</b> */}
                  </Typography>
                </div>

                <div className={classes.cartList}>
                  <Typography style={{ color: '#AC1715', fontWeight: 700 }}>
                    {' '}
                    Grand Total:
                  </Typography>
                  <Typography color="primary">
                    <b>₹{getCount(cartData, 'grandTotal').toFixed(2)}</b>
                  </Typography>
                </div>
              </Grid>
            </div>



            {(getCount(cartData, 'coupon')
              .toFixed(2)
              .replace('-', '') > 0 || getCount(cartData, 'loyalty').toFixed(2).replace('-', '') > 0 || getCount(cartData, 'voucher').toFixed(2)
                .replace('-', '') > 0) ? (
              <div className={classes.savedcoupon}>
                <Typography>
                  <b>
                    You have saved{' '}
                    <strong>
                      ₹
                      {
                        parseFloat(getCount(cartData, 'coupon').toFixed(2).replace('-', '')) + result || parseFloat(getCount(cartData, 'loyalty').toFixed(2).replace('-', '')) + result || parseFloat(getCount(cartData, 'voucher').toFixed(2).replace('-', '')) + result
                      }
                      {/* {parseFloat(getCount(cartData, 'coupon')
                            .toFixed(2)
                          .replace('-', '') + getCount(cartData, 'loyalty').toFixed(2).replace('-', '')).toFixed(2)} */}
                    </strong>{' '}
                    on your Bill
                  </b>
                </Typography>
              </div>
            ) : (
              ''
            )}


            <>
              <Typography color='primary' className={classes.coupons}>Available Coupons :</Typography>

              <Typography color="primary" className={classes.billingHead2}>
                <CouponDialog
                  applyLoyaltyPoint={applyLoyaltyPoint}
                  applyCoupon={applyCoupon}
                  open={open}
                  setOpen={setOpen}
                  getCoupons={getCoupons}
                  cartData={cartData}
                  couponData={couponData}
                  itemTotal={getCount(cartData, 'itemTotal').toFixed(2)}
                />
              </Typography>
            </>
          </Grid>
          {/* Billing Container */}
        </Grid>

      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={8000}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
  couponData: selectCartStoreByKey('couponData'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  isLoyalty: selectGlobelStoreByKey('isLoyalty'),
  selectedNewDate: selectGlobelStoreByKey('selectedNewDate'),
  selectedNewFlag: selectGlobelStoreByKey('selectedNewFlag'),
  authData: selectGlobelStoreByKey('userDetails'),
  selectedBillingAddr: selectGlobelStoreByKey('selectedBillingAddr'),
  selectedShiping:selectGlobelStoreByKey('selectedShiping'),

});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemToCart,
      submitCartndPleceOrder,
      getCoupons,
      applySelectedCoupon,
      setDeliveryAddress,
      getDeliveryAddress,
      updateGlobelStoreByKeyVal,
      applyLoyaltyAction,
      fetchCart,
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
  withRouter,
  memo,
)(OrderSummary);
