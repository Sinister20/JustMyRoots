/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitCartndPleceOrder } from './actions';
import { selectStoreByKey } from '../HomePage/selectors';
import { selectCartStoreByKey } from './selectors';
import { addItemToCart } from '../HomePage/actions';
import { CCAvanuePayment } from '../../components';

import { selectGlobelStoreByKey } from '../App/selectors';
import { useLocation } from 'react-router-dom';
import {

  YourCart,
  SelectAddress,
  RestaurentItems,
  PaymentOptions,
  OrderSummary,
} from './Components';
import AuthRoute from '../../config/AuthRoute';
import { setToLocalStorage } from '../../utils/localStorageUtils';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export function CartPage(props) {
  // cart reducer and saga shifted from here /

  const [goToSelectedPayment, setgoToSelectedPayment] = useState(null);
  const location = useLocation()
  const transactionId = location.state ? location.state.transactionData.transactionId : null;
  // console.log(transactionId)
  const {
    addItemToCart,
    submitCartndPleceOrder,
    cartData,
    defaultAddress,
    history,
    selectedNewDate,
  } = props;

  const doPayment = (paymentSelected) => {  
    // const location = props.location;
    // submitCartndPleceOrder(cartData);
    setgoToSelectedPayment(paymentSelected);
    history.push(`/payments/${paymentSelected}`,{transactionId});
  };
  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="Cart | Just My Roots">
        <meta name="description" content="JMR application" />
      </Helmet>

      <Switch>
        <Route exact path="/checkout/cart" component={YourCart} />
        <AuthRoute exact path="/checkout" component={YourCart} />
        <AuthRoute
          exact
          path="/checkout/shipping"
          render={() => <SelectAddress shipping />}
        />
        <AuthRoute
          exact
          path="/checkout/billing"
          render={() => <SelectAddress billing />}
        />
        <AuthRoute exact path="/checkout/summary" component={OrderSummary} />
        <AuthRoute
          exact
          path="/checkout/payments"
          render={() => (
            <PaymentOptions
              submitCartndPleceOrder={doPayment}
              cartData={cartData}
              defaultAddress={defaultAddress}
              TranscationID={transactionId}
            />
          )}
        />
      </Switch>

      {/* {goToSelectedPayment && <CCAvanuePayment   />} */}
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),
  selectedNewDate: selectGlobelStoreByKey('selectedNewDate'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemToCart,
      submitCartndPleceOrder,
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
)(CartPage);
