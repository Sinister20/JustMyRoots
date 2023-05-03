import React, { useState, useContext, memo, useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Box,
  Container,
  Snackbar,

} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { getFormatedTime } from 'utils/utils';
import moment from 'moment';
import { HistoryContext } from 'containers/App/HistoryContext';
import Dialog from '@material-ui/core/Dialog';
import { Autocomplete } from '@material-ui/lab';
import Rectangle165 from '../../../../images/Rectangle165.jpg';
import Rectangle162 from '../../../../images/Rectangle162.jpg';
import {
  JMRCard,
  ListCard,
  RestroSearch,
  SelectAddressPopup,
} from '../../../../components';
import CouponDialog from '../../../../components/CouponDialog';
import { selectStoreByKey } from '../../../HomePage/selectors';
import { selectCartStoreByKey } from '../../selectors';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import { addItemToCart, fetchCart } from '../../../HomePage/actions';
import { updateGlobelStoreByKeyVal } from '../../../App/actions';

import {
  submitCartndPleceOrder,
  getCoupons,
  applySelectedCoupon,
  setDeliveryAddress,
  getDeliveryAddress,
} from '../../actions';
import { saveFavoriteItemServiceCall } from '../../../MyFavourite/serviceCalls';
import { getFromLocalStorage } from '../../../../utils/localStorageUtils';

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
  taxesPopup: {
    marginLeft: 5,
    verticalAlign: 'text-bottom',
    cursor: 'pointer',
  },
  taxWrapper: {
    '& > div:last-child': {
      color: theme.palette.primary.main,
    },
  },
  cartList: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridColumnGap: '10px',
    marginBottom: 10,
    '& .MuiTypography-body1': {
      fontSize: 18,
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    '& .MuiTypography-body1:first-child': {
      color: '#717171',
    },
  },
  deliveryText: {
    marginTop: 15,
    '& .MuiTypography-body1': {
      fontSize: 18,
      fontWeight: 500,
      color: '#717171',
    },
    '& span': {
      fontSize: 18,
      fontWeight: 500,
      color: '#717171',
    },
    '& .MuiTypography-body1:last-child': {
      color: '#AC1715',
      marginLeft: 5,
    },
  },
  date: {
    color: '#AC1715 !important',
    marginLeft: 5,
  },
  cartTotal: {
    boxShadow: '0px 4px 20px #CFCFCF',
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cartTotal2:{
    boxShadow: '0px 4px 20px #CFCFCF',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop:20,
    display:'flex',
    justifyContent:'center',
  },
  itemHeading: {
    fontSize: 30,
    fontWeight: 700,
    color: '#070707',
    margin: '40px 0 20px',
    textTransform: 'capitalize',
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
}));

