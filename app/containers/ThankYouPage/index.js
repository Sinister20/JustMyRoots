import React from 'react';
import { makeStyles, Box, Button, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '10px auto 0',
    width: '100%',
    overflow: 'hidden',
    padding: '0 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  icon: {
    justifyContent: 'center',
    marginLeft: '47%',
  },

  heading: {
    color: '#ac1715',
    fontSize: 35,
    fontWeight: 700,
    marginLeft: 10,
    text: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 2.5,
  },
  content: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content2: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    color:'#ac1715',
  },
  link: {
    textDecoration: 'none',
    // marginTop: 18,
    display: 'block',
    margin: 10,
    [theme.breakpoints.down('sm')]: {

    },
  },
  orderDetails: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  orderDetailsText: {
    fontWeight: 'bold',
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',

    },
  },
  detailButton: {
    background: '#ac1715',
    color: 'white',
    border: 'none',
    padding: '4px',
    borderRadius: '4px',
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      width: 60,
      height: 40,
    },
  },
 
  
}));

const ThankYouPage = () => {
  const classes = useStyles();

 

  return (
    <>
      <Helmet>
        <script>{`{"gtag('event', 'conversion', {
          'send_to': 'AW-accountID/eventID',
          'transaction_id': ''
      });"}`}</script>

      </Helmet>
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10887320691"></script>
    <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){
  dataLayer.push(arguments)
  }
  gtag('js', new Date());

  gtag('config', 'AW-10887320691');
  
</script> */}





      <div className={classes.appWrapper}>

        <Box>
          {/* <div className={classes.icon}>
            <svg
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
          </div> */}
          <div>
            <span className={classes.heading}>Thank You</span>
            <span className={classes.content}>for choosing JustMyRoots.</span>
          </div>
        </Box>
        <Box pt={1} mt={2}>
          <div>
            <span className={classes.content}>Your Order has been received and will be confirmed by our team.</span>
          </div>
        </Box>
        {/* <Box pt={1} mt={2}>
          <div className={classes.orderDetails}>
            <div className={classes.content}>Your Order has been received and will be confirmed by our team.</div>
            <div>
            <Link className={classes.link} to="/my-profile/My-Orders">
            <Button  variant="contained"
            color="primary"    >
              Order Details
            </Button>
            </Link>
            </div>
          </div>
        </Box> */}


        <Box pt={1} mt={2}>
          <div>
            <span className={classes.content}>
              For any assistance, Please call us on +91 77770 27222
            </span>
          </div>
        </Box>

        <div className={classes.orderDetails}>
          <div className={classes.orderDetailsText}>You can check your order details by clicking here- </div>
          <Link className={classes.link} to="/my-profile/My-Orders">
            <button className={classes.detailButton}
            >
              Order Details
            </button>
          </Link>
        </div>
        <div className={classes.content2}>
          Once an order is placed for intercity food delivery, the order cannot be cancelled.
          In case you do not wish to receive the order, please let us know, however, no refunds and Loyalty  Points will be issued.
        </div>
      </div>
    
    </>
  );
};

export default ThankYouPage;
