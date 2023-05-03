import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddCoupon from './components/AddCoupon';
import EditCoupon from './components/EditCoupon';
import { HistoryContext } from '../App/HistoryContext';

export function CouponMaster() {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Coupon Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        <EditCoupon
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {!editMode && (
          <AddCoupon
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        )}
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
)(CouponMaster);
