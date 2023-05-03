import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import { makeStyles, Box, useTheme, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import CommonHeading from '../HomePage/Components/CommonHeading';
import { getMetaListings } from '../HomePage/actions';
import { selectGlobelStoreByKey } from '../App/selectors';
import { ImageCardWithTitleBtn } from '../../components';
import { selectStoreByKey } from '../HomePage/selectors';
import { TrendingDishes } from '../HomePage/Components';
import { PlaceholderImg } from '../../images/placeholder-img.png';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '35px auto 50px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 9999,
      left: '0px',
      transform: 'translateY(-50%)',
      display: 'flex !important',
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
    '& .owl-item': {
      padding: '20px 15px',
      '&.active:first': {
        paddingLeft: 20,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '20px 10px',
      },
    },
    '& .owl-prev': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .owl-next': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
  },
}));

const MemoryLane = ({
  metaKey = 'memorylane',
  location,
  getMetaListings,
  foodType,
  categories,
  deliveryInLoc,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getMetaListings({ keyword: 'type', key: metaKey });
  }, [location, metaKey, foodType]);

  const memoryLaneKey = window.location.pathname.split('/').pop();

  const MemoryLaneParent = () => (
    <div className={classes.appWrapper}>
      <CommonHeading heading={[<h2>Memory Lane</h2>]} viewmore />
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'}
        gridGap={isMobile ? '15px' : '30px'}
        px={5}
        my={isMobile ? 5 : 10}
      >
        {categories &&
          categories.map(item => (
            <ImageCardWithTitleBtn
              productData={{
                name: item.name.replaceAll('-', ' '),
                webLink: `memory-lane/${item.name}`,
              }}
              imgSrc={item.metaLogo || PlaceholderImg}
            />
          ))}
      </Box>
    </div>
  );

  return (
    <div>
      <Helmet titleTemplate="JMR" defaultTitle="Online memory lane food India | Memory Lane Just My Roots">
        <meta name="description" content="Explore our elaborate memory lane food India. Whether you are in the mood for Indian Food online delivery at Intercity, we have something for everyone. " />
      </Helmet>
      <Switch>
        <Route exact path="/memory-lane" component={MemoryLaneParent} />
        <Route
          exact
          path="/memory-lane/:memoryLaneKey"
          render={() => (
            <TrendingDishes
              metaKey={memoryLaneKey}
              key={memoryLaneKey}
              location={deliveryInLoc}
              sliderShow={false}
              restro
            />
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectStoreByKey('memorylane'),
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
  memo,
)(MemoryLane);
