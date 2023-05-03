import React, { memo } from 'react';
import { makeStyles, Box, TextField, Button, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import {
  getUserDetails,
  submitUserDetails,
  fetchDeliveryStates,
  fetchDeliveryLocations,

} from '../HomePage/actions';
import { selectGlobelStoreByKey } from '../App/selectors';
import { updateGlobelStoreByKeyVal } from '../App/actions';
import ReactPhoneInput from 'react-phone-input-material-ui';
import 'react-phone-input-2/lib/style.css';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '40px auto 0',
    width: '100%',
    overflow: 'hidden',
    padding: '0 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  heading: {
    fontSize: 35,
    fontWeight: 700,
    marginLeft: 0,
    marginBottom: 0,
  },
  gridBox: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  inputGroup: {
    width: '48%',
    [theme.breakpoints.down('xs')]: {
      width: '98%',
    },
    '& span': {
      marginLeft: 10,
    },
    '& label': {
      color: '#B69C72',
      margin: '0 0 5px 0',
      display: 'flex',
      fontSize: '15px',
      fontWeight: 'bold',
    },
  },
  radio: {
    minWidth: '80px',
    marginRight: 16,
    marginTop: 6,
    display: 'flex',
    '& label': {
      margin: '-5px 0 0 7px',
      fontWeight: 'normal',
      color: '#434343',
    },
  },
  btnPrimary: {
    color: '#fff',
    backgroundColor: '#AC1715',
    borderColor: '#AC1715',
    border: '2px solid',
    borderRadius: '4px',
    marginTop: '16px',
    padding: '6px 16px',
  },
  defaultInput: {
    font: 'inherit',
    color: '#434343',
    width: '100%',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '6px',
    margin: 0,
    padding: '18.5px 14px',
    height: '1.26em',
    background: 'none',
    animationName: 'mui-auto-fill-cancel',
    letterSpacing: 'inherit',
    animationDuration: '10ms',
    '-webkit-tap-highlight-color': 'transparent',
    '&:focus': {
      outline: 'none',
    },
  },
  desc: {
    fontSize: 25,
    fontWeight: 400,
    '& span': {
      marginLeft: 10,
    },
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  phoneBox: {

    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
  },


}));

