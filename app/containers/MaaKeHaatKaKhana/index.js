import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { selectGlobelStoreByKey } from 'containers/App/selectors';
import { updateGlobelStoreByKeyVal } from 'containers/App/actions';
import { useInjectReducer } from 'utils/injectReducer';
import MaaKeHaatKaKhana from './components';
import { selectMaaKeHathKaKhanaStoreByKey } from './selectors';
import reducer from './reducer';
import Notes from './components/notes';
import Order from './components/order';
import Cart from './components/cart';
import PaymentOptions from '../CartContainer/Components/PaymentOptions/index';
import PaymentMethods from './components/PaymentMethod';
import PaymentPage from './components/PaymentPage';
import AuthRoute from '../../config/AuthRoute';

const AppWrapper = styled.div`
  width: 100%;
  margin: 50px auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const key = 'maaKeHaatKaKhana';
const Home = props => {
  const { maaDeliveryFoodCart } = props;
  useInjectReducer({ key, reducer });
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [maKeHathKaData, setMaKeHathKaData] = useState({});

  return (
    <div>
      <Helmet titleTemplate="MaaKeHaatKaKhana" defaultTitle="Online Delivery of Maa Ke Haath Ka Khana anywhere in India - Justmyroots ">
        <meta name="Maa Ke Haat Ka Khana" content="Order Maa Ke Haath Ka Khana online from anywhere in India. Get home-cooked meals made with your mother’s love. " />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/maa-ke-haat-ka-khana"
          render={() => (
            <MaaKeHaatKaKhana
              setMaKeHathKaData={setMaKeHathKaData}
              maKeHathKaData={maKeHathKaData}
            />
          )}
        />
        <Route exact path="/maa-ke-haat-ka-khana/notes" component={Notes} />
        <AuthRoute exact path="/maa-ke-haat-ka-khana/order" component={Order} />
        <AuthRoute
          exact
          path="/maa-ke-haat-ka-khana/cart"
          render={() => (
            <Cart
              maaDeliveryFoodCart={maaDeliveryFoodCart}
              maKeHathKaData={maKeHathKaData}
              updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
            />
          )}
        />
        <AuthRoute
          exact
          path="/maa-ke-haat-ka-khana/payment-options"
          component={PaymentMethods}
        />
        <AuthRoute
          exact
          path="/maa-ke-haat-ka-khana/payment-options/:mode"
          component={PaymentPage}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  maaDeliveryFoodCart: selectGlobelStoreByKey('maaDeliveryFoodCart'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
)(Home);
