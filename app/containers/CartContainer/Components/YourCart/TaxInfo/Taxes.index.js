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
} from '@material-ui/core';
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
// import Rectangle165 from '../../../../images/Rectangle165.jpg';
// import Rectangle162 from '../../../../images/Rectangle162.jpg';
import {
  JMRCard,
  ListCard,
  RestroSearch,
  SelectAddressPopup,
} from '../../../../../components';
import CouponDialog from '../../../../../components/CouponDialog';
import { selectStoreByKey } from '../../../../HomePage/selectors';
import { selectCartStoreByKey } from '../../../selectors';
import { selectGlobelStoreByKey } from '../../../../App/selectors';
import { addItemToCart } from '../../../../HomePage/actions';
import { updateGlobelStoreByKeyVal } from '../../../../App/actions';

import {
  submitCartndPleceOrder,
  getCoupons,
  applySelectedCoupon,
  setDeliveryAddress,
  getDeliveryAddress,
} from '../../../actions';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    // maxWidth: 1144,
    // margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    // padding: '20px 40px 40px',
    marginTop: -26,
    marginLeft: 55,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '25',
      padding: '0px',
    },
  },
  taxesPopup: {
    marginLeft: 15,
    verticalAlign: 'text-bottom',
    cursor: 'pointer',
  },
  taxWrapper: {
    '& > div:last-child': {
      color: theme.palette.primary.main,
    },
  },

  date: {
    color: '#AC1715 !important',
    marginLeft: 5,
  },
  //   cartTotal: {
  //     boxShadow: '0px 4px 20px #CFCFCF',
  //     padding: 30,
  //     borderRadius: 12,
  //     backgroundColor: '#fff',
  //   },
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
}));

const YourCart = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [invoiceDataInfo, setInvoiceDataInfo] = useState(null);

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
  } = props;

  const [coupan, setCoupan] = useState();

  const { history } = useContext(HistoryContext);
  const applyCoupon = (val, isRemove = false) => {
    applySelectedCoupon({ selectedCoupon: val, cartData, isRemove });
  };

  const applyLoyaltyPoint = () => {
    alert('loyalty point click');
  };
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
  const count_shipping = 0;

  cartData &&
    Object.entries(cartData).map(([key, cartInfo]) => {

      count += cartInfo.cartInfo.invoice.taxes;
    });

  return (
    <div className={classes.appWrapper}>
      <div>
        <Grid item container>
          <Grid sm={4} item>
            <Typography>
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
                  <circle cx="8" cy="9.14282" r="8" fill="#E0E0E0" />
                  <path
                    d="M8.69824 6.54688V15H6.80762V6.54688H8.69824ZM6.68262 4.32812C6.68262 4.04167 6.77637 3.80469 6.96387 3.61719C7.15658 3.42448 7.4222 3.32812 7.76074 3.32812C8.09408 3.32812 8.3571 3.42448 8.5498 3.61719C8.74251 3.80469 8.83887 4.04167 8.83887 4.32812C8.83887 4.60938 8.74251 4.84375 8.5498 5.03125C8.3571 5.21875 8.09408 5.3125 7.76074 5.3125C7.4222 5.3125 7.15658 5.21875 6.96387 5.03125C6.77637 4.84375 6.68262 4.60938 6.68262 4.32812Z"
                    fill="#717171"
                  />
                </svg>
              </span>
            </Typography>
            <Dialog open={open} onClose={handleClose} className={classes.md}>
              <Box p={4} className={classes.taxWrapper}>
                <Typography variant="h2" style={{ marginBottom: 20 }}>
                  TAX BREAKUP
                </Typography>
                <div>
                  {cartData &&
                    Object.entries(cartData).map(([key, cartInfo]) => (
                      <>
                        {/* <Typography style={{ color: '#000' }}>
                          {cartInfo.cartInfo.items[0].itemName}
                        </Typography> */}
                        {cartInfo.cartInfo.taxInfo.map((item, idx) => {
                          return (
                            <>
                              <Typography style={{ color: '#000', textTransform: 'capitalize' }}>
                                {item.name}
                              </Typography>
                              <Typography style={{ color: '#000', textTransform: 'capitalize' }}>
                                <b>₹{item.taxAmount}</b>
                              </Typography>
                            </>
                          )
                        })}
                      </>
                    ))}


                  <br />
                  <Typography style={{ color: '#ac1715' }}>TOTAL</Typography>
                  <Typography>
                    <b>₹{count.toFixed(2)}</b>
                  </Typography>
                </div>
              </Box>
            </Dialog>
            {/* tax  */}
          </Grid>
          {/* copy till here */}
        </Grid>
      </div>
    </div>
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
