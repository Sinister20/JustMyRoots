import React from 'react';
import {
  Grid,
  makeStyles,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Snackbar,

  FormHelperText,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Autocomplete } from '@material-ui/lab';
import { createStructuredSelector } from 'reselect';
import { selectStoreByKey } from 'containers/HomePage/selectors';
import { selectGlobelStoreByKey } from 'containers/App/selectors';
import { selectCartStoreByKey } from 'containers/CartContainer/selectors';
import {
  fetchPincodeByCity,
  createWishADish,
} from 'containers/HomePage/actions';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { updateGlobelStoreByKeyVal } from 'containers/App/actions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CommonHeading from '../HomePage/Components/CommonHeading';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles(theme => ({
  phoneBoxStyles: {
    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
  },
  appWrapper: {
    maxWidth: 1064,
    margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  formWrapper: {
    marginTop: 20,
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

const Wish = props => {
  const classes = useStyles();
  const [errors, setErrors] = React.useState({
    name: null,
    email: null,
    mobileNumber: null,
    dishYourWish: null,
    getItforMeNow: null,
    addToYourProduct: null,
    restaurantName: null,
    restaurantLocation: null,
    anyOtherCity: null,
    pinCode: null,
    deliveryAddress: null,
  });
  const [showSnackbar, setShowSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const {
    citiesList,
    fetchPincodeByCity,
    updateGlobelStoreByKeyVal,
    deliveryInPincode,
    wishADishFormData = {},
    createWishADish,
  } = props;

  const handleWishADishSubmit = () => {
    const wishADishPayload = {
      name: wishADishFormData.wishADishUserName || null,
      email: wishADishFormData.wishADishUserEmail || null,
      mobileNumber: wishADishFormData.wishADishUserMobile || null,
      dishYourWish: wishADishFormData.wishADishUserWish || null,
      getItforMeNow: wishADishFormData.GetItNow || false,
      addToYourProduct: wishADishFormData.AddProduct || false,
      restaurantName: wishADishFormData.wishADishRestroName || null,
      restaurantLocation:null,
      anyOtherCity: wishADishFormData.wishADishRestaurantLoc || null,
      pinCode:
        (wishADishFormData.wishADishDeliveryPin &&
          wishADishFormData.wishADishDeliveryPin.pin) ||
        null,
      deliveryAddress:
        wishADishFormData.wishADishAddrs1 + wishADishFormData.wishADishAddrs2 ||
        null,
    };
    
    new Promise((resolve, reject) => { createWishADish({ resolve, reject, wishADishPayload }) }).then((res) => {
      if (res.data.success) {
        setShowSnackbar({
          open: true,
          message: 'Your wish has been submitted successfully.',
          severity: 'success',
        });
      }
      // else if(res.data.success === false) {
      //   console.log(res.status.code)

      // }
 
     })
     .catch((err,res)=>{
      setShowSnackbar({
            open: true,
            message: 'Please Sign-in to continue.',
            severity: 'error',
          });
     })
  };
  return (
    <div className={classes.appWrapper}>
       <Helmet titleTemplate="JMR" defaultTitle="Online Support in Wish a Dish at Just My Roots">
        <meta name="description" content="Explore our elaborate memory lane food India. Whether you are in the mood for Indian Food online delivery at Intercity, we have something for everyone. " />
      </Helmet>
      <CommonHeading heading="WISH A DISH" viewmore />
      <ValidatorForm
        onSubmit={() => handleWishADishSubmit()}
        onError={ers => console.log(ers)}
      >
        <Box display="grid" className={classes.formWrapper} mt={4}>
          <div>
            <div className={classes.formHeaders}>Your Name*</div>
            <TextValidator
              size="small"
              fullWidth
              autoComplete="none"
              variant="outlined"
              validators={['required', 'matchRegexp:^[a-zA-Z_ ]*$']}
              type="text"
              errorMessages={['This field is required', 'Name is not valid']}
              value={wishADishFormData.wishADishUserName || ''}
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishUserName: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <div className={classes.formHeaders}>Your Email*</div>
            <TextValidator
              size="small"
              variant="outlined"
              value={wishADishFormData.wishADishUserEmail || ''}
              type="email"
              fullWidth
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishUserEmail: e.target.value,
                  },
                });
              }}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
            />
          </div>
          <div className={classes.phoneBoxStyles}>
            <div className={classes.formHeaders}>Mobile Number*</div>
            <ReactPhoneInput
              fullWidth
              countryCodeEditable={false}
              value={wishADishFormData.wishADishUserMobile || ''}
              country="in"
              defaultCountry={['IN', 'cw', 'kz']}
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishUserMobile: e,
                  },
                });
              }}
              containerStyle={{
                width: '100%',
                border: "none",
              }}
              inputStyle={{
                width: '100%',
                height: '100%',
                outline: 'none',
                // border: 'none',
                // padding: '0px',
              }}
              component={TextValidator}
            />
            <FormHelperText error>
              {errors.mobileNumber &&
                'Please enter mobile number'}
            </FormHelperText>
          </div>
          <div>
            <div className={classes.formHeaders}>Dish You Wish*</div>
            <TextValidator
              fullWidth
              size="small"
              variant="outlined"

              value={wishADishFormData.wishADishUserWish || ''}
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishUserWish: e.target.value,
                  },
                });
              }}
              validators={['required', 'matchRegexp:^[a-zA-Z_ ]*$']}
              type="text"
              errorMessages={[
                'This field is required',
                'Dish name is not valid',
              ]}
            />
          </div>
          <div>
            <div className={classes.formHeaders}>Name of Restaurant*</div>
            <TextValidator
              size="small"
              variant="outlined"
              value={wishADishFormData.wishADishRestroName || ''}
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishRestroName: e.target.value,
                  },
                });
              }}
              fullWidth
              validators={['required', 'matchRegexp:^[a-zA-Z_ ]*$']}
              type="text"
              errorMessages={[
                'This field is required',
                'Restaurant name is not valid',
              ]}
            />
          </div>
          <div>
            <div className={classes.formHeaders}>Location of Restaurant*</div>
            {/* <Autocomplete
              size="small"
              options={citiesList || []}
              value={wishADishFormData.wishADishRestaurantLoc || ''}
              onChange={(e, val) => {
                fetchPincodeByCity(val);
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishRestaurantLoc: val,
                  },
                });
              }}
              getOptionLabel={option => option.name}
              // onFocus={() => handleInputFocus('restaurantLocation')}
              renderInput={params => (
                <TextValidator
                  {...params}
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['Location name is not valid']}
                  value={wishADishFormData.wishADishRestaurantLoc}
                />
              )}
            /> */}
            <TextValidator
              size="small"
              variant="outlined"
              value={wishADishFormData.wishADishRestaurantLoc || ''}
              onChange={e => {
                updateGlobelStoreByKeyVal({
                  key: 'wishADishFormData',
                  value: {
                    ...wishADishFormData,
                    wishADishRestaurantLoc: e.target.value,
                  },
                });
              }}
              fullWidth
              validators={['required']}
              type="text"
              errorMessages={[
                'This field is required',
              ]}
            />
          </div>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="40px">
          <div>
            <FormControlLabel
              style={{ marginLeft: 10, display:'none' }}
              control={
                <Checkbox
                  checked={wishADishFormData.GetItNow || false}
                  color="primary"
                  onChange={e => {
                    updateGlobelStoreByKeyVal({
                      key: 'wishADishFormData',
                      value: {
                        ...wishADishFormData,
                        GetItNow: e.target.checked,
                        AddProduct: false,
                      },
                    });
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Get it for me now"
            />
            {wishADishFormData.GetItNow && (
              <Box className={classes.formWrapper} mt={2}>
                <div>
                  <div className={classes.formHeaders}>Delivery Address*</div>
                  <TextValidator
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Address Line 1"
                    value={wishADishFormData.wishADishAddrs1 || ''}
                    onChange={e => {
                      updateGlobelStoreByKeyVal({
                        key: 'wishADishFormData',
                        value: {
                          ...wishADishFormData,
                          wishADishAddrs1: e.target.value,
                        },
                      });
                    }}
                    validators={['required']}
                    type="text"
                    errorMessages={[
                      'This field is required',
                      'Address line is not valid',
                    ]}
                  />
                  <TextValidator
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Address Line 2"
                    style={{ marginTop: 20 }}
                    value={wishADishFormData.wishADishAddrs2 || ''}
                    // onFocus={() => handleInputFocus('deliveryAddress')}
                    onChange={e => {
                      updateGlobelStoreByKeyVal({
                        key: 'wishADishFormData',
                        value: {
                          ...wishADishFormData,
                          wishADishAddrs2: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <div className={classes.formHeaders}>Pin Code*</div>
                  <Autocomplete
                    size="small"
                    value={wishADishFormData.wishADishDeliveryPin || ''}
                    options={
                      (deliveryInPincode && deliveryInPincode.items) || []
                    }
                    onChange={(e, val) => {
                      updateGlobelStoreByKeyVal({
                        key: 'wishADishFormData',
                        value: {
                          ...wishADishFormData,
                          wishADishDeliveryPin: val,
                        },
                      });
                    }}
                    getOptionLabel={option => option.pin}
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['Pincode is not valid']}
                        value={wishADishFormData.wishADishDeliveryPin}
                      />
                    )}
                  />
                </div>
              </Box>
            )}
          </div>
          <div>
            <FormControlLabel
              style={{ marginLeft: 10, display: 'none' }}
              control={
                <Checkbox
                  checked={wishADishFormData.AddProduct || false}
                  color="primary"
                  onChange={e => {
                    updateGlobelStoreByKeyVal({
                      key: 'wishADishFormData',
                      value: {
                        ...wishADishFormData,
                        AddProduct: e.target.checked,
                        GetItNow: false,
                      },
                    });
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Add to your product list"
            />
            {wishADishFormData.AddProduct && (
              <Box className={classes.formWrapper} mt={2}>
                <div>
                  <div className={classes.formHeaders}>City Name*</div>
                  <TextValidator
                    size="small"
                    variant="outlined"
                    value={wishADishFormData.wishADishCityName || ''}
                    onChange={e => {
                      updateGlobelStoreByKeyVal({
                        key: 'wishADishFormData',
                        value: {
                          ...wishADishFormData,
                          WishAcityName: e.target.value,
                        },
                      });
                    }}
                    validators={['required', 'matchRegexp:^[a-zA-z]{3,}$']}
                    type="text"
                    errorMessages={[
                      'This field is required',
                      'Restaurant name is not valid',
                    ]}
                  />
                </div>
              </Box>
            )}
          </div>
        </Box>
        <Box display="flex" justifyContent="center" mt={8}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </ValidatorForm>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
        open={showSnackbar.open}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar({
        open: false,
          severity: 'success',
          message: '',
      })}>
        <Alert  severity={showSnackbar.severity}>
          {showSnackbar.message}
        </Alert>
      </Snackbar>


    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectStoreByKey('cities'),
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  wishADishFormData: selectGlobelStoreByKey('wishADishFormData'),

  // remove
  cartData: selectStoreByKey('cartData'),
  couponData: selectCartStoreByKey('couponData'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  selectedNewDate: selectGlobelStoreByKey('selectedNewDate'),
  selectedNewFlag: selectGlobelStoreByKey('selectedNewFlag'),
  selectedNewFlagTime: selectGlobelStoreByKey('selectedNewFlagTime'),
  authData: selectGlobelStoreByKey('userDetails'),
  mkHFAddr: selectGlobelStoreByKey('mkHFAddr'),
  mkhkFrom: selectGlobelStoreByKey('mkhkFrom'),
  uomMeta: selectGlobelStoreByKey('uomMeta'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateGlobelStoreByKeyVal,
      fetchPincodeByCity,
      createWishADish,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Wish);
