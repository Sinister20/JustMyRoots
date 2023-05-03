import React from 'react';
import { makeStyles, Button, Hidden } from '@material-ui/core';
import MyOrders from '../MyOrders';

const useStyles = makeStyles(theme => ({
  container: {
    width: '60%',
    margin: '50px auto',
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(188, 194, 197, 0.25)',
    borderRadius: 6,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  topContainer: {
    display: 'flex',
  },
  leftContainer: {
    padding: 25,
    fontSize: 20,
    width: '50%',
    borderRight: '1px solid #737373',
  },
  rightContainer: {
    width: '50%',
    padding: 25,
  },
  helpBtn: {
    textTransform: 'capitalize',
    color: '#B69C72',
    fontSize: 14,
    height: 26,
    [theme.breakpoints.down('sm')]: {
      width: 80,
    },
  },
}));

const MyRefunds = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <Hidden smDown>
          <div className={classes.leftContainer}>
            <div style={{ fontWeight: 'bold', margin: '10px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>
                Date of order:{' '}
              </span>
              <span style={{ color: '#737373' }}>19-Jul-2021</span>
            </div>
            <div style={{ fontWeight: 'bold', margin: '10px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>
                Reason:{' '}
              </span>
              <span style={{ color: '#737373' }}>Order not delivered</span>
            </div>
            <div style={{ margin: '10px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>
                Refund to:{' '}
              </span>
              <span style={{ color: '#737373' }}>Card 2*** ***** 2345</span>
            </div>
            <div style={{ margin: '10px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>Notes: </span>
              <span style={{ color: '#737373' }}>Some random notes</span>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <div style={{ display: 'flex', margin: '10px 0' }}>
              <div style={{ fontSize: 15, marginRight: 10, color: '#737373' }}>
                Order Number: 123456
              </div>
              <Button variant="outlined" className={classes.helpBtn}>
                Help
              </Button>
            </div>
            <div style={{ margin: '20px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>From: </span>
              <span style={{ color: '#737373' }}>
                Some random text, name of the place, etc etc
              </span>
            </div>
            <div style={{ margin: '20px 0' }}>
              <span style={{ color: '#B69C72', marginRight: 10 }}>Notes: </span>
              <span style={{ color: '#737373' }}>Some random notes</span>
            </div>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div style={{ width: '88%', margin: '0 auto', marginTop: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              <div style={{ color: '#B69C72' }}>Date of order: </div>
              <div style={{ color: '#737373' }}>19-July-2021</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '20px 0 0 0',
                paddingBottom: 20,
                borderBottom: '1px solid #B69C72',
              }}
            >
              <div style={{ color: '#737373', fontSize: 15 }}>
                Order Number: 012345
              </div>
              <div>
                <Button className={classes.helpBtn} variant="outlined">
                  Help
                </Button>
              </div>
            </div>
            <div style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }}>
              <span style={{ color: '#B69C72', marginRight: 5 }}>Reason: </span>
              <span style={{ color: '#737373' }}>Order not delivered</span>
            </div>
            <div style={{ marginTop: 20, fontSize: 16 }}>
              <span style={{ color: '#B69C72', marginRight: 5 }}>
                Refund to:{' '}
              </span>
              <span style={{ color: '#737373' }}>Card 2*** **** **** 1234</span>
            </div>
            <div
              style={{
                marginTop: 20,
                paddingBottom: 20,
                borderBottom: '1px solid #B69C72',
              }}
            >
              <span style={{ color: '#B69C72', marginRight: 5 }}>Notes: </span>
              <span style={{ color: '#737373' }}>Some random text</span>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 16,
                color: '#737373',
                width: '100%',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <div style={{ borderRight: '1px solid #B69C72', width: '45%' }}>
                <div style={{ color: '#B69C72', fontWeight: 'bold' }}>From</div>
                <div>Name of the place</div>
                <div>Some random text</div>
              </div>
              <div style={{ width: '45%', paddingLeft: 20 }}>
                <div style={{ color: '#B69C72', fontWeight: 'bold' }}>To</div>
                <div>Name of the place</div>
                <div>Some random text</div>
              </div>
            </div>
          </div>
        </Hidden>
      </div>
      <div className={classes.bottomContainer}>
        <MyOrders refunds />
      </div>
    </div>
  );
};

export default MyRefunds;
