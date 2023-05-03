import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, Box, Button, Typography, TextField, Grid, Snackbar } from '@material-ui/core';

import { HistoryContext } from 'containers/App/HistoryContext';
import icon from '../../images/contact.png';
import { submitContactDetails } from './action';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { submitContactDetailsServiceCall } from './serviceCalls';

import { Alert } from '@material-ui/lab';
import ReactPhoneInput from 'react-phone-input-material-ui';
const useStyles = makeStyles(theme => ({
    phoneBox: {

        '& .MuiInput-underline:before': {
            display: 'none',
        },
        '& .MuiInput-underline:after': {
            display: 'none',
        },
        '& .react-tel-input .form-control': {
            width: '100% !important',
        }
    },
    appWrapper: {
        maxWidth: 1064,
        margin: '40px auto 0',
        width: '100%',
        overflow: 'hidden',
        padding: '0 20px 20px',
        [theme.breakpoints.down('sm')]: {
            margin: '20px auto',
            padding: '0 20px',
        },
    },
    heading: {
        fontSize: 35,
        fontWeight: 700,
        marginLeft: 10,
    },
    contactForm: {
        width: '70%',
        '& h3': {
            marginTop: 0,
            fontWeight: 'normal',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    contactPage: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    gridBox: {
        justifyContent: 'space-between',
        paddingRight: 40,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            paddingRight: 0,
        },
    },
    inputGroup: {
        '& label': {
            color: '#B69C72',
            margin: '0 0 5px 0',
            display: 'flex',
            fontSize: '15px',
            fontWeight: 'bold',
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
        marginBottom: '40px',
        cursor: 'pointer',
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
    defaultTextarea: {
        font: 'inherit',
        color: '#434343',
        width: '100%',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: '6px',
        margin: 0,
        padding: '18.5px 14px',
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
        fontSize: 22,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
        '& span': {
            marginLeft: 10,
        },
        '& a': {
            textDecoration: 'none',
            color: '#000',
        },
    },
}));

const ContactUs = ({ submitContactDetails }) => {
    const classes = useStyles();
    const { history } = useContext(HistoryContext);
    const [contactState, setContactState] = useState({
        name: null,
        email: null,
        mobileNumber: null,
        message: null,
    })
    const [error, setError] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const handleSubmit = () => {
        const data = {
            ...contactState
        };
        const isValid = Object.entries(data).every(([key, value]) => {

            if (key === 'name') {
                if (!/^[a-zA-Z_ ]*$/.test(value) || value == null || value === '') {
                    
                    setError({ ...error, [key]: 'Invalid name' });
                    return false;
                }
            } else
                if (key === 'email') {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        setError({ ...error, [key]: 'Invalid email address' });
                        return false;
                    }
                } else
                    if (key === "mobileNumber") {
                        if ( value == null || value === '' || value.length < 10) {
                            setError({ ...error, [key]: 'Invalid mobile number' });
                            return false;
                        }
                    } else if (value === null || value === '') {
                        setError({ ...error, [key]: 'This field is required' });
                        return false;
                    }
            return true;
        });
        if (isValid) new Promise((resolve, reject) => { submitContactDetailsServiceCall({ resolve, reject, data }) }).then(res => {
            if (res.data.success) {
                setContactState({ mobileNumber: "+91" })
                setSuccessMsg("Successfully saved your message. We will get back to you soon.")

            } else {
                setContactState({ mobileNumber: "+91" })
                setErrorMessage("Something went wrong. Please try again later.")
            }
        }).catch(err => {
            setContactState({ mobileNumber: "+91" })
            setErrorMessage("Something went wrong. Please try again later.")
        })

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactState({ ...contactState, [name]: value });
        setError({ ...error, [name]: null });
    }



    return (
        <div className={classes.appWrapper}>
            <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/26002552.js"></script>

            <Box
                display="flex"
                alignItems="center"
                pb={2}
                mb={6}
                style={{ borderBottom: '1px solid #000' }}
            >
                <img src={icon} alt="Terms Icon" height="47px" width="47px" />
                <div className={classes.heading}>Contact Us</div>
            </Box>
            <Box className={classes.contactPage}>
                <Box className={classes.contactForm}>
                    <h3>Please send us a message and we will get back to you</h3>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={9} spacing={4}>

                            <TextField
                                margin='normal'
                                type="text"
                                id="name"
                                placeholder="Enter your name..."
                                onChange={handleChange}
                                fullWidth
                                error={error.name ? true : false}
                                helperText={error.name}
                                label="Name"
                                name='name'
                                variant='outlined'
                                size='small'
                                value={contactState.name ? contactState.name : ''}
                            />
                            <TextField
                                type="email"
                                id="email"
                                placeholder="john@dummy.com"
                                label="Email"
                                variant='outlined'
                                fullWidth
                                margin='normal'
                                name='email'
                                value={contactState.email ? contactState.email : ''}

                                onChange={handleChange}
                                error={error.email ? true : false}
                                helperText={error.email}
                                size='small'
                            />
                            <Box mb={4} className={` ${classes.phoneBox}`} width="100%">
                                <Box fontSize="15px" component="label" color="#A2080C" htmlFor="mobile">Mobile</Box>
                                <ReactPhoneInput

                                    value={contactState.mobileNumber ? contactState.mobileNumber : ''}
                                    country="in"
                                    defaultCountry={['IN', 'cw', 'kz']}
                                    onChange={e => {
                                        handleChange({
                                            target: {
                                                name: 'mobileNumber',
                                                value: e,
                                            },
                                        })
                                    }}
                                    fullWidth


                                    component={TextField}
                                    countryCodeEditable={false}
                                    inputExtraProps={{
                                        margin: 'normal',
                                        autoComplete: 'phone',
                                        name: 'custom-username',
                                        label: 'Mobile',
                                        variant: 'outlined',
                                    }}
                                    containerStyle={{
                                        width: '100%',
                                        border: error && error.mobileNumber ? '1px solid red' : 'inherit',
                                    }}
                                    inputStyle={{
                                        // width: '100%',
                                        // height: '100%',
                                        outline: 0,
                                        // border: 'none',
                                        // padding: '0px',
                                    }}


                                />
                                {
                                    error && error.mobileNumber && (
                                        <Typography variant="caption" color="error">
                                            {
                                                error.mobileNumber
                                            }
                                        </Typography>)
                                }
                            </Box>
                            <TextField
                                name="message"
                                rows="4"
                                cols="50"
                                multiline
                                label="Message"
                                variant='outlined'
                                fullWidth
                                margin='normal'
                                onChange={handleChange}
                                size='small'
                                value={contactState.message ? contactState.message : ''}
                                error={error.message ? true : false}
                                helperText={error.message}
                            />
                            <Box display="flex" alignItems="center" my={10} justifyContent="center">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    id='hs-script-loader'
                                >
                                    Send Message
                                </Button>
                            </Box>

                        </Grid>
                    </Grid>


                </Box>
                <Box className={classes.contactContent}>
                    <Box
                        display="flex"
                        alignItems="center"
                        mb={4}
                        className={classes.desc}
                    >
                        <strong>Email:</strong>&nbsp;
                        <a href="mailto:care@justmyroots.com">care@justmyroots.com</a>
                    </Box>
                    <Box display="flex" alignItems="center" className={classes.desc}>
                        <strong>Call:</strong>&nbsp;
                        <a href="tel:+917777-027222"> +91 7777-027222</a>
                    </Box>
                </Box>
            </Box>

            {
                successMsg ? (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={successMsg ? true : false}
                        autoHideDuration={6000}
                        onClose={() => setSuccessMsg(null)}
                    >
                        <Alert onClose={() => setSuccessMsg(null)} severity="success">
                            {successMsg}
                        </Alert>
                    </Snackbar>

                )
                    : null
            }
            {
                errorMessage ? (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={errorMessage ? true : false}
                        autoHideDuration={6000}
                        onClose={() => setErrorMessage(null)}
                    >
                        <Alert onClose={() => setErrorMessage(null)} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                ) : null
            }
        </div>
    );
};



export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitContactDetails
        },
        dispatch,
    );
}

const withConnect = connect(
    // mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(ContactUs);
