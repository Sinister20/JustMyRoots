import React, { useState,useContext } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import ccAvenue from '../../../images/ccavenue.png';
import razorpay from '../../../images/Razorpay.png';
import hdfc from '../../../images/hdfc.png';
import back from '../../../images/back.png';
import { selectGlobelStoreByKey } from 'containers/App/selectors';

const useStyles = makeStyles(theme => ({
    appWrapper: {
      maxWidth: 1144,
      margin: '0 auto',
      width: '100%',
      overflow: 'hidden',
      padding: '20px 40px 40px',
      [theme.breakpoints.down('sm')]: {
        margin: '50px auto 20px',
        padding: '0 20px',
      },
    },
    linkCard: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #CCCCCC',
      padding: '10px',
      borderRadius: 5,
      '& img': {
        marginLeft: 20,
      },
    },
    paymentProced: {
      padding: 60,
      display: 'flex',
      justifyContent: 'center',
    },
    paymentBtn: {
      padding: '10px 60px',
      color: '#fff',
      fontSize: 20,
      fontWeight: 700,
    },
    disclaimer: {
      color: '#737373',
      fontSize: 14,
      fontWeight: 300,
      marginTop: 10,
      textAlign: 'center',
    },
  }));

const PaymentMethods = (props) => {
    const classes = useStyles();
    const { DFHCart = null } = props;
    const { history } = useContext(HistoryContext);
    const [paymentSelected, setpaymentSelected] = useState(null);
    const [selectAddress, setSelectAddress] = useState(false);
    const handlePaymentSelection = (e) => {
        if (e.target.checked) {
            setpaymentSelected(e.target.name);
          } else {
            setpaymentSelected(null);
          }

    }
    React.useEffect(() => {
        if (DFHCart === null) {
            history.push('/maa-ke-haat-ka-khana/order');
        }
        //console.log('defaultAddress', DFHCart);
    },[DFHCart])
    return <div className={classes.appWrapper}>
        <Box
            display="grid"
            gridTemplateColumns="1fr"
            gridGap="40px"
            mt={4}
            width="75%"
        >
            <div className={classes.linkCard}>
                <Checkbox
                    checked={paymentSelected === 'payu'}
                    name="payu"
                    onChange={handlePaymentSelection}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color="primary"
                />
                <img src={hdfc} width="180px" height="30" />
            </div>
            <div className={classes.linkCard}>
                <Checkbox
                    checked={paymentSelected === 'ccav'}
                    name="ccav"
                    onChange={handlePaymentSelection}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color="primary"
                />
                <img src={ccAvenue} width="180px" height="30" />
            </div>

            <div className={classes.linkCard}>
          <Checkbox
            checked={paymentSelected === 'razor'}
            name="razor"
            onChange={handlePaymentSelection}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            color="primary"
          />
          {/* <div>
            Razorpay
          </div> */}

          <img src={razorpay} width="180px" height="30" />
        </div>
        </Box>
        <Grid item xs={12} className={classes.paymentProced}>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.paymentBtn}
                    disabled ={DFHCart === null || paymentSelected === null}
                    onClick={() => {
                        history.push(`/maa-ke-haat-ka-khana/payment-options/${paymentSelected}`);
                    }}
                >
                    Continue
                </Button>
                <Typography variant="subtitle1" className={classes.disclaimer}>
                    You will be taken to a 3rd part website.
                </Typography>
            </div>
        </Grid>
       
    </div>
}
const mapStateToProps = createStructuredSelector({
    DFHCart:selectGlobelStoreByKey('DFHCart'),
    
  });
  
  export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
          
      },
      dispatch,
    );
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(withConnect)(PaymentMethods);