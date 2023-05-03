/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectLocationToLocationMasterStoreByKey } from '../selectors';
import { getDeliveryLocations, deleteDeliveryLocation } from '../actions';
// import { weekdays } from 'moment';
import ConfirmDialog from '../../../components/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  table: {
    '& td': {
      fontSize: '13px !important',
      fontWeight: 500,
    },
  },
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
    gridTemplateColumns: '110px 230px 1fr 40px 100px 100px',
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
}));

const Editproduct = ({
  editMode,
  setEditMode,
  selectedProduct,
  setSelectedProduct,
  getDeliveryLocations,
  deliveryLocationsList,
  deleteDeliveryLocation,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);
  const handleConfirm = flag => {
    setOpen(flag);
  };

  const deleteItem = () => {
    if (deleteProductData) {
      new Promise((resolve, reject) => {
        const id = deleteProductData._id;
        deleteDeliveryLocation({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };
  useEffect(() => {
    if (editMode) {
      getDeliveryLocations();
      setSelectedProduct(null);
    }
  }, [editMode, reload]);

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
        {!editMode ? 'Edit Delivery Location' : 'Add Delivery Location'}
      </Button>

      {editMode && (
        <div style={{ paddingBottom: 20, marginBottom: 40, minHeight: 500 }}>
          <Table size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dispatch From</TableCell>
                <TableCell>Delivery To</TableCell>
                <TableCell>Cart Amount</TableCell>
                <TableCell>Cart Amount R</TableCell>
                <TableCell>Delivery Days</TableCell>
                <TableCell>Delivery Charge</TableCell>
                <TableCell>Delivery Charge R</TableCell>
                <TableCell>Lead Time</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {deliveryLocationsList &&
                deliveryLocationsList.map(el => (
                  <TableRow>
                    <TableCell>
                      {el.dispatchFrom && el.dispatchFrom.name}
                    </TableCell>
                    <TableCell>{el.deliveryTo && el.deliveryTo.name}</TableCell>
                    <TableCell>{el.minCartAmount}</TableCell>
                    <TableCell>{el.minCartAmountRemote}</TableCell>
                    <TableCell>
                      {el.restrictedDeliveryDays.map(day => (
                        <span>{weekDays && weekDays[+day]},</span>
                      ))}
                    </TableCell>
                    <TableCell>{el.deliveryCharge}</TableCell>
                    <TableCell>{el.deliveryChargeRemote}</TableCell>
                    <TableCell>{el.leadTime}</TableCell>
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
          {deleteProductData && (
            <ConfirmDialog
              open={open}
              setOpen={setOpen}
              confirmTitle="Are you sure to delete this item ?"
              deleteProductData={{
                tableTitle: ['Dispatch From', 'Delivery To', 'Weekdays'],
                tableValues: [
                  deleteProductData.dispatchFrom.name,
                  deleteProductData.deliveryTo.name,
                  deleteProductData.restrictedDeliveryDays.map(day => (
                    <span>{weekDays && weekDays[+day]},</span>
                  )),
                ],
              }}
              deleteRow={deleteItem}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  deliveryLocationsList: selectLocationToLocationMasterStoreByKey(
    'deliveryLocationsList',
  ),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDeliveryLocations,
      deleteDeliveryLocation,
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
