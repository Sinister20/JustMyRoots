import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { submitPendingPaymentServiceCall } from '../serviceCalls';


const PaymentGatewayPage = props => {
    const {
        location,
        history

    } = props;

    const [encData, setEncData] = useState(null);
    const formRef = useRef(null);
    const formRefCC = useRef(null)

    useEffect(() => {
              console.log(location.state.data)
        if (location.state.data) {

            new Promise((resolve, reject) => {
                submitPendingPaymentServiceCall({
                    data: location.state.data,
                    resolve,
                    reject
                })
            }).then(res => {
                if (res.status == 200) {
                    if (res.data.success) {
                        setEncData(res.data.data)
                        res.data.data.payMode === 'payu' && formRef.current.submit();
                        res.data.data.payMode === 'ccav'&& formRefCC.current.submit();

                    } else {
                        alert(res.data.error[0])
                        history.push('/')
                    }
                }


            }).catch(err => {
                alert("Something went wrong")
                history.push('/')
            })
        }

    }, []);

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

                    //     src={`https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encData.ccavenue.encRequest
                    //         }&access_code=${encData.ccavenue.accessCode}`}
                    //     id="paymentFrameJMR"
                    //     width="100%"
                    //     height="600"
                    //     frameBorder="0"
                    //     scrolling="No"
                    // />
                     <form method='post' name='redirect'
                     ref={formRefCC}




          action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
   >
    <input type='hidden' name='encRequest' value={encData.ccavenue.encRequest} />
    <input type='hidden' name='access_code' value={encData.ccavenue.accessCode} />

          </form>
                )
            )}
        </div>
    );
};


export default (PaymentGatewayPage);
