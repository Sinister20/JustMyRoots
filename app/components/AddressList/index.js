import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { makeStyles, Button, useTheme, useMediaQuery, Box, Typography } from '@material-ui/core';
import { Person,Home,AlternateEmail,PhoneIphone } from '@material-ui/icons';
import { getAddress } from '../../containers/MyAccount/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { selectMyAccountStoreByKey } from '../../containers/MyAccount/selectors';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: 30,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid rgba(141, 141, 141, 0.5)',
    borderRadius: 4,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 180,
  },
  cardBtn: {
    textTransform: 'capitalize',
    height: 33,
    minWidth: 150,
    margin: '0 10px',
    
  },
  personName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  personAdd: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 400,
    color: '#717171',
    '& span': {
      marginLeft: 5,
    }
  },
  selectedDiv: {
    backgroundColor: '#17b31b',
    color: '#ffffff',
    display: 'inline-block',
    padding: '5px 0',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    minWidth: 150,
  },
}));

const AddressList = props => {
  const classes = useStyles();

  const [myAddress, setAddress] = useState();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const {
    defaultAddress,
    addressDeleted,
    isAddressSelection,
    getAddress,
    onEditAddress,
    removeAddress,
    setSelectedAddress,
    deliveryInLoc,
    updateGlobelStoreByKeyVal,
    shipping,
    selectedBillingAddr = {},
    mkHFAddr = {},
    makeHKey,
    billing,
    maaKedeliveryFood = {},
    checkoutPage=false,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {

    new Promise((resolve, reject) => {
      setLoadingAdd(true);
      getAddress({ resolve, reject });
    }).then(data => {
  
      setLoadingAdd(false);
      setAddress(data);
    }).catch(err => {  
      setLoadingAdd(false);
    });
    setLoadingAdd(false);
    return () => {
      setLoadingAdd(false);
    };
  }, [addressDeleted,deliveryInLoc]);

  return (
    <Box mt={4} className={classes.cardContainer}>
      {
        loadingAdd && <div className={classes.card}>
          <div>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          </div>
          <div >
            <Skeleton animation="wave" height={50} width={100} />
            
          </div>
          
        </div>
      }
     
      {  !loadingAdd && myAddress && myAddress.items &&
        myAddress.items.length > 0
        ? 
         myAddress.items.filter((item) =>checkoutPage && deliveryInLoc && !billing ? item.cityId && item.cityId._id ===  deliveryInLoc._id:item
        ).map((a,index) => {
          
          const {
            landmark,
            pinId,
            addressLineOne,
            cityId,
            name,
            _id,
            addressLineTwo,
            email,
            phoneNumber
          } = a;
          return (
            <div key ={index} className={classes.card}>
              <div>
                <div className={classes.personName}>
                  <Person fontSize='small' style={{marginRight:5}} color="primary" />
                  {name && `${name}`}
                </div>
                <div className={classes.personAdd}>
                  <Home fontSize='small' style={{ marginRight: 5 }} color="primary" />
                  <div>{`${addressLineOne} ${addressLineTwo} ${landmark}, ${cityId && cityId.name} - ${pinId && pinId.pin}.`}</div>
                  
                </div>
               { email ? <div className={classes.personAdd}>
                  <AlternateEmail fontSize='small' style={{ marginRight: 5 }} color="primary" />
                  {/* emailnotmapped@gmail.com */}
                  {email && `${email}.`}
                </div>
              : ''}
               { phoneNumber ? <div className={classes.personAdd}>
                  <PhoneIphone fontSize='small' style={{ marginRight: 5 }} color="primary" />
                  {phoneNumber && `+${phoneNumber}.`}
                </div>
              : ''}
              </div>
              <Box mt={2}>
                {!isAddressSelection && (
                  <div style={{display:"flex", alignItems:"center"}}>
                    <Button
                      className={classes.cardBtn}
                      variant="outlined"
                      onClick={() => onEditAddress(a)}
                      color="primary"
                      size='small'
                      
                    >
                      Edit
                    </Button>
                    <Button
                      className={classes.cardBtn}
                      variant="outlined"
                      onClick={() => removeAddress(_id)}
                      color="error"
                      size='small'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                {isAddressSelection && (
                  ( deliveryInLoc &&  deliveryInLoc._id === cityId._id && defaultAddress && shipping &&  defaultAddress._id === _id)
                    || (selectedBillingAddr && billing && !makeHKey && selectedBillingAddr._id === _id) ||
                    (maaKedeliveryFood.mkHFAddr && makeHKey && maaKedeliveryFood.mkHFAddr._id === _id  )   
                    
                    ?
                     <div  className={classes.selectedDiv}>Selected</div> :
                    <Button
                    className={classes.cardBtn}
                    disabled={shipping ?
                      deliveryInLoc && defaultAddress && _id && defaultAddress._id === _id || deliveryInLoc._id !== cityId._id : false
                    }
                    style={{ cursor: shipping && (defaultAddress && _id && defaultAddress._id === _id ||(deliveryInLoc && deliveryInLoc._id )!== cityId._id) ? 'not-allowed' : 'pointer' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      // if (shipping && !(
                      //   defaultAddress && _id && defaultAddress._id === _id
                      // )) {
                      if(shipping && !(
                        defaultAddress && _id && defaultAddress._id === _id
                      ))  
                      {
                        updateGlobelStoreByKeyVal({ key: 'selectedShiping', value: {...a ,isDefault:true} })
                        setSelectedAddress(a);
                      }
                      else if (billing) {
                        updateGlobelStoreByKeyVal({ key: 'selectedBillingAddr', value: {...a, isDefault:true} });
                      } else {
                        updateGlobelStoreByKeyVal({ key: 'maaKedeliveryFood', value: { ...maaKedeliveryFood, [makeHKey]: a } });
                      }
                    }}
                  >
                    select
                  </Button>
                )}
              </Box>
            </div>
          );
        })
        : <Typography component={"h2"} style={{textAlign:"center"}}>
            No address found
        </Typography>}
    </Box >
  );
};

const mapStateToProps = createStructuredSelector({
  myAddress: selectMyAccountStoreByKey('myAddress'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
  selectedBillingAddr: selectGlobelStoreByKey('selectedBillingAddr'),
  maaKedeliveryFood: selectGlobelStoreByKey('maaKedeliveryFood'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAddress,
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
  memo,
)(AddressList);
