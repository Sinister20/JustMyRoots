/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { getLocationList, deleteCity } from '../actions';
import { fetchDeliveryStates } from '../../HomePage/actions';
import { selectLocationMasterStoreByKey } from '../selectors';
import { selectGlobelStoreByKey } from '../../App/selectors';
import ConfirmDialog from '../../../components/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  editBtn: {
    color: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  listCard: {
    marginTop: 10,
    background: '#fff',
    boxShadow: '5px 5px 25px 0 #ececec',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: 'grid',
    gridTemplateColumns: '110px 250px 200px 400px 100px 250px 100px 100px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid #ccc',
      textAlign: 'center',
      padding: '0 10px',
    },
    '& img': {
      marginBottom: 10,
    },
  },
  elipses: {
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'hidden',
  },
}));

const EditLocation = ({
  editMode,
  setEditMode,
  setSelectedProduct,
  locationList,
  deliveryInLocations,
  selectedLocation,
  setSelectedLocation,
  fetchDeliveryStates,
  getLocationList,
  deleteCity,
}) => {
  const classes = useStyles();

  const [brandListFiltered, setbrandListFiltered] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getLocationList();
    if (editMode) {
      if (!deliveryInLocations) fetchDeliveryStates();
      setSelectedProduct(null);
    }
  }, [editMode, reload]);
  const handleConfirm = flag => {
    setOpen(flag);
  };

  const deleteItem = () => {
    if (deleteProductData) {
      new Promise((resolve, reject) => {
        const id = deleteProductData._id;
        deleteCity({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };
  useEffect(() => {
    //console.log(locationList, 'locationList');
    if (selectedLocation && locationList) {
      const temp = [...locationList].filter(
        loc => loc.state && loc.state._id === selectedLocation._id,
      );
      setbrandListFiltered(temp);
    } else {
      setbrandListFiltered(locationList);
    }
  }, [selectedLocation, locationList]);

  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(!editMode);
        }}
        color="primary"
        variant="contained"
        className={classes.editBtn}
      >
        {!editMode ? 'Edit Location' : 'Add Location'}
      </Button>

      {editMode && (
        <div style={{ paddingBottom: 20, marginBottom: 40, minHeight: 500 }}>
          <Divider />
          <br />
          <Autocomplete
            value={selectedLocation}
            onChange={(event, val) => {
              setSelectedLocation(val);
            }}
            id="controllable-states-demo"
            options={(deliveryInLocations && deliveryInLocations.items) || []}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select State" variant="outlined" />
            )}
          />
          <Table stickyHeader size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Location Name</TableCell>
                <TableCell>Location Code</TableCell>
                <TableCell>State</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {brandListFiltered &&
                brandListFiltered.map(el => (
                  <TableRow>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.locationCode}</TableCell>
                    <TableCell>
                      {deliveryInLocations &&
                        deliveryInLocations.items.filter(
                          loc => loc._id === el.state._id,
                        )[0].name}
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedProduct(el);
                        setEditMode(false);
                      }}
                    >
                      Edit
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setDeleteProductData(el);
                        handleConfirm(true);
                      }}
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
      {deleteProductData && (
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          confirmTitle="Are you sure to delete this item ?"
          deleteProductData={{
            tableTitle: ['Name', 'Pincode', 'State'],
            tableValues: [
              deleteProductData.name,
              deleteProductData.pincode,
              deleteProductData.state.name,
            ],
          }}
          deleteRow={deleteItem}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  deliveryInLocations: selectGlobelStoreByKey('deliveryInStates'),
  locationList: selectLocationMasterStoreByKey('locationList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLocationList,
      deleteCity,
      fetchDeliveryStates,
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
)(EditLocation);
