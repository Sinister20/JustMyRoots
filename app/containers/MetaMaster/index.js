import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddMeta from './components/AddMeta';
import EditMeta from './components/EditMeta';
import { HistoryContext } from '../App/HistoryContext';

export function MetaMaster() {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Meta Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
     
        <EditMeta
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {!editMode && (
          <AddMeta
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
)(MetaMaster);
