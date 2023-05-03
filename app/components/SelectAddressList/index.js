import React, { useContext, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { AddressList } from '..';
import CreateAddress from '../CreateAddress';
import { HistoryContext } from 'containers/App/HistoryContext';
import back from '../../images/back.png';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  couponContainer: {
    backgroundColor: '#f5f5f5',
    width: '500px',
  },
  list: {
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  left: {},
  coupon: {
    fontSize: 15,
    border: '1px solid #B69C72',
    height: 26,
    textTransform: 'capitalize',
    color: '#B69C72',
  },
  dialogWrapper: {
    maxWidth: 800,
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const SelectAddressList = props => {
  const {
    updateGlobelStoreByKeyVal,
    setSelectedAddress,
    deliveryInLoc,
    defaultAddress,
    shipping,
    createAddrOnly,
    setIsOpenFromAddrs,
    setIsOpenToAddrs,
    onlyAddrs,
    makeHKey,
    billing,
    mobile,
    selectedBillingAddr,
    ...rest
  } = props;
  const classes = useStyles();
  const [addrState, setAddrState] = useState({
    landmark: '',
    pinId: '',
    addressLineOne: '',
    cityId: '',
    stateId: '',
    name: '',
    addressLineTwo: '',
    isDefault: false,
    mobile: '',
    email: '',
  });
  const [message, setMessage] = useState();
  const [orderNow, setOrderNow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableData, setIsEditableData] = useState();
  // const windowOnLoad =()=>{
  //   if(!window.location.hash) {
  //     window.location = window.location + '#order';
  //     window.location.reload();
  //   }  }
  // const { history } = useContext(HistoryContext);
  // useEffect(()=>{
  //   windowOnLoad();

  // })
  const history = useHistory();
  return (
    <Grid dividers>
      {!onlyAddrs && <>
        <Box display="flex" alignItems="center" mb={4}>
          <img src={back} width="25px" height="20px" style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => history.goBack()} />
          <Typography variant="h1">Set your preferred {shipping ? 'shipping' : 'billing'} address</Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
           
            setIsEditable(false);
            setAddrState({
              landmark: '',
              pinId: '',
              addressLineOne: '',
              cityId: '',
              name: '',
              stateId: '',
              addressLineTwo: '',
              isDefault: false,
              mobile: '',
              email: '',
            });
            setOrderNow(true);
          }}
        >
          ADD NEW ADDRESS 
        </Button>
      </>}

      {createAddrOnly && <CreateAddress
        setIsEditable={setIsEditable}
        addrState={addrState}
        setAddrState={setAddrState}
        message={message}
        setMessage={setMessage}
        setOrderNow={setOrderNow}
        isEditable={isEditable}
        orderNow={orderNow}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        createAddrOnly={createAddrOnly}
        setIsOpenFromAddrs={setIsOpenFromAddrs}
      />}
      {
        orderNow && !createAddrOnly && (
          <CreateAddress
            setIsEditable={setIsEditable}
            addrState={addrState}
            setAddrState={setAddrState}
            message={message}
            setMessage={setMessage}
            setOrderNow={setOrderNow}
            isEditable={isEditable}
            orderNow={orderNow}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />)
      }
      {!orderNow && !createAddrOnly && <AddressList
        isAddressSelection
        updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
        setSelectedAddress={setSelectedAddress}
        deliveryInLoc={deliveryInLoc}
        defaultAddress={defaultAddress}
        shipping={shipping}
        makeHKey={makeHKey}
        billing={billing}
        {...rest}
      />
      }
      {
        // console.log("add", defaultAddress, defaultAddress.cityId.name===deliveryInLoc.name)
      }
      {
         !createAddrOnly && !onlyAddrs &&
        (shipping ?
          <Button disabled={defaultAddress && defaultAddress.isDefault && defaultAddress.cityId.name === deliveryInLoc.name ?false:true}  style={{ marginTop: 20 }} variant="contained" color="primary" onClick={() => history.push('/checkout/summary')} fullWidth>NEXT</Button>
          : 
          null
          // <Button  disabled={selectedBillingAddr?false:true} style={{ marginTop: 20 }} variant="contained" color="primary" onClick={() => history.push('/checkout/summary')} fullWidth>Next</Button>
        )
      }
      {onlyAddrs && !createAddrOnly && <Button style={{ marginTop: 20 }} variant="contained" color="primary" onClick={() => {
        setIsOpenFromAddrs(false);
        setIsOpenToAddrs(false);
      }} fullWidth>Done</Button>}
    </Grid >
  );
};

export default SelectAddressList;
