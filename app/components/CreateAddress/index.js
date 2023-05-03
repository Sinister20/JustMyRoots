import React, { Fragment, memo, useEffect } from 'react';
import {
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  fetchCityByState,
  fetchPincodeByCity,
  fetchDeliveryLocations,
  fetchDeliveryStates,
} from '../../containers/HomePage/actions';
import { selectMyAccountStoreByKey } from '../../containers/MyAccount/selectors';
import { addAddress, updateAddress } from '../../containers/MyAccount/actions';
import Form from '../../containers/MyAccount/Components/Form';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: 14,
    height: 24,
    textTransform: 'capitalize',
    border: '1px solid #AC1715',
    color: '#AC1715',
    marginLeft: 11,
  },
  btn: {
    marginTop: 30,
  },
}));

const CreateAddress = props => {
  const {
    addAddress,
    updateAddress,
    deliveryInLocations,
    deliveryInStates,
    fetchCityByState,
    fetchPincodeByCity,
    deliveryInPincode,
    setIsEditable,
    isEditable,
    addrState,
    setAddrState,
    message,
    setMessage,
    setOrderNow,
    orderNow,
    errorMessage,
    setErrorMessage,
    fetchDeliveryLocations,
    fetchDeliveryStates,
    createAddrOnly,
    setIsOpenFromAddrs,
    updateGlobelStoreByKeyVal,
    maaKedeliveryFood,
    isViewAll = true,
    handleClose = () => { },
  } = props;

  useEffect(() => {
    if (orderNow || createAddrOnly) {
      fetchDeliveryLocations();
      fetchDeliveryStates();
      addrState && addrState.cityId && fetchPincodeByCity(addrState.cityId);
    }
    return () => {
      // cleanup
    };
  }, [orderNow]);

  const onChangeHandler = (e, val, str) => {
    setErrorMessage(null);
    if (str) {
      if (str === 'stateId' && val._id) {
        const id = val._id;
        fetchCityByState({ stateId: id });
        setAddrState({
          ...addrState,
          [str]: val,
          cityId: deliveryInLocations,
          pinId: [],
        });
      } else if (str === 'cityId' && val._id) {
        const id = val._id;
        fetchPincodeByCity(val);
        setAddrState({
          ...addrState,
          [str]: val,
          pinId: [],
        });
      } else setAddrState({ ...addrState, [str]: val });
    }
  };

  const onChangeMessage = e => {
    setMessage(e.target.value);
  };

  const onClickHandler = () => {
    let payload = {
      pinId: null,
      addressLineOne: null,
      cityId: null,
      stateId: null,
      name: null,
      mobile: null,
      email: null,
    };
    // check for special characters and numbers in string
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    Object.entries({ ...addrState, phoneNumber: addrState.mobile||addrState.phoneNumber, email:addrState.email }).forEach(
      ([key, val]) => {
        switch (key) {
          case "isDefault":
            return;
          case "addressLineTwo":
            return;
          case "landmark":
            return;
          case "name":
            if (!val) { 
              payload = {
                ...payload,
                [key]: "Please fill the text field correctly.",
              };
            } else {
              payload = {
                ...payload,
                [key]: null,
              };
            }
            break;
          case "phoneNumber":
            if ( !val || val === undefined || val.length<12) {
              payload = {
                ...payload,
                [key]: "Please fill the text field correctly.",
              };
            }else {
              payload = {
                ...payload,
                [key]: null,
              };
            }
            break;
            case "email":
              if(!regex.test(val) || !val){
                payload = {
                  ...payload,
                  [key]: "Please fill the email field correctly.",
                };
              }else {
                payload = {
                  ...payload,
                  [key]: null,
                };
              }
              break

          default:
              if (!val) {
                payload = {
                  ...payload,
                  [key]: 'Please fill the text field correctly.',
                };
              }
            break;
            
        }

      },
    );
    setErrorMessage(payload);
    const isValid = Object.values(payload).every(a => a === null);
    if (isValid) {
      isEditable ? onUpdateAddress(addrState) : onCreateAddress(addrState);
    }

  };
  const onUpdateAddress = data => {
    const {
      pinId,
      addressLineOne,
      stateId,
      cityId,
      name,
      mobile,
      phoneNumber,
      email,
    } = addrState;

    if (pinId && cityId && (mobile ||phoneNumber) && name && stateId && addressLineOne) {
      const payload = {
        id: data && data._id,
        ...addrState,
      };
      new Promise((resolve, reject) => {
        updateAddress({ resolve, reject, payload });
      }).then(() => {
        alert('address updated');
        setIsEditable(false);
        setOrderNow(false);
        setAddrState({
          landmark: '',
          pinId: '',
          addressLineOne: '',
          cityId: '',
          stateId: '',
          name: '',
          addressLineTwo: '',
          isDefault: false,
          mobile: '',
          email: '',
        });
      });
    }
  };
 
  const onCreateAddress = data => {
    const {
      landmark,
      pinId,
      addressLineOne,
      stateId,
      cityId,
      name,
      addressLineTwo,
      isDefault,
      mobile,
      email,
    } = addrState;
    if (pinId && cityId && (mobile || phoneNumber) && name && stateId && addressLineOne && email) {
      const payload = {
        name: name && name.toString().trim(),
        // eslint-disable-next-line no-underscore-dangle
        landmark: landmark && landmark,
        pinId,
        cityId,
        stateId,
        addressLineOne: addressLineOne && addressLineOne,
        addressLineTwo: addressLineTwo && addressLineTwo,
        phoneNumber: mobile,
        isDefault,
        email,
      };
      new Promise((resolve, reject) => {
        addAddress({ resolve, reject, payload });
      })
        .then(res => {
          alert('Address Created');
          handleClose(res);
          if (createAddrOnly) {
            setIsOpenFromAddrs(false);
            updateGlobelStoreByKeyVal({
              key: 'maaKedeliveryFood',
              value: { ...maaKedeliveryFood, mkhkFrom: res.data.data },
            });
          }
          setOrderNow(false);
          setAddrState({
            landmark: '',
            pinId: '',
            addressLineOne: '',
            cityId: '',
            stateId: '',
            name: '',
            addressLineTwo: '',
            isDefault: false,
            mobile: '',
            email: '',
          });
        })
        .catch(e => { });
    }
  };

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div>
        <Form
          onChangeHandler={onChangeHandler}
          state={addrState}
          isMobile={isMobile}
          errorMessage={errorMessage}
          onChangeMessage={onChangeMessage}
          message={message}
          setErrorMessage={setErrorMessage}
          locationList={
            (deliveryInLocations && deliveryInLocations.items) || []
          }
          stateList={(deliveryInStates && deliveryInStates.items) || []}
          pinList={(deliveryInPincode && deliveryInPincode.items) || []}
          createAddrOnly={createAddrOnly}
        />
        {!createAddrOnly && (
          <Box>
            <Button
              onClick={() => onClickHandler()}
              variant="outlined"
              color="primary"
              className={classes.btn}
            >
              {isEditable ? 'Update' : 'Save'} Address
            </Button>
            {
              isViewAll && <Button
                color="primary"
                className={classes.btn}
                style={{ marginLeft: 20 }}
                onClick={() => {
                  setIsEditable(false);
                  setAddrState({
                    landmark: '',
                    pinId: '',
                    addressLineOne: '',
                    cityId: '',
                    stateId: '',
                    name: '',
                    addressLineTwo: '',
                    isDefault: false,
                    mobile: '',
                    email:''
                  });
                  setOrderNow(false);
                }}
              >
                View All Address
              </Button>
            }

          </Box>
        )}
        {createAddrOnly && (
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={() => onClickHandler()}
            fullWidth
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  myOrders: selectMyAccountStoreByKey('myOrders'),
  myAddress: selectMyAccountStoreByKey('myAddress'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  deliveryInStates: selectGlobelStoreByKey('deliveryInStates'),
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addAddress,
      updateAddress,
      fetchDeliveryLocations,
      fetchDeliveryStates,
      fetchCityByState,
      fetchPincodeByCity,
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
)(CreateAddress);
