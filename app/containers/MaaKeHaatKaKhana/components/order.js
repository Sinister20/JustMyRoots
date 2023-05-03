import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Container,
  Box,
  IconButton,
  Snackbar,
  Tooltip,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { getFormatedTime } from 'utils/utils';
import { createStructuredSelector } from 'reselect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HistoryContext } from 'containers/App/HistoryContext';
import { selectStoreByKey } from 'containers/HomePage/selectors';
import {
  fetchPincodeByCity,
  fetchUomMeta,
  createMaaKeHathKaKhana,
  addItemToCart,
} from 'containers/HomePage/actions';
import axios from 'axios';
import { selectCartStoreByKey } from 'containers/CartContainer/selectors';
import { selectGlobelStoreByKey } from 'containers/App/selectors';

import { updateGlobelStoreByKeyVal } from 'containers/App/actions';
import {
  AddCircle,
  ArrowDropDown,
  Person,
  Home,
  AlternateEmail,
  PhoneIphone,
} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonHeading from '../../HomePage/Components/CommonHeading';
import PickupAndDeliveryAddress from './PickupAndDeliveryAddress';
import { PaymentOptions, SelectAddress } from '../../CartContainer/Components';
import { cart } from './cart';
import { getAddress } from '../../MyAccount/actions';
import { selectMyAccountStoreByKey } from '../../MyAccount/selectors';
import ManageNewAddDialog from './ManageNewAddDialog';
import ProductAddModal from './ProductModal';
import ProductTable from './ProductTable';
import { addToDFHCart, validateDFH } from '../actions';
import { setDeliveryAddress } from '../../CartContainer/actions';
import offer from '../../../images/offer.png';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../../config/environmentConfig';
import VoucherMessage from '../../CartContainer/Components/VoucherMessage';

const storedPickupCity = window.localStorage.getItem('pickupCity')
  ? JSON.parse(window.localStorage.getItem('pickupCity'))
  : null;
const localStorageProductData = window.localStorage.getItem('productData');
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '22px auto 0',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  addressContainer: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  desc: {
    fontSize: 18,
    fontWeight: 400,
  },
  label: {
    display: 'block',
    marginTop: 10,
  },
  paperWidth: {
    width: 700,
  },
  productdetails: {
    display: 'block',
  },
  toalign: {
    marginTop: '12.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: 2,
    },
  },
  selectedDiv: {
    backgroundColor: '#fff',
    color: '#a2a2a2',
    display: 'block',
    padding: '5px 0',
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 150,
    border: '1px solid #c4c4c4',
    textAlign: 'left',
    paddingLeft: 10.5,
    paddingRight: 10.5,
    paddingTop: 7,
    paddingBottom: 7,
    cursor: 'pointer',
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
  offerWrapper: {
    // border: '1px solid #CCCCCC',
    borderRadius: 5,
    padding: '5px 15px',
    minHeight: 35,
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
}));

