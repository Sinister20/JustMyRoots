import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import reducer from './reducer';
// import saga from './saga';
import Profile from './Components/Profile';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'myAccount';

export function MyAccount() {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  return (
    <AppWrapper>
      <Helmet titleTemplate="MyAccount" defaultTitle="MyAccount">
        <meta name="My Account Page" content="My Account" />
      </Helmet>
      <Profile />
    </AppWrapper>
  );
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = createStructuredSelector({});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(MyAccount);
