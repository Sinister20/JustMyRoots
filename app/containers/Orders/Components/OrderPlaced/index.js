import React, { useState, memo, useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { selectCartStoreByKey } from '../../selectors';
import { selectStoreByKey } from '../../../HomePage/selectors';
import ThankYouPage from '../../../ThankYouPage';
import brandLogo from '../../../../images/brand-logo.png';
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/localStorageUtils';
import wc from '../../../../images/wc2.png'

const useStyles = makeStyles(theme => ({
  cartDesc: {
    fontWeight: 400,
    textAlign: 'center',
    fontSize: 16,
    color: '#333536',
    marginTop: 20,
    width: '100%',
    margin: 'auto',
    color: '#000',
    lineHeight: '30px',
  },
  cardContainer: {
    marginTop: 70,
  },
  section: {
    width: '100%',
    padding: '30px 45px 30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px 30px',
    },
  },
  sec3Grid: {
    paddingTop: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
  },
  sec1Grid: {
    paddingBottom: 20,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
    textAlign: 'left',
  },
  addCartBtn: {
    textDecoration: 'none',
    marginTop: 18,
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      // display: 'none',
    },
  },
  descItem: {
    fontWeight: 300,
    fontSize: 12,
    color: '#333536',
  },
  grid2Sec: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridRowGap: 5,
    marginTop: 15,
  },
  costSummary: {
    padding: 20,
    minHeight: 600,
  },
  itemFont: {
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    textAlign: 'left',
  },
  timelineWrapper: {
    '& li:before': {
      display: 'none',
    },
    '& li:not(:last-child)': {},
  },
  timelineContent: {
    textAlign: 'left',
  },
  borderRight: {
    borderRight: '1px solid #bdbdbd',
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
    },
  },
  paddingLeft: {
    paddingLeft: 30,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  paddingTop: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  subHeading: {
    marginTop: 20,
  },
  webLogo: {
    width: '340px',
    marginBottom: 20,
    marginTop: 40,
    display: 'inline-block',
    '& img': {
      width: '100%',
    },
  },
  webScreen: {
    width: '100%',
    padding: '0 20px',
    minHeight: '100vh',
  },
  iframeWrapper: {
    border: 0,
    marginBottom: 15,
    borderRadius: 10,
    width: 200,
    height: 402,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 200,
    },
  },
worldCup:{
display:"block",
justifyContent:'center',
alignContent:'center',
alignItems:'center',
},

  congratulationsText:{
    fontFamily:'Shippori Mincho B1',
    fontSize:32,
    color:'#A11E23',
    fontWeight:700,
    textShadow:'1px 1px black',
    marginBottom:'20px',
  },
  congratsText:{
   border:'2px solid #9F9F9F',
   height:'auto',
   padding:'14px',
   width:'50%',
   marginLeft:'25%',   
   borderRadius:'8px',
   [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft:'0%',
  },

  },

  wcImage:{
   display:'inline-block'
  },
  playGame:{
    marginTop:'40px',
    marginBottom:'40px',
    [theme.breakpoints.down('sm')]: {
      marginTop:'10px',
      marginBottom:'10px',
    },
  },
  detailButton:{
    background:'#ac1715',
    color:'white',
    border:'none',
    padding:'4px',
    borderRadius:'4px',
    cursor:'pointer',
    marginTop:'12px',
    [theme.breakpoints.down('sm')]: {
      fontSize:'10px',
      width:60,
      height:40,
    },
  },
  goa:{
    marginTop:10,
  },

  goaImg:{
   width:'100%',
   cursor:'pointer',
  }
}));

const AppWrapper = styled.div`
  width: 100%;
  padding: 35px 35px 20px;
  margin: 0 auto;
`;

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 30 auto;
  position: relative;
  text-align: center;
  margin: 0 auto;
