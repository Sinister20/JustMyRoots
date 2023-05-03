import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddLocationMaster from './components/form';
import { HistoryContext } from '../App/HistoryContext';
import EditLocation from './components/EditProduct';

export function LocationMaster() {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Location To Location Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        <EditLocation
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {!editMode && (
          <AddLocationMaster
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
)(LocationMaster);
