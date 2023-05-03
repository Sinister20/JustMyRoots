import React, { useContext } from 'react';
import { makeStyles, Box, Button, Typography } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import icon from '../../images/terms.png';

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
    marginLeft: 10,
  },
  policyContent: {
    '& h3': {
      marginBottom: '0',
      textTransform: 'capitalize',
    },
    '& h5': {
      marginBottom: '0',
      textTransform: 'capitalize',
      fontSize: 16,
    },
    '& h4': {
      marginBottom: '8px',
      textTransform: 'capitalize',
      fontSize: 16,
    },
    '& .alpha': {
      listStyleType: 'lower-alpha',
    },
    '& .number': {
      listStyleType: 'decimal',
    },
    '& .roman': {
      listStyleType: 'upper-roman',
    },
    '& ul': {
      padding: '0 0 0 17px',
      '& li': {
        marginBottom: '16px',
        fontSize: '14px',
        textAlign: 'justify',
        lineHeight: '1.5',
      },
    },
    '& p': {
      marginBottom: '16px',
      fontSize: '14px',
      textAlign: 'justify',
      lineHeight: '1.5',
      marginTop: '0',
    },
  },
  desc: {
    fontSize: 25,
    fontWeight: 400,
    '& span': {
      marginLeft: 10,
    },
    '& a': {
      textDecoration: 'none',
      color: '#000',
    },
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  return (
    <div className={classes.appWrapper}>
      <Box
        display="flex"
        alignItems="center"
        pb={2}
        mb={6}
        style={{ borderBottom: '1px solid #000' }}
      >
         <img src={icon} alt="Terms Icon" height="47px" width="47px" />
        <div className={classes.heading}>FAQ's</div>
      </Box>
      <div className={classes.policyContent}>
        <h3>General</h3>
        <ul className="number">
          <li>
           <h5>Did not receive the OTP?</h5>
           <p>This can happen, sometimes, due to network congestion. In such case, please click on Resend OTP. If the problem persists, please contact the Customer care service team.</p>
          </li>
          <li>
           <h5>Is the app available for installation on all devices? (iOS, Android, Windows and Blackberry)</h5>
           <p>No, the application is available for installation only for iOS and Android devices.</p>
          </li>
          <li>
           <h5>Can I edit my order?</h5>
           <p>It depends if the product has got dispatched or not. To know if the originally ordered product has got dispatched, please connect with the Customer Care team within 24 hours. No changes can be made if the order has got dispatched.</p>
          </li>
          <li>
           <h5>Can I change my address/number after placing the order?</h5>
           <p>Yes, you can. It depends if the product has got dispatched or not. To know if the originally ordered product has got dispatched, please connect with the Customer Care team. However, once the order has been processed, and the package has been dispatched, any request by the customer to change the delivery address will incur an additional charge.</p>
          </li>
          <li>
           <h5>Can I order from any location?</h5>
           <p>Yes. However, it depends upon the product that you are ordering. Delivery of only non-perishable food product is possible to the cities where we are currently not operational.</p>
          </li>
          <li>
           <h5>Is there a minimum order value?</h5>
           <p>No, there is no minimum order value for placing the order.</p>
          </li>
          <li>
           <h5>Is single order from many restaurants possible?</h5>
           <p>Yes, it is possible to order multiple products from different restaurants as a single order. For better experience, please contact the Customer Care team.</p>
          </li>
          <li>
           <h5>Is single order from many restaurants possible?</h5>
           <p>Yes, it is possible to order multiple products from different restaurants as a single order. For better experience, please contact the Customer Care team.</p>
          </li>
          <li>
           <h5>Is free shipping available on orders?</h5>
           <p>JustMyRoots offer free shipping to all its customers across India.</p>
          </li>
          <li>
           <h5>How does referral code work?</h5>
           <p>JustMyRoots has a strong Referral Bonus Program. Every time you refer, not only you get Bonus Points, the person referred to also gets rewarded.</p>
          </li>
          <li>
           <h5>Can I place bulk orders?</h5>
           <p>Placing bulk orders is one of the services that JustMyRoots provide to its customers. Customer Care team helps you in placing the order manually and that too at a cheaper rate.</p>
          </li>
          <li>
           <h5>How can I make the payments for the orders that I placed?</h5>
           <p>On JustMyRoots, the following payment methods are available for you to make payment:</p>
            <ul>
             <li>JustMyRoots wallet (Loyalty Points)</li>
             <li>Credit/Debit card</li>
             <li>Net Banking</li>
             <li>Unified Payment Interface (UPI)</li>
           </ul>
           <p>JustMyRoots does not provide Cash On Delivery facility.</p>
          </li>
          <li>
           <h5>Can I make a payment through an international card?</h5>
           <p>Yes</p>
          </li>
          <li>
           <h5>Whom to contact if the payment is complete but the order status is still pending?</h5>
           <p>If you paid for your order using net banking but the payment confirmation was pending, we may be awaiting the payment confirmation from your bank. This can take some time. For an immediate status, please contact your bank.</p>
           <p> In further, please connect with the JustMyRoots Customer service team to confirm the order status.
            </p>
          </li>
          <li>
           <h5>How can I raise a complaint?</h5>
           <p>Level 1: You can contact our 24x7 customer service team, within 2 hours of receipt of your order, which provides online resolution to your queries/complaints across channels including chat.</p>
           <p>Level 2: If your concern/query is not addressed within the promised timeline or are dissatisfied with the response from Level 1, you can reach out to our escalation desk via email. You can write to ___ and we will respond to you within __ hours/ business days from receipt of your email.</p>
          </li>
          <li>
           <h5>How can I order from an eatery which is not listed with JustMyRoots?</h5>
           <p>You can let us know about your wish by visiting our portal through our “Wish-a-Dish” service or place the order under the “DFH-Direct From Home” service. You can take the assistance of the Customer Service team for better experience.</p>
          </li>
          <li>
           <h5>Can I cancel an order that I have already placed?</h5>
           <p>Cancellation of the ordered product depends upon the dispatchment of the product. To know if the ordered product has got dispatched, please connect with the Customer Care team.</p>
          </li>
          <li>
           <h5>What is the timeline to cancel a placed order?</h5>
           <p>To cancel an already placed order, please call the Customer Care team. It is important to check if the order has got dispatched. Once dispatched, the order cannot be cancelled.</p>
          </li>
          <li>
           <h5>Whether I can avail the service of same day delivery?</h5>
           <p>Not all Pin-codes might be eligible for this service. Please enter your Pin-code on the product details page to see if your address is eligible for guaranteed One-Day Delivery. </p>
          </li>
          <li>
           <h5>Can I track my order?</h5>
           <p>You can find the tracking information in your order details. </p>
          </li>
          <li>
           <h5>How to place an order if my PIN code is not serviceable by JustMyRoots?</h5>
           <p>For assistance related to the delivery of products in the unserviceable PIN Codes, contact Customer Care team.</p>
          </li>
          <li>
           <h5>How can I book the “DFH - Direct from Home” service?</h5>
           <p>Simply visit our portal, click on our DFH section and follow the steps thereafter. You can also connect with Customer Service team for better assistance and experience.</p>
          </li>
          <li>
           <h5>How many days does it take for my order to reach the destination?</h5>
          </li>
          <li>
           <h5>How do you maintain the quality, freshness, safety and hygiene of the Product?</h5>
           <p>JustMyRoots is known for its unique service of maintaining the quality and freshness of its Products. We neither freeze nor add any preservatives. Our special packaging ensures that the product is kept between 5-8 degree Celsius, which is turn stores the moisture and freshness of the product.</p>
          </li>
          <li>
           <h5>How safe is it to consume the food which reaches us after 24-48 hours?</h5>
           <p>JustMyRoots has become a pioneer in delivering quality and fresh food products to its customers. We have run multiple trials across the nation to test if the quality of food survives the time. Hence, we can proudly and promisingly state that the food that reaches you is highly edible and good in taste.</p>
          </li>
          <li>
           <h5>In what cases can I get a refund?</h5>
           <p>Please refer the return and refund policy.</p>
          </li>
        </ul>
        <h4>PARTNER WITH US</h4>
        <p>1.	How can I join hands with JustMyRoots?</p>
        <p>2.	What are the compulsory documents to list my eatery with JustMyRoots?</p>
        <p>3.	After the submission of all the documents, how long will it take to go live on JustMyRoots?</p>
        <p>4.	Can my eatery still be onboarded if it does not have an FSSAI License?</p>
      </div>
    </div>
  );
};

export default ContactUs;