const Order = ({
  maaKedeliveryFood = {},
  updateGlobelStoreByKeyVal,
  createMaaKeHathKaKhana,
  uomMeta,
  fetchUomMeta,
  getAddress,
  validateDFHCity,
  addToDFHCart,
  validateDFH,
  deliveryInLocations,
  setDeliveryAddress,
  cartData,
  selectedBillingAddr,

}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { history } = useContext(HistoryContext);
  const [myAddress, setMyAddress] = useState([]);
  const [myPickUpAddLoading, setMyAPickUPddLoading] = useState(false);
  const [myDeliveryAddLoading, setMyDeliveryAddLoading] = useState(false);
  const [myDeliveryAddSelect, setMyDeliveryAddressSelect] = useState(false);
  const [isOpenManageAdd, setIsOpenManageAdd] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [showPaymentOption, setShowPaymentOption] = useState(false);
  const [productData, setProductData] = useState([]);
  const [snackBarError, setSnackBarError] = useState('');
  const [voucher, setVoucher] = useState(false);
  const [partialVoucher, setPartialVoucher] = useState(false)
  const [voucherPrice, setVoucherPrice] = useState('')
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherType, setVoucherType] = useState('')
  const [showMessage, setShowMessage] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState('');
  const token = JSON.parse(localStorage.getItem('lscache-HKTWQ')) ? JSON.parse(localStorage.getItem('lscache-HKTWQ')):'' ;
  const finalToken = token.replaceAll('"', '');
  const sessionId = JSON.parse(localStorage.getItem('lscache-sessionId'));
  const finalSession = sessionId.replaceAll('"', '');
  const [orderData, setOrderData] = useState({
    pickupCity: null,
    pickupAddress: null,
    deliveryCity: null,
    deliveryAddress: null,
    deliveryDateDetails: null,
    pickupDateDetails: null,
    deliveryDate: null,
    deliverySlot: null,
    pickupDate: null,
  });
  const currentUrl = apiUrlPrefixes[currentEnvironment];
  const [error, setError] = useState({});
  const handleOrderData = data => {
    setError({
      ...error,
      [data.target.name]: null,
    });
    switch (data.target.name) {
      case 'deliveryAddress':
        setOrderData({
          ...orderData,
          deliveryAddress: data.target.value ? data.target.value._id : null,
          deliveryCity: data.target.value ? data.target.value.cityId._id : null,
          fullDeliveryAddress: data.target.value ? data.target.value : null,
        });
        setDeliveryAddress(data.target.value);
        break;
      case 'pickupAddress':
        setOrderData({
          ...orderData,
          pickupAddress: data.target.value ? data.target.value._id : null,
          pickupCity: data.target.value ? data.target.value.cityId._id : null,
          fullPickUpAddress: data.target.value ? data.target.value : null,
        });
        break;
      case 'deliveryDate':
        setOrderData({
          ...orderData,
          deliverySlot: null,
          [data.target.name]: data.target.value,
        });
        break;
      case 'deliverySlot':
        setOrderData({
          ...orderData,
          [data.target.name]: data.target.value,
        });
        validateDeliveryAndPickupSlot({ deliverySlot: data.target.value });
        break;
      default:
        setOrderData({ ...orderData, [data.target.name]: data.target.value });
    }
  };
  const validateDeliveryAndPickupSlot = ({ deliverySlot }) => {
    const values = {
      deliveryCity: orderData.deliveryCity,
      deliveryAddress: orderData.deliveryAddress,
      pickupCity: orderData.pickupCity,
      pickupAddress: orderData.pickupAddress,
      deliveryDate: orderData.deliveryDate,
      deliverySlot,
    };
    const isValid = Object.entries(values).every(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        setError({ ...error, [key]: 'This field is required' });
        return false;
      }
      return true;
    });
    if (isValid) {
      new Promise((resolve, reject) =>
        validateDFH({
          resolve,
          reject,
          values,
        }),
      )
        .then(res => {
          if (res.data.success) {
            setOrderData({
              ...orderData,
              deliverySlot,
              pickupDate: res.data.data.pickupDate,
              pickupSlot: res.data.data.pickupSlot,
            });
          } else {
            setError({
              ...error,
              deliveryDate:
                res.data.error.length > 0
                  ? res.data.error[0]
                  : 'Delivery service not available.',
            });
            setSnackBarError('Delivery not possible in this location');
          }
        })
        .catch(err => {
          //
        });
    }
  };
  useEffect(() => {
    localStorageProductData &&
      setProductData(JSON.parse(localStorageProductData));
    getAllAddress();
  }, []);

  const voucherApply = () => {
    axios.post(`${currentUrl}/api/mobile/dfh/voucherInfo`, {
      voucherCode: voucherCode,
    },
      {
        headers: {
          Authorization: `Bearer ${finalToken}`
        }
      })
      .then((res) => {
        if (res.data.success === false) {
          return alert(res.data.error[0])
        }
        else if (res.data.data.vtype === "1" && res.data.data.price <= productData.reduce((acc, item) => {
          return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
        }, 0)) {
          setVoucher(true);
          setVoucherPrice(res.data.data.price);
          setVoucherType(res.data.data.vtype)

        }
        else if (res.data.data.vtype === "0" && res.data.data.price * 2.5 <= productData.reduce((acc, item) => {
          return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges)).toFixed(2)
        }, 0)) {
          setPartialVoucher(true);
          setVoucherPrice(res.data.data.price);
          setVoucherType(res.data.data.vtype)
          

        }
        else if (res.data.data.vtype === "1" && res.data.data.price > productData.reduce((acc, item) => {
          return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
        }, 0)) {
          setVoucherPrice(res.data.data.price);
          setVoucher(true);
          setShowMessage(true);
          setVoucherType(res.data.data.vtype)
          setVoucherMessage(`Dear Customer, you have a balance of ${(res.data.data.price - productData.reduce((acc, item) => {
            return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
          }, 0)).toFixed(2)} unutilised in your Voucher number ${res.data.data.voucherCode}. This balance can not be carried forward. Do you want to forego this discount amount of ${(res.data.data.price - productData.reduce((acc, item) => {
            return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
          }, 0)).toFixed(2)}? Alternatively you can add one more item and redeem the amount fully.`);
        }

        else if (res.data.data.vtype === "0" && res.data.data.price * 2.5 > productData.reduce((acc, item) => {
          return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges)).toFixed(2)
        }, 0)) {
          setVoucherPrice(res.data.data.price);
          setPartialVoucher(true);
          setShowMessage(true);
          setVoucherType(res.data.data.vtype)
          setVoucherMessage(`To apply this voucher, Minimum Freight Charge amount should be ${res.data.data.price * 2.5}`);
        }
      })
      .catch((err) => {
        setVoucher(false);
      })
  }

  const removeVoucher = () => {
    setVoucher(false)
    setPartialVoucher(false)
    setVoucherPrice('')
    setVoucherCode('')
  }

  const getAllAddress = () => {
    new Promise((resolve, reject) => getAddress({ resolve, reject }))
      .then(res => {
        if (res.items) {
          setMyAddress(res.items);
        }
        setMyAPickUPddLoading(false);
        setMyDeliveryAddLoading(false);
      })
      .catch(err => {
        // setMyAddLoading(false);
      });
  };

  const handleAddProduct = data => {
    const price = parseInt(data.packagingType.rate) * parseInt(data.quantity);
    const productList = {
      ...data,
      id: Math.random(),
      freightCharges: price.toFixed(2),
      gst: (price * 0.18).toFixed(2),
      total: (price + price * 0.18).toFixed(2),
      unit: data.packagingType.name,
    };
    const pD = [
      ...productData.filter(p => p.id !== productList.id),
      { ...productList },
    ];
    setAddProductModal(false);
    setProductData(state => [
      ...state.filter(p => p.id !== productList.id),
      { ...productList },
    ]);
    window.localStorage.setItem('productData', JSON.stringify(pD));
  };

  const handlePayment = () => {
    const payload = {
      ...orderData,
      items: productData.map(i => ({
        quantity: i.quantity,
        uom: i.packagingType.unit,
        itemDescription: i.description,
      })),
    };


    const isValid = Object.entries(orderData).every(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        setError({ ...error, [key]: 'This field is required' });
        return false;
      }
      return true;
    });
    if (isValid) {
      new Promise((resolve, reject) =>
        addToDFHCart({ resolve, reject, payload }),
      )
        .then(res => {
          if (res.data.success) {
            history.push('/maa-ke-haat-ka-khana/payment-options');
            window.localStorage.removeItem('validateDFHCity');
            window.localStorage.removeItem('pickupCity');
            window.localStorage.removeItem('productData');
          } else if (res.data.error.length > 0) {
            setSnackBarError(res.data.error[0]);
          }
          //   else if (voucherPrice >= productData.reduce((acc, item) => {
          //     return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
          // }, 0)){
          //   placeDfhOrder(res.data.data._id)
          //    history.push('/thank-you')

          //   }
          else {
            setSnackBarError('Delivery not possible in this location');
          }

        })
        .catch(err => { });
    } else {
      setSnackBarError('Please fill all required the fields');
    }
  };

  const handlePayNow = () => {
    const payload = {
      ...orderData,
      items: productData.map(i => ({
        quantity: i.quantity,
        uom: i.packagingType.unit,
        itemDescription: i.description,
      })),
    };


    const isValid = Object.entries(orderData).every(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        setError({ ...error, [key]: 'This field is required' });
        return false;
      }
      return true;
    });
    if (isValid) {
      new Promise((resolve, reject) =>
        addToDFHCart({ resolve, reject, payload }),
      )
        .then(res => {
          if (res.data.success) {
            placeDfhOrder(res.data.data._id)
            history.push('/thank-you');
            window.localStorage.removeItem('validateDFHCity');
            window.localStorage.removeItem('pickupCity');
            window.localStorage.removeItem('productData');
          } else if (res.data.error.length > 0) {
            setSnackBarError(res.data.error[0]);
          }
          //   else if (voucherPrice >= productData.reduce((acc, item) => {
          //     return parseFloat(parseFloat(acc) + parseFloat(item.total)).toFixed(2)
          // }, 0)){
          //   placeDfhOrder(res.data.data._id)
          //    history.push('/thank-you')

          //   }
          else {
            setSnackBarError('Delivery not possible in this location');
          }

        })
        .catch(err => { });
    } else {
      setSnackBarError('Please fill all required the fields');
    }
  };




  const placeDfhOrder = (id) => {
    axios.post(`${currentUrl}/api/payment/dfh/placeOrder`, {
      cartId: id,
      billingAddress: myAddress._id,

    }, {
      headers: {
        "Authorization": `Bearer ${finalToken}`,
        'sessionId': finalSession

      }
    })
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          history.push('/thank-you')
        }
      })
  }
  const handleAddressModalClose = (res = null) => {
    //
    if (res) {
      if (myDeliveryAddSelect) {
        if (res.data.data.cityId._id === deliveryInLocations._id) {
          handleOrderData({
            target: {
              name: 'deliveryAddress',
              value: res.data.data,
            },
          });
        }
      } else if (res.data.data.cityId._id == storedPickupCity) {
        handleOrderData({
          target: {
            name: 'pickupAddress',
            value: res.data.data,
          },
        });
      }
    }

    setIsOpenManageAdd(false);
  };

  // console.log("62453a925618d41d5c410d0c", (storedPickupCity))
  const _renderOrderUi = () => (
    <>
      {showMessage && (
        <VoucherMessage
          onClose={() => setShowMessage(false)}
          message={voucherMessage}
        />
      )}
      <CommonHeading heading="MAA KE HAATH KA KHANA" viewmore />
      <Box mb={isMobile ? 4 : 8} mt={isMobile ? 8 : 0}>
        <Typography className={classes.title}>Direct From Home</Typography>
        <Typography className={classes.desc}>
          Get your Home Cooked Food picked up from anywhere &amp; get it
          delivered to your city within 24 Hours in metro cities!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} spacing={4}>
          <Box my={4}>
            <Autocomplete
              id="pickup-address"
              onFocus={() => {
                setMyAPickUPddLoading(true);
                getAllAddress();
              }}
              options={
                myAddress.length > 0
                  ? myAddress.filter(
                    item =>
                      item.cityId._id ==
                      JSON.parse(window.localStorage.getItem('pickupCity')),
                  )
                  : []
              }
              getOptionLabel={option =>
                option
                  ? `${option.addressLineOne}, ${option.addressLineTwo}, ${option.cityId.name
                  }-${option.pinId.pin}`
                  : ''
              }
              value={
                orderData.fullPickUpAddress ? orderData.fullPickUpAddress : null
              }
              loading={myPickUpAddLoading}
              loadingText="Loading..."
              style={{ width: '100%' }}
              onChange={(e, value) => {
                handleOrderData({
                  target: {
                    name: 'pickupAddress',
                    value,
                  },
                });
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  size="small"
                  autoFocus={error.pickupAddress || error.pickupCity}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {myPickUpAddLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <IconButton
                            size="small"
                            style={{ marginLeft: 4 }}
                            onClick={() => {
                              setMyDeliveryAddressSelect(false);
                              setIsOpenManageAdd(true);
                            }}
                          >
                            <AddCircle fontSize="small" />
                          </IconButton>
                        )}

                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  label="From"
                  variant="outlined"
                  error={!!(error.pickupAddress || error.pickupCity)}
                  helperText={error.pickupAddress || error.pickupCity}
                />
              )}
            />
          </Box>
          {
            // console.log("pickup", orderData.fullPickUpAddress)
          }
          {orderData.fullPickUpAddress && (
            <Box my={4} border={1} p={3} borderRadius={10} borderColor="gray">
              <Box display="flex" alignItems="center">
                <Person
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullPickUpAddress &&
                    orderData.fullPickUpAddress.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Home
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullPickUpAddress &&
                    orderData.fullPickUpAddress.addressLineOne +
                    orderData.fullPickUpAddress.addressLineTwo}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <AlternateEmail
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullPickUpAddress &&
                    orderData.fullPickUpAddress.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIphone
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullPickUpAddress &&
                    orderData.fullPickUpAddress.phoneNumber}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6} spacing={4}>
          <Box my={4}>
            <Autocomplete
              id="delivery-address"
              options={
                myAddress.length > 0
                  ? myAddress.filter(
                    item => item.cityId._id === deliveryInLocations._id,
                  )
                  : []
              }
              onFocus={() => {
                setMyDeliveryAddLoading(true);
                getAllAddress();
              }}
              getOptionLabel={option =>
                option
                  ? `${option.addressLineOne}, ${option.addressLineTwo}, ${option.cityId.name
                  }-${option.pinId.pin}`
                  : ''
              }
              inputValue={
                orderData.fullDeliveryAddress
                  ? `${orderData.fullDeliveryAddress.addressLineOne}, ${orderData.fullDeliveryAddress.addressLineTwo
                  }, ${orderData.fullDeliveryAddress.cityId.name}-${orderData.fullDeliveryAddress.pinId.pin
                  }`
                  : ''
              }
              style={{ width: '100%' }}
              loading={myDeliveryAddLoading}
              loadingText="Loading..."
              onChange={(e, value) => {
                handleOrderData({
                  target: {
                    name: 'deliveryAddress',
                    value,
                  },
                });
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  size="small"
                  row={4}
                  autoFocus={error.deliveryAddress || error.deliveryCity}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {myDeliveryAddLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <IconButton
                            size="small"
                            style={{ marginLeft: 4 }}
                            onClick={() => {
                              setMyDeliveryAddressSelect(true);
                              setIsOpenManageAdd(true);
                            }}
                          >
                            <AddCircle fontSize="small" />
                          </IconButton>
                        )}

                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  label="To"
                  variant="outlined"
                  error={!!(error.deliveryAddress || error.deliveryCity)}
                  helperText={error.deliveryAddress || error.deliveryCity}
                />
              )}
            />
          </Box>
          {orderData.fullDeliveryAddress && (
            <Box my={4} border={1} p={3} borderRadius={10} borderColor="gray">
              <Box display="flex" alignItems="center">
                <Person
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullDeliveryAddress &&
                    orderData.fullDeliveryAddress.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Home
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullDeliveryAddress &&
                    orderData.fullDeliveryAddress.addressLineOne +
                    orderData.fullDeliveryAddress.addressLineTwo}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <AlternateEmail
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullDeliveryAddress &&
                    orderData.fullDeliveryAddress.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIphone
                  fontSize="small"
                  style={{ marginRight: 5 }}
                  color="primary"
                />
                <Typography variant="h5">
                  {orderData.fullDeliveryAddress &&
                    orderData.fullDeliveryAddress.phoneNumber}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddProductModal(true)}
        >
          Add Product
        </Button>
      </Grid>
      {!voucher &&
        <ProductTable
          productData={productData}
          voucherActive={voucher}
          partialVoucherActive={partialVoucher}
          voucher={voucherPrice}
          handleDelete={data => {
            const { id } = data;
            const newP = productData.filter(item => item.id !== id);
            window.localStorage.setItem('productData', JSON.stringify(newP));
            setProductData(newP);
          }}
        />
      }
      {
        voucher &&
        <ProductTable
          productData={productData}
          voucherActive={voucher}
          partialVoucherActive={partialVoucher}
          voucher={voucherPrice}
          handleDelete={data => {
            const { id } = data;
            const newP = productData.filter(item => item.id !== id);
            window.localStorage.setItem('productData', JSON.stringify(newP));
            setProductData(newP);
          }}
        />
      }
      <Box my={5} textAlign="center">
        <Typography>
          {' '}
          Justmyroots reserves the right to reject any product that does not
          comply with the law of the land.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid Grid item xs={12} md={6} spacing={2}>
          <TextField
            fullWidth
            autoFocus={error.name}
            id="outlined-multiline-static"
            label="Delivery Date"
            type="date"
            value={orderData.deliveryDate}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={handleOrderData}
            name="deliveryDate"
            error={error.deliveryDate}
            helperText={error.deliveryDate}
            min={new Date().toISOString().substr(0, 10)}
            inputProps={{
              min: new Date().toISOString().substr(0, 10),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6} spacing={2}>
          <Autocomplete
            id="delivery-address"
            options={
              uomMeta && uomMeta.delivarySlots
                ? uomMeta.delivarySlots
                : ['09-12', '12-15', '15-18', '18-21']
            }
            getOptionLabel={option => option}
            style={{ width: '100%' }}
            onChange={(e, value) => {
              handleOrderData({
                target: {
                  name: 'deliverySlot',
                  value,
                },
              });
            }}
            inputValue={orderData.deliverySlot ? orderData.deliverySlot : ''}
            renderInput={params => (
              <TextField
                {...params}
                label="Delivery Slot"
                variant="outlined"
                autoFocus={error.deliverySlot}
                error={error.deliverySlot}
                helperText={error.deliverySlot}
                margin="normal"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} spacing={2}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Pickup Date"
            type="date"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            disabled
            autoFocus={error.pickupDate}
            name="pickupDate"
            value={
              orderData.pickupDate &&
              new Date(orderData.pickupDate).toISOString().substr(0, 10)
            }
            error={!!error.pickupDate}
            helperText={error.pickupDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6} spacing={2}>
          <TextField
            label="PickUp Slot"
            variant="outlined"
            disabled
            margin="normal"
            fullWidth
            defaultValue="09-12"
            autoFocus={error.pickupSlot}
            value={orderData.pickupSlot}
          />
        </Grid>
        <Grid Grid item xs={12} md={6} spacing={2}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Pickup date details"
            type="text"
            multiline
            rows="4"
            name="pickupDateDetails"
            onChange={handleOrderData}
            value={orderData.pickupDateDetails}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            error={!!error.pickupDateDetails}
            helperText={error.pickupDateDetails}
            autoFocus={error.pickupDateDetails}
          />
        </Grid>
        <Grid Grid item xs={12} md={6} spacing={2}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Delivery date details"
            type="text"
            multiline
            rows="4"
            name="deliveryDateDetails"
            onChange={handleOrderData}
            className={classes.textField}
            value={orderData.deliveryDateDetails}
            autoFocus={error.deliveryDateDetails}
            margin="normal"
            variant="outlined"
            error={!!error.deliveryDateDetails}
            helperText={error.deliveryDateDetails}
          />
        </Grid>
      </Grid>
      <Box my={5} textAlign="center">
        <Typography>
          If you want any earlier Delivery/Pickup please speak with customer
          service at +91 7777027222
        </Typography>
      </Box>

      {/* <Box mt={4} mx={5}
        textAlign="center"
        // display="flex"
        // justifyContent="space-between"
        // alignItems="center"
        className={classes.offerWrapper}
      >
        <Box className={classes.textWrapper} >
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
             value={voucherCode}
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
      </Box> */}

      <Box my={5} textAlign="center">
        {
          productData.length === 0 && !voucherType && (
            <Tooltip
              title="Please add some products to continue.."
              placement="top-start"
            >
              <Button
                disabled={true}
                onClick={() => handlePayment()}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: productData.length > 0 ? 'green' : 'gray',
                }}
              // color="primary"
              >
                Pay Now ₹{' '}
                {/* {productData.length > 0
                  ? (productData.reduce((acc, cur) => acc + cur.total, 0)).toFixed(2)
                  : 0} */}
              </Button>
            </Tooltip>
          )
        }

