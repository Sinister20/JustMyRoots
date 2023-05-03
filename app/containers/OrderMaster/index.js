import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HistoryContext } from '../App/HistoryContext';
import EditOrder from './components/EditProduct';

export function OrderMaster() {
  // const [selectedProduct, setSelectedProduct] = useState();
  // const [selectedOrder, setSelectedOrder] = useState();

  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Order Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        {/* {//console.log(selectedProduct, 'selectedBrand')} */}
        <EditOrder
        // setSelectedProduct={setSelectedProduct}
        // selectedOrder={selectedOrder}
        // setSelectedOrder={setSelectedOrder}
        />
      </HistoryContext.Provider>
    </>
  );
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(OrderMaster);
