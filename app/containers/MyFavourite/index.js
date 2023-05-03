import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import reducer from './reducer';
import { ListCard } from '../../components';
import { getFavoriteList } from './actions';
import { saveFavoriteItemServiceCall } from './serviceCalls';
import { selectMyFavoriteStoreByKey } from './selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import { addItemToCart } from 'containers/HomePage/actions';
// import saga from './saga';
// import Profile from './Components/Profile';

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
  taxesPopup: {
    marginLeft: 5,
    verticalAlign: 'text-bottom',
    cursor: 'pointer',
  },
  taxWrapper: {
    '& > div:last-child': {
      color: theme.palette.primary.main,
    },
  },
  cartList: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridColumnGap: '10px',
    marginBottom: 20,
    '& .MuiTypography-body1': {
      fontSize: 18,
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    '& .MuiTypography-body1:first-child': {
      color: '#717171',
    },
  },
  deliveryText: {
    marginTop: 15,
    '& .MuiTypography-body1': {
      fontSize: 18,
      fontWeight: 500,
      color: '#717171',
    },
    '& span': {
      fontSize: 18,
      fontWeight: 500,
      color: '#717171',
    },
    '& .MuiTypography-body1:last-child': {
      color: '#AC1715',
      marginLeft: 5,
    },
  },
  date: {
    color: '#AC1715 !important',
    marginLeft: 5,

  },
  cartTotal: {
    boxShadow: '0px 4px 20px #CFCFCF',
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  itemHeading: {
    fontSize: 30,
    fontWeight: 700,
    color: '#070707',
    margin: '40px 0 20px',
  },
  totalHead: {
    color: '#AC1715',
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
  },
  md: {
    '& .MuiDialog-paper': {
      minWidth: 420,
    },
    '& label': {
      fontSize: 14,
      fontWeight: 400,
    },
  },
}));
const key = 'myFavorite';

export function MyFavorite(props) {
  const {
    getFavoriteList,
    myFavorite = [],
    deliveryInLoc,
    addItemToCart
  } = props;
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  React.useEffect(() => {
    if (deliveryInLoc) {
      getFavoriteList(deliveryInLoc._id);
    }
  }, [deliveryInLoc]);
  const handleSaveFavorite = () => {
    
    getFavoriteList(deliveryInLoc._id);
   
  };
  return (
    <div className={classes.appWrapper}>
      <Helmet titleTemplate="MyFavorite" defaultTitle="My Favorite | Just My Roots">
        <meta name="My Favorite Page" content="My Favorite" />
      </Helmet>  
      {myFavorite && myFavorite.length > 0 ? (
        myFavorite.map(
          (item, index) =>
            item.isFavourite &&
            item.itemId && (
              <ListCard
                key={index}
                imgSrc={
                  item.itemId.productImages && item.itemId.productImages[0]
                }
                productData={item.itemId}
                myFavComponent={true}
              
                isFavorite={item.isFavourite}
                saveFavorite={handleSaveFavorite}
                addItemToCart={addItemToCart}
              />
            ),
        )
      ) : (
        <div>
          <Typography variant="h5" className={classes.itemHeading}>
            No items in your favorite list
          </Typography>
          <Typography variant="body1" className={classes.deliveryText}>
            You can add items to your favorite list by clicking on the heart
            icon on the product page.
          </Typography>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  myFavorite: selectMyFavoriteStoreByKey('myFavorite'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFavoriteList,
      addItemToCart,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  // addItemToCart
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(MyFavorite);
