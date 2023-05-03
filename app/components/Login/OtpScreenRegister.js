import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import login2 from '../../images/login2.png';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px 12px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  input: {
    width: 30,
    height: 30,
    borderRadius: 5,
    margin: '0 2px',
    border: 'none',
    outline: 'none',
    color: '#737373',
    textAlign: 'center',
    border: '1px solid #D4D4D4',
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
}));

const OtpScreen = props => {
  const {
    errorMessage,
    otp,
    handleChangeOtp,
    handleOtpSubmit,
    inputfocus,
    sendOtp,
  } = props;
  const classes = useStyles();

  const [resendCounter, setCounter] = useState(60);
  const timerRef = useRef();

  useEffect(() => {
    if (resendCounter !== 0) {
      timerRef.current = window.setInterval(() => {
        setCounter(resendCounter - 1);
      }, 1000);
    }
    return () => {
      window.clearInterval(timerRef.current);
    };
  });

  return (
    <>
      <img
        alt="img"
        style={{ width: '100%', height: 242 }}
        src={login2}
      />
      <div className={classes.container}>
        <div className={classes.heading}>
          <span>Confirm</span>
          <span>Login</span>
        </div>
        <div>
          <div
            style={{
              color: errorMessage.otp ? '#EF4423' : '#484848',
              fontSize: 14,
            }}
          >
            {errorMessage.otp ? errorMessage.otp : 'Enter OTP'}
          </div>
          <form>
            {[0, 1, 2, 3].map(a => (
              <input
                onChange={e => handleChangeOtp(e, a)}
                value={otp[a]}
                className={classes.input}
                tabIndex={a + 1}
                onKeyUp={e => inputfocus(e)}
                maxLength={1}
              />
            ))}
          </form>
          <div style={{ marginTop: 10, fontSize: 14 }}>
            <span>Didn't get it? </span>
            {!resendCounter && (
              <span
                style={{ color: '#484848', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => {
                  sendOtp();
                  setCounter(60);
                }}
              >
                Resend OTP{' '}
              </span>
            )}
            {!!resendCounter && (
              <>
                <span style={{ color: '#999999', fontWeight: 500, cursor: 'pointer' }}>Resend OTP </span>
                <span>in {resendCounter}s</span>
              </>
            )}
          </div>
          <Button
            variant={errorMessage.otp ? 'outlined' : 'contained'}
            onClick={() => handleOtpSubmit()}
            style={{
              color: errorMessage.otp ? '#000000' : '#FFFFFF',
              background: !errorMessage.otp && '#AC1715',
              marginTop: 20,
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>

  );
};

export default OtpScreen;
