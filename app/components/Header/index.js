import React, { Fragment, memo, useContext, useState } from 'react';
import { useMediaQuery, useTheme, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { HistoryContext } from '../../containers/App/HistoryContext';
import HeaderDesktop from './HeaderDesktop';
import SearchPage from '../../containers/SearchPage';
import HeaderMobile from './HeaderMobile';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';
import {
  submitOtp,
  sendOtp,
  setSeliveryLocation,
} from '../../containers/HomePage/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';

import LoginPage from '../Login';

const Header = props => {
  const {
    isLoginOpen,
    updateGlobelStoreByKeyVal,
    submitOtp,
    deliveryInLocations,
    setSeliveryLocation,
    sendOtp,
    showSnackbar,
    authData
  } = props;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { history } = useContext(HistoryContext);
  console.log('Header', showSnackbar);
  return (
    <Fragment>
      
      <HeaderDesktop
        trigger={trigger}
        history={history}
        updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
        setSeliveryLocation={setSeliveryLocation}
      />

       {/* <HeaderMobile
          trigger={trigger}
          history={history}
          updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
          locationList={
            (deliveryInLocations && deliveryInLocations.items) || []
          }
          setSeliveryLocation={setSeliveryLocation}
        /> */}
      <LoginPage
        open={isLoginOpen}
        updateGlobelStoreByKeyVal={updateGlobelStoreByKeyVal}
        sendOtp={sendOtp}
        submitOtp={submitOtp}
      />
      {
        showSnackbar && (
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={showSnackbar.open}
            autoHideDuration={3000}
            onClose={() => {
              updateGlobelStoreByKeyVal({
                key: 'showSnackbar',
                value: {
                  open: false,
                  message: '',
                  severity: '',
                },
              });
            }
            }
            

          >

            <Alert severity={showSnackbar.severity}>
              {showSnackbar.message}
            </Alert>

          </Snackbar>

        )
      }

    </Fragment>
  );
};

Header.propTypes = {
  updateGlobelStoreByKeyVal: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  isLoginOpen: selectGlobelStoreByKey('isLoginOpen'),
  deliveryInLocations: selectGlobelStoreByKey('deliveryInLocations'),
  showSnackbar: selectGlobelStoreByKey('showSnackbar'),
  authData: selectGlobelStoreByKey('userDetails'),

});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateGlobelStoreByKeyVal,
      submitOtp,
      sendOtp,
      setSeliveryLocation,
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
)(Header);
