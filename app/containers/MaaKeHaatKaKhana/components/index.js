import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Container,
  Snackbar,
  Box,
} from '@material-ui/core';

import { HistoryContext } from 'containers/App/HistoryContext';
import { selectStoreByKey } from 'containers/HomePage/selectors';
import { fetchPincodeByCity, addItemToCart } from 'containers/HomePage/actions';
import { selectCartStoreByKey } from 'containers/CartContainer/selectors';
import { selectGlobelStoreByKey } from 'containers/App/selectors';

import { updateGlobelStoreByKeyVal } from 'containers/App/actions';
import { Alert } from '@material-ui/lab';
import CommonHeading from '../../HomePage/Components/CommonHeading';
import Group504 from '../../../images/Group504.jpg';
import PickupAndDeliveryAddress from './PickupAndDeliveryAddress';
import MaaKeHath from './MaaKeHath';
import ModalDialog from './ModalDialog';
import { getValidateDFHCity } from '../actions';
import { selectMaaKeHathKaKhanaStoreByKey } from '../selectors';
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto 50px',
      padding: '0 20px',
    },
  },
  md: {
    '& .MuiDialog-paper': {
      minWidth: 650,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: '90%',
        maxWidth: '100%',
      },
    },
    '& label': {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  maaKeHathKaKhanaContnr: {
    width: '100%',
    position: 'relative',
    '& img': {
      [theme.breakpoints.down('sm')]: {
        height: 194,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
  },
  contentContr: {
    textAlign: 'center',
    color: '#7D7B7B',
  },
  cardBtn: {
    fontSize: 20,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#AC1715',
    display: 'block',
    margin: '30px auto 0',
    minWidth: '353',
    minHeight: 45,
    border: '2px solid #848383',
    borderRadius: 45,
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      minHeight: 30,
      padding: '5px 10px',
    },
  },
  caption: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#737373',
  },
  contentTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginTop: 30,
    },
  },
  deliverydetails: {
    display: 'flex',
    justifyContent: 'space-around',
    '& label': {
      paddingRight: '60px',
      [theme.breakpoints.down('sm')]: {
        paddingRight: '1px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '10px',
    },
  },
  pickupdetails: {
    display: 'flex',
    justifyContent: 'space-around',
    '& label': {
      paddingRight: '60px',
      [theme.breakpoints.down('sm')]: {
        paddingRight: '1px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '10px',
    },
  },
  orderNow: {
    width: '100%',
    textAlign: 'center',
    margin: '50px auto',
    padding: '0 100px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 30px',
    },
  },
  btn: {
    textTransform: 'capitalize',
    color: '#B69C72',
    fontSize: 25,
    height: 45,
    width: 400,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: 183,
    },
  },
  addressContainer: {
    width: '100%',
    textAlign: 'center',
  },
}));

const MaaKeHaatKaKhana = ({
  citiesList,
  fetchPincodeByCity,
  deliveryInPincode,
  maaKedeliveryFood = {},
  updateGlobelStoreByKeyVal,
  getValidateDFHCity,
  errorMsg,
  deliveryInLoc
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { history } = useContext(HistoryContext);
  const [errorCityMsg, setErrorCityMsg] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    updateGlobelStoreByKeyVal({
      key: 'maaKedeliveryFood',
      value: {},
    });
  };
  const handleValidateCityAndPin = data => {

    new Promise((resolve, reject) => {
      getValidateDFHCity({ resolve, reject, data });
    }).then(async res => {
      if (res.data.success) {

        window.localStorage.setItem(
          'validateDFHCity',
          JSON.stringify(res.data.data),
        );
        await window.localStorage.setItem("pickupCity", JSON.stringify(data.pickupCity))
        history.push('/maa-ke-haat-ka-khana/notes');
      } else {
        setErrorCityMsg('Delivery is not available in your city');
        if (window.localStorage.getItem('validateDFHCity')) {
          window.localStorage.removeItem('validateDFHCity');
        }
      }
    });
    handleClose();
  };

  return (
    <Container fixed>
      <CommonHeading heading="Maa ke haath ka Khaana (DFH)" viewmore />
      <Grid item className={classes.maaKeHathKaKhanaContnr}>
        <img src={Group504} width="100%" alt="Maa Ke hath Ka Khana" />
        <MaaKeHath classes={classes} handleClickOpen={handleClickOpen} />
        <ModalDialog
          open={open}
          handleClose={handleClose}
          citiesList={citiesList}
          fetchPincodeByCity={fetchPincodeByCity}
          deliveryInPincode={deliveryInPincode}
          maaKedeliveryFood={maaKedeliveryFood}
          updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
          handleValidateCityAndPin={handleValidateCityAndPin}
          deliveryInLoc={deliveryInLoc}
        />
        <div />
        {
          <Snackbar
            transitionDuration={500}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={errorCityMsg}
            autoHideDuration={4000}
            onClose={() => setErrorCityMsg('')}
          >
            <Alert severity="error">{errorCityMsg}</Alert>
          </Snackbar>
        }
      </Grid>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectStoreByKey('cities'),
  deliveryInPincode: selectGlobelStoreByKey('deliveryInPincode'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
  errorMsg: selectGlobelStoreByKey('validateDFHCityError'),

  // remove
  cartData: selectStoreByKey('cartData'),
  couponData: selectCartStoreByKey('couponData'),
  defaultAddress: selectCartStoreByKey('getDefaultAddress'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  selectedNewDate: selectGlobelStoreByKey('selectedNewDate'),
  selectedNewFlag: selectGlobelStoreByKey('selectedNewFlag'),
  selectedNewFlagTime: selectGlobelStoreByKey('selectedNewFlagTime'),
  authData: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemToCart,
      updateGlobelStoreByKeyVal,
      fetchPincodeByCity,
      getValidateDFHCity,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MaaKeHaatKaKhana);

// //

// export default MaaKeHaatKaKhana;
// const cityList = [
//   { title: 'Mumbai' },
//   { title: 'Pune' },
//   { title: 'Bangalore' },
//   { title: 'Kolkata' },
// ]
// const pincodeList = [
//   { title: '400601' },
//   { title: '456987' },
//   { title: '320156' },
//   { title: '526314' },
// ]
const foodType = [{ name: 'Veg' }, { name: 'Non Veg' }];
