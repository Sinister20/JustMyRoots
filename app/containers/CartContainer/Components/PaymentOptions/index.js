import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { JMRCard, ListCard, RestroSearch } from '../../../../components';
import ccAvenue from '../../../../images/ccavenue.png';
import hdfc from '../../../../images/hdfc.png';
import payumoney from '../../../../images/payumoney.png';
import back from '../../../../images/back.png';
import razorpay from '../../../../images/Razorpay.png'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1144,
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    padding: '20px 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
  linkCard: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #CCCCCC',
    padding: '10px',
    borderRadius: 5,
    '& img': {
      marginLeft: 20,
    },
  },
  paymentProced: {
    padding: 60,
    display: 'flex',
    justifyContent: 'center',
  },
  paymentBtn: {
    padding: '10px 60px',
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
  },
  disclaimer: {
    color: '#737373',
    fontSize: 14,
    fontWeight: 300,
    marginTop: 10,
    textAlign: 'center',
  },
}));

const PaymentOptions = props => {
 
  const classes = useStyles();
 
  const { submitCartndPleceOrder, cartData, defaultAddress,TranscationID } = props;
  const [paymentSelected, setpaymentSelected] = useState(null);
  const [selectAddress, setSelectAddress] = useState(false);
 const [ip ,setIp]=useState('')

 useEffect(()=>{
  getIp()
 },[])

const getIp = () =>{
  axios.get('https://geolocation-db.com/json/',)
  .then((res)=>{
    setIp(res.data.IPv4)
  })
  
}

  const handlePaymentSelection = e => {
    if (e.target.checked) {
      setpaymentSelected(e.target.name);
    } else {
      setpaymentSelected(null);
    }
  };
  console.log(TranscationID);

  return (
    <div className={classes.appWrapper}>
      <Box display="flex" alignItems="center" mb={4}>
        <img
          src={back}
          width="25px"
          height="20px"
          alt="Back"
          style={{ marginRight: 10, cursor: 'pointer' }}
          onClick={() => history.goBack()}
        />
        <Typography variant="h1">Select a Payment Method</Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="40px"
        mt={4}
        width="75%"
      >
        {/* <div className={classes.linkCard}>
          <img src={payumoney} width="80px" height="37" />
          <Checkbox
            checked={paymentSelected === 'payumoney'}
            name="payumoney"
            onChange={handlePaymentSelection}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div> */}
        <div className={classes.linkCard}>
          <Checkbox
            checked={paymentSelected === 'payu'}
            name="payu"
            onChange={handlePaymentSelection}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="primary"
          />
          <img src={hdfc} width="180px" height="30" />
        </div>
        <div className={classes.linkCard}>
          <Checkbox
            checked={paymentSelected === 'ccav'}
            name="ccav"
            onChange={handlePaymentSelection}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="primary"
          />
          <img src={ccAvenue} width="180px" height="30" />
        </div>

 <div className={classes.linkCard}>
 <Checkbox
   checked={paymentSelected === 'razor'}
   name="razor"
   onChange={handlePaymentSelection}
   inputProps={{ 'aria-label': 'primary checkbox' }}
   color="primary"
 />
 {/* <div>
   Razorpay
 </div> */}

 <img src={razorpay} width="180px" height="30" />
</div> 

       
      </Box>
      <Grid item xs={12} className={classes.paymentProced}>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentBtn}
            disabled={!((TranscationID  || cartData && Object.keys(cartData).length) && (paymentSelected))}
            onClick={() => {
              if (defaultAddress ||TranscationID ) {
                submitCartndPleceOrder(paymentSelected);
              } else {
                setSelectAddress(true);
              }
            }}
          >
            Continue
          </Button>
          <Typography variant="subtitle1" className={classes.disclaimer}>
            You will be taken to a 3rd part website.
          </Typography>
        </div>
      </Grid>
      {selectAddress && (
        <>
          <Dialog
            onClose={() => setSelectAddress(!selectAddress)}
            aria-labelledby="customized-dialog-title"
            open={selectAddress}
          >
            <DialogTitle
              id="address-dialog-title"
              onClose={() => setOpen(false)}
            >
              Address Not Selected
            </DialogTitle>
            <DialogContent
              classes={{ root: classes.dialogContentRoot }}
              dividers
            >
              <div className={classes.couponContainer}>
                Please select address before Proceed to payment
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default PaymentOptions;
