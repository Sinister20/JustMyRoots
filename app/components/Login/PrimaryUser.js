import React, { memo } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    IconButton,
    Box,
    Tab,
    Tabs,
    Typography,
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
import login1 from '../../images/loginSignup.jpg';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';

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
        '& input[type=text]':{
            textTransform: 'capitalize',
        },
    },
    formHeaders: {
        display: 'flex',
        fontSize: 15,
        color: '#000',
        margin: '8px 0 4px 0',
    },
    imageLogin:{
        width:'100%',
        height:242,
        [theme.breakpoints.down('sm')]: {
            width:'100%',
        height:'auto',
          },
    }
    
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const PrimaryUser = props => {
    const {
        handleChange,
        email2,
        phoneNumber,
        firstName,
        lastName,
        phoneNumber2,
        referCode,
        location,
        // sendOtp,
        errorMessage,
        updateGlobelStoreByKeyVal,
        handleClose,
        onLogin,
        noUser,
        onSignup,
        handleChangeSignup
    } = props;
    const classes = useStyles();

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = React.useState(0);

    const handleTab = (event, newValue) => {
        setValue(newValue);
    };
    const responseFacebook = response => {
        if (response && Object.values(response).length) {
            updateGlobelStoreByKeyVal({ key: 'authData', value: response });
            sessionStorage.setItem('authData', JSON.stringify(response));
            handleClose();
        }
    };

    return (
        <>
         <img
                        alt="img"
                        // style={{ width: '100%', height: 242 }}
                        className={classes.imageLogin}
                        src={login1}
                    />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTab} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="SignUp" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            //   sendOtp();
                            onLogin();

                        }}
                    >
                        <div className={classes.bottomContainer}>
                            {/* <div className={classes.heading}>
                                <span>Login</span>
                            </div> */}

                            <Box width="100%" className={classes.phoneBox}>
                            <div className={classes.formHeaders}>Mobile Number </div>
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
                                <div className={classes.errorMsg}>
                                    {noUser}
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
                                Login
                            </Button>

                        </div>
                    </form>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            //   sendOtp();
                            onSignup()
                        }}
                    >
                        <div className={classes.bottomContainer}>
                            {/* <div className={classes.heading}>
                                <span>Sign Up</span>
                            </div> */}

                            <Box width="100%" className={classes.phoneBox}>
                                <div className={classes.formInput}>
                                    <div className={classes.formHeaders}>First Name </div>
                                    <TextField
                                        hintText="Please Enter First Name"
                                        onChange={e => handleChangeSignup(e, 'firstName')}
                                        value={firstName}
                                        fullWidth
                                        autoComplete="none"
                                        variant="outlined"
                                        required
                                    />
                                </div>

                                <div className={classes.formInput}>
                                    <div className={classes.formHeaders}>Last Name </div>
                                    <TextField
                                        hintText="Please Enter Last Name"
                                        onChange={e => {
                              handleChangeSignup(e,'lastName')
                                        }}
                                        value={lastName}
                                        fullWidth
                                        autoComplete="none"
                                        variant="outlined"
                                        
                                    />
                                </div>

                                <div className={classes.formHeaders}>Phone </div>
                                <ReactPhoneInput
                                    fullWidth
                                    value={phoneNumber2}
                                    country="in"
                                    defaultCountry={['IN', 'cw', 'kz']}
                                    onChange={e => {
                                        handleChangeSignup({target:{value:e}}, 'phone');
                                      }}
                                    component={TextField}
                                    inputClass={classes.formInput}
                                />
                                <div className={classes.errorMsg}>
                                    {errorMessage.phoneNumber2}
                                </div>

                                <div className={classes.formInput}>
                                    <div className={classes.formHeaders}>Email </div>
                                    <TextField
                                       inputClass={classes.formEmail}
                                        hintText="Please Enter Email"
                                        onChange={e => 
                                            handleChangeSignup(e,'email')
                                            }
                                        value={email2}
                                        fullWidth
                                        autoComplete="none"
                                        variant="outlined"
                                        type='email'
                                        required
                                    />
                                    <div className={classes.errorMsg}>
                                    {errorMessage.email2}
                                </div>
                                </div>

                                <div className={classes.formInput}>
                                    <div className={classes.formHeaders}>Location </div>
                                    <TextField
                                       inputClass={classes.formInput}
                                        hintText="Please Enter your Location"
                                        onChange={e => 
                                            handleChangeSignup(e,'location')
                                            }
                                        value={location}
                                        fullWidth
                                        autoComplete="none"
                                        variant="outlined"
                                        type='text'
                                        required
                                    />
                                    <div className={classes.errorMsg}>
                                    {errorMessage.location}
                                </div>
                                </div>

                                <div className={classes.formInput}>
                                    <div className={classes.formHeaders}>Refer Code </div>
                                    <TextField
                                       inputClass={classes.formEmail}
                                        hintText="Please Enter Refer Code"
                                        onChange={e => 
                                            handleChangeSignup(e,'referCode')
                                            }
                                        value={referCode}
                                        fullWidth
                                        autoComplete="none"
                                        variant="outlined"
                                        type='text'
                                    />
                                    {/* <div className={classes.errorMsg}>
                                    {errorMessage.email2}
                                </div> */}
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
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>

            </TabPanel>
        </>
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
)(PrimaryUser);
