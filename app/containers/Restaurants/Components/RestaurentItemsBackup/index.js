import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Chip,
  Radio,
  RadioGroup,
  Slider,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { TabContext, TabList } from '@material-ui/lab';
import Group184 from '../../../../images/Group184.svg';
import Group185 from '../../../../images/Group185.svg';
import { JMRCard } from '../../../../components';
import RecomendedDishCard from '../../../../components/RecomendedDishCard';
import { ItemSectionScrollSpy } from './Components';

const useStyles = makeStyles(theme => ({
  grid3Sec: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 670px 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  indicatorRestro: {
    left: 0,
    right: 'unset',
  },
  scrollBtnRestroContr: {
    paddingTop: 20,
  },
  restroTabs: {
    paddiing: 0,
    minHeight: 25,
    maxHeight: 25,
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
      fontSize: 16,
      textTransform: 'capitalize',
    },
  },
  itemScrollContnr: {
    maxHeight: 600,
    overflow: 'auto',
    boxShadow: 'rgb(0 0 0 / 10%) 0px 9px 9px 0px inset',
    marginTop: 20,
    background: '#f6f5f4',
    [theme.breakpoints.down('sm')]: {
      background: '#ffffff',
    },
  },
  section: {
    width: '100%',
    padding: '20px 45px',
    borderLeft: '1px solid #B69C72',
    borderRight: '1px solid #B69C72',
  },
  radioFilter: {
    fontSize: 12,
  },
  radioLabel: {
    fontSize: 12,
  },
  filterChip: {
    padding: '0 25px 30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '10px',
    '& .MuiChip-root': {
      borderRadius: 4,
    },
  },
}));

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  overflow: hidden;
  border-top: 1px solid #b69c72;
`;

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
`;

