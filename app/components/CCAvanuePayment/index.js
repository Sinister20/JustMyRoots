import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { selectStoreByKey } from '../../containers/HomePage/selectors';
import {
  getPaymentDetails,
  retryPayment,
} from '../../containers/HomePage/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { setToLocalStorage } from '../../utils/localStorageUtils';
import { Button } from '@material-ui/core';
import RazorpayButton from '../Razorpay';
import axios from 'axios';
import {  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes, } from '../../config/environmentConfig';
import { Redirect,useHistory } from 'react-router-dom';
import { selectCartStoreByKey } from '../../containers/CartContainer/selectors';

const CCAvanuePayment = props => {
  const {
    getPaymentDetails,
    cartData,
    selectedNewDate,
    TranscationID,
    retryPayment,
    payMode,
    selectedBillingAddr,
    selectedShiping,
    defaultAddress,
    location,

  } = props;
  const history = useHistory();

  const [encData, setEncData] = useState(null);
  const formRef = useRef(null);
  const formRefCC = useRef(null)
  const formRazor = useRef(null)
  const [paymentId, setPaymentId] = useState(null)
  const [amount, setAmount] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const[phone,setPhone] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [signature, setSignature] = useState(null)
  const [transactionId, setTransactionId] = useState(null)
  const currentUrl = apiUrlPrefixes[currentEnvironment];

  

  useEffect(() => {
    console.log(defaultAddress)
    const deliveryDates = window.localStorage.getItem('deliveryDates');
    new Promise((resolve, reject) => {
      if (TranscationID) {
        retryPayment({
          resolve,
          reject,
          TranscationID,
          payMode,
        });
      } else {
        getPaymentDetails({
          resolve,
          reject,
          cartId: cartData[Object.keys(cartData)[0]].cartInfo._id,
          payMode,
          billingAddress: selectedShiping ? selectedShiping._id : defaultAddress,
          deliveryDates: deliveryDates ? JSON.parse(deliveryDates) : [],
          // amount:

        });
      }
    })
      .then(res => {
        setEncData(res.data.data)
        if (payMode === 'razor') {
          // setPaymentId(res.data.data.razor.receipt)
          setAmount(res.data.data.razor.amount)
          setName(res.data.data.razor.notes.name)
          setPhone(res.data.data.razor.notes.phone)
          setEmail(res.data.data.razor.notes.email)
          setOrderId(res.data.data.razor.id)
        }
        window.localStorage.removeItem('deliveryDates');
        res.data.data.payMode === 'payu' && formRef.current.submit();
        res.data.data.payMode === 'ccav' && formRefCC.current.submit();
        res.data.data.payMode === 'razor' && Razorpay(res.data.data.razor)

      })
      .catch(err => {
        console.log(err);
        window.localStorage.removeItem('deliveryDates');
      });
  }, []);

  const Razorpay = (response) => {

    // if (!paymentId) return;

    const razorpay = new window.Razorpay({
      key: 'rzp_test_IL1mUXwMGNp6J4',
      currency: 'INR',
      amount: response.amount,
      name: response.notes.name,  
      order_id: response.id,
      prefill: {
        name: response.notes.name,
        email: response.notes.email,
        contact: response.notes.phone,
      },
      // callback_url: 'https://justmyroots.com/',
      // description: 'Purchase Description',
      // image: 'https://example.com/your_logo.png',
      // handler(response) {
      //   console.log(response);
      //  setPaymentId(response.razorpay_payment_id)
      // },
      handler: function (res) {
        console.log(res)
        setPaymentId(res.razorpay_payment_id)
        setSignature(res.razorpay_signature)
        completePayment(res , response.receipt)
      },
      modal: {
        ondismiss() {
          console.log('Payment cancelled');
        }
      }
    });

    razorpay.open();

  }

  const completePayment = (response,transaction) =>{
    axios.post(`${currentUrl}/api/payment/razorpay/verify`,{
      transactionId:transaction,
      razorpay_order_id:response.razorpay_order_id,
      razorpay_payment_id:response.razorpay_payment_id,
      razorpay_signature:response.razorpay_signature,
      
    })
    .then((res)=>{
      window.location.href=`http://devweb.justmyroots.com/my-orders/order-placed/?status=${res.data.data}&transactionId=${transaction}`
    })
  }



  return (
    <div>
      {encData && encData.payu ? (
        <form
          ref={formRef}
          id="nonseamless"
          action="https://test.payu.in/_payment"
          method="post"
        >
          <input
            type="hidden"
            name="firstname"
            value={encData.payu.firstname}
          />
          <input type="hidden" name="lastname" value={encData.payu.lastname} />
          <input type="hidden" name="surl" value={encData.payu.surl} />
          <input type="hidden" name="curl" value={encData.payu.curl} />
          <input type="hidden" name="furl" value={encData.payu.furl} />
          <input type="hidden" name="email" value={encData.payu.email || ''} />
          <input type="hidden" name="phone" value={encData.payu.phone} />
          <input type="hidden" name="address1" value={encData.payu.address1} />
          <input type="hidden" name="key" value={encData.payu.key} />
          <input type="hidden" name="hash" value={encData.payu.hash} />
          <input type="hidden" name="txnid" value={encData.payu.txnid} />
          <input type="hidden" name="udf1" value={encData.payu.udf1} />
          <input type="hidden" name="udf2" value={encData.payu.udf2} />
          <input
            type="hidden"
            name="productinfo"
            value={encData.payu.productinfo}
          />
          <input type="hidden" name="amount" value={encData.payu.amount} />
        </form>
      ) : (
        encData &&
        encData.ccavenue && (
          // <iframe

          //   src={`https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${
          //     encData.ccavenue.encRequest
          //   }&access_code=${encData.ccavenue.accessCode}`}
          //   id="paymentFrameJMR"
          //   width="100%"
          //   height="600"
          //   frameBorder="0"
          //   scrolling="No"
          // />
          <form
            ref={formRefCC}
            method="post"
            name="redirect"
            action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
          >
            <input
              type="hidden"
              name="encRequest"
              value={encData.ccavenue.encRequest}
            />
            <input
              type="hidden"
              name="access_code"
              value={encData.ccavenue.accessCode}
            />

            <input
              type="hidden"
              name="promo_code"
              value='PROMO6162'
            />
            {/* <script language="javascript">document.redirect.submit (); console.log('secure')</script> */}
            {/* <input type='submit' value='submit' /> */}
          </form>
        )
      )}

      {/* {
        encData && encData.razor && (
          <RazorpayButton
            onClick={Razorpay}
            text={'Proceed to buy'}
          />
        
        )
      } */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
  selectedBillingAddr: selectGlobelStoreByKey('selectedBillingAddr'),
  selectedShiping:selectGlobelStoreByKey('selectedShiping'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),

});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPaymentDetails,
      retryPayment,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CCAvanuePayment);
