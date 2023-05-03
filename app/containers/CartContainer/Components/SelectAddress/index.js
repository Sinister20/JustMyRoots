import React, { useState, memo, useEffect } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {
  SelectAddressList
} from '../../../../components';
import { selectStoreByKey } from '../../../HomePage/selectors';
import { selectCartStoreByKey } from '../../selectors';
import { selectGlobelStoreByKey } from '../../../App/selectors';
import { addItemToCart } from '../../../HomePage/actions';
import { updateGlobelStoreByKeyVal } from '../../../App/actions';
import {
  submitCartndPleceOrder,
  getCoupons,
  applySelectedCoupon,
  setDeliveryAddress,
  getDeliveryAddress,
} from '../../actions';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '30px auto 50px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
}));


const SelectAddress = props => {

  const {
    cartData,
    couponData,
    defaultAddress,
    getCoupons,
    setDeliveryAddress,
    getDeliveryAddress,
    deliveryInLoc,
    updateGlobelStoreByKeyVal,
    shipping,
    authData,
    selectedBillingAddr,
    createAddrOnly = false,
    setIsOpenFromAddrs = () => { },
    setIsOpenToAddrs = () => { },
    onlyAddrs,
    makeHKey,
    billing,
  } = props;

  const classes = useStyles();


  const [selectAddress, setSelectAddress] = useState(false);


  const setSelectedAddress = addrs => {
    setDeliveryAddress(addrs);
  };

  useEffect(() => {
    if (authData) {
      getDeliveryAddress();
    } else {
      updateGlobelStoreByKeyVal({ key: 'isLoginOpen', value: true })

    }
  }, []);

  return (
    <div className={classes.appWrapper}>
      <SelectAddressList
        updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
        getAddress={getCoupons}
        cartData={cartData}
        couponData={couponData}
        setSelectedAddress={setSelectedAddress}
        deliveryInLoc={deliveryInLoc}
        defaultAddress={defaultAddress && defaultAddress}
        shipping={shipping}
        authData={authData}
        selectedBillingAddr={selectedBillingAddr}
        createAddrOnly={createAddrOnly}
        setIsOpenFromAddrs={setIsOpenFromAddrs}
        setIsOpenToAddrs={setIsOpenToAddrs}
        onlyAddrs={onlyAddrs}
        makeHKey={makeHKey}
        billing={billing}
        checkoutPage={true}
      />
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
  authData: selectGlobelStoreByKey('userDetails'),
  selectedBillingAddr: selectGlobelStoreByKey('selectedBillingAddr'),
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
)(SelectAddress);