const RestaurentItems = props => {
  const { brandItems, addItemToCart, cartData, filters, setFilters } = props;
  const [restItems, setResItems] = useState({});
  const classes = useStyles();
  const [tabs, setTabs] = useState(0);
  const costSliderDebounce = useRef();
  const [costSlider, setCostSlider] = useState(filters.cost);

  useEffect(() => {
    costSliderDebounce.current = clearTimeout(costSliderDebounce.current);
    costSliderDebounce.current = setTimeout(() => {
      setFilters({ ...filters, cost: costSlider });
    }, 500);
  }, [costSlider]);

  // useEffect(() => {
  //   if (brandItems && Object.keys(brandItems).length) {
  //     //console.log(filters);
  //     let filteredItems = {};
  //     if (filters.type === 'all') {
  //       const filteredData =
  //         brandItems.items &&
  //         brandItems.items.length > 0 &&
  //         brandItems.items.filter(
  //           item =>
  //             item['sellingPrice'] >= filters.cost[0] &&
  //             item['sellingPrice'] <= filters.cost[1],
  //         );
  //       filteredItems = { items: filteredData };
  //     } else {
  //       const filteredData =
  //         brandItems.items &&
  //         brandItems.items.length > 0 &&
  //         brandItems.items.filter(
  //           item =>
  //             item['filter'][0] === filters.type &&
  //             item['sellingPrice'] >= filters.cost[0] &&
  //             item['sellingPrice'] <= filters.cost[1],
  //         );
  //       filteredItems = { items: filteredData };
  //     }
  //     const restaurentItems =
  //       filteredItems.items &&
  //       filteredItems.items.length > 0 &&
  //       filteredItems.items.reduce((acc, item) => {
  //         return {
  //           ...acc,
  //           [item.itemType]: [
  //             ...(acc[item.itemType] ? acc[item.itemType] : []),
  //             item,
  //           ],
  //         };
  //       }, {});
  //     setResItems(restaurentItems);
  //   } else {
  //     setResItems({});
  //   }
  // }, [brandItems, filters]);

  useEffect(() => {
    if (brandItems && brandItems.items) {
      const restaurentItems = brandItems.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.itemType]: [
            ...(acc[item.itemType] ? acc[item.itemType] : []),
            item,
          ],
        }),
        {},
      );
      setResItems(restaurentItems);
    } else {
      setResItems({});
    }
  }, [brandItems]);

  const handleType = event => {
    setFilters({ ...filters, type: event.target.value });
  };

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <Hidden smUp>
          <div className={classes.filterChip}>
            {['Veg', 'Non Veg', 'Egg', '20% off', '50% off'].map(filterName => (
              <Chip label={filterName} varient="outlined" />
            ))}
          </div>
        </Hidden>
        <Grid item container justifyContent="center">
          <Box>
            <Tabs
              value={tabs}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="disabled tabs example"
            >
              <Tab label="List View" value={0} />
              <Tab label="Tile View" value={1} />
            </Tabs>
          </Box>
        </Grid>
        <Divider />

        <Grid className={classes.cardContainer} container item>
          <Grid item className={classes.grid3Sec}>
            <Hidden smDown>
              <Grid
                item
                container
                style={{ flexWrap: 'nowrap', paddingTop: 20 }}
              >
                <Grid
                  item
                  style={{ flexWrap: 'nowrap', padding: 15, width: '100%' }}
                >
                  <FormControl
                    component="fieldset"
                    style={{ width: '100%', paddingTop: 20, paddingBottom: 20 }}
                  >
                    <FormLabel component="legend">Filters</FormLabel>
                    <RadioGroup
                      aria-label="foodType"
                      name="filters"
                      className={classes.radioFilter}
                      value={filters.type}
                      onChange={handleType}
                    >
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value=""
                        control={<Radio color="primary" size="small" />}
                        label="All"
                      />
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value="veg"
                        control={<Radio color="primary" size="small" />}
                        label="Veg"
                      />
                      <FormControlLabel
                        classes={{ label: classes.radioLabel }}
                        value="nonveg"
                        control={<Radio color="primary" size="small" />}
                        label="Non-veg"
                      />
                      {/* <FormControlLabel classes={{ label: classes.radioLabel }} value="containsEgg" control={<Radio color="primary" size="small" />} label="Contains egg" /> */}
                    </RadioGroup>
                  </FormControl>
                  <Divider />
                  <FormControl
                    component="fieldset"
                    style={{ width: '100%', marginTop: 20, paddingBottom: 20 }}
                  >
                    <FormLabel component="legend">Cost</FormLabel>
                    <Slider
                      value={costSlider}
                      onChange={(event, newValue) => setCostSlider(newValue)}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      max={10000}
                      min={0}
                      step={100}

                    // getAriaValueText={valuetext}
                    />
                  </FormControl>
                  <Divider />
                  {/* <FormControl component="fieldset" style={{ width: '100%', marginTop: 20, paddingBottom: 20 }}>
                                    <FormLabel component="legend">Offers</FormLabel>
                                    <RadioGroup aria-label="gender" name="filters" className={classes.radioFilter} value={filters.offerDiscount} onChange={(event) => setFilters({ ...filters, offerDiscount: event.target.value })}>
                                        <FormControlLabel classes={{ label: classes.radioLabel }} value="20" control={<Radio color="primary" size="small" />} label="20% off" />
                                        <FormControlLabel classes={{ label: classes.radioLabel }} value="50" control={<Radio color="primary" size="small" />} label="50% off" />
                                    </RadioGroup>
                                </FormControl> */}
                  <Divider />
                  <FormControl
                    component="fieldset"
                    style={{
                      width: '100%',
                      marginTop: 30,
                      paddingTop: 10,
                      paddingBottom: 40,
                    }}
                  >
                    <FormLabel component="legend">View</FormLabel>
                    <Grid item style={{ display: 'flex' }}>
                      <IconButton
                        onClick={() => setTabs('1')}
                        aria-label="menu"
                        style={{
                          padding: '5px 5px',
                          fontSize: 200,
                          marginRight: 5,
                        }}
                      >
                        <img src={Group185} />
                      </IconButton>
                      <IconButton
                        onClick={() => setTabs('2')}
                        aria-label="menu"
                        style={{
                          padding: '5px 5px',
                          fontSize: 200,
                          marginRight: 5,
                        }}
                      >
                        <img src={Group184} />
                      </IconButton>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
            </Hidden>

            <Grid className={classes.itemScrollContnr}>
              {restItems &&
                !!Object.keys(restItems).length &&
                Object.keys(restItems).map((itmKey, i) => (
                  <ItemSectionScrollSpy
                    cartData={cartData}
                    addItemToCart={addItemToCart}
                    viewType={tabs}
                    secData={restItems[itmKey]}
                    id="box-1"
                    secTitle={itmKey}
                  />
                ))}
              {restItems && !Object.keys(restItems).length && (
                <center>
                  <br />
                  <br />
                  <Typography>No item found</Typography>
                </center>
              )}
              {!restItems && (
                <center>
                  <br />
                  <br />
                  <Typography>
                    No items found please reset or update the filters{' '}
                  </Typography>
                </center>
              )}
            </Grid>
            <Hidden smDown>
              <Grid
                item
                container
                style={{ flexWrap: 'nowrap', paddingTop: 20 }}
              >
                <Tabs
                  orientation="vertical"
                  value={tabs}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(e, newValue) => setTabs(newValue)}
                  aria-label="disabled tabs example"
                  TabIndicatorProps={{ className: classes.indicatorRestro }}
                  className={classes.scrollBtnRestroContr}
                >
                  {restItems &&
                    Object.keys(restItems).length &&
                    Object.keys(restItems).map((itmKey, i) => (
                      <Tab
                        className={classes.restroTabs}
                        label={itmKey}
                        value={i}
                      />
                    ))}
                </Tabs>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default RestaurentItems;
