import React, { useState } from 'react';
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
import ccAvenue from '../../../images/ccavenue.png';
import hdfc from '../../../images/hdfc.png';
import payumoney from '../../../images/payumoney.png';
import back from '../../../images/back.png';


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

const SelectPaymentOptions = ({
    location,
    history
}) => {

    const orderData = location.state ? location.state.orderData : null
    const classes = useStyles();
    const [paymentSelected, setpaymentSelected] = useState(null);

    const handlePaymentSelection = e => {
        if (e.target.checked) {
            setpaymentSelected(e.target.name);
        } else {
            setpaymentSelected(null);
        }
    };
    const handleContinue = () => {
        console.table(paymentSelected)
        console.table(orderData)
        const data = {
            orderCode: orderData.orderCode,
            type: orderData.type,
            payMode: paymentSelected,
            token:orderData.token
        }

        history.push({
            pathname: '/payment-gateway',
            state: {
                data
            }
        })
    }

    return (
        <div className={classes.appWrapper}>
            <Box display="flex" alignItems="center" mb={4}>
                <img
                    src={back}
                    width="25px"
                    height="20px"
                    alt="Back"
                    style={{ marginRight: 10, cursor: 'pointer' }}
                    onClick={() => history.goBack()}
                />
                <Typography variant="h1">Select a Payment Method</Typography>
            </Box>
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
            </Box>
            <Grid item xs={12} className={classes.paymentProced}>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.paymentBtn}
                        disabled={!paymentSelected}
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                    <Typography variant="subtitle1" className={classes.disclaimer}>
                        You will be taken to a 3rd part website.
                    </Typography>
                </div>
            </Grid>

        </div>
    );
};

export default SelectPaymentOptions;
