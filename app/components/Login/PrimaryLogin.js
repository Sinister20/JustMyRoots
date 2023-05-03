import React, { memo } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  IconButton,
  Box,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import ReactPhoneInput from 'react-phone-input-material-ui';
import 'react-phone-input-2/lib/style.css';
import facebook from '../../images/facebook.png';
import twitter from '../../images/twitter.png';
import google from '../../images/google.png';
import login1 from '../../images/login1.png';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';

const useStyles = makeStyles(theme => ({
  bottomContainer: {
    padding: '20px 12px',
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
  buttons: {
    marginLeft: 12,
  },
  otpBtn: {
    height: 35,
    fontSize: 14,
    color: '#000000',
    border: '1px solid #8C8C8C',
  },
  errorMsg: {
    marginLeft: 10,
    color: '#EF4423',
    fontSize: 14
  },
  phoneBox: {
    '& .react-tel-input .form-control': {
      border: '1px solid #EBE9E8',
      backgroundColor: '#EBE9E8',
      borderRadius: 5,
      width: '100%'
    },
    '& .react-tel-input .flag-dropdown': {
      border: '1px solid #EBE9E8',
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
  field:{
    marginTop:0,
  }
}));

const PrimaryLogin = props => {
  const {
    handleChange,
    email,
    phoneNumber,
    sendOtp,
    errorMessage,
    updateGlobelStoreByKeyVal,
    handleClose,
  } = props;
  const classes = useStyles();

  const responseFacebook = response => {
    if (response && Object.values(response).length) {
      updateGlobelStoreByKeyVal({ key: 'authData', value: response });
      sessionStorage.setItem('authData', JSON.stringify(response));
      handleClose();
    }
  };

  return (
    <div>
      <img
        alt="img"
        style={{ width: '100%', height: 242 }}
        src={login1}
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          sendOtp();
        }}
      >
        <div className={classes.bottomContainer}>
          <div className={classes.heading}>
            <span>Login</span>
            <span>Account</span>
          </div>
          {/* <Box mb={3}>
            <div className={classes.inputContainer}>
              <MailOutlineIcon fontSize="small" />
              <input
                className={classes.input}
                style={{ marginLeft: 8 }}
                placeholder="Email"
                value={email}
                type="email"
                onChange={e => handleChange(e, 'email')}
              />
            </div>
            <div className={classes.errorMsg}>
              {errorMessage.email}
            </div>
          </Box> */}
          <Box width="100%" className={classes.phoneBox}>
            <ReactPhoneInput
              fullWidth
              value={phoneNumber}
              country="in"
              defaultCountry={['IN', 'cw', 'kz']}
              onChange={e => {
                handleChange({ target: { value: e } }, 'phone');
              }}
              component={TextField}
              inputClass={classes.field}
            />
            <div className={classes.errorMsg}>
              {errorMessage.phoneNumber}
            </div>
          </Box>
        </div>
        <div className={classes.buttons}>
          <Button
            style={{
              background: phoneNumber && '#AC1715',
              color: phoneNumber && '#FFFFFF',
              border: phoneNumber && 'none',
            }}
            type="submit"
            className={classes.otpBtn}
            variant={errorMessage.phoneNumber ? 'contained' : 'outlined'}
          >
            Send OTP
          </Button>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <img alt="google" src={google} />
          </IconButton>
          <IconButton>
            <img alt="twitter" src={twitter} />
          </IconButton>
          <FacebookLogin
            appId="259762402641520"
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
              <IconButton onClick={renderProps.onClick}>
                <img src={facebook} />
              </IconButton>
            )}
          />
        </div> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // homeStore: makeSelectHome(),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
)(PrimaryLogin);
