import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProductMaster from './components/form';
import EditProduct from './components/EditProduct';
import { HistoryContext } from '../App/HistoryContext';

export function ProductMaster() {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProdcut] = useState();
  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Item Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        <EditProduct
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProdcut={setSelectedProdcut}
          selectedProduct={selectedProduct}
        />
        {!editMode && (
          <AddProductMaster
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
)(ProductMaster);
