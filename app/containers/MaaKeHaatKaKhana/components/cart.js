import React, { useContext } from 'react';
import {
  makeStyles,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import CommonHeading from '../../HomePage/Components/CommonHeading';
import PickupAndDeliveryAddress from './PickupAndDeliveryAddress';
import offer from '../../../images/offer.png';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1060,
    margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },

  offerWrapper: {
    border: '1px solid #CCCCCC',
    borderRadius: 5,
    padding: '5px 15px',
    minHeight: 35,
  },
  formMain: {
    display: 'flex',
  },
  formInputBox: {
    '& input': {
      padding: '5px 0 0 10px',
      border: 'none',
    },
  },
  cartWrapper: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginBottom: 40,
    '& li': {
      padding: 10,
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 20,
      textAlign: 'right',
    },
  },
  desc: {
    fontSize: 18,
    fontWeight: 400,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
  },
}));

const Cart = props => {
  const classes = useStyles();

  const {
    maaDeliveryFoodCart,
    maKeHathKaData,
    updateGlobelStoreByKeyVal,
  } = props;

  return (
    <div className={classes.appWrapper}>
      <CommonHeading heading="MAA KE HAATH KA KHANA" viewmore />
      <ul className={classes.cartWrapper}>
        <li style={{ fontWeight: 'bold' }}>
          <span>Prd#</span>
          <span>Description</span>
          <span>Unit</span>
          <span>qty</span>
          <span>Price</span>
        </li>
        {maaDeliveryFoodCart &&
          maaDeliveryFoodCart.invoice &&
          Object.entries(maaDeliveryFoodCart.invoice).map(([keyname, d]) => (
            <li>
              <span>{keyname}</span>
              <span>₹ {d}</span>
            </li>
          ))}
        {maaDeliveryFoodCart &&
          maaDeliveryFoodCart.items.map(itm => (
            <li>
              <span style={{ width: 159 }}>Freight Charges</span>
              <span style={{ width: 159 }}>{itm.itemName}</span>
              <span style={{ width: 159 }}>
                ₹ {itm.quantity * itm.sellingPrice}
              </span>
            </li>
          ))}

        <li>
          <span style={{ width: 159 }} />
          <span style={{ width: 159 }}>Sub Total</span>
          <span style={{ width: 159 }}>
            ₹{' '}
            {maaDeliveryFoodCart &&
              maaDeliveryFoodCart.invoice &&
              maaDeliveryFoodCart.invoice.itemTotal}
          </span>
        </li>
        <li>
          <span style={{ width: 159 }} />
          <span style={{ width: 159 }}>GST</span>
          <span style={{ width: 159 }}>
            ₹{' '}
            {maaDeliveryFoodCart &&
              maaDeliveryFoodCart.invoice &&
              maaDeliveryFoodCart.invoice.taxes}
          </span>
        </li>
        <li>
          <span style={{ width: 159 }} />
          <span style={{ width: 159 }}>Booking Charges</span>
          <span style={{ width: 159 }}>
            ₹{' '}
            {maaDeliveryFoodCart &&
              maaDeliveryFoodCart.invoice &&
              maaDeliveryFoodCart.invoice.grandTotal}
          </span>
        </li>
      </ul>
      <div className={classes.paymentWrapper}>
        <Typography className={classes.heading}>
          Choose Payment method
        </Typography>
        <FormControlLabel
          value="payment"
          control={
            <Radio
              checked={maKeHathKaData.paymentSelected === 'ccAvanue'}
              color="primary"
            />
          }
          label="CCAvenue"
        />
      </div>
      <Typography className={classes.desc}>
        Justmyroots reserves the right to reject any product that does not
        comply with the law of the land.
      </Typography>
      <Typography className={classes.desc}>
        If you want any earlier Delivery/Pickup please speak with customer
        service at +91 7777027222
      </Typography>
      {/* <PickupAndDeliveryAddress /> */}
      
      <Box mt={4}>
        <Button
          onClick={() => history.push(' ')}
          color="primary"
          variant="contained"
          fullWidth
        >
          Pay Now ₹{' '}
          {maaDeliveryFoodCart &&
            maaDeliveryFoodCart.invoice &&
            maaDeliveryFoodCart.invoice.grandTotal}
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
