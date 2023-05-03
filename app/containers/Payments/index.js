/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { CCAvanuePayment } from '../../components';
import { selectStoreByKey } from '../HomePage/selectors';
import { useLocation } from 'react-router-dom';
import { setToLocalStorage } from '../../utils/localStorageUtils';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  checkoutText: {
    padding: 20,
    background: '#fff',
  },
  paynmentSecGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
  },
  costSummary: {
    padding: 20,
    minHeight: 200,
    maxHeight: 600,
    overflow: 'auto',
  },
  itemFont: {
    fontSize: 18,
    fontWeight: 400,
    color: '#737373',
    textAlign: 'left',
  },
}));
const Payments = props => {
  const classes = useStyles();
  const { cartData } = props;
  const { paymentData } = useParams();
  const location = useLocation()
  const transactionId = location.state ? location.state.transactionId : null;
  useEffect(() => {
    
    if (cartData && Object.keys(cartData).length) {
      const cartCouponInfo = Object.entries(cartData).filter(
        ([, crt]) => crt.cartInfo && crt.cartInfo.coupon.couponCode,
      );
      if (cartCouponInfo && cartCouponInfo.length) {
        setCoupan(cartCouponInfo[0][1].cartInfo.coupon);
      } else {
        setCoupan(null);
      }
    } else {
      setCoupan(null);
    }
  }, [cartData]);

  const getCount = (cartInfo, key) => {
    if (cartInfo && key) {
      return Object.entries(cartInfo).reduce(
        (acc, [, brandCart]) => acc + brandCart.cartInfo.invoice[key],
        0,
      );
    }
    return 0;
  };

  const [coupan, setCoupan] = useState();

  const [paymentSelected, selectedNewDate, TranscationID] = paymentData.split(
    '_',
  );
  const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="Payments">
        <meta name="description" content="JMR application" />
      </Helmet>
      <AppWrapperContainer>
        <Grid>
          <Stepper activeStep={2} orientation={
            isMobile? 'vertical' : 'horizontal'
          }>
            {['Cart', 'Billing', 'Payment', 'Done'].map((label, index) => (
              <Step key={label} completed={['Cart', 'Billing'].includes(label)}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* <Grid className={classes.checkoutText}>
            <Typography component="h3">Secure Checkout </Typography>
          </Grid> */}
          <Grid className={classes.paynmentSecGrid}>
            <Grid className={classes.checkoutText}>
              <CCAvanuePayment
                TranscationID={transactionId}
                payMode={paymentData}
              />
            </Grid>
            <Grid className={classes.checkoutText}>
              <Paper>
                <Grid item className={classes.costSummary}>
                  <Typography color="primary" className={classes.itemFont}>
                    <span style={{ color: '#B69C72' }}>Summary</span>
                  </Typography>
                  {!coupan && (
                    <Button
                      style={{
                        width: '100%',
                        marginTop: 15,
                        marginBottom: 15,
                        display: 'flex',
                        justifyContent: 'right',
                        color: '#737373',
                        fontWeight: 400,
                        cursor: 'pointer',
                      }}
                      variant="outlined"
                      onClick={() => setOpen(true)}
                    >
                      Coupons
                    </Button>
                  )}
                  <Grid item className={classes.grid2Sec}>
                    {coupan && (
                      <>
                        <Grid item>
                          <Typography className={classes.itemFont}>
                            Applied Coupon:
                          </Typography>
                        </Grid>
                        <Grid item style={{ textAlign: 'left' }}>
                          <b>{coupan.couponCode}</b>
                        </Grid>
                      </>
                    )}
                    <Grid item>
                      <Typography className={classes.itemFont}>
                        Item Total:
                      </Typography>
                    </Grid>
                    <Grid item style={{ textAlign: 'left' }}>
                      <b>₹{getCount(cartData, 'grandTotal').toFixed(2)}</b>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.itemFont}>
                        Total Discount:
                      </Typography>
                    </Grid>
                    <Grid item style={{ textAlign: 'left' }}>
                      <b>
                        {+getCount(cartData, 'coupon').toFixed(2) ? '-' : ''} ₹
                        {-1 * getCount(cartData, 'coupon').toFixed(2)}
                      </b>
                    </Grid>
                  </Grid>
                  <br />
                  <Divider />
                  <br />
                  <Typography color="primary" className={classes.itemFont}>
                    <b> TO PAY: </b>
                    <span style={{ color: '#B69C72', marginLeft: 5 }}>
                      <b>₹{getCount(cartData, 'grandTotal').toFixed(2)}</b>
                    </span>
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
});

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
)(Payments);
