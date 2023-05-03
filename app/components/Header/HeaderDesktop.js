import {
  Box,
  Grid,
  Switch,
  Radio,
  FormControlLabel,
  Menu,
  MenuItem,
  withStyles,
  Badge,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import {
  fetchCart,
  setSeliveryLocation,
  fetchCities,
  getUserDetails,
} from '../../containers/HomePage/actions';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';
import SearchPage from '../../containers/SearchPage';
import { searchByKey, fetchResults,
  updateSearchStoreByKeyVal, } from '../../containers/SearchPage/actions';

import jrmLogo from '../../images/956x538-logo.png';
import christmas from '../../images/desktop.png'
import jrmMobile from '../../images/Mobile.png';
import location from '../../images/location-icon.png';
import {
  getFromLocalStorage,
  setToLocalStorage,
  deleteKeyFromLocalStorage,
} from '../../utils/localStorageUtils';
import { selectStoreByKey } from '../../containers/HomePage/selectors';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import search from '../../images/search-icon.png';
import offers from '../../images/offer-icon.png';
import cart from '../../images/cart-icon.png';
import account from '../../images/profile-icon.png';
import menu from '../../images/menu.png';
import menuProfile from '../../images/menuProfile.png';
import menuHelp from '../../images/menuHelp.png';
import Track from '../../images/track-order.png';
import deleteUser from '../../images/deleteUser.svg';
import menuOffer from '../../images/menuOffers.png';
import menuOrder from '../../images/menuOrder.png';
import menuAddress from '../../images/menuAddress.png';
import menuWishlist from '../../images/menuWishlist.png';
import menuPolicies from '../../images/menuPolicies.png';
import menuLoyalty from '../../images/menuLoyalty.png';
import Globe from '../../images/globe.png';
import DeletePopup from './DeletePopup';
import axios from 'axios';
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../config/environmentConfig';
import { HeroRestaurant } from '../../containers/SearchPage/Components';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

`;

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1250,
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    background: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    width: ' 100%',
    margin: '0 auto',
    height: 155,
    [theme.breakpoints.down('xs')]: {
      padding: '5px 10px 5px 0',
      height: 140,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 10px 5px 0',
      height: 140,
    },
    '& .logo': {
      width: '200px',
      height:'40px',
      position:'relative',
      
      [theme.breakpoints.down('sm')]: {
        width: '140px',
        height:'60px',
       
      },
      [theme.breakpoints.down('xs')]: {
        width: '60px',
        height:'50px',

      },
      
    },
    '& .logo img': {
      width: '100%',
      // position:'absolute',
      height:'40px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 8,
        height:28,
        marginTop:20,
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginLeft: 8,
        height:12,
        marginTop:20,
      },
     
      
    },
    '& .web-logo': {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    '& .mobile-logo': {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
  },
  userName: {
    color: '#ac1715',
    textDecoration: 'underline',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: 80,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  headerMobile: {
    display: 'none',
  },
  locationWeb: {
    display: 'flex',
    fontSize: '14px',
    lineHeight: '1.2',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      width: '280px',
      marginLeft: '0',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
      width: '125px',
      marginLeft: '0',
    },
    '& img': {
      width: '20px',
      height: '29px',
      margin: '3px 6px 0 0',
      [theme.breakpoints.down('sm')]: {
        width: '16px',
        height: '22px',
        margin: '3px 6px 0 4px',

      },
    },
    '& select': {
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#ac1715',
      background: '#fff',
      textDecoration: 'underline',
      textTransform: 'capitalize',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      webkitAppearance: 'none',
      mozAppearance: 'none',
      paddingLeft: '4px',
      width: '150px',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0',
        width: '100px',
      },
    },
    '& select option': {
      color: '#434343',
      padding: '10px 4px',
    },
    '& select option:focus': {
      outline: 'none',
    },
  },
  headerContainer: {
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      paddingRight: '8px',
    },
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& img': {
      height: 47,
      width: 72,
    },
  },
  headerLinks: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& .MuiBox-root': {
      cursor: 'pointer',
    },
    '& .MuiBox-root:not(:last-child)': {
      marginRight: 16,
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
      },
    },
    '& img': {
      height: 24,
      width: 24,
      [theme.breakpoints.down('sm')]: {
        height: 20,
        width: 20,
      },
    },
    '& span': {
      fontSize: 14,
      marginTop: 2,
      [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  rightMenu: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: 16,
    },
    '& img': {
      width: '18px',
      height: '18px',
      margin: '0 8px 0 0',
      [theme.breakpoints.down('sm')]: {
        width: '15px',
        height: '15px',
      },
    },
    '& span': {
      [theme.breakpoints.down('sm')]: {
        maxWidth: 80,
        textAlign: 'left',
        width: 80,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    '& a': {
      color: '#ac1715',
      textDecoration: 'none',
      fontWeight: 'bold',
      '& a:hover': {
        color: '#000',
        fontWeight: 'bold',
      },

    },
  },
  cartIcon: {
    marginTop: 0,
    '& .MuiBadge-badge': {
      minWidth:'28px',
      [theme.breakpoints.down('sm')]: {
        height: 16,
        minWidth: 16,
        padding: '0 2px',
      },
    },
  },
  truncateUser: {
    maxWidth: '96px',
    textAlign: 'left',
    width: '100px',
    overflow: 'hidden',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  selectBox: {
    outline: 'none',
    padding: '5px 10px',
    border: 0,
    fontSize: 18,
    color: '#999999',
    fontWeight: 400,
    cursor: 'pointer',
    background: '#FFFFFF',
    boxShadow: '0px 1px 4px rgba(70, 70, 70, 0.25)',
    borderRadius: 18,
    height: 43,
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      height: 25,
      minWidth: 80,
      fontSize: 10,
      marginLeft: 10,
    },
  },
  formControlLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
  },
  toggleButton: {
    marginLeft: 'auto',
    marginRight: 30,
    width: 'unset',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      marginRight: 0,
      fontSize: 12,
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      width: 104,
      marginRight: 0,
      fontSize: 8,
      marginLeft: 0,
      display: 'none',
    },
    '& .MuiSwitch-track': {
      background:'#ac1715 ',
      opacity: '1',
    },
  },
  toggleButtonMobile: {
    marginLeft: 'auto',
    marginRight: 40,
    width: 110,
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      width: 120,
      marginRight: 0,
      fontSize: 10,
      top: 0,
      marginLeft: -20,
      display: 'flex',
      position: 'absolute',
    },
    '& span': {
      fontSize: 12,
      marginTop: 0,
    },
  },
  orderTrack:{
    '& img': {
      width: '28px',
      height: '28px',
      [theme.breakpoints.down('sm')]: {
        width: '15px',
        height: '15px',
      },
    },
  },
  menu: {
    minWidth: 310,
    '& img': {
      marginRight: 10,
    },
  },
  selectedMenu: {
    background: 'none !important',
    color: '#AC1715',
    fontWeight: 900,
  },
}));
const HeaderDesktop = props => {
  const classes = useStyles();
  const {
    updateGlobelStoreByKeyVal,
    trigger,
    history,
    setOpen,
    authData,
    cartData,
    fetchCart,
    setSeliveryLocation,
    deliveryInLoc = {},
    fetchCities,
    searchByKey,
    fetchResults,
    searchResult,
    addItemToCart,
    updateSearchStoreByKeyVal,
    citiesList = [],
  } = props;

 
  const [selectedSearchKey, setSelectedSearchKey] = useState();
  const [filters, setFilters] = useState({
    type: '',
    cost: [0, 7000],
    offerDiscount: '',
    sortBy: '',
  });

  const fetchResultsMasterCall = () => {
    fetchResults({
      keyword: selectedSearchKey,
      // filter: filters.type,
      // sort: filters.sortBy,
      // offer: filters.offerDiscount,
      // cost: filters.cost,
    });
  };
  useEffect(() => {
    if (selectedSearchKey) fetchResultsMasterCall();
  }, [selectedSearchKey, filters, deliveryInLoc]);

  const [refresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDelete , setShowDelete] = useState(false);
  const currentUrl = apiUrlPrefixes[currentEnvironment];
  const cartCount = getFromLocalStorage('cartCount')
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = React.useState({
    veg: true,
    nonveg: false,
  });

  const PurpleSwitch = withStyles(theme => ({
    switchBase: {
      '&$checked': {
        color: 'green',
        '& + $track': {
          backgroundColor: 'green',
        },
      },
    },
    checked: {},
    track: {},  
  }))(Switch);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    window.localStorage.setItem('veg', JSON.stringify(event.target.checked));
  };
  useEffect(() => {
    if (window.localStorage.getItem('veg')) {
      setState({ ...state, veg: JSON.parse(window.localStorage.getItem('veg')) });
    }
  }, [])
  useEffect(() => {
    let val;
    if (!state.nonveg && state.veg) {
      val = ['veg'];
    } else {
      val = ['nonveg', 'veg'];
    }
    updateGlobelStoreByKeyVal({
      key: 'foodType',
      value: val,
    });
  }, [state]);

  useEffect(() => {
    fetchCities();
    const selectedLocation = getFromLocalStorage('selectedLocation');
    if (selectedLocation) {
      updateGlobelStoreByKeyVal({
        key: 'deliveryInLoc',
        value: selectedLocation,
      });
    }
  }, []);

  useEffect(() => {
    if (deliveryInLoc && Object.keys(deliveryInLoc).length) {
      fetchCart();
    }
  }, [deliveryInLoc]);

   const onDelete =()=>{
   axios.post(`${currentUrl}/api/user/delete`,{},
   {
    headers:{
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('lscache-HKTWQ')).replaceAll('"', '')}`
    }
   })
   .then((res)=>{
    setShowDelete(false); 
   
   })
   updateGlobelStoreByKeyVal({
    key: 'userDetails',
    value: null,
  });
  deleteKeyFromLocalStorage('selectedLocation');
  setToLocalStorage('HKTWQ',{})
  // setToLocalStorage('voucherCode', {});
  // setToLocalStorage('voucherExpiry', {});
  // setToLocalStorage('voucherAmount', {});
  deleteKeyFromLocalStorage('sessionId');
  setRefresh(!refresh);
  window.location.reload();
   }

  const getCount = cartInfo =>
    Object.entries(cartInfo).reduce(
      (acc, [, brandCart]) =>
        acc +
        brandCart.cartInfo.items.length +
        brandCart.cartInfo.notDeliverItems.length,
      0,
    );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeNav, setActiveNav] = useState();
  const navLinks = [
    { text: 'My Profile', icon: menuProfile },
    { text: 'Help', icon: menuHelp },
    { text: 'My Favourite', icon: menuWishlist },
    { text: 'Loyalty Points', icon: menuLoyalty },
    { text: 'Policies', icon: menuPolicies },
  ];
  return (
    <header className={classes.header}>
      <div className={classes.appWrapper}>
        {showDelete && (
          <DeletePopup 
          onClose ={()=> setShowDelete(false)}
          message={'Are you sure you want to delete your account ?'}
          onYes ={onDelete}
          />
        )}
        <Grid container className={classes.headerContainer}>
          <div className="logo">
            <Link to="/">
              <img src={christmas} className="web-logo" alt="Just My Roots" />
              <img
                src={jrmMobile}
                className="mobile-logo"
                alt="Just My Roots"
              />
            </Link>
          </div>

              { !window.location.href.includes('/summary') ?
                        <Grid item>
                        <div className={classes.locationWeb}>
                          <img src={location} alt="Just My Roots" />
                          <div className="content">
                           
              <> 
              <b>  
                Select<br/>
                  Delivery Location
                  <select
                    value={JSON.stringify(deliveryInLoc)}
                    className="select-location-dropdown"
                    onChange={e => {
                      setSeliveryLocation(JSON.parse(e.target.value));
                      updateGlobelStoreByKeyVal({
                        key: 'deliveryInLoc',
                        value: JSON.parse(e.target.value),
                      });
                    }}
                  >
                    {citiesList.map(loc => (
                      <option value={JSON.stringify(loc)}>{loc.name}</option>
                    ))}
                  </select>
              </b>
                </>
                </div>
            </div>
          </Grid> : ""
}
          <Grid
            // item
            container
            alignItems="center"
            className={classes.toggleButton}
          >
            <Typography variant="h4" component="h4">
              Non-Veg
            </Typography>
            <Grid item className="ps-control">
              <FormControlLabel
                classes={{ root: classes.formControlLabel }}
                control={
                  <PurpleSwitch
                    checked={state.veg}
                    onChange={handleChange}
                    name="veg"
                  />
                }
              />
            </Grid>
            <Typography variant="h4" component="h4">
              Veg
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" className={classes.headerLinks}>
              <Hidden smDown>
              <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="inherit"
                  justifyContent="flex-end"
                  className={classes.rightMenu}
                >
                   <a href="https://international.justmyroots.com/" target="_blank">
                  <img src={Globe} alt="International" />
                  <span>International</span>
                  </a>
                </Box>
                {/* <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="inherit"
                  justifyContent="flex-end"
                  onClick={() => history.push('/search')}
                  className={classes.rightMenu}
                >
                  <img src={search} alt="Search" />
                  <span>Search</span>
                </Box> */}
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="inherit"
                  justifyContent="flex-end"
                  onClick={() => history.push('/offers')}
                  className={classes.rightMenu}
                >
                  <img src={offers} alt="Offers" />
                  <span>Offers</span>
                </Box>
                
              </Hidden>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.toggleButtonMobile}
              >
                <Grid item className="nonveg-text">
                  Non-Veg
                </Grid>
                <Grid item className="ps-control">
                  <FormControlLabel
                    classes={{ root: classes.formControlLabel }}
                    control={
                      <PurpleSwitch
                        checked={state.veg}
                        onChange={handleChange}
                        name="veg"
                      />
                    }
                  />
                </Grid>
                <Grid item className="veg-text">
                  Veg
                </Grid>
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="inherit"
                justifyContent="flex-end"
                className={classes.rightMenu}
                onClick={
                  !authData
                    ? () =>
                      updateGlobelStoreByKeyVal({
                        key: 'isLoginOpen',
                        value: true,
                      })
                    : handleClick
                }
              >
                <img src={account} alt="Account" />
                <span
                  className={classes.truncateUser}
                  style={{ maxWidth: isMobile ? 80 : 100, textAlign: 'left' }}
                >
                  Hello,&nbsp;
                  <span className={classes.userName} title={authData
                    ? authData.phoneNumber
                      ? authData.firstName
                      : ''
                    : 'Guest'}>
                    {authData
                      ? authData.phoneNumber
                        ? authData.firstName
                        : ''
                      : 'Guest'}
                  </span>
                  {/* {authData
                    ? authData.phoneNumber
                      ? authData.firstName + ' (' + authData.phoneNumber + ')'
                      : ''
                    : 'Guest'} */}
                </span>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="inherit"
                onClick={() => history.push('/checkout')}
                justifyContent="flex-end"
                className="right-menu cart-menu"
              >
                <span className="cart-text">Cart</span>
                <Badge
                  badgeContent={cartData && cartCount && cartCount !=={}? getCount(cartData) : 0}
                  color="primary"
                  className={classes.cartIcon}
                >
                  <img src={cart} alt="Cart" />
                </Badge>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                classes={{ list: classes.menu }}
              >
                <MenuItem onClick={handleClose} style={{ paddingLeft: 45 }}>
                  {authData && authData.loyaltyPoint
                    ? parseInt(authData.loyaltyPoint)
                    : 0}{' '}
                  Loyalty Points
                </MenuItem>
                {navLinks.map((item, index) => (
                  <MenuItem
                    style={{ paddingLeft: 45 }}
                    key={item.text}
                    selected={item.text === activeNav}
                    classes={{ selected: classes.selectedMenu }}
                    onClick={() => {
                      history.push(
                        `/${item.text.replace(/ /g, '-').toLocaleLowerCase()}`,
                      );
                      setActiveNav(item.text);
                      handleClose();
                    }}
                  >
                    <img src={item.icon} alt={item.text} />
                    {item.text}
                  </MenuItem>
                ))}
                <MenuItem
                  style={{ paddingLeft: 45 }}
                  onClick={()=>{
                    handleClose()
                    setShowDelete(true)
                  }}
                 
                >
                  <img src={deleteUser} alt="deleteUser" />
                  Delete Account
                </MenuItem>
                <MenuItem
                  style={{ paddingLeft: 45 }}
                  onClick={() => {
                    updateGlobelStoreByKeyVal({
                      key: 'userDetails',
                      value: null,
                    });
                    deleteKeyFromLocalStorage('selectedLocation');
                    setToLocalStorage('HKTWQ',{})
                    // setToLocalStorage('voucherCode', {});
                    // setToLocalStorage('voucherExpiry', {});
                    // setToLocalStorage('voucherAmount', {});
                    deleteKeyFromLocalStorage('sessionId');
                    setRefresh(!refresh);
                    window.location.reload();
                  }}
                >
                  Signout
                </MenuItem>
              </Menu>
              <Hidden smDown>
              {/* <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="inherit"
                  justifyContent="flex-end"
                  title="Track Order"
                  onClick={() => history.push('/order-tracking')}
                  className={classes.orderTrack}
                >
                  <img src={Track} alt="Track Order" />
                </Box> */}
                <Box
                  display="none"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="flex-end"
                  onClick={() =>
                    updateGlobelStoreByKeyVal({ key: 'nav', value: true })
                  }
                >
                  <img src={menu} alt="Menu" />
                </Box>
              </Hidden>
              
            </Box>
            
          </Grid>
          {/* <SearchPage /> */}
         
         <AppWrapper>
          <HeroRestaurant
        searchByKey={searchByKey}
        fetchResults={fetchResults}
        selectedSearchKey={selectedSearchKey}
        setSelectedSearchKey={setSelectedSearchKey}
        fetchResultsMasterCall={fetchResultsMasterCall}
      />
      </AppWrapper>
        </Grid>
        {refresh && <></>}

      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  authData: selectGlobelStoreByKey('userDetails'),
  cartData: selectStoreByKey('cartData'),
  citiesList: selectStoreByKey('cities'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCart,
      fetchCities,
      setSeliveryLocation,
      updateGlobelStoreByKeyVal,
      getUserDetails,
      searchByKey,
      fetchResults,
      updateSearchStoreByKeyVal,

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
)(HeaderDesktop);
