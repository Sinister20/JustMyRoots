import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddLocationToLocationMaster from './components/form';
import { HistoryContext } from '../App/HistoryContext';
import EditDeliveryLocation from './components/EditProduct';

export function LocationToLocationMaster() {
  const [editMode, setEditMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Location To Location Master">
        <meta name="description" content="JMR application" />
      </Helmet>

      <HistoryContext.Provider>
        <EditDeliveryLocation
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
        />
        {!editMode && (
          <AddLocationToLocationMaster
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
)(LocationToLocationMaster);
