import React, { useEffect, Fragment , useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, makeStyles } from '@material-ui/core';
import { CommonHeading, TrendingDishes } from '../HomePage/Components';
import { ImageCardWithTitleBtn } from '../../components';
import { getMetaListings } from '../HomePage/actions';
import { selectStoreByKey } from '../HomePage/selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import placeholderImg from '../../images/placeholder-img.png';
import itemPage from '../ItemPage/index';
import LoadingIndicator from '../../components/LoadingIndicator';
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
    // imgCard({ offerCard }) {
    //   return {
    //     height: offerCard ? 331 : 188,
    //     [theme.breakpoints.down('sm')]: {
    //       height: 128,
    //     },
    //   };
    // },
  },
  offerBox: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr',
    gridGap: '30px',
    px: 5,
    my: 10,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    '& .RecipeReviewCard-imgCard': {
      height: '220px',
    },
  },
  offerImage: {
    height: '220px',
    '& .RecipeReviewCard-imgCard': {
      height: '220px',
    },
  },
}));

const OfferPage = ({
  metaKey = 'offer',
  getMetaListings,
  offers,
  foodType,
  deliveryInLoc,
}) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    getMetaListings({ keyword: 'type', key: metaKey });
  }, [metaKey, foodType, deliveryInLoc]);
  // const offerKey = window.location.pathname.split('/').pop();

  const offerKey = window.location.pathname.split('/').pop().replaceAll('_', '_');

  const OfferParent = () => (
    <div className={classes.appWrapper}>
      <CommonHeading heading="POPULAR OFFERS" viewmore />
      <div>
        <Box className={classes.offerBox}>
          {offers &&
            offers.length > 0 &&
            offers.map(item => (
              <ImageCardWithTitleBtn
                productData={{
                  name: item.name,
                  webLink: `offers/${item.name.replace('_', '_')}`,
                }}
                imgSrc={item.metaLogo || placeholderImg}
                offerCard
              />
            ))}
        </Box>
      </div>
    </div>
  );

  return (
    <div>

      <Helmet titleTemplate="JMR" defaultTitle="Offers">
        <meta name="description" content="JMR application" />
      </Helmet>
      <Switch>
        <Route exact path="/offers" component={OfferParent} />
        <Route
          exact
          path="/offers/:offerKey"
          render={() => (
            <TrendingDishes
              metaKey={offerKey}
              key={offerKey}
              location={deliveryInLoc}
              sliderShow={false}
            />
          )}
        />
        <Route
          exact
          path="/offers/:offerKey/item/:itemID"
          component={itemPage}
        />
      </Switch>
      {loading && <LoadingIndicator/>}

    </div>
    
  );
};

const mapStateToProps = createStructuredSelector({
  offers: selectStoreByKey('offer'),
  foodType: selectGlobelStoreByKey('foodType'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMetaListings,
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
)(OfferPage);
