import React, { useState, useContext } from 'react';
import { Button, Container, makeStyles } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import MyOrders from './MyOrders';
import MyPayments from './MyPayments';
import ManageMyAddressess from './ManageMyAddressess';
import MyRefunds from './MyRefunds';


const useStyles = makeStyles(theme => ({
  btnContainer: {
    display: 'flex',
    // justifyContent: 'center',
    // width: '100%',
    // margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 10,
      gridRowGap: 20,
    },
  },
  buttons: {
    // textTransform: 'capitalize',
    borderRadius: 6,
    // border: '2px solid #B69C72',
    width: '40%',
    height: '70px',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '21px',
    letterSpacing: 0,
    marginLeft: '1%',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      // margin: '0 auto',
      height: '40px',
      fontSize: '12px',
    },
  },
}));

const TabContents = () => {
  const [selectedOption, setSelectedOption] = useState('Manage My Addresses');
  const classes = useStyles();

  const options = [
    { name: 'Manage My Addresses', path: '/my-profile/Manage-My-Addresses' },
    // { name: 'My Payments', path: '/my-profile/My-Payments' },
    // { name: 'My Refunds', path: '/my-profile/My-Refunds' },
    { name: 'My Orders', path: '/my-profile/My-Orders' },
  ];

  const { history } = useContext(HistoryContext);

  const path = history.location.pathname;

  return (
    <Container maxWidth="md">
      <div className={classes.btnContainer}>
        {options.map(o => (
          <Button
            onClick={() => history.push(o.path)}
            variant={path.includes(o.path) ? 'contained' : 'outlined'}
            color="primary"
            // style={{
            //   background:
            //     path.includes(o.path) ? '#B69C72' : 'rgba(237, 235, 233, 0.5)',
            //   color: path.includes(o.path) ? '#F5F4F3' : '#B69C72',
            // }}
            className={classes.buttons}
            // size="large"
          >
            {o.name}
          </Button>
        ))}
      </div>
      <div className={classes.components}>
        <Switch>
          <Route exact path="/my-profile">
            <Redirect to="/my-profile/Manage-My-Addresses" />
          </Route>
          <Route
            path="/my-profile/Manage-My-Addresses"
            component={ManageMyAddressess}
          />
          <Route path="/my-profile/My-Payments" component={MyPayments} />
          <Route path="/my-profile/My-Refunds" component={MyRefunds} />
          <Route path="/my-profile/My-Orders" component={MyOrders} />
        </Switch>
      </div>
    </Container>
  );
};

export default TabContents;
