import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddBrandMaster from './components/form';
import { HistoryContext } from '../App/HistoryContext';
import EditProduct from './components/EditProduct';
import { getBrandList } from './actions';

export function BrandMaster({ getBrandList }) {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  useEffect(() => {
    if (editMode) {
      getBrandList();
    }
  }, [editMode]);
  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Brand Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        <EditProduct
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedProduct={selectedProduct}
        />
        {!editMode && (
          <AddBrandMaster
            editMode={editMode}
            setEditMode={setEditMode}
            selectedProduct={selectedProduct}
          />
        )}
      </HistoryContext.Provider>
    </>
  );
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBrandList,
    },
    dispatch,
  );
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
)(BrandMaster);
