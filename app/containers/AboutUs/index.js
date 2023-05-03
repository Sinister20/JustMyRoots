import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { makeSelectHome, selectStoreByKey } from '../HomePage/selectors';
import { HistoryContext } from '../App/HistoryContext';
import { WhoWeARe, BackToRoots, OurPartners, OurFounders } from '../HomePage/Components';

const useStyles = makeStyles(theme => ({
  founderImg: {
    width: 418,
    height: 408,
  },
  founder2Img: {
    width: 437,
    height: 291,
  },
  founderWrapper: {
    marginTop: 141,
    marginBottom: 69,
  },
}));

export function AboutUs(props) {
  const classes = useStyles();
  const { history } = props;


  return (
    <article>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="About Us | Just My Roots" />
      </Helmet>
      <HistoryContext.Provider value={{ history }}>
        {/* {heroVideo && heroVideo.data && heroVideo.data.isActive && (
          <WhoWeARe data={heroVideo.data} aboutus />
        )} */}
        <BackToRoots aboutus />
        <OurFounders />
        <OurPartners about/>
      </HistoryContext.Provider>
    </article>
  );
}

AboutUs.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homeStore: makeSelectHome(),
  heroVideo: selectStoreByKey('heroVideo'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
  withRouter,
  memo,
)(AboutUs);
