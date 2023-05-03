import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles(theme => ({}));
const ModalDialog = ({
  handleClose,
  open,
  citiesList,
  fetchPincodeByCity,
  deliveryInPincode,
  maaKedeliveryFood,
  updateGlobelStoreByKeyVal,
  handleValidateCityAndPin,
  deliveryInLoc,
}) => {
  const pinCodes =
    deliveryInPincode && deliveryInPincode.items.length > 0
      ? deliveryInPincode.items.map(item => item.pin)
      : [];
  const [error, setError] = React.useState({});
  const [deliveryPinCode, setDeliveryPinCode] = React.useState([]);
  const [pickupPinCode, setPickupPinCode] = React.useState([]);
  const [deliveryState, setDeliveryState] = React.useState(true);
  const [state, setState] = React.useState({
    deliveryCity: null,
    pickupCity: null,
    deliveryPin: null,
    pickupPin: null,
  });

  React.useEffect(() => {
    if (deliveryInLoc) {
      fetchPincodeByCity(deliveryInLoc);
      setState({
        ...state,
        deliveryCity: deliveryInLoc && deliveryInLoc._id,
      });
    }

    setDeliveryState(true);
    setDeliveryPinCode([]);
    setPickupPinCode([]);
  }, [deliveryInLoc]);
  React.useEffect(() => {
    const pinCodes =
      deliveryInPincode && deliveryInPincode.items.length > 0
        ? deliveryInPincode.items.map(item => item.pin)
        : [];
    if (deliveryState) {
      setDeliveryPinCode(pinCodes);
    } else {
      setPickupPinCode(pinCodes);
    }
  }, [deliveryState, deliveryInPincode]);
  const handleChange = e => {
    setError({
      ...error,
      [e.target.name]: null,
    });
    if (e.target.name === 'deliveryCity') {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        deliveryPin: null,
      });
    } else if (e.target.name === 'pickupCity') {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        pickupPin: null,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = () => {
    const fliedValues = {
      deliveryCity: state.deliveryCity,
      pickupCity: state.pickupCity,
    };
    const isValid = Object.entries(state).every(([key, value]) => {
      if (value === '' || value === null) {
        setError({
          ...error,
          [key]: 'This field is required',
        });
        return false;
      }
      return true;
    });
    if (isValid) {
      handleValidateCityAndPin(state);
    }
  };
  const handleModalClose = () => {
    setState({
      pickupCity: null,
      deliveryPin: null,
      pickupPin: null,
    });
    setPickupPinCode([]);
    handleClose();
  };

  window.localStorage.setItem('pickupCity', JSON.stringify(state.pickupCity));
  // window.localStorage.removeItem('pickUpCity');
 // console.log("pickcity modal ",JSON.stringify(state.pickupCity));
  return (
    <Dialog open={open} onClose={handleModalClose}>
      <DialogTitle>
        <Typography variant="h2">Please Enter Your Preference</Typography>
      </DialogTitle>
      {/* {console.log('deliveryInLoc', deliveryInLoc)} */}
      <DialogContent
        style={{
          padding: '22px',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            overflow: 'hidden',
          }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="Delivery City"
              variant="outlined"
              fullWidth
              disabled
              value={deliveryInLoc ? deliveryInLoc.name : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              options={citiesList || []}
              getOptionLabel={option => option.name || ''}
              // value={maaKedeliveryFood.maaKePickupFoodCity}
              onChange={(e, val) => {
                fetchPincodeByCity(val);
                setDeliveryState(false);
                handleChange({
                  target: {
                    name: 'pickupCity',
                    value: val._id,
                  },
                });
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Pickup City"
                  variant="outlined"
                  fullWidth
                  error={error.pickupCity}
                  helperText={error.pickupCity}
                />
              )}
            />
          </Grid>
          {
            // console.log(state)
          }
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              // value={maaKedeliveryFood.maaKedeliveryFoodPin || null}
              onChange={(e, val) => {
                handleChange({
                  target: {
                    name: 'deliveryPin',
                    value: val,
                  },
                });
              }}
              options={deliveryPinCode || []}
              // inputValue={state.deliveryPin ? state.deliveryPin : ''}
              getOptionLabel={option => option ||''}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Delivery Pincode"
                  variant="outlined"
                  placeholder="122002"
                  fullWidth
                  error={error.deliveryPin}
                  helperText={error.deliveryPin}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              // value={maaKedeliveryFood.maaKePickupFoodPin || null}
              onChange={(e, val) => {
                handleChange({
                  target: {
                    name: 'pickupPin',
                    value: val,
                  },
                });
              }}
              // inputValue={state.pickupPin ? state.pickupPin : ''}
              options={pickupPinCode || []}
              getOptionLabel={option => option}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Pickup Pincode"
                  variant="outlined"
                  placeholder="122002"
                  fullWidth
                  error={error.pickupPin}
                  helperText={error.pickupPin}
                  errorStyle={{
                    fontSize: `${10}px`,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        style={{
          padding: '22px',
        }}
      >
        <Button
          autoFocus
          onClick={() => {
            handleModalClose();
          }}
          variant="outlined"
        >
          CANCEL
        </Button>
        <Button
          // disabled={!(maaKedeliveryFood.maaKedeliveryFoodPin && maaKedeliveryFood.maaKedeliveryFoodType && maaKedeliveryFood.maaKedeliveryFoodCity)}
          onClick={handleSubmit}
          color="primary"
          autoFocus
          variant="contained"
        >
          PROCEED
        </Button>
      </DialogActions>

      <Box my={2} textAlign="center" fontWeight="bold">
        <Typography variant="body1">
          Can't find your city or Pincode?
        </Typography>
        <Typography variant="body1">
          Please contact us on +91-7777027222
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ModalDialog;
