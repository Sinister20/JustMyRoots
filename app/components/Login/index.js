import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, useTheme, Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PrimaryLogin from './PrimaryLogin';
import PrimaryUser from './PrimaryUser';
import RegisterVoucher from './RegisterVoucher';
import axios from 'axios';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../config/environmentConfig';
import { ToggleButton, ToggleButtonGroup, Alert } from '@material-ui/lab';
import OtpScreen from './OtpScreen';
import OtpScreenRegister from './OtpScreenRegister';
import UserDetails from './UserDetails';

import { getUserDetails, submitUserDetails } from '../../containers/HomePage/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorageUtils';
import VoucherScreen from './VoucherScreen';
import Confetti from 'react-confetti'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const useStyles = makeStyles(theme => ({
  contentRoot: {
    width: 500,
    height: 560,
    overflowY: 'scroll',
    padding: '8px 10px',
    '&:first-child': {
      paddingTop: 8,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contentVoucher: {
    width: 1100,
    height: 'auto',
    overflowY: 'scroll',
    padding: '0',
    '&:first-child': {
      paddingTop: 0,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const Login = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [userData, setUserData] = useState();
  const [otp, setOtp] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email2, setEmail2] = useState();
  const [phoneNumber2, setPhoneNumber2] = useState();
  const[location , setLocation] = useState();
  const [refer, setRefer] = useState()
const [code , setCode] = useState()
const [amount,setAmount] = useState()
const [date,setDate] = useState()
  const type ="PARTIALLY"
  const [confetti, setConfetti] = useState()

  // const[amount,setAmount]=useState();
  // const[code,setCode]=useState();
  // const[type,setType]=useState();
  // const[date,setDate]=useState();

  // const token = JSON.parse(localStorage.getItem('lscache-HKTWQ'));
  // const finalToken = token.replaceAll('"', '');
  const [errorMessage, setErrorMessage] = useState({
    email: null,
    phoneNumber: null,
    otp: null,
    firstName: null,
    lastName: null,
    phoneNumber2: null,
    email2: null,

  });
  const [noUser, setNoUser] = useState(false)
  const [userEmail, setUserEmail] = useState()
  const [userPhone, setUserPhone] = useState()
  const [userFirstName, setUserFirstName] = useState()
  const [userLastName, setUserLastName] = useState()
  const [userLocation , setUserLocation] = useState()
  const [userRef, setUserRef] = useState()
  const [registerModal, setRegisterModal] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: 'warning',
  })

  const currentUrl = apiUrlPrefixes[currentEnvironment];

  const [page, setPage] = useState({
    main: false,
    otp: false,
    otp2: false,
    userDetails: false,
    voucherState: false,
  });
  const {
    onClose,
    selectedValue,
    open,
    updateGlobelStoreByKeyVal,
    submitOtp,
    sendOtp,
    getUserDetails,
    addUserDetails,
    submitUserDetails,
    userDetails,
  } = props;

  const voucherBanner = setToLocalStorage('voucherState', true);


  useEffect(() => {
    setTimeout(() => {
      setRegisterModal(true)
    }, 2000)
  }, [])

  const handleClose = () => {
    updateGlobelStoreByKeyVal({ key: 'isLoginOpen', value: false });
    // window.location.reload(false);

  };

  const handleCloseVoucher = () => {
    setPage({ voucherState: false });
    getUserDetails();
  }

  const handleChange = (e, flag) => {
    if (flag === 'phone') {
      setErrorMessage({ ...errorMessage, phoneNumber: null });
      setPhoneNumber((e.target.value));
    }
  };

  const handleChangeSignup = (e, flag) => {
    if (flag === 'firstName') {
      setFirstName((e.target.value));
    }
    else if (flag === 'lastName') {
      setLastName((e.target.value));
    }
    else if (flag === 'phone') {
      setPhoneNumber2((e.target.value));
    }
    else if (flag === 'email') {
      setEmail2((e.target.value));
    }
    else if (flag === 'location'){
      setLocation((e.target.value));
    }
    else {
      setRefer((e.target.value));
    }

  }

  const handleRegister = () => {
    let error2 = null;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{12}$/
    if (!phoneNumber || !phoneNumber.startsWith('91') || !phoneRegex.test(phoneNumber)) {
      error2 = 'Please enter a valid phone number';
    }
    setErrorMessage({ phoneNumber: error2 });

    if (!error2) {
      sendOtp({ phoneNumber });
      setPage({ otp: true });
    }
  }



  const onLogin = () => {
    let error2 = null;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{12}$/
    if (!phoneNumber) {
      error2 = 'Please enter a valid phone number';
    }
    // if (!phoneNumber || !phoneNumber.startsWith('91') || !phoneRegex.test(phoneNumber) ) {
    //   error2 = 'Please enter a valid phone number';
    // }
    setErrorMessage({ phoneNumber: error2 });
    if (!error2) {
      axios.post(`${currentUrl}/api/web/auth/signin`,
        {
          phoneNumber: phoneNumber,
        })
        .then((resp) => {
          console.log(resp.data)
          if (resp.data.message[0] === 'User not found!') {
            setSnackbar({
              open: true,
              message: 'No user found, please Sign up.',
              variant: 'error',
            })
          }
          else {
            setUserEmail(resp.data.data.email)
            setNoUser(false)
            setPage({ otp: true })
          }

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const onSignup = () => {
    let error3 = null;
    let error4 = null;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{12}$/
    if (!phoneNumber2) {
      error3 = 'Please enter a valid phone number';
    }
    else if (!email2) {
      error4 = 'Please enter a valid Email';
    }
    setErrorMessage({ phoneNumber2: error3, email2: error4 });

    if (!error3 & !error4) {
      axios.post(`${currentUrl}/api/web/auth/signup`,
        {
          phoneNumber: phoneNumber2,
          firstName: firstName,
          lastName: lastName,
          email: email2,
          location: location,
          referedCode: refer,
        })
        .then((resp) => {
          if (resp.data.message[0] === 'User already exist!') {
            setSnackbar({
              open: true,
              message: 'User already exists, please Login. ',
              variant: 'error',
            })
          } 
         else if(resp.data.message[0] === 'email or mobile already exists!'){
          setSnackbar({
            open: true,
            message: 'Email or Phone Number already exists! ',
            variant: 'error',
          })
          }
          else {

            setUserEmail(email2)
            setUserPhone(phoneNumber2)
            setUserFirstName(firstName)
            setUserLastName(lastName)
            setUserLocation(location)
            setUserRef(refer)
            setPage({ otp2: true })
            setFirstName('')
            setLastName('')
            setPhoneNumber2('')
            setLocation('')
            setEmail2('')
            setRefer('')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (!open) {
      setEmail(null);
      setPhoneNumber(null);
      setOtp({ 0: null, 1: null, 2: null, 3: null });
      setPage({ main: true, otp: false, voucherState: false });
    }
  }, [open]);

  useEffect(() => {
    if (userDetails && !userDetails.firstName) {
      setPage({ main: false, otp: false, otp2: false, voucherState: true });

    } else {
      setPage({ main: true, otp: false, otp2: false, voucherState: false });
      handleClose();
    }
  }, [userDetails]);

  const handleChangeOtp = (e, key) => {
    setErrorMessage({ ...errorMessage, otp: null });
    setOtp({ ...otp, [key]: e.target.value });
  };
  const handleOtpSubmit = () => {
    let error = null;
    if (Object.values(otp).some(s => !s)) {
      error = 'Please enter the correct otp';
    }
    setErrorMessage({ ...errorMessage, otp: error });
    if (!error) {
      new Promise((resolve, reject) =>
        submitOtp({ otp, phoneNumber, email: userEmail, resolve, reject }),
      ).then(() => {
        getUserDetails();
      });
    }
  };

  const handleOtpRegister = () => {
    let error = null;
    if (Object.values(otp).some(s => !s)) {
      error = 'Please enter the correct otp';
    }
    setErrorMessage({ ...errorMessage, otp: error });
    if (!error) {
      // new Promise((resolve, reject) =>
      //   submitOtp({ otp, phoneNumber: userPhone, email: userEmail, firstName: userFirstName, lastName:userLastName, city:userLocation, referedCode: userRef, resolve, reject }),
      // ).then((repos) => {
      //   console.log(repos.voucherShow)
      //   setPage({ main: false, otp: false, otp2: false, voucherState: true })
      //   setConfetti(true)

      // })
      axios.post(`${currentUrl}/api/web/auth/verifyMobileOtp`,{
        otp:parseInt(Object.values(otp).reduce((acc, val) => acc + val)),
        phoneNumber:userPhone,
        email: userEmail,
         firstName: userFirstName,
          lastName:userLastName,
           city:userLocation, 
           referedCode: userRef,
      },
    )
      .then((res)=>{
        setToLocalStorage('HKTWQ', res.data.data.token);
        setCode(res.data.data.vCode.text)
        setAmount(res.data.data.vamount.text)
        setDate(res.data.data.vExpiry.text)

        if(res.data.data.voucherShow === true){
          setPage({ main: false, otp: false, otp2: false, voucherState: true })
        }
        else {
          setPage({ main: false, otp: false, otp2: false, voucherState: false ,userDetails:true})
          getUserDetails();
          handleClose();

        }
      })
    }
  };

  const inputfocus = elmnt => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 5) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const renderComponent = () => {



    if (page.main) {

      return (
        <PrimaryUser
          phoneNumber={phoneNumber}
          handleChange={handleChange}
          errorMessage={errorMessage}
          handleClose={handleClose}
          onLogin={onLogin}
          noUser={noUser}
          handleChangeSignup={handleChangeSignup}
          onSignup={onSignup}
          firstName={firstName}
          lastName={lastName}
          location={location}
          email={email2}
          phoneNumber2={phoneNumber2}
          referCode={refer}
        />

      );
    }
    if (page.otp) {
      return (
        <OtpScreen
          errorMessage={errorMessage}
          otp={otp}
          handleChangeOtp={handleChangeOtp}
          handleOtpSubmit={handleOtpSubmit}
          inputfocus={inputfocus}
        sendOtp={onLogin}

        />
      );
    }

    if (page.otp2) {
      return (
        <OtpScreenRegister
          errorMessage={errorMessage}
          otp={otp}
          handleChangeOtp={handleChangeOtp}
          handleOtpSubmit={handleOtpRegister}
          inputfocus={inputfocus}
        // sendOtp={sendOtpClick}

        />
      );
    }
    if (page.voucherState) {
      return (
        <>
          <VoucherScreen
            amount={amount}
            code={code}
            type={type}
            date={date}
            handleCloseVoucher={handleCloseVoucher}
          />
          <Confetti
            width={1080}
            height={600}
            numberOfPieces={200}
            tweenDuration={5000}
          />
        </>
      );
    }


  };

  return (
    <>
      <Dialog
        onClose={!page.voucherState ? handleClose : null}
        // maxWidth="lg"   voucher width
        maxWidth={page.voucherState === true ? 'lg' : 'sm'}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {/* <DialogContent classes={{ root: classes.contentVoucher }}> */}
        <DialogContent classes={page.voucherState === true ? { root: classes.contentVoucher } : { root: classes.contentRoot }}>
          {renderComponent()}
        </DialogContent>
      </Dialog>

      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={7000}
      >
        <Alert severity='error'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetails: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetails,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
