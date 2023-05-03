import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';

import { Box, makeStyles } from '@material-ui/core';

import { getUserList } from '../HomePage/actions';
import { getLocationList } from '../LocationMaster/actions';
import { getInvoiceReport, getSalesReport, getOrdersReport } from './actions';

import { selectGlobelStoreByKey } from '../App/selectors';
import { selectLocationMasterStoreByKey } from '../LocationMaster/selectors';
import InvoiceReports from './components/InvoiceReports';

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

export function ReportsMaster({
  getUserList,
  userList,
  getLocationList,
  cityList,
  getInvoiceReport,
  getOrdersReport,
  getSalesReport,
}) {
  const classes = useStyles();

  useEffect(() => {
    getUserList();
    getLocationList();
  }, []);

  return (
    <>
      <Helmet titleTemplate="JMR" defaultTitle="Order Master">
        <meta name="description" content="JMR application" />
      </Helmet>
      <div className={classes.appWrapperContainer}>
        <Box display="flex" justifyContent="space-between">
          <NavLink
            style={isActive => ({
              color: isActive ? 'green' : 'blue',
            })}
            to="/reports/invoice-report"
          >
            Invoice Reports
          </NavLink>

          <NavLink
            style={isActive => ({
              color: isActive ? 'green' : 'blue',
            })}
            to="/reports/order-report"
          >
            Orders Reports
          </NavLink>

          <NavLink
            style={isActive => ({
              color: isActive ? 'green' : 'blue',
            })}
            to="/reports/sales-report"
          >
            Sales Reports
          </NavLink>
        </Box>
      </div>
      <Switch>
        <Route
          exact
          path="/reports/invoice-report"
          render={() => (
            <InvoiceReports
              userList={userList}
              cityList={cityList}
              getReports={getInvoiceReport}
              text="Invoice"
            />
          )}
        />
        <Route
          exact
          path="/reports/order-report"
          render={() => (
            <InvoiceReports
              userList={userList}
              cityList={cityList}
              getReports={getOrdersReport}
              text="Orders"
            />
          )}
        />
        <Route
          exact
          path="/reports/sales-report"
          render={() => (
            <InvoiceReports
              userList={userList}
              cityList={cityList}
              getReports={getSalesReport}
              text="Sales"
            />
          )}
        />
      </Switch>
    </>
  );
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserList,
      getLocationList,
      getInvoiceReport,
      getOrdersReport,
      getSalesReport,
    },
    dispatch,
  );
}

const mapStateToProps = createStructuredSelector({
  userList: selectGlobelStoreByKey('usersList'),
  cityList: selectLocationMasterStoreByKey('locationList'),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(ReportsMaster);
