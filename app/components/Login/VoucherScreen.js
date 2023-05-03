import React, { memo } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  IconButton,
  Box,
  Tab,
  Grid,
  Tabs,
  Typography,
} from '@material-ui/core';
import 'react-phone-input-2/lib/style.css';
import bgImage from '../../images/bg-image.jpg';
import Chole from '../../images/chole.jpg';
import Confetti from 'react-confetti'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const useStyles = makeStyles(theme => ({
  bottomContainer: {
    padding: '0 12px 20px 12px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  heading: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 15,
    '& span:first-child': {
      color: theme.palette.primary.main,
      marginRight: 5,
    },
  },
  inputContainer: {
    width: '100%',
    fontSize: 14,
    border: '1px solid #EBE9E8',
    backgroundColor: '#EBE9E8',
    color: '#484848',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
  },
  input: {
    border: 'none',
    outline: 'none',
    height: '100%',
    width: '100%',
    borderRadius: 5,
    background: 'inherit',
  },



  phoneBox: {
    '& .react-tel-input .form-control': {
      border: '1px solid #c2c2c2',
      backgroundColor: '#fff',
      borderRadius: 5,
      width: '100%'
    },
    '& .react-tel-input .flag-dropdown': {
      border: '1px solid #c2c2c2',
    },
    '& .react-tel-input .selected-flag': {
      backgroundColor: '#EBE9E8',
    },
    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
  },
  formEmail: {
    textTransform: 'lowercase !important',
  },
  formInput: {
    marginBottom: 10,
    '& input': {
      height: 30,
      padding: 0,
      paddingLeft: 10,
    },
    '& input[type=text]': {
      textTransform: 'capitalize',
    },
  },
  formHeaders: {
    display: 'flex',
    fontSize: 15,
    color: '#000',
    margin: '8px 0 4px 0',
  },
  voucherMain: {

    '& .terms': {
      background: '#D9D9D9',
      padding: 16,

    },
    '& h6': {
      margin: '0 0 6px 0',
      fontWeight: 'bold',
      fontSize: '13px',
    },
    '& p': {
      margin: '0 0 6px 0',
      fontWeight: 'normal',
      fontSize: '11px',
    },
  },
  voucherModal: {
    border: '12px solid #fca210',
    padding: '0 0 0 20px',
    position: 'relative',
    overflow: 'hidden',
    '& .close': {
      color: '#fff',
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 9,
      background: 'transparent',
      border: 'none',
      fontSize: '28px',
      fontWeight: 'bold',

    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
    '& h3': {
      marginBottom: '0',
      marginTop: '12px',
      fontWeight: 'normal',
      fontSize: '40px',
      paddingLeft: 10,


    },
    '& .content': {
      color: '#fff',
      position: 'relative',
      zIndex: 1,
      '& .box-layout': {
        position: 'relative',
        '& span': {
          position: 'absolute',
          border: '6px solid #fca210',
          width: 150,
          height: 150,
          left: 10,
          top: 20,
          zIndex: 1,
          cursor: 'pointer',
        },
      },
      '& h1': {
        marginTop: '0',
        marginBottom: '0',
        position: 'relative',
        fontSize: '126px',
        paddingLeft: 60,
        paddingTop: 5,
        zIndex: 9,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
          fontSize: '110px',
        },
      },
      '& p': {
        color: '#fca210',
        fontSize: '64px',
        marginTop: '0',
        marginBottom: '0',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
          fontSize: '48px',
        },
      },
      '& .bottom-content': {
        [theme.breakpoints.down('xs')]: {
          padding: '0 0 20px 0',
        },
        '& h4': {
          margin: '0 0 6px 0',
          fontWeight: 'normal',
          fontSize: '24px',
          [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
          },
        },
        '& .code': {
          fontSize: '40px',
          [theme.breakpoints.down('xs')]: {
            fontSize: '24px',
          },
          fontWeight: 'bold',
        },
        '& .primary': {
          color: '#fca210',
        },
      },
    },
  },
  voucherBG: {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
    width: '100%',


  },

}));


const VoucherScreen = props => {
  const { width, height } = useWindowSize()
  const {
    amount,
    code,
    date,
    handleCloseVoucher,
    type,
  } = props;
  const classes = useStyles();

  return (
    <>

      <div className={classes.voucherMain}>
        <div className={classes.voucherModal}>
          <button onClick={handleCloseVoucher} className="close">  X</button>
          <div className={classes.voucherBG}>


            <img src={bgImage} />
          </div>
          <Grid
            className="content"
            container
            direction="row"
            justifyContent="space-around"
          >
            <Grid item md={7}>
              <h3>Congratulations</h3>
              <div className='box-layout'>
                <span></span>
                <h1>₹{amount}</h1>
                <p>GIFT VOUCHER</p>
              </div>
              <div className='bottom-content'>
                <h4 className='code'>Code : {code}</h4>
                <h4 className='primary'>{type} Redeem </h4>
                <h4>Single Time Used</h4>
                <h4>Valid Till : {date}</h4>
              </div>

            </Grid>
            <Grid item md={5}>
              <img src={Chole} />
            </Grid>
          </Grid>

        </div>
        <div className='terms'>
          <h6>Gift Vouchers Terms and Conditions</h6>
          <p>•	This voucher is valid till the expiry date mentioned above.
            •	This voucher can be redeemed at JustMyRoots website or app only.
            •	This voucher is non-refundable and cannot be exchanged for cash in part or full.
            •	This voucher is valid for a single transaction only. This voucher is not valid during sale or in conjunction with any special promotion.
            •	JustMyRoots Loyalty Points cannot be availed or redeemed while using this voucher.
            •	JustMyRoots retains the right to reject any voucher that has been tampered with or found in any way unacceptable.
            •	Multiple vouchers cannot be clubbed and used for single transaction.
            •	This voucher can be redeemed against the minimum item value of Rs. 350/- (Taxes and other charges needs to be paid additionally).</p>
          <p>If you have a query or need any clarification you may call our Customer Care at +91-7777027222
            email us at support@justmyroots.com</p>
        </div>
      </div>
    </>
  );
};

export default VoucherScreen
