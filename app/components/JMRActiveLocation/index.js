import React, { useContext, useEffect, useState } from 'react';
import {
  makeStyles,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isArray } from 'lodash';
import map from '../../images/map.png';
import {
  fetchDeliveryLocations,
  setSeliveryLocation,
} from '../../containers/HomePage/actions';
import {
  makeSelectHome,
  selectStoreByKey,
} from '../../containers/HomePage/selectors';
import { updateGlobelStoreByKeyVal } from '../../containers/App/actions';
import { selectGlobelStoreByKey } from '../../containers/App/selectors';
import { HistoryContext } from '../../containers/App/HistoryContext';
import arrowDown from '../../images/arrowDown.png';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '80px auto 0',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
  title: {
    fontWeight: 900,
    fontSize: 35,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    '& span': {
      color: '#A11E23',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },

  cityList: {
    border: '2px solid #818181',
    borderRadius: 30,
    padding: '15px 20px',
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        fontWeight: 'bold',
        fontSize: 17,
        listStyleType: 'none',
        marginBottom: 10,
        display: 'inline-block',
        minWidth: '33%',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
}));

const JMRActiveLocation = ({
  cities = [],
  fetchDeliveryLocations,
  setSeliveryLocation,
  updateGlobelStoreByKeyVal,
  selectedCity,
  backtoRoots,
}) => {
  const { history } = useContext(HistoryContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCity, setActiveCity] = useState({ activeCity: '' });
  const [readMore, setReadMore] = useState(false);
  const [cityList, setCityList] = useState([]);

  //Change the city color based on delivery location
  useEffect(() => {
    setActiveCity(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    cities.sort((a, b) => a.name.localeCompare(b.name));
    isArray(cities) && setCityList(cities.slice(0, readMore ? undefined : 15));
  }, [readMore, cities]);

  return (
    <div>
      <h1 className={classes.title}>
        JMR <span className={classes.titleSpan}>ACTIVE</span> LOCATIONS
      </h1>
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gridColumnGap="60px"
      >
        <div>
          <img src={map} alt="map" height="100%" width="100%" />
        </div>
        <Box mt={8}>
          <Typography
            color="primary"
            align="center"
            style={{ fontWeight: 700, fontSize: 12 }}
          >
            CLICK TO SELECT CITY TO SHOP FROM
          </Typography>
          <Box display="grid" className={classes.cityList} mt={2}>
            <ul>
              {activeCity &&
                cityList
                  .filter((city) => city.pickupAllowed === true)
                  .map((city, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        // setSeliveryLocation(city);
                        backtoRoots &&
                          history.push(
                            `/cities/${city.name.toLowerCase()}-kaleidoscope`,
                          );
                      }}
                      style={{
                        color:
                          city.name === activeCity.name ? '#AC1715' : '#7D7B7B',
                      }}
                      onKeyPress={() => { }}
                      role="button"
                    >
                      {/* {city.name} */}
                      {city.name && city.name.startsWith('Chandigarh')
                        ? city.name.split(' ')[0]
                        : city.name[0].toUpperCase() + city.name.substring(1)}
                    </li>
                  ))}
            </ul>
            <Box display="flex" justifyContent="center" mt="4" mb="2">
              <img
                src={arrowDown}
                style={{
                  transform: readMore && 'rotate(180deg)',
                  cursor: 'pointer',
                }}
                alt="Arrow Down"
                height="25px"
                width="25px"
                onClick={() => setReadMore(!readMore)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  homeStore: makeSelectHome(),
  cities: selectStoreByKey('cities'),
  selectedCity: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDeliveryLocations,
      setSeliveryLocation,
      updateGlobelStoreByKeyVal,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(JMRActiveLocation);