`;

const OrderPlaced = props => {
  const classes = useStyles();
  const [unsuccessful, setUnsuccessful] = useState(false);
  const itemPrice = getFromLocalStorage('itemTotal')

  const orderPrice = {
    data: {
      invoice: {
        'Item Total': 1700,
        Shipping: 200,
        Taxes: 100,
      },
    },
  };
  const statusSteps = [
    'Order recieved',
    'Being prepared',
    'Order Collected',
    'At Mumbai, India',
    'In transit',
    'In London',
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('status')) {
      setUnsuccessful(params.get('status').toLowerCase() !== 'success');
    }

    if(params.has('transactionId')){
      setToLocalStorage('orderId', params.get('transactionId'))
    }
  }, []);

  const handleClick =()=>{
    window.location.href = 'https://justmyroots.com/cuisine/GOA-CARNIVAL'
   }

  // const TimelineItemWrapper = ({
  //   status,
  //   connector,
  //   activeDot,
  //   activeConnector,
  // }) => (
  //   <TimelineItem>
  //     <TimelineSeparator>
  //       <TimelineDot color={activeDot ? 'primary' : 'secondary'} />
  //       {connector ? (
  //         <TimelineConnector
  //           style={{
  //             backgroundColor: activeConnector ? 'primary' : 'secondary',
  //           }}
  //         />
  //       ) : null}
  //     </TimelineSeparator>
  //     <TimelineContent classes={{ root: classes.timelineContent }}>
  //       {status}
  //     </TimelineContent>
  //   </TimelineItem>
  // );
  return (
    <AppWrapper className={classes.webScreen}>
      <AppWrapperContainer>
        <div className="logo">
          <Link className={classes.webLogo}>
            <img src={brandLogo} className="web-logo" alt="Just My Roots" />
          </Link>
        </div>
        <Grid item>
          {unsuccessful ? (
            <Grid item>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="35" fill="#DF8544" />
                <path
                  d="M22 49.4746L50.2827 21"
                  stroke="black"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M49.4863 49.1406L21.0117 20.8579"
                  stroke="black"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M49.4863 49.1406L21.0117 20.8579"
                  stroke="#FAF0CD"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M22 49.4746L50.2827 21"
                  stroke="#FAF0CD"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>

              <Typography
                variant="h4"
                component="div"
                style={{ color: '#B41010' }}
                className={classes.subHeading}
              >
                <b>Your order could not be placed!</b>
              </Typography>
              <Typography className={classes.cartDesc}>
                Oops! Looks like your transaction failed.
                <br /> Please Call our Customer Care Team on +91 7777027222
                for further support on the same order.
              </Typography>
              <Typography className={classes.cartDesc}>
                You can retry your payment by clicking Retry payment on the order history screen <br/>
                <Link className={classes.link} to="/my-profile/My-Orders">
            <button className={classes.detailButton} 
           >
              Order History
            </button>
            </Link>
              </Typography>
            </Grid>
          ) : (
            <>
              {/* <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="35" fill="#DF8544" />
                <path
                  d="M16.6094 40.6817L24.7516 48.8791C24.9471 49.076 25.2655 49.076 25.4611 48.8791L53.389 20.7617"
                  stroke="black"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M16.6094 40.6817L24.7516 48.8791C24.9471 49.076 25.2655 49.076 25.4611 48.8791L53.389 20.7617"
                  stroke="#FAF0CD"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
              <Typography variant="h3" component="div">
                <Typography variant="h3" color="primary" component="span">
                  <b>Your order</b>
                </Typography>
                &nbsp;
                <Typography variant="h3" component="span">
                  <b>has been placed!</b>
                </Typography>
              </Typography>
              <Typography className={classes.cartDesc}>
                Thank you for choosing JustMyRoots. We appreciate your trust and we’ll do our best to meet your expectations. Your order has been received and will be soon confirmed by the team.<br/>You are a valued customer, hence we would like to offer a 20% Discount on your next purchase. Please use coupon code: JMRREP2 for the same. Generic terms and conditions remain the same.<br/>For any further assistance, please do not hesitate to call us on +91 77770 27222.
              </Typography> */}
              <ThankYouPage />

              {/* {itemPrice >=750 && (
                <div className={classes.worldCup}>
                <div className={classes.congratulationsText}>
                  Congratulations!
                </div>
                <div className={classes.congratsText}>
                <img className={classes.wcImage} src={wc} alt="wc" />
                </div>
                 <div className={classes.playGame}>
                  <Link to="/my-orders/order-placed/predict" className={classes.addCartBtn}>
                  <Button  variant='contained' color='primary'>
                   Click here to Play
                  </Button>
                  </Link>
                 </div>
                </div>
              )} */}
            </>
          )}
        </Grid>
        {/* <div className={classes.goa} >
   
   <img onClick={handleClick} className={classes.goaImg} src={Goa} alt='goa' />
</div> */}

        <Link className={classes.addCartBtn} to="/">
          <Button
            variant="outlined"
            color="primary"        
          >
            GO BACK TO HOME PAGE
          </Button>
        </Link>
        {/* <Grid className={classes.cardContainer} container item spacing={4}>
          <Grid sm={8} item>
            <Paper>
              <section className={classes.section}>
                <Grid container spacing={2}>
                  <Grid
                    md={6}
                    sm={12}
                    item
                    className={`${classes.sec1Grid} ${classes.borderRight}`}
                  >
                    <span>
                      <Typography variant="h5" color="primary">
                        Track your order
                      </Typography>
                      <Typography className={classes.descItem}>
                        Address- lorem ipsum dolor set amet Pincode
                      </Typography>
                    </span>
                  </Grid>
                  <Grid
                    md={6}
                    sm={12}
                    item
                    className={`${classes.sec1Grid} ${classes.paddingLeft}`}
                  >
                    <Typography variant="h5" color="primary">
                      #123456
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{
                        textTransform: 'unset',
                        marginBottom: 20,
                      }}
                    >
                      Cancel Order
                    </Button>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid
                    md={6}
                    item
                    justifyContent="start"
                    className={classes.borderRight}
                  >
                    <Timeline classes={{ root: classes.timelineWrapper }}>
                      {statusSteps.map((s, i) => (
                        <TimelineItemWrapper
                          status={s}
                          connector={statusSteps.length - 1 !== i}
                          activeDot={i <= 2}
                          activeConnector={i < 2}
                        />
                      ))}
                    </Timeline>
                  </Grid>
                  <Grid md={6} item className={classes.paddingTop}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224369.0356253586!2d77.25804402626687!3d28.516681710550603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1633332681157!5m2!1sen!2sin"
                      width="200"
                      height="402"
                      className={classes.iframeWrapper}
                      style={{}}
                      allowFullScreen=""
                      loading="lazy"
                    />
                    <Button variant="text" color="primary">
                      Expand Map
                    </Button>
                  </Grid>
                </Grid>
              </section>
            </Paper>
          </Grid>
          <Grid sm={4} item>
            <Paper style={{ height: '100%' }}>
              <Grid item className={classes.costSummary}>
                {orderPrice &&
                  orderPrice.data &&
                  orderPrice.data.invoice &&
                  Object.keys(orderPrice.data.invoice).map(invKey => (
                    <Grid item className={classes.grid2Sec}>
                      <Grid item>
                        <Typography className={classes.itemFont}>
                          {invKey} :
                        </Typography>
                      </Grid>
                      <Grid item>
                        <b>â‚¹{orderPrice.data.invoice[invKey]}</b>
                      </Grid>
                    </Grid>
                  ))}
                <Divider />
                <Grid item className={classes.grid2Sec}>
                  <Grid item>
                    <Typography className={classes.itemFont}>
                      Grand Total
                    </Typography>
                  </Grid>
                  <Grid item>
                    <b>â‚¹ 2000</b>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Grid item style={{ margin: '10px 0px' }}>
                    <Typography color="primary" className={classes.itemFont}>
                      Address{' '}
                      <Button
                        color="primary"
                        style={{ fontSize: 14, textTransform: 'capitalize' }}
                      >
                        Change
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224369.0356253586!2d77.25804402626687!3d28.516681710550603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1633332681157!5m2!1sen!2sin"
                  width="100%"
                  height="100"
                  style={{ border: 0, marginBottom: 40, borderRadius: 15 }}
                  allowFullScreen=""
                  loading="lazy"
                />
                <Typography color="primary" className={classes.itemFont}>
                  Name:{' '}
                  <span style={{ color: '#B69C72', marginRight: 5 }}>
                    Office
                  </span>
                </Typography>
                <Typography color="primary" className={classes.itemFont}>
                  City- 304342
                </Typography>
                <Typography
                  className={classes.descItem}
                  style={{ textAlign: 'left' }}
                >
                  Address- lorem ipsum dolor set amet Pincode
                </Typography>
                <Typography color="primary" className={classes.itemFont}>
                  Landmark-{' '}
                  <span style={{ fontWeight: 300 }}>Lorem ipsu dolor</span>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Typography
          style={{
            margin: '50px auto 130px',
            fontWeight: '300',
            fontSize: '20px',
            lineHeight: '23px',
            textAlign: 'center',
            letterSpacing: '0.02em',
            color: '#737373',
          }}
        >
          TnC - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam
          facilisis elit consectetur.
        </Typography> */}
        <br />
        <br />
        <br />
      </AppWrapperContainer>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(OrderPlaced);