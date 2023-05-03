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
import { deleteBrand, getBrandList } from '../actions';
import { fetchDeliveryLocations } from '../../HomePage/actions';
import { selectBrandMasterStoreByKey } from '../selectors';
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
    gridTemplateColumns: '110px 230px 200px 400px 100px 150px 100px 100px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid #ccc',
      textAlign: 'center',
      padding: '0 10px',
    },
  },
  elipses: {
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'hidden',
  },
  table: {
    '& th': {
      fontWeight: 600,
    },
  },
}));

const Editproduct = ({
  editMode,
  setEditMode,
  setSelectedProduct,
  brandList,
  deliveryInLocations,
  selectedLocation,
  setSelectedLocation,
  fetchDeliveryLocations,
  deleteBrand,
  getBrandList,
}) => {
  const classes = useStyles();

  const [brandListFiltered, setbrandListFiltered] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getBrandList();
    if (editMode) {
      if (!deliveryInLocations) fetchDeliveryLocations();
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
        deleteBrand({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };

  useEffect(() => {
    //console.log(brandList, selectedLocation);
    if (selectedLocation && brandList) {
      const temp = [...brandList].filter(
        loc => loc.brandCity && loc.brandCity._id === selectedLocation._id,
      );
      setbrandListFiltered(temp);
    } else {
      setbrandListFiltered(brandList);
    }
  }, [selectedLocation, brandList]);

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
        {!editMode ? 'Edit Brand' : 'Add Brand'}
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
              <TextField {...params} label="Select City" variant="outlined" />
            )}
          />
          <Table stickyHeader size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Brand Name</TableCell>
                <TableCell>Brand Code</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {brandListFiltered &&
                brandListFiltered.length > 0 &&
                brandListFiltered.map(el => (
                  <TableRow>
                    <TableCell>{el.brandCity && el.brandCity.name}</TableCell>
                    <TableCell>{el.brandName}</TableCell>
                    <TableCell>{el.brandCode}</TableCell>
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
            tableTitle: ['Code', 'Name', 'City'],
            tableValues: [
              deleteProductData.brandCode,
              deleteProductData.brandName,
              deleteProductData.brandCity && deleteProductData.brandCity.name,
            ],
          }}
          deleteRow={deleteItem}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  brandList: selectBrandMasterStoreByKey('brandList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteBrand,
      fetchDeliveryLocations,
      getBrandList,
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
)(Editproduct);