const ContactUs = props => {
  const {
    getUserDetails,
    userDetails,
    fetchDeliveryStates,
    deliveryInStates,
    deliveryInLocations,
    submitUserDetails,
  } = props;
  const [userState, setUserState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    defaultAddress: '',
  });
  const [errorMessage, setErrorMessage] = React.useState(null);

  const classes = useStyles();
  React.useEffect(() => {
    getUserDetails();
    fetchDeliveryStates();
  }, []);
  React.useEffect(() => {
    if (userDetails) setUserState(userDetails);
  }, [userDetails]);
  const handleInputChange = e => {
    setErrorMessage(null);
    switch (e.target.name) {
      case 'non-veg':
        setUserState({
          ...userState,
          isVeg: false,
        });
        break;
      case 'veg':
        setUserState({
          ...userState,
          isVeg: true,
        });
        break;
      default:
        setUserState({ ...userState, [e.target.name]: e.target.value });
    }
  };
  const handleUpdate = () => {
    const payLoad = {
      firstName: userState.firstName,
      lastName: userState.lastName,
      city: userState.city,
      dob: userState.dob,
      anniversary: userState.anniversary,
    };

    const isValid = Object.entries(payLoad).every(([key, value]) => {
      if (key === "dob" || key === "anniversary") {
        //  check date  is today or future date
       if (value) {
          const date = new Date(value);
          const today = new Date();
          if (date >= today) {
            setErrorMessage({
              ...errorMessage,
              [key]: "Date should be less than today's date",
            });
            return false;
          }
         return true;
        }
      }else if(value === '' || value === null || value === undefined){
        setErrorMessage({
          ...errorMessage,
          [key]: 'This field is required',
          
       })
       return false
      }
      return true;
       
    });



    if (isValid) {
      
      new Promise((resolve, reject) => {
        // eslint-disable-line
        const merged = { ...userState };
        submitUserDetails({ resolve, reject, merged });
      }).then(() => {
        props.history.push('/my-profile');
      });
    }
  };
  return (
    <div className={classes.appWrapper}>
      <Helmet titleTemplate="JMR" defaultTitle="User Edit Profile">
        <meta name="description" content="JMR application" />
      </Helmet>
      <Box
        display="flex"
        alignItems="center"
        pb={2}
        mb={6}
        style={{ borderBottom: '1px solid #000' }}
      >
        <h1 mb={4} className={classes.heading}>
          Edit Profile
        </h1>
      </Box>

      {userDetails && (
        <>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="text"
                name="firstName"
                value={userState.firstName || ''}
                inputProps={{
                  className: classes.textCapitalize
                }}
                onChange={handleInputChange}
                label="First Name"
                variant="outlined"
                error={errorMessage && errorMessage.firstName}
                helperText={errorMessage && errorMessage.firstName}
                fullWidth
                className={classes.textCapitalize}
                size="small"
              />
              
            </Box>

            <Box mb={4} className={classes.inputGroup}>
            <TextField
                type="text"
                name="lastName"
                value={userState.lastName || ''}
                inputProps={{
                  className: classes.textCapitalize
                }}
                onChange={handleInputChange}
                label="Last Name"
                variant="outlined"
                error={errorMessage && errorMessage.lastName}
                helperText={errorMessage && errorMessage.lastName}
                fullWidth
                className={classes.textCapitalize}
                size="small"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="email"
                id="email"
                value={userState.email}
                name="email"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                label="Email"
                error={!!(errorMessage && errorMessage.email)}
                helperText={errorMessage && errorMessage.email}
                size="small"
                disabled
              />
            </Box>
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="text"
                placeholder="City"
                id="address "
                name="address"
                onChange={handleInputChange}
                value={userState.address}
                variant="outlined"
                fullWidth
                label="Address"
                error={errorMessage && errorMessage.address}
                helperText={errorMessage && errorMessage.address}
                size="small"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            <Box mb={4} className={classes.inputGroup}>
            <TextField
                type="text"
                placeholder="City"
                id="city "
                name="city"
                onChange={handleInputChange}
                value={userState.city}
                variant="outlined"
                fullWidth
                label="City"
                error={errorMessage && errorMessage.city}
                helperText={errorMessage && errorMessage.city}
                size="small"
              />
              {/* <Autocomplete
                options={(deliveryInLocations && deliveryInLocations.items || [])}
                // getOptionSelected={(option, value) => option._id === value._id}
                getOptionLabel={option => (option.name ? option.name : option)}
                onChange={(e, val) =>
                  handleInputChange({
                    target: {
                      name: 'city',
                      value: val.name,
                    },
                  })
                }
                value={userState.city}
                disableClearable
                renderInput={params => (
                  <TextField
                    name="city"
                    label="City"
                    {...params}
                    variant="outlined"
                    size="small"
                  />
                )}
              /> */}
            </Box>
            <Box mb={4} className={`${classes.inputGroup} ${classes.phoneBox} `}>

              <ReactPhoneInput

                value={userState.phoneNumber}
                country="in"
                defaultCountry={['IN', 'cw', 'kz']}
                onChange={e => {
                  handleInputChange({
                    target: {
                      name: 'phoneNumber',
                      value: e,
                    },
                  })
                }}
                fullWidth
                disabled
                component={TextField}
                countryCodeEditable={false}
                inputExtraProps={{
                  name: 'phoneNumber',
                  label: 'Phone Number',
                  variant: 'outlined',
                  error: !!(errorMessage && errorMessage.phoneNumber),
                  helperText: errorMessage && errorMessage.phoneNumber,
                  fullWidth: true,


                }}
                containerStyle={{
                  width: '100%',
                  border: errorMessage && errorMessage.phoneNumber ? '1px solid red' : 'inherit',
                }}
                inputStyle={{
                  width: '100%',
                  height: '100%',
                  outline: 0,
                  // border: 'none',
                  // padding: '0px',
                }}
              />
              {
                errorMessage && errorMessage.phoneNumber && (
                  <Typography variant="caption" color="error">
                    {
                      errorMessage.phoneNumber
                    }
                  </Typography>)
              }
            </Box>
          </Box>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="date"
                id="dob"
                name="dob"
                value={
                  userState.dob &&
                    new Date(userState.dob).toISOString().split('T')[0] 
                }
                onChange={handleInputChange}
                inputProps={{
                  max: new Date().toISOString().split('T')[0],
                  min:"22-01-1900"
                }}               
                variant="outlined"
                fullWidth
                autoFocus
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                error={(errorMessage && errorMessage.dob)}
                helperText={errorMessage && errorMessage.dob}
                size="small"
                
              />
            </Box>
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="date"
                id="anniversary-date"
                name="anniversary"
                value={
                  userState.anniversary &&
                    new Date(userState.anniversary).toISOString().split('T')[0] 
                }
                onChange={handleInputChange}
                inputProps={{
                  max: new Date().toISOString().split('T')[0],
                  min:"22-01-1900"
                }} 
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Anniversary Date"
                error={(errorMessage && errorMessage.anniversary)}
                helperText={errorMessage && errorMessage.anniversary}
                size="small"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            <Box mb={4} className={classes.inputGroup}>
              <label htmlFor="food">Food Preferred</label>
              <Box display="flex" alignItems="center">
                <div className={classes.radio}>
                  <input
                    checked={userState.isVeg}
                    onChange={handleInputChange}
                    type="radio"
                    id="food-veg"
                    name="veg"
                  />
                  <label htmlFor="food-veg">Veg</label>
                </div>
                <div className={classes.radio}>
                  <input
                    checked={!userState.isVeg}
                    onChange={handleInputChange}
                    type="radio"
                    id="food-non-veg"
                    name="non-veg"
                  />
                  <label htmlFor="food-non-veg">Non Veg</label>
                </div>
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" className={classes.gridBox}>
            
            <Box mb={4} className={classes.inputGroup}>
              <TextField
                type="text"
                placeholder="Ethnic identity"
                id="identity "
                name="ethnicIdentity"
                onChange={handleInputChange}
                value={userState.ethnicIdentity}
                variant="outlined"
                fullWidth
                label="Ethnic identity"
                error={errorMessage && errorMessage.ethnicIdentity}
                helperText={errorMessage && errorMessage.ethnicIdentity}
                size="small"
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mb={4} className={classes.inputGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetails,
      submitUserDetails,
      updateGlobelStoreByKeyVal,
      fetchDeliveryStates,
      fetchDeliveryLocations,

    },
    dispatch,
  );
}

const mapStateToProps = createStructuredSelector({
  userDetails: selectGlobelStoreByKey('userDetails'),
  deliveryInStates: selectGlobelStoreByKey('deliveryInStates'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),

});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(ContactUs);
