import React, { Fragment, memo, useEffect, useState } from 'react';

import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  Button,
  Box,
  makeStyles,
  Select,
  MenuItem,
  Input,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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
  appWrapperContainer: {
    width: 800,
    margin: '0 auto',
    overflow: 'hidden',
    paddingTop: 40,
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 20,
    },
  },
  formWrapper: {
    marginTop: 20,
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  fullWidthGrid: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    [theme.breakpoints.down('sm')]: {
      gridColumnEnd: '2',
    },
  },
  formHeaders: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#B69C72',
    margin: '8px 0 5px 0',
  },
  imageItem: {
    marginTop: 10,
    '&:not(:last-child)': {
      marginRight: 10,
    },
    '& img': {
      height: 100,
      borderRadius: 4,
    },
  },
  mobileScroll: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
}));

const InvoiceReports = ({ userList, cityList, getReports, text }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    orderStartDate: null,
    orderEndDate: null,
    pickupStartDate: null,
    pickupEndDate: null,
    deliveryStartDate: null,
    deliveryEndDate: null,
    customerId: null,
    deliveryLocation: null,
    dispatchingLocationid: null,
    receivingLocationid: null,
    orderType: null,
  });

  const {
    orderStartDate,
    orderEndDate,
    pickupStartDate,
    pickupEndDate,
    deliveryStartDate,
    deliveryEndDate,
    customerId,
    deliveryLocation,
    dispatchingLocationid,
    receivingLocationid,
    orderType,
  } = data;

  const onClickHandler = () => {
    const temp = {
      ...data,
      orderStartDate:
        orderStartDate && moment(orderStartDate).format('YYYY-MM-DD'),
      orderEndDate: orderEndDate && moment(orderEndDate).format('YYYY-MM-DD'),
      pickupStartDate:
        pickupStartDate && moment(pickupStartDate).format('YYYY-MM-DD'),
      pickupEndDate:
        pickupEndDate && moment(pickupEndDate).format('YYYY-MM-DD'),
      deliveryStartDate:
        deliveryStartDate && moment(deliveryStartDate).format('YYYY-MM-DD'),
      deliveryEndDate:
        deliveryEndDate && moment(deliveryEndDate).format('YYYY-MM-DD'),
    };
    Object.keys(temp).forEach(key => {
      if (temp[key] === null) {
        delete temp[key];
      }
    });
    const payload = {
      ...temp,
    };
    new Promise((resolve, reject) => {
      getReports({ resolve, reject, payload });
    })
      .then(res => {
        if (res.data) {
          // alert(selectedProduct ? 'Coupon Updated' : 'Coupon Created');
          if (res.data && !res.data.data) {
            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const date = moment(new Date()).format('YYYY_MM_DD-HH_mm_ss');

            // // Creating the hyperlink and auto click it to start the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${text}-Reports-${date}.csv`;
            link.click();
          } else {
            alert(res.data.error);
          }
          setData({
            orderStartDate: null,
            orderEndDate: null,
            pickupStartDate: null,
            pickupEndDate: null,
            deliveryStartDate: null,
            deliveryEndDate: null,
            customerId: null,
            deliveryLocation: null,
            dispatchingLocationid: null,
            receivingLocationid: null,
            orderType: null,
          });
        } else {
          alert(res.data.error);
        }
      })
      .catch(e => {});
  };

  const handleChange = (val, str) => {
    if (str) {
      setData({ ...data, [str]: val });
    }
  };
  return (
    <Box className={classes.appWrapperContainer}>
      <ValidatorForm
        onSubmit={() => onClickHandler()}
        onError={errors => console.log(errors)}
      >
        <Box display="grid" className={classes.formWrapper}>
          <div>
            <div className={classes.formHeaders}>Order Start Date</div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                margin="normal"
                id="orderStartDate"
                emptyLabel="--/--/----"
                value={orderStartDate || null}
                renderInput={props => (
                  <TextValidator
                    {...props}
                    name="StartDate"
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                )}
                onChange={date => handleChange(date, 'orderStartDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <div className={classes.formHeaders}>Order End Date</div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                emptyLabel="--/--/----"
                margin="normal"
                id="orderEndDate"
                minDate={
                  orderStartDate === orderEndDate
                    ? moment(orderStartDate)
                        .add(1, 'day')
                        .format()
                    : moment(orderStartDate)
                }
                value={orderEndDate || null}
                renderInput={props => (
                  <TextValidator
                    {...props}
                    name="EndDate"
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                )}
                onChange={date => handleChange(date, 'orderEndDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          {text !== 'Sales' && (
            <Fragment>
              <div>
                <div className={classes.formHeaders}>Pickup Start Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="pickupStartDate"
                    emptyLabel="--/--/----"
                    value={pickupStartDate || null}
                    renderInput={props => (
                      <TextValidator
                        {...props}
                        name="StartDate"
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                    onChange={date => handleChange(date, 'pickupStartDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <div className={classes.formHeaders}>Pickup End Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    emptyLabel="--/--/----"
                    margin="normal"
                    id="pickupEndDate"
                    minDate={
                      pickupStartDate === pickupEndDate
                        ? moment(pickupStartDate)
                            .add(1, 'day')
                            .format()
                        : moment(pickupStartDate)
                    }
                    value={pickupEndDate || null}
                    renderInput={props => (
                      <TextValidator
                        {...props}
                        name="EndDate"
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                    onChange={date => handleChange(date, 'pickupEndDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>

              <div>
                <div className={classes.formHeaders}>Delivery Start Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="deliveryStartDate"
                    emptyLabel="--/--/----"
                    value={deliveryStartDate || null}
                    renderInput={props => (
                      <TextValidator
                        {...props}
                        name="StartDate"
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                    onChange={date => handleChange(date, 'deliveryStartDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <div className={classes.formHeaders}>Delivery End Date</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    emptyLabel="--/--/----"
                    margin="normal"
                    id="deliveryEndDate"
                    minDate={
                      deliveryStartDate === deliveryEndDate
                        ? moment(deliveryStartDate)
                            .add(1, 'day')
                            .format()
                        : moment(deliveryStartDate)
                    }
                    value={deliveryEndDate || null}
                    renderInput={props => (
                      <TextValidator
                        {...props}
                        name="EndDate"
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    )}
                    onChange={date => handleChange(date, 'deliveryEndDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Fragment>
          )}
          {text !== 'Orders' && (
            <div>
              <div className={classes.formHeaders}>Select Cities</div>
              <Select
                labelId="deliveryLocation"
                id="deliveryLocation"
                value={deliveryLocation || null}
                onChange={e => handleChange(e.target.value, 'deliveryLocation')}
                input={<Input label="Name" />}
                MenuProps={MenuProps}
              >
                {cityList &&
                  cityList.map(city => (
                    <MenuItem key={city._id} value={city._id}>
                      {city.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          )}
          {text === 'Orders' && (
            <Fragment>
              <div>
                <div className={classes.formHeaders}>Dispatching Location</div>
                <Select
                  labelId="dispatchingLocationid"
                  id="dispatchingLocationid"
                  value={dispatchingLocationid || null}
                  onChange={e =>
                    handleChange(e.target.value, 'dispatchingLocationid')
                  }
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                >
                  {cityList &&
                    cityList.map(city => (
                      <MenuItem key={city._id} value={city._id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div>
                <div className={classes.formHeaders}>Receiving Location</div>
                <Select
                  labelId="receivingLocationid"
                  id="receivingLocationid"
                  value={receivingLocationid || null}
                  onChange={e =>
                    handleChange(e.target.value, 'receivingLocationid')
                  }
                  input={<Input label="Name" />}
                  MenuProps={MenuProps}
                >
                  {cityList &&
                    cityList.map(city => (
                      <MenuItem key={city._id} value={city._id}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </Fragment>
          )}
          <div>
            <div className={classes.formHeaders}>Select Customer</div>
            <Select
              labelId="customerId"
              id="customerId"
              value={customerId}
              onChange={e => handleChange(e.target.value, 'customerId')}
              input={<Input label="Name" />}
              MenuProps={MenuProps}
            >
              {userList &&
                userList.map(user => (
                  <MenuItem key={user.firstName} value={user._id}>
                    {`${user.firstName} (${user.phoneNumber}) `}
                  </MenuItem>
                ))}
            </Select>
          </div>
          {text === 'Orders' && (
            <div>
              <div className={classes.formHeaders}>Order Status</div>
              <Select
                labelId="orderType"
                id="orderType"
                value={(orderType && orderType.toUpperCase()) || null}
                onChange={e => handleChange(e.target.value, 'orderType')}
                input={<Input label="Name" />}
                MenuProps={MenuProps}
                error={orderType}
              >
                {['PENDING', 'PAID', 'UNPAID', 'CANCELLED', 'CONFIRMED'].map(
                  couponCat => (
                    <MenuItem key={couponCat} value={couponCat}>
                      {couponCat}
                    </MenuItem>
                  ),
                )}
              </Select>
            </div>
          )}
        </Box>
        <Box mt="20px">
          <Button
            variant="contained"
            color="primary"
            style={{ color: '#fff' }}
            type="submit"
          >
            {`Download ${text} Reports`}
          </Button>
        </Box>
      </ValidatorForm>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(InvoiceReports);
