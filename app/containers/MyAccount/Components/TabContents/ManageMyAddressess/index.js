import React, { memo, useEffect, useState } from 'react';
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
import { Skeleton } from '@material-ui/lab';
import {
  fetchDeliveryLocations,
  fetchDeliveryStates,
  fetchCityByState,
  fetchPincodeByCity,
} from '../../../../HomePage/actions';
import {
  selectMyAccountStoreByKey,
  makeSelectAddresses,
} from '../../../selectors';
import { deleteAddress, addAddress, updateAddress } from '../../../actions';
import Form from '../../Form';
import { selectGlobelStoreByKey } from '../../../../App/selectors';
// import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';
import { AddressList } from '../../../../../components';
import CreateAddress from '../../../../../components/CreateAddress';

const useStyles = makeStyles(theme => ({
  container: {
    // width: '60%',
    margin: '20px auto',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  button: {
    // fontSize: 14,
    // height: 24,
    // textTransform: 'capitalize',
    // border: '1px solid primary',
    // color: '#B69C72',
    marginLeft: 11,
  },
  btn: {
    marginTop: 30,
  },
  cardContainer: {
    marginTop: 60,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 30,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(158, 178, 187, 0.25)',
    borderRadius: 6,
  },
  cardBtn: {
    color: 'primary',
    border: '1px solid primary',
    borderRadius: 4,
    textTransform: 'capitalize',
    height: 33,
    width: '45%',
  },
}));

const ManageMyAddressess = props => {
  const { deleteAddress, shipping } = props;
  const [addrState, setAddrState] = useState({
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
  const [message, setMessage] = useState();
  const [orderNow, setOrderNow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableData, setIsEditableData] = useState();
  const [addressDeleted, setAddressDeleted] = useState();

  const removeAddress = id => {
    if (id) {
      new Promise((resolve, reject) => {
        deleteAddress({ resolve, reject, id });
      }).then(() => {
        alert('Address deleted');
        setAddressDeleted(id);
      });
    }
  };
  const onEditAddress = data => {
    let payload = data;
    setIsEditable(true);
    setOrderNow(true);
    if (payload) {
      payload = {
        ...data,
        stateId: payload.stateId && payload.stateId.name ? payload.stateId : {},
        cityId: payload.cityId && payload.cityId.name ? payload.cityId : {},
        UspinId: payload.pinId && payload.pinId.pin ? payload.pinId : {},
      };
    }
    setAddrState(payload);
    setIsEditableData(payload);
  };

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="center" style={{ marginBottom: 60 }}>
        <div
          style={{
            color: 'primary',
            fontSize: isMobile ? 32 : 36,
            fontWeight: 'bold',
          }}
        >
          My Addresses
        </div>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={() => {
            setIsEditable(false);
            setAddrState({
              landmark: '',
              pinId: '',
              addressLineOne: '',
              cityId: '',
              name: '',
              stateId: '',
              addressLineTwo: '',
              isDefault: false,
              mobile: '',
              email: '',
            });

            setOrderNow(true);
          }}
        >
          Add
        </Button>
      </Box>
      {orderNow ? (
        <CreateAddress
          setIsEditable={setIsEditable}
          addrState={addrState}
          setAddrState={setAddrState}
          message={message}
          setMessage={setMessage}
          setOrderNow={setOrderNow}
          isEditable={isEditable}
          orderNow={orderNow}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <AddressList
          onEditAddress={onEditAddress}
          removeAddress={removeAddress}
          addressDeleted={addressDeleted}
          shipping={shipping}
        />
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  myOrders: selectMyAccountStoreByKey('myOrders'),
  myAddress: selectMyAccountStoreByKey('myAddress'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  deliveryInStates: selectGlobelStoreByKey('deliveryInStates'),
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteAddress,
      addAddress,
      updateAddress,
      fetchDeliveryLocations,
      fetchDeliveryStates,
      fetchCityByState,
      fetchPincodeByCity,
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
)(ManageMyAddressess);
