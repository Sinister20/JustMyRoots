import React, { useEffect } from 'react';
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import JMRActiveLocation from '../../components/JMRActiveLocation';
import { fetchCityItems } from '../HomePage/actions';
import { selectStoreByKey } from '../HomePage/selectors';
import { ImageCardWithTitleBtn } from '../../components';
import { selectGlobelStoreByKey } from '../App/selectors';
import CommonHeading from '../HomePage/Components/CommonHeading';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '0px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
}));

const CityNewPage = ({ aboutus, fetchCityItems, deliveryInLoc, cityItems }) => {
  const classes = useStyles({ aboutus });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (deliveryInLoc) fetchCityItems(deliveryInLoc._id);
  }, [deliveryInLoc]);

  return (
    <div className={classes.appWrapper}>
      <JMRActiveLocation />
      <Box mt={10}>
        <CommonHeading
          heading={`${deliveryInLoc && deliveryInLoc.name} KALEIDOSCOPE`}
          viewmore
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr"
        gridGap="30px"
        px={5}
        my={10}
      >
        {cityItems &&
          cityItems.items &&
          cityItems.items.map(i => (
            <ImageCardWithTitleBtn
              imgSrc={i.imageUrl}
              subHeader={i.city}
              productData={i}
            />
          ))}
      </Box>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cityItems: selectStoreByKey('cityItems'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCityItems,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CityNewPage);
