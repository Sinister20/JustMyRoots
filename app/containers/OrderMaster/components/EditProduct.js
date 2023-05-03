/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  FormHelperText,
  Input,
  makeStyles,
  MenuItem,
  Select,
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
import { getOrderList, updateOrder } from '../actions';
import { selectOrderMasterStoreByKey } from '../selectors';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles(theme => ({
  editBtn: {
    color: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  appWrapper: {
    width: 1250,
    margin: '0 auto',
    overflow: 'hidden',
    paddingTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 20,
    },
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
  table: {
    border: '1px solid #ccc',
    marginBottom: 50,
  },
}));

const EditOrder = ({
  orderList,
  deliveryInOrders,
  getOrderList,
  updateOrder,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
      <div className={classes.appWrapper}>
        <Table stickyHeader size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Placed At</TableCell>
              <TableCell>Pick up Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderList &&
              orderList.orderData &&
              orderList.orderData.map(el => (
                <TableRow>
                  <TableCell>{el.orderId}</TableCell>
                  <TableCell>{el.orderCreatedOn}</TableCell>
                  <TableCell>{el.orderPlacedAt}</TableCell>
                  <TableCell>{el.pickupDate}</TableCell>
                  <TableCell>{el.deliveryDate}</TableCell>
                  <TableCell>
                    <Select
                      labelId="orderStatus"
                      id="orderStatus"
                      value={
                        (el.orderStatus && el.orderStatus.toUpperCase()) || []
                      }
                      onChange={e =>
                        new Promise((resolve, reject) => {
                          updateOrder({
                            resolve,
                            reject,
                            payload: {
                              _id: el._id || el.orderId,
                              orderStatus: e.target.value,
                            },
                          });
                        })
                      }
                      input={<Input label="Name" />}
                      MenuProps={MenuProps}
                      error={!el.orderStatus}
                    >
                      {[
                        'PENDING',
                        'PAID',
                        'UNPAID',
                        'CANCELLED',
                        'CONFIRMED',
                      ].map(couponCat => (
                        <MenuItem key={couponCat} value={couponCat}>
                          {couponCat}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {!el.orderStatus && 'Please Select Coupon Type'}
                    </FormHelperText>
                  </TableCell>
                  {/* <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setDeleteProductData(el);
                      handleConfirm(true);
                    }}
                  >
                    Edit
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orderList: selectOrderMasterStoreByKey('orderList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOrderList,
      updateOrder,
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
)(EditOrder);