{
          productData.length > 0 && !voucherType && (
            <Tooltip
              title="Continue to pay"
              placement="top-start"
            >
              <Button
                  onClick={() => handlePayment()}
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: productData.length > 0 ? 'green' : 'gray',
                    color: productData.length > 0 ? 'white' : 'black',
                  }}
                >
                  Pay Now ₹{' '}
                  {productData.reduce(
                    (acc, cur) =>
                      parseFloat(
                        parseFloat(acc) + parseFloat(cur.total),
                      ).toFixed(2),
                    0,
                  )
                  }
                
                </Button>
            </Tooltip>
          )
        }
        
        {
          productData.length > 0 && voucherType === "1" && (
            <Tooltip title="Continue to pay" placement="top-start">
              {productData.reduce(
                (acc, cur) =>
                  parseFloat(
                    parseFloat(acc) + parseFloat(cur.total),
                  ).toFixed(2),
                0,
              ) - voucherPrice > 0 ?
                <Button
                  onClick={() => handlePayment()}
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: productData.length > 0 ? 'green' : 'gray',
                    color: productData.length > 0 ? 'white' : 'black',
                  }}
                >
                  Pay Now ₹{' '}
                  {productData.length > 0
                    ? (productData.reduce(
                      (acc, cur) =>
                        parseFloat(
                          parseFloat(acc) + parseFloat(cur.total),
                        ).toFixed(2),
                      0,
                    ) - voucherPrice).toFixed(2)
                    : 0}

                </Button> :
                <Button
                  // disabled={}
                  onClick={() => handlePayNow()}
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: productData.length > 0 ? 'green' : 'gray',
                    color: productData.length > 0 ? 'white' : 'black',
                  }}
                >

                  Place Order

                </Button>

              }
            </Tooltip>
          )
        }

        {
          productData.length > 0 && voucherType === "0" && (
            <Tooltip title="Continue to pay" placement="top-start">
              {voucherPrice * 2.5 >= productData.reduce(
                (acc, cur) =>
                  parseFloat(
                    parseFloat(acc) + parseFloat(cur.freightCharges),
                  ).toFixed(2),
                0,
              ) ?
                <Button
                  onClick={() => handlePayment()}
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: productData.length > 0 ? 'green' : 'gray',
                    color: productData.length > 0 ? 'white' : 'black',
                  }}
                >
                  Pay Now ₹{' '}
                  {productData.reduce(
                    (acc, cur) =>
                      parseFloat(
                        parseFloat(acc) + parseFloat(cur.total),
                      ).toFixed(2),
                    0,
                  )
                  }
                  {/* {productData.length > 0 && voucherPrice*2.5 >= productData.reduce(
              (acc, cur) =>
                parseFloat(
                  parseFloat(acc) + parseFloat(cur.freightCharges),
                ).toFixed(2),
              0,
            )
                  ? (productData.reduce(
                    (acc, cur) =>
                      parseFloat(
                        parseFloat(acc) + parseFloat(cur.total),
                      ).toFixed(2),
                    0,
                  ))
                  : 
                  ((productData.reduce((acc, item) => {
                    return parseFloat(parseFloat(acc) + parseFloat(item.gst))
                }, 0)) + (productData.reduce((acc, item) => {
                    return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges))
                }, 0) - voucherPrice)).toFixed(2)
                
                  } */}

                </Button> :
                <Button
                  // disabled={}
                  onClick={() => handlePayNow()}
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: productData.length > 0 ? 'green' : 'gray',
                    color: productData.length > 0 ? 'white' : 'black',
                  }}
                >

                  Pay Now ₹{' '}
                  {
                    ((productData.reduce((acc, item) => {
                      return parseFloat(parseFloat(acc) + parseFloat(item.gst))
                    }, 0)) + (productData.reduce((acc, item) => {
                      return parseFloat(parseFloat(acc) + parseFloat(item.freightCharges))
                    }, 0) - voucherPrice)).toFixed(2)
                  }

                </Button>

              }
            </Tooltip>
          )
        }

        {/* {productData.length === 0 && !voucher ? (
          <Tooltip
            title="Please add some products to continue.."
            placement="top-start"
          >
            <Button
              disabled={true}
              onClick={() => handlePayment()}
              variant="contained"
              size="large"
              style={{
                backgroundColor: productData.length > 0 ? 'green' : 'gray',
              }}
            // color="primary"
            >
              Pay Now ₹{' '}
              {productData.length > 0
                ? (productData.reduce((acc, cur) => acc + cur.total, 0)).toFixed(2)
                : 0}
            </Button>







          </Tooltip>
        ) : (
          <Tooltip title="Continue to pay" placement="top-start">
            {productData.reduce(
              (acc, cur) =>
                parseFloat(
                  parseFloat(acc) + parseFloat(cur.total),
                ).toFixed(2),
              0,
            ) - voucherPrice > 0 ?
              <Button
                // disabled={}
                onClick={() => handlePayment()}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: productData.length > 0 ? 'green' : 'gray',
                  color: productData.length > 0 ? 'white' : 'black',
                }}
              >
                Pay Now ₹{' '}
                {productData.length > 0
                  ? (productData.reduce(
                    (acc, cur) =>
                      parseFloat(
                        parseFloat(acc) + parseFloat(cur.total),
                      ).toFixed(2),
                    0,
                  ) - voucherPrice).toFixed(2)
                  : 0}

              </Button> :
              <Button
                // disabled={}
                onClick={() => handlePayNow()}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: productData.length > 0 ? 'green' : 'gray',
                  color: productData.length > 0 ? 'white' : 'black',
                }}
              >

                Place Order

              </Button>

            }
          </Tooltip>
        )} */}
      </Box>
    </>
  );
  return (
    <Container
      fixed
      style={{
        marginBottom: '2rem',
      }}
    >
      {_renderOrderUi()}
      <ManageNewAddDialog
        open={isOpenManageAdd}
        handleClose={handleAddressModalClose}
      />
      {addProductModal && (
        <ProductAddModal
          open={addProductModal}
          handleClose={() => setAddProductModal(false)}
          updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
          history={history}
          packagingType={uomMeta && uomMeta.weightScale}
          handleAddProduct={data => handleAddProduct(data)}
        />
      )}
      {
        <Snackbar
          transitionDuration={500}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackBarError}
          autoHideDuration={4000}
          onClose={() => setSnackBarError('')}
        >
          <Alert severity="error">{snackBarError}</Alert>
        </Snackbar>
      }
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectStoreByKey('cities'),
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  maaDeliveryFoodCart: selectGlobelStoreByKey('maaDeliveryFoodCart'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
  myAddress: selectMyAccountStoreByKey('myAddress'),
  validateDFHCity: selectGlobelStoreByKey('validateDFHCity'),
  uomMeta: selectGlobelStoreByKey('uomMeta'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLoc'),
  cartData: selectStoreByKey('cartData'),
  selectedBillingAddr: selectGlobelStoreByKey('selectedBillingAddr'),

});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemToCart,
      updateGlobelStoreByKeyVal,
      fetchPincodeByCity,
      fetchUomMeta,
      createMaaKeHathKaKhana,
      getAddress,
      addToDFHCart,
      validateDFH,
      setDeliveryAddress,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Order);