const YourCart = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false)
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [invoiceDataInfo, setInvoiceDataInfo] = useState(null);
  // if user changes the delivery date or time. Then we are using this state to update the cart
  const [deliveryDateNTime, setDeliveryDateNTime] = useState([]);
  const [deliveryError, setDeliveryError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: 'success',
  });

  const {
    cartData,
    addItemToCart,
    submitCartndPleceOrder,
    couponData,
    defaultAddress,
    getCoupons,
    applySelectedCoupon,
    setDeliveryAddress,
    getDeliveryAddress,
    deliveryInLoc,
    selectedNewDate,
    authData,
    updateGlobelStoreByKeyVal,
    selectedNewFlag,
    selectedNewFlagTime,
    selectedNewTime,
    fetchCart
  } = props;

  const [coupan, setCoupan] = useState();
  const cartCount = getFromLocalStorage('cartCount')
  const { history } = useContext(HistoryContext);
  const applyCoupon = (val, isRemove = false) => {
    applySelectedCoupon({ selectedCoupon: val, cartData, isRemove });
  };

  const applyLoyaltyPoint = () => {
    alert('loyalty point click');
  };

  useEffect(() => {
    if (cartCount === {} || !cartCount) {
      // window.location.reload();
    }
  }, [])

  useEffect(() => {
    getDeliveryAddress();
    const params = new URLSearchParams(window.location.search);
    if (params.has('status')) {
      setUnsuccessful(params.get('status').toLowerCase() === 'Failure');
    }
  }, []);

  useEffect(() => {
    if (!selectAddress) {
      getDeliveryAddress();
    }
  }, [selectAddress]);

  const setSelectedAddress = addrs => {
    setDeliveryAddress(addrs);
  };

  const getCount = (cartInfo, key) => {
    if (cartInfo && key) {
      return Object.entries(cartInfo).reduce(
        (acc, [, brandCart]) => acc + brandCart.cartInfo.invoice[key],
        0,
      );
    }
    return 0;
  };

  useEffect(() => {
    if (cartData && Object.keys(cartData).length) {
      const cartCouponInfo = Object.entries(cartData).filter(
        ([, crt]) => crt.cartInfo && crt.cartInfo.coupon.couponCode,
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  let count = 0;
  const validateCheckout = () => {

    let temp = [...deliveryDateNTime]
    let error = null
    temp.length > 0 ? temp.map(item => {
      let inValidDate = item.isDateSlot && (item.deliveryDate === null || item.deliveryDate === undefined || item.deliveryDate === "")
      let inValidTime = item.isTimeSlot && (item.deliverySlot === null || item.deliverySlot === undefined || item.deliverySlot === "" || item.deliverySlot.includes('M'))
      if (inValidDate || inValidTime) {
        error = {
          ...error,
          [item.brandCart.cityId]: {
            message: 'This is a required field',
            isDateError: inValidDate,
            isTimeError: inValidTime
          }
        }
      }
      return error
    }) : true
    setDeliveryError(error)
    if (error) {
      setSnackbar({
        open: true,
        message: 'Please select delivery date and time',
        variant: 'error'
      })
      return false
    } else {
      let newDeliveryDates = temp.map(item => ({
        cityId: item.brandCart.cityId,
        deliveryDate: item.deliveryDate,
        deliverySlot: item.deliverySlot
      }))
      window.localStorage.setItem('deliveryDates', JSON.stringify(newDeliveryDates))
      setSnackbar({
        open: false,
        message: '',
        variant: 'success'
      })
      return true
    }



  };

  const handleSaveFavorite = (_) => {
    fetchCart()
  };
  const handleDeliveryDateTimeChange = (data) => {
    setDeliveryError(null);
    let temp = [...deliveryDateNTime];
    const index = temp.findIndex(item => item.brandCart.cityId === data.brandCart.cityId);
    if (index > -1) {
      temp[index] = { ...temp[index], ...data };
    }
    else {
      temp.push(data);
    }
    setDeliveryDateNTime(temp);
  }
  const dateSelectDropDown = (brandCart) => deliveryDateNTime.some(d => {
    if (brandCart.cityId === d.brandCart.cityId) {
      return d.isDateSlot
    }
  })
  const timeSelectDropDown = (brandCart) => deliveryDateNTime.some(d => {
    if (brandCart.cityId === d.brandCart.cityId) {
      return d.isTimeSlot
    }
  })
  return (
    <Container
      md
      style={{
        marginBottom: '50px',
      }}
    >
      {cartData &&
        Object.entries(cartData).map(([brandID, brandCart], cartIndex) => (
          <div>
            <Typography
              variant="h2"
              color="primary"
              className={classes.itemHeading}
            >
              <span>
                {`${brandCart.cartInfo &&
                  brandCart.cartInfo.brandId &&
                  brandCart.cartInfo.brandId.brandCity &&
                  brandCart.cartInfo.brandId.brandCity.name} To ${deliveryInLoc.name
                  }`}
              </span>
            </Typography>
            <Grid item container spacing={6}>
              <Grid sm={8} item>
                <div>
                  {brandCart.cartInfo &&
                    brandCart.cartInfo.items.map(itemData => (
                      <ListCard
                        cart
                        productData={itemData}
                        addItemToCart={addItemToCart}
                        isFavorite={itemData && itemData.isFavourite && itemData.isFavourite.isFavourite}
                        saveFavorite={handleSaveFavorite}
                      />
                    ))}


                </div>
              </Grid>
              <Grid sm={4} item>
                <div className={classes.cartTotal}>
                  <Typography className={classes.totalHead}>
                    Item Total
                  </Typography>
                  {/* tax */}
                  {brandCart.cartInfo &&
                    brandCart.cartInfo.invoice &&
                    Object.keys(brandCart.cartInfo.invoice).map((invKey, i) => (
                      <div className={classes.cartList} key={i}>
                        {invKey !== 'coupon' && invKey !== 'loyalty' && invKey !== 'voucher' && (
                          <Typography>{invKey}:</Typography>
                        )}
                        {invKey !== 'coupon' && invKey !== 'loyalty' && invKey !== 'voucher' && (
                          <Typography>
                            <b>₹{brandCart.cartInfo.invoice[invKey]}</b>

                            {invKey === 'shipping' && (
                              <span
                                className={classes.taxesPopup}
                                onClick={() => {
                                  setShippingOpen(true)
                                  // setInvoiceDataInfo(brandCart.cartInfo);
                                }}
                              >
                                <svg
                                  width="16"
                                  height="18"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="8"
                                    cy="9.14282"
                                    r="8"
                                    fill="#E0E0E0"
                                  />
                                  <path
                                    d="M8.69824 6.54688V15H6.80762V6.54688H8.69824ZM6.68262 4.32812C6.68262 4.04167 6.77637 3.80469 6.96387 3.61719C7.15658 3.42448 7.4222 3.32812 7.76074 3.32812C8.09408 3.32812 8.3571 3.42448 8.5498 3.61719C8.74251 3.80469 8.83887 4.04167 8.83887 4.32812C8.83887 4.60938 8.74251 4.84375 8.5498 5.03125C8.3571 5.21875 8.09408 5.3125 7.76074 5.3125C7.4222 5.3125 7.15658 5.21875 6.96387 5.03125C6.77637 4.84375 6.68262 4.60938 6.68262 4.32812Z"
                                    fill="#717171"
                                  />
                                </svg>
                              </span>
                            )}

                            {invKey === 'taxes' && (
                              <span
                                className={classes.taxesPopup}
                                onClick={() => {
                                  handleClickOpen();
                                  setInvoiceDataInfo(brandCart.cartInfo);
                                }}
                              >
                                <svg
                                  width="16"
                                  height="18"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="8"
                                    cy="9.14282"
                                    r="8"
                                    fill="#E0E0E0"
                                  />
                                  <path
                                    d="M8.69824 6.54688V15H6.80762V6.54688H8.69824ZM6.68262 4.32812C6.68262 4.04167 6.77637 3.80469 6.96387 3.61719C7.15658 3.42448 7.4222 3.32812 7.76074 3.32812C8.09408 3.32812 8.3571 3.42448 8.5498 3.61719C8.74251 3.80469 8.83887 4.04167 8.83887 4.32812C8.83887 4.60938 8.74251 4.84375 8.5498 5.03125C8.3571 5.21875 8.09408 5.3125 7.76074 5.3125C7.4222 5.3125 7.15658 5.21875 6.96387 5.03125C6.77637 4.84375 6.68262 4.60938 6.68262 4.32812Z"
                                    fill="#717171"
                                  />
                                </svg>
                              </span>
                            )}
                          </Typography>)}
                      </div>
                    ))}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.md}
                  >
                    <Box p={4} className={classes.taxWrapper}>
                      <Typography variant="h2" style={{ marginBottom: 20 }}>
                        TAX BREAKUP
                      </Typography>
                      {invoiceDataInfo &&
                        invoiceDataInfo.taxInfo.map(taxinfoData => (
                          <div className={classes.cartList}>
                            <Typography>{`${taxinfoData.name} @${taxinfoData.taxPercentage
                              }`}</Typography>
                            <Typography>
                              <b>₹{taxinfoData.taxAmount}</b>
                              <span style={{ display: 'none' }}>
                                {(count += taxinfoData.taxAmount)}
                              </span>
                            </Typography>
                          </div>
                        ))}
                      <div className={classes.cartList}>
                        <Typography style={{ color: '#ac1715' }}>
                          TOTAL
                        </Typography>
                        <Typography>
                          <b>₹{count.toFixed(2)}</b>
                        </Typography>
                      </div>
                    </Box>
                  </Dialog>

                  <Dialog
                    open={shippingOpen}
                    onClose={() => setShippingOpen(false)}
                    className={classes.md}
                  >
                    <Box p={4} className={classes.taxWrapper}>
                      <Typography variant="h2" style={{ marginBottom: 20 }}>
                        Handling & Shipping charges
                      </Typography>
                      <Typography>
                        Includes pickup, long distance air/road transport, cooling & packaging services
                      </Typography>

                    </Box>
                  </Dialog>
                  {/* tax  */}

                  <Divider />
                  <Box className={classes.deliveryText}>
                    <span>
                      {selectedNewFlag[cartIndex]
                        ? 'Select Delivery Date:'
                        : 'Delivery Date:'}
                    </span>
                    {dateSelectDropDown(brandCart) ? (
                      <Autocomplete
                        key={brandCart.cityId}
                        onChange={(event, val) => {
                          handleDeliveryDateTimeChange({ brandCart, cartIndex, deliveryDate: val });
                        }}
                        id="controllablemo"
                        options={
                          (brandCart.cartInfo &&
                            [moment(
                              brandCart.cartInfo.delivery.deliveryDate,
                            ).format('DD-MMM-YYYY'), ...brandCart.cartInfo.delivery.futureDate]) ||
                          []
                        }
                        getOptionLabel={option => option ? option : ''}
                        style={{
                          width: '100%',
                          marginBottom: 15,
                          marginTop: 10,
                        }}

                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Delivery Date"
                            error={
                              deliveryError && deliveryError[brandCart.cityId] && deliveryError[brandCart.cityId].isDateError
                            }
                            helperText={deliveryError && deliveryError[brandCart.cityId] && deliveryError[brandCart.cityId].message}
                          />
                        )}
                      />
                    ) : (
                      <span className={classes.date}>
                        {moment(
                          brandCart.cartInfo.delivery.deliveryDate,
                        ).format('DD MMM YYYY')}
                        <span
                          style={{ color: 'red', cursor: 'pointer', marginLeft: 5 }}
                          onClick={() =>
                            // updateGlobelStoreByKeyVal({
                            //   key: 'selectedNewFlag',
                            //   value: {
                            //     ...selectedNewFlag,
                            //     [cartIndex]: !selectedNewFlag[cartIndex],
                            //   },
                            // })
                            handleDeliveryDateTimeChange({
                              brandCart,
                              cartIndex,
                              isDateSlot: true,
                            })
                          }
                        >
                          {' '}
                          <small>Change</small>
                        </span>
                      </span>
                    )}
                  </Box>
                  {timeSelectDropDown(brandCart) ? (
                    <Autocomplete
                      key={`${brandCart.cityId}time`}
                      options={
                        (brandCart.cartInfo &&
                          brandCart.cartInfo.delivery.timeSlots &&
                          [getFormatedTime(
                            brandCart.cartInfo.delivery.deliveryTime,
                          ), ...brandCart.cartInfo.delivery.timeSlots.future]) ||
                        []
                      }
                      onChange={(event, val) => {
                        // updateGlobelStoreByKeyVal({
                        //   key: 'selectedNewTime',
                        //   value: {
                        //     ...selectedNewTime,
                        //   },
                        // });
                        handleDeliveryDateTimeChange({ brandCart, cartIndex, deliverySlot: val })
                      }}
                      getOptionLabel={timeStr => getFormatedTime(timeStr)}
                      id="contso"
                      fullWidth
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Delivery Time"
                          error={
                            deliveryError && deliveryError[brandCart.cityId] && deliveryError[brandCart.cityId].isTimeError
                          }
                          helperText={deliveryError && deliveryError[brandCart.cityId] && deliveryError[brandCart.cityId].message}
                        />
                      )}
                    />
                  ) : (
                    <Box display="flex" className={classes.deliveryText}>
                      <Typography>Delivery Time:</Typography>
                      <span className={classes.date}>
                        {brandCart.cartInfo &&
                          brandCart.cartInfo.delivery.deliveryTime !== 'N/A'
                          ? getFormatedTime(
                            brandCart.cartInfo.delivery.deliveryTime,
                          )
                          : 'N/A'}
                        <span
                          style={{ color: 'red', cursor: 'pointer', marginLeft: 5 }}
                          onClick={() => handleDeliveryDateTimeChange({
                            brandCart,
                            cartIndex,
                            isTimeSlot: true,
                          })}
                        >
                          {brandCart.cartInfo &&
                            brandCart.cartInfo.delivery.deliveryTime !==
                            'N/A' && <small>Change</small>}
                        </span>
                      </span>
                    </Box>
                  )}

                </div>
                { brandCart.cartInfo.minCartAmount > 0 &&

<div className={classes.cartTotal2}>
<Typography style={{ color: '#AC1715', fontWeight: 700 }}>
  {' '}
  Order above   {
    brandCart.cartInfo.minCartAmount
  } and enjoy free shipping



</Typography>
</div>
                }
           

              </Grid>

            </Grid>
          </div>
        ))}


      <Grid container spacing={6} style={{ marginTop: 45 }}>
        <Grid sm={8} item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/')}
            fullWidth
          >
            CONTINUE SHOPPING
          </Button>
        </Grid>
        <Grid sm={4} item>
          {cartData &&
            cartData !== null &&
            cartData !== undefined &&
            cartData !== {} &&
            Object.entries(cartData).length !== 0 &&
            cartData.length !== 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (validateCheckout()) {
                  history.push('/checkout/shipping');
                }
              }}
              fullWidth
            >
              CHECK OUT
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/checkout/shipping')}
              fullWidth
              disabled
            >
              CHECK OUT
            </Button>
          )}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({
          ...snackbar,
          open: false,
        })}>
        <Alert severity={snackbar.variant}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
  couponData: selectCartStoreByKey('couponData'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  selectedNewDate: selectGlobelStoreByKey('selectedNewDate'),
  selectedNewFlag: selectGlobelStoreByKey('selectedNewFlag'),
  selectedNewFlagTime: selectGlobelStoreByKey('selectedNewFlagTime'),
  selectedNewTime: selectGlobelStoreByKey('selectedNewTime'),
  authData: selectGlobelStoreByKey('userDetails'),
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
      fetchCart
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
)(YourCart);