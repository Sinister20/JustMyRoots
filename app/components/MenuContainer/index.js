import React, { memo, useContext, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Group385 from '../../images/Group385.svg';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { HistoryContext } from '../../containers/App/HistoryContext';
import { getUserDetails } from '../../containers/HomePage/actions';
import menuProfile from '../../images/menuProfile.png';
import menuHelp from '../../images/menuHelp.png';
import menuReferral from '../../images/menuReferral.png';
import menuOffer from '../../images/menuOffers.png';
import menuOrder from '../../images/menuOrder.png';
import menuAddress from '../../images/menuAddress.png';
import menuWishlist from '../../images/menuWishlist.png';
import menuPolicies from '../../images/menuPolicies.png';
import menuLoyalty from '../../images/menuLoyalty.png';

const drawerWidth = 345;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    minWidth: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    minWidth: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    minWidth: drawerWidth,
    background: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
    '& .MuiListItem-root img': {
      marginRight: 10,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    minHeight: 120,
    paddingRight: 35,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  selectedMenu: {
    background: 'none !important',
    color: '#B69C72',
    fontWeight: 900,
  },
}));

function MenuContainer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { nav, updateGlobelStoreByKeyVal, userDetails, getUserDetails } = props;
  const [activeNav, setActiveNav] = useState('Home');

  const { history } = useContext(HistoryContext);
  const isAdmin = userDetails && userDetails.role === 'admin';

  const adminLinks = [
    { text: 'Brand Master', icon: menuAddress },
    { text: 'Item Master', icon: menuAddress },
    { text: 'Location To Location Master', icon: menuAddress },
    { text: 'Location Master', icon: menuAddress },
    { text: 'Meta Master', icon: menuAddress },
    { text: 'Coupon Master', icon: menuAddress },
    { text: 'Order Master', icon: menuAddress },
    { text: 'Reports', icon: menuAddress },
    { text: 'Testimonial Master', icon: menuAddress },
  ];
  const navLinks = [
    // { text: 'My Profile', icon: menuProfile },
    // { text: 'Help', icon: menuHelp },
    // { text: 'Referral', icon: menuReferral },
    // { text: 'Offers', icon: menuOffer },
    // { text: 'Manage Address', icon: menuAddress },
    // { text: 'Loyalty Points', icon: menuLoyalty },
    // { text: 'My Favourite', icon: menuWishlist },
    // { text: 'Policies', icon: menuPolicies },
    ...(isAdmin
      ? adminLinks
      : [{ text: 'You do not have admin rights ', icon: menuPolicies }]),
  ];

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className={classes.root}>
      <SwipeableDrawer
        className={classes.SwipeableDrawer}
        variant="temporary"
        anchor="right"
        open={nav}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick={() => updateGlobelStoreByKeyVal({ key: 'nav', value: false })}
      >
        <div className={classes.drawerHeader}>
          <IconButton>
            <img src={Group385} height="25px" width="25px" />
          </IconButton>
        </div>
        <List>
          {/* <ListItem>
            <ListItemText>
              <img />
              Account
            </ListItemText>
          </ListItem> */}
          {navLinks.map((item, index) => (
            <ListItem
              button
              style={{ paddingLeft: 45 }}
              key={item.text}
              selected={item.text === activeNav}
              classes={{ selected: classes.selectedMenu }}
              onClick={() => {
                history.push(
                  `/${item.text.replace(/ /g, '-').toLocaleLowerCase()}`,
                );
                setActiveNav(item.text);
              }}
            >
              <img src={item.icon} />
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  nav: selectGlobelStoreByKey('nav'),
  userDetails: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateGlobelStoreByKeyVal,
      getUserDetails,
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
)(MenuContainer);
