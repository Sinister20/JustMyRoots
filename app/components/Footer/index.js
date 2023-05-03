import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Grid,
  InputBase,
  makeStyles,
  Box,
  Typography,
  Hidden,
  useTheme,
  useMediaQuery,
  Snackbar,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Alert } from '@material-ui/lab';
import imageA2 from '../../images/facebook.svg';
import imageA3 from '../../images/twitter.svg';
import imageA4 from '../../images/instagram.svg';
import imageA5 from '../../images/linkedin.svg';
import GooglePlay from '../../images/google-play.png';
import search from '../../images/search-icon.png';
import AppStore from '../../images/app-store.png';
import Globe from '../../images/globe.png';
import { subscribeEmail } from '../../containers/HomePage/actions';

const AppWrapperContainer = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0 15px' : '0 35px')};
  margin: 0 auto;
  background-color: #ececec;
  margin-top: 20px;
`;

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    padding: '50px 0 20px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subscribeCard: {
    borderRadius: 25,
    maxWidth: 690,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #000000',
    height: 56,
    padding: '2px 5px 2px 10px',
    fontWeight: '12px',
  },
  submitBtn: {
    color: '#fff',
    minWidth: 115,
    borderRadius: 25,
    height: 45,
    [theme.breakpoints.up('xs')]: {
      minWidth: 78,
      fontSize: '12px',
      borderRadius: 20,
    },
  },
  registerNowText: {
    color: '#060606',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  socialIcons: {
    marginLeft: 0,
    '& a': {
      minWidth: 'auto',
      marginRight: 10,
    },
  },
  linkHeading: {
    fontWeight: 700,
    marginBottom: 15,
  },

  boldHeading: {
    color: '#000000',
    fontWeight: 700,
  },
  lightHeading: {
    color: '#333536',
    fontSize: 16,
    fontWeight: 300,
    marginLeft: 5,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: '#333536',
    },
  },
  searchBtn: {
    minWidth: 300,
    height: 42,
    textTransform: 'uppercase',
    fontWeight: 700,
    border: '2px solid #AC1715',
    letterSpacing: 5,
    borderRadius: 30,
    paddingTop: 7,
    textAlign: 'center',
    marginBottom: 20,
    display: 'none',
    color: '#000',
    textDecoration: 'none',
    '& img': {
      width: '18px',
      marginTop: '-2px',
      marginRight: '10px',
    },
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 35,
      display: 'block',
    },
  },
  locationBtn: {
    minWidth: 300,
    height: 42,
    textTransform: 'uppercase',
    fontWeight: 700,
    border: '2px solid #AC1715',
    letterSpacing: 5,
    borderRadius: 30,
    paddingTop: 7,
    textAlign: 'center',
    marginBottom: 20,
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 35,
    },
  },
  copyrightWrapper: {
    width: 542,
    margin: '0 auto',
    textAlign: 'center',
    color: '#050505',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& h3': {
      fontWeight: 300,
      fontSize: 12,
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        lineHeight: 2,
        fontSize: 8,
      },
    },
    '& h5': {
      fontWeight: 300,
      fontSize: 12,
      marginTop: 20,
      marginBottom: 30,
      [theme.breakpoints.down('sm')]: {
        fontSize: 8,
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {},
    marginRight: 0,
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
      width: '100%',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(2, 2, 2, 4),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    border: '1px solid #333536',
    boxSizing: 'border-box',
    borderRadius: 50,
    alignItems: 'center',
    padding: '5px',
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
  footerContent: {
    display: 'grid',
    gridGap: 20,
    gridTemplateAreas: '"section1 section2 section3"',
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: '"section3 section2" "section1 section2"',
    },
    maxWidth: 800,
    margin: '40px auto',
  },
  title: {
    width: '390px',
    [theme.breakpoints.down('xs')]: {
      width: '150px',
  },
  },
  aboutUsLink: {
    gridArea: 'section2',
    '& a': {
      display: 'block',
    },
  },
  followUs: {
    gridArea: 'section1',
  },
  contactUs: {
    gridArea: 'section3',
  },
}));

const Footer = ({ subscribeEmail }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdmin = false;
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: '',
  });

  const onClickHandler = () => {
    if (email) {
      const payload = {
        email,
      };

      new Promise((resolve, reject) => {
        subscribeEmail({ resolve, reject, payload });
      })
        .then(res => {
          setEmail();
          if (res.data.success) {
            setSnackbar({
              open: true,
              message: 'Subscribed Successfully',
              variant: 'success',
            });
          } else {
            setSnackbar({
              open: true,
              message: 'You are already subscribed',
              variant: 'error',
            });
          }
        })
        .catch(e => {
          setEmail();
          setSnackbar({
            open: true,
            message: 'Something went wrong',
            variant: 'error',
          });
        });
    }
  };

  return (
    <Fragment>
      {!isAdmin ? (
        <AppWrapper isMobile={isMobile}>
          <AppWrapperContainer>
            <Grid
              container
              item
              justifyContent="center"
              className={classes.footerWrapper}
            >
              <ValidatorForm
                onSubmit={() => onClickHandler()}
                onError={errors => console.log(errors)}
              >
                <div className={classes.subscribeCard}>
                  <Typography className={classes.title} color="inherit" noWrap>
                    Subscribe to our Newsletter |
                  </Typography>
                  <div className={classes.search}>
                    <TextValidator
                      placeholder="Type your email here..."
                      name="EMAILID"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      onChange={e => setEmail(e.target.value)}
                      validators={['required', 'isEmail']}
                      errorMessages={[
                        'This field is required',
                        'Invalid Email ID',
                      ]}
                      value={email || ''}
                    />
                  </div>
                  <div className={classes.grow} />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    style={{ color: '#fff' }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </ValidatorForm>
            </Grid>
            <Typography className={classes.registerNowText} noWrap>
              <span> Register now </span>
              <span>to get updates on Offers and Coupons</span>
            </Typography>
            <Grid item className={classes.footerContent}>
              <Grid className={classes.followUs}>
                <Typography className={classes.linkHeading}>
                  Follow us:
                </Typography>
                <div className={classes.socialIcons}>
                  <Link
                    href="https://www.facebook.com/JMRconnect/"
                    color="inherit"
                    target="_blank"
                  >
                    <img src={imageA2} />
                  </Link>
                  <Link
                    href="https://twitter.com/Just_My_Roots"
                    color="inherit"
                    target="_blank"
                  >
                    <img src={imageA3} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/just_my_roots/"
                    color="inherit"
                    target="_blank"
                  >
                    <img src={imageA4} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/justmyroots/"
                    color="inherit"
                    target="_blank"
                  >
                    <img src={imageA5} />
                  </Link>
                </div>
                <Box mt={3} className={classes.socialIcons}>
                <Link
                    href="https://play.google.com/store/apps/details?id=com.justmyroots"
                    color="inherit"
                    target="_blank"
                    title="App Available on Play Store"
                  >
                    <img src={GooglePlay} />
                  </Link>
                  <br/><br/>
                  <Link
                    href="https://apps.apple.com/in/app/justmyroots/id1618427533"
                    color="inherit"
                    title="App Available on Apps Store"
                    target="_blank"
                  >
                    <img src={AppStore} />
                  </Link>
                </Box>
              </Grid>
              <Grid className={classes.aboutUsLink}>
                <Typography className={classes.linkHeading}>
                  About Us:
                </Typography>
                <Link href="/privacy-policy" color="inherit">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-condition" color="inherit">
                  Terms and Conditions
                </Link>
                <Link href="/contact-us" color="inherit">
                  Contact
                </Link>
                <Link href="/faq" color="inherit">
                  FAQ's
                </Link>
                <Link href="/safety-protocols" color="inherit">
                  Safety Measures
                </Link>
              </Grid>
              <Grid className={classes.contactUs}>
                <Typography className={classes.linkHeading}>
                  Contact us:
                </Typography>
                <Typography noWrap>
                  <span className={classes.boldHeading}>Email:</span>
                  <span className={classes.lightHeading}>
                    <a href="mailto:care@justmyroots.com">
                      care@justmyroots.com
                    </a>
                  </span>
                </Typography>
                <Typography noWrap>
                  <span className={classes.boldHeading}>Call:</span>
                  <span className={classes.lightHeading}>
                    <a href="tel:+917777-027222"> +91 7777-027222</a>
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <div>
            <Box display="flex" justifyContent="center">
            <a href="https://international.justmyroots.com/" target="_blank" className={classes.searchBtn}>
                
                <img src={Globe} alt="search" />
                  International
                </a>
              </Box>
            <Box display="flex" justifyContent="center">
                <Link href="/search"
                  variant="outlined-none"
                  color="inherit"
                  className={classes.searchBtn}
                ><img src={search} alt="search" />
                  Search
                </Link>
              </Box>
              <Box display="flex" justifyContent="center">
                <Link href="/cities"
                  variant="outlined-none"
                  color="inherit"
                  className={classes.locationBtn}
                >
                  OUR LOCATION
                </Link>
              </Box>
              <div className={classes.copyrightWrapper}>
                {/* <Typography variant="h3">
                  AHMEDABAD | ALL INDIA LOCATIONS | AMRITSAR | ANDHRA BHAVAN |
                  BENGALURU | DELHI | GURGAON | HILSA FISH DELIVERY | HYDERABAD
                  | JAMAI SHOSHTI | KOLKATA | LUCKNOW | MANGOES OF INDIA |
                  MUMBAI | NOSTALGIA DINNER | NOSTALGIC BRUNCH | PUNE | varansi
                </Typography> */}
                <Typography variant="h5">
                  © Copyright 2022 Createcomm Tech Private Limited. All Rights
                  Reserved
                </Typography>
              </div>
            </div>
          </AppWrapperContainer>
        </AppWrapper>
      ) : (
        ''
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.variant}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({});
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      subscribeEmail,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Footer);
