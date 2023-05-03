/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitCartndPleceOrder } from './actions';
import { selectStoreByKey } from '../HomePage/selectors';
import { addItemToCart } from '../HomePage/actions';

import { OrderPlaced, OrderTrackHelp } from './Components';
import reducer from './reducer';
import saga from './saga';
import WorldCup from './Components/WorldCup';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'cart';

export function Orders(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { addItemToCart, submitCartndPleceOrder, cartData } = props;
  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="Order Placed">
        <meta name="description" content="JMR application" />
      </Helmet>
      <Switch>
        <Route path="/my-orders/order-track-help" component={OrderTrackHelp} />
        <Route exact path="/my-orders/order-placed" component={OrderPlaced} />
        {/* <Route exact path="/my-orders/order-placed/predict" component={WorldCup} /> */}

      </Switch>
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
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
)(Orders);
