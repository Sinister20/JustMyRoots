import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { selectStoreByKey } from '../../containers/HomePage/selectors';
import { getPaymentDetails } from '../../containers/HomePage/actions';


const PayuPayment = (props) => {

    const { getPaymentDetails, cartData, selectedNewDate } = props;

    useEffect(() => {
        new Promise((resolve, reject) => {
            getPaymentDetails({ resolve, reject, cartId: cartData[Object.keys(cartData)[0]].cartInfo._id, selectedNewDate });
        }).then((res) => {
            const { encRequest, accessCode } = res.data.data;
            bolt.launch({
                hash: encRequest,
                key: 'gtKFFx',
                txnid: 'werwerwer',
                phone: '7042776072',
                productinfo: '123',
                txnid: "ORD12",
                amount: "6.00",
                firstname: "avdhesh",
                email: "avdhesh.kumar@pay.com",
                udf5: 'hdfcpay',
                surl: 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
                furl: 'https://test.ccavenue.com/transaction/transsddaction.do?command=initiateTransaction'
            }, {
                responseHandler: function (BOLT) {
                    //console.log(BOLT.response.txnStatus);
                    if (BOLT.response.txnStatus != 'CANCEL') {
                        alert('your cancelled the payment')
                    }
                },
                catchException: function (BOLT) {
                    //console.log(BOLT.message);
                    alert(BOLT.message);
                }
            });
        })
    }, [])

    return (
        <div>
            ...
        </div>
    );
}



const mapStateToProps = createStructuredSelector({
    cartData: selectStoreByKey('cartData'),

});

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getPaymentDetails,
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
)(PayuPayment);