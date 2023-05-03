import React, { memo, useEffect } from 'react';
import {
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Typography,
  Divider,
  Box,

} from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { array } from 'prop-types';
import ItemCard from './ItemCard';
import { selectMyAccountStoreByKey } from '../../../selectors';
import { getOrderList, cancelMyOrder, reOrder } from '../../../actions';
import DFHItemCard from './DFHItemCard';
import { setToLocalStorage } from '../../../../../utils/localStorageUtils';

const useStyles = makeStyles(theme => ({
  container: {
    background: '#FFFFFF',
    boxShadow: props =>
      !props.refunds && '0px 4px 20px rgba(188, 194, 197, 0.25)',
    borderRadius: 6,

    margin: props => (props.refunds ? '0 auto' : '50px auto 0 auto'),
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
      width: props => !props.refunds && '90% !important',
    },

  },
  dateOfOrder: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridColumnGap: 20,
    },
  },
  orderText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  orderNumber: {
    display: 'flex',
    alignItems: 'center',
    color: '#737373',
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  helpBtn: {
    fontSize: 14,
    border: '1px solid #B69C72',
    height: 26,
    textTransform: 'capitalize',
    color: '#B69C72',
  },
  cancelBtn: {
    fontSize: 14,
    border: '1px solid #B69C72',
    textTransform: 'capitalize',
    color: '#B69C72',
    height: 30,
    display: 'none',
  },
  total: {
    fontSize: 16,
    color: '#737373',
    display: 'flex',
    justifyContent: 'right',
  },
  helpGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 100px',
  },
  retryPayment: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retryPaymentBtn: {
    fontSize: 20,
    border: '1px solid #B69C72',
    padding: '18px 60px',
    color: '#fff',
    height: 30,
    textTransform: 'capitalize',
    marginTop: 20,
  },
  track: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const MyOrders = props => {
  const { refunds, getOrderList, myOrders = [], cancelMyOrder, history, reOrder } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ refunds, isMobile });

  useEffect(() => {
    getOrderList();

    // console.log(moment(myOrders[0].orders[0].orderPlacedAt).isBetween('2022/09/06', '2022/11/05') )
    return () => {
      // cleanup
    };
  }, []);



  const retryPaymentClick = transactionData => {
    history.push("/checkout/payments", { transactionData });
  };
  const handleReOrder = (orderId) => {
    new Promise((resolve, reject) => { reOrder({ orderId: orderId.cartId, resolve, reject }); }).then(() => {
      history.push(`/checkout`);
    }).catch(() => { });
  }

  const playGame = orderData =>{
    setToLocalStorage('orderId', orderData.transactionId+"/"+orderData.orderNumber)
    setToLocalStorage('itemTotal',orderData.totalPrice)
    history.push('/my-orders/order-placed')
  }

  const getValidReOrderBtn = (status) => {
    switch (status) {
      case "CONFIRMED":
        return true
      case "IN-TRANSIT":
        return true
      case "OUT-FOR-DELIVERY":
        return true
      case "COMPLETED":
        return true
      default:
        return false
    }
  }
  const getValidCancelBtn = (status) => {
    switch (status) {
      case "PAYMENT_DONE":
        return true
      case "PENDING":
        return true
      default:
        return false
    }
  }
  const _renderNormalOrder = ({ orderList }) => (<>
    {orderList.orders.map((order, i) => (
      order.items && (<>
        <div key={i} className={classes.container}>
          {
            order.orderStatus==='PAYMENT DONE' && (
               <>
               <Button >
                Play Game
               </Button>
               </>
            )
          }
          {/* Refunds */}
          {!refunds && (
            <Grid container spacing={3} >
              <Grid item xs={12} md={10}>
                <div className={classes.dateOfOrder}>
                  <div className={classes.orderText}>
                    <Typography component="h2" variant='h2' color='primary'
                    >
                      Date of order:
                    </Typography>
                    &nbsp;
                    <Typography component="h2" variant='h2' >
                      {order.orderPlacedAt}
                    </Typography>
                  </div>
                  <div className={classes.orderText}>
                    <Typography component="h2" variant='h2' color='primary'
                    >
                      Order Status:
                    </Typography>
                    &nbsp;
                    <Typography component="h2" variant='h2' >
                      {order.orderStatus && order.orderStatus.split("_").join(" ")}
                    </Typography>
                  </div>
                  <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Delivery Date:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >
                        {order.deliveryDetails && moment(order.deliveryDetails.deliveryDate).format('DD/MM/YYYY')}
                      </Typography>
                    </div>

                    <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Delivery Time:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >
                        {order.deliveryDetails && order.deliveryDetails.deliveryTime}
                      </Typography>
                    </div>

                  <div className={classes.orderNumber}>
                    <Typography component="h5" variant='h5'
                    >
                      Order Number: <b>{order.orderPrefix}/{order.orderNumber}</b>
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          )}
          {order.items.map((item, i) => (
            <>
              <ItemCard onClick={() => history.push(`/item/${item.brandId.slug}/${item.slug
                }?brandId=${item.brandId._id}&itemId=${item._id}`)} key={item._id} id={i + 1} cardData={item} />
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            </>
          ))}

          <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {
              //Re-Order Btn
              getValidReOrderBtn(order.orderStatus) && (<Button onClick={() => handleReOrder(orderList)} variant='contained' color='primary' size="small" >
                Re-order
              </Button>)
              // End of Re-Order Btn
            }
            {getValidCancelBtn(order.orderStatus) && (
              <Button
                className={classes.cancelBtn}
                size="small"
                onClick={() => cancelMyOrder(order._id)}
              >
                Cancel Order
              </Button>
            )}

            {(
              <div
                style={{
                  color: '#27B410',
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: 'bold',
                  visibility: refunds ? 'visible' : 'hidden',
                }}
              >
                REFUND PROCESSED
              </div>
            )}

            <div style={{
              marginLeft: 'auto',
            }}>
              <div className={classes.total}>
                <span>GST:&nbsp;</span>
                <span style={{ fontWeight: 'bold' }}>
                  ₹{order.invoice.taxes}
                </span>
              </div>
              <div className={classes.total}>
                <span>Total:&nbsp;</span>
                <span style={{ fontWeight: 'bold' }}>
                  ₹{order.invoice.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>)

    ))}
  </>)
  const _renderDFHOrders = ({ orderList }) => {

    return <>
      {orderList.orders.map((order, i) => (
        order.dfhItems && (<>
          <div key={i} className={classes.container}>
            
            {/* Refunds */}


            {(
              <Grid container spacing={3} >
                <Grid item xs={12} md={10}>
                  <div className={classes.dateOfOrder}>
                    <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Date of order:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >
                        {order.orderPlacedAt}
                      </Typography>
                    </div>
                    <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Order Status:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >
                        {order.orderStatus && order.orderStatus.split("_").join(" ")}
                      </Typography>
                    </div>

                    <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Delivery Date:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >

                        {order.deliveryDetails && moment (order.deliveryDetails.deliveryDate).format('DD/MM/YYYY')}
                      </Typography>
                    </div>

                    <div className={classes.orderText}>
                      <Typography component="h2" variant='h2' color='primary'
                      >
                        Delivery Time:
                      </Typography>
                      &nbsp;
                      <Typography component="h2" variant='h2' >
                        {order.deliveryDetails && order.deliveryDetails.deliveryTime}
                      </Typography>
                    </div>

                    
                    <div className={classes.orderNumber}>
                      <Typography component="h5" variant='h5'
                      >
                       Order Number: <b>{order.orderPrefix}/{order.orderNumber}</b>
                      </Typography>
                    </div>
                  </div>
                </Grid>

                {/* <Grid item  xs={12} md={2}>
                       <Button className={classes.helpBtn}>Help</Button>
                     </Grid> */}
              </Grid>
            )}

            {order.dfhItems.map((item, i) => (
              <>
                <DFHItemCard key={i} id={i + 1} cardData={item} />
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              </>

            ))}

            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {/* {
                //Re-Order Btn
                getValidReOrderBtn(order.orderStatus) && (<Button onClick={() => handleReOrder(orderList)} variant='contained' color='primary' size="small" >
                  Re-order
                </Button>)
                // End of Re-Order Btn
               } */}
              {getValidCancelBtn(order.orderStatus) && (
                <Button
                  className={classes.cancelBtn}
                  size="small"
                  onClick={() => cancelMyOrder(order._id)}
                >
                  Cancel Order
                </Button>
              )}
              <div style={{
                marginLeft: 'auto',
              }} >
                <div className={classes.total}>
                  <span>GST:&nbsp;</span>
                  <span style={{ fontWeight: 'bold' }}>
                    ₹{order.invoice.taxes}
                  </span>
                </div>
                <div className={classes.total}>
                  <span>Total:&nbsp;</span>
                  <span style={{ fontWeight: 'bold' }}>
                    ₹{order.invoice.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>)

      ))}
    </>
  }
  return (
    <>

      {myOrders &&
        Array.isArray(myOrders) &&
        myOrders.map((orderList, i) => (
          (orderList.orders[0].items || orderList.orders[0].dfhItems) && (<Grid
            key={i}
            className={classes.container}
            style={{ borderTop: '3px solid', marginTop: 40 }}
          >
            <Grid className={classes.track}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/t/${orderList.orders[0].orderNumber}`)
                  }
                  className={classes.retryPaymentBtn}
                >
                  Track
                </Button>
            {orderList.canRepay  && (
              <Grid className=''>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    retryPaymentClick({
                      transactionId: orderList.transactionId,
                    })
                  }
                  className={classes.retryPaymentBtn}
                >
                  Retry Payment
                </Button>
              </Grid>

            )
         
          }
                                      </Grid>


{/* {orderList.canRepay=== false && moment(orderList.orders[0].orderPlacedAt).isBetween('2022/10/17', '2022/11/06')&& orderList.orders[0].invoice.grandTotal >=750 && (
              <Grid className={classes.retryPayment}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    playGame({
                      transactionId: orderList.orders[0].orderPrefix,
                      orderNumber:orderList.orders[0].orderNumber,
                      totalPrice:orderList.orders[0].invoice.grandTotal
                    })
                  }
                  className={classes.retryPaymentBtn}
                >
                  Play Game
                </Button>
              </Grid>
            )} */}
           

            {orderList.isDFH ? _renderDFHOrders({ orderList }) : _renderNormalOrder({ orderList })}

          </Grid>)
        ))}





       
      {
        myOrders.length === 0 && (
          <Box>
            <Typography variant="h1" align="center" style={{ marginTop: 20 }}>
              No orders found.
            </Typography>
          </Box>
        )
      }
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  myOrders: selectMyAccountStoreByKey('myOrders'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOrderList,
      cancelMyOrder,
      reOrder,
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
  withRouter,
  memo,
)(MyOrders);
