import React, { useEffect, memo } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import { AddressList } from '..';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { setSeliveryLocation } from '../../containers/HomePage/actions';
import { selectStoreByKey } from '../../containers/HomePage/selectors';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';

const useStyles = makeStyles(theme => ({
  couponContainer: {
    backgroundColor: '#f5f5f5',
    width: '700px',
  },
  modalHeading: {
    background: '#F0F2F2',
    width: '440px',
    [theme.breakpoints.down('xs')]: {
      width: '320px',
    },
    '& h2': {
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  selectContent: {
    width: '440px',
    padding: '20px 20px 0 14px',
    color: '#000',
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      padding: '26px 10px 0 14px',
      width: '100%',
    },
  },
  list: {
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  selectMain: {
    padding: '10px 90px 40px 14px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 14px 40px 14px',
    },
    '& label': {
      left: 14,
      top: 6,
    },
  },
  selectList: {
    textTransform: 'capitalize',
  },
  left: {},
  coupon: {
    fontSize: 15,
    border: '1px solid #B69C72',
    height: 26,
    textTransform: 'capitalize',
    color: '#B69C72',
  },
  dialogContentRoot: {
    backgroundColor: '#fff',
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DeliveryInConfirm = props => {
  const {
    open,
    setOpen,
    deliveryInLocations,
    setSeliveryLocation,
    deliveryInLoc,
    updateGlobelStoreByKeyVal,
  } = props;
  const classes = useStyles();

  // useEffect(() => {
  //     if (cartData && cartData.brandId) {
  //         getCoupons(cartData.brandId)
  //     }
  // }, [])

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="1000px"
        scroll="paper"
        minWidth="1000px"
      >
        <DialogTitle
          id="address-dialog-title"
          onClose={() => setOpen(false)}
          style={{ fontSize: 20, fontWeight: 500 }}
          className={classes.modalHeading}
        >
          Check if we deliver in your city
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContentRoot }} dividers>
          <Box display="">
            <FormControl fullWidth className={classes.selectMain}>
              <InputLabel id="location-select">Select Location</InputLabel>
              <Select
                labelId="location-select"
                id="demo-simple-select"
                label="Select Location"
                className={classes.selectLabel}
              >
                {deliveryInLocations && deliveryInLocations ? (
                  deliveryInLocations.map(loc => (
                    <MenuItem
                      selected={
                        JSON.stringify(loc) === JSON.stringify(deliveryInLoc)
                      }
                      className={classes.selectList}
                      onClick={() => {
                        setSeliveryLocation(loc);
                        setOpen(false);
                        updateGlobelStoreByKeyVal({
                          key: 'deliveryInLoc',
                          value: loc,
                        });
                      }}
                    >
                      {loc.name}
                    </MenuItem>
                  ))
                ) : (
                  <center>
                    <h3>Loading Locations...</h3>
                  </center>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  deliveryInLocations: selectStoreByKey('cities'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSeliveryLocation,
      updateGlobelStoreByKeyVal,
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
  memo,
)(DeliveryInConfirm);
