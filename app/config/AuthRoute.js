import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { updateGlobelStoreByKeyVal } from '../containers/App/actions';
import { selectGlobelStoreByKey } from '../containers/App/selectors';
let timeout;
const AuthRoute = ({ authData, updateGlobelStoreByKeyVal, ...rest }) => {
  React.useEffect(() => {

      if (!authData) {
        // updateGlobelStoreByKeyVal({
        //   key: 'showSnackbar',
        //   value: {
        //     open: true,
        //     message: 'Please Login to Continue',
        //     severity: 'warning',
        //   },
        // });
        updateGlobelStoreByKeyVal({
          key: 'isLoginOpen',
          value: true,
        });
      }
  }, [authData]);
  return <Route {...rest} />;
};
const mapStateToProps = createStructuredSelector({
  authData: selectGlobelStoreByKey('userDetails'),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateGlobelStoreByKeyVal,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute);
