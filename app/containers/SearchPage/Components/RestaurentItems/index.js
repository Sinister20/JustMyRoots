import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
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
import OwlCarousel from 'react-owl-carousel2';
import Group184 from '../../../../images/Group184.svg';
import Group185 from '../../../../images/Group185.svg';
import { JMRCard } from '../../../../components';
import RecomendedDishCard from '../../../../components/RecomendedDishCard';
import { ItemSectionScrollSpy } from './Components';
import CommonHeading from '../../../HomePage/Components/CommonHeading';
import { ProductCard } from '../../../HomePage/Components';

const useStyles = makeStyles(theme => ({
  grid3Sec: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '15px 2fr',
  },
  indicatorRestro: {
    left: 0,
    right: 'unset',
  },
  scrollBtnRestroContr: {
    paddingTop: 20,
  },
  restroTabs: {
    padding: 0,
    minHeight: 25,
    maxHeight: 25,
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
      fontSize: 16,
      textTransform: 'capitalize',
    },
  },
  itemScrollContnr: {
    // maxHeight: 600,
    // overflow: 'auto',
    // marginTop: 20,
    // background: '#f6f5f4',
    padding: '20px 10px 20px 0px',
    // borderLeft: '3px solid #B69C72',
  },
  radioFilter: {
    fontSize: 12,
  },
  radioLabel: {
    fontSize: 12,
  },
  btnContainer: {
    padding: '45px 35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      height: 22,
      fontSize: 13,
      fontWeight: 300,
      color: '#C4C4C4',
      textTransform: 'capitalize',
      margin: 5,
      '&:hover': {
        color: '#333536',
      },
    },
  },
}));

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: 0 35px;
  margin: 0 auto;
`;

const options = {
  margin: 0,
  nav: true,
  dots: false,
  autoplay: false,
  loop: true,
  navText: [
    `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
      <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
    `<div class='next-slide'>
      <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
      <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
      <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
  ],
  responsive: {
    0: {
      items: 1.6,
      nav: false,
    },
    450: {
      items: 1.6,
      nav: false,
    },
    600: {
      items: 1.6,
      nav: false,
    },
    1000: {
      items: 4,
    },
  },
};

const RestaurentItems = props => {
  const { searchResult, filters, setFilters, addItemToCart } = props;
  const classes = useStyles();
  const costSliderDebounce = useRef();
  const [tabs, setTabs] = useState('1');
  const [costSlider, setCostSlider] = useState([0, 9000]);

  useEffect(() => {
    costSliderDebounce.current = clearTimeout(costSliderDebounce.current);
    costSliderDebounce.current = setTimeout(() => {
      setFilters({ ...filters, cost: costSlider });
    }, 500);
  }, [costSlider]);

  const handleOfferClick = event => {
    if (filters.offerDiscount === event.target.value) {
      setFilters({ ...filters, offerDiscount: null });
    } else {
      setFilters({ ...filters, offerDiscount: event.target.value });
    }
  };

  const handleType = event => {
    setFilters({ ...filters, type: event.target.value });
  };

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <Grid item container justifyContent="center">
          <Box>
            <Tabs
              value={tabs}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="disabled tabs example"
            >
              <Tab label="Dishes" value="1" />
              <Tab label="Restaurants" value="2" />
            </Tabs>
          </Box>
        </Grid>
        <Divider />
        <Grid className={classes.cardContainer} container item spacing={6}>
          <Grid item className={classes.grid3Sec}>
            <Grid>
              <Grid>
                {/* <FormControl
                  component="fieldset"
                  style={{ width: '100%', paddingTop: 20, paddingBottom: 20 }}
                >
                  <FormLabel component="legend">Sort by</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="filters"
                    className={classes.radioFilter}
                    value={filters.sortBy}
                    onChange={event =>
                      setFilters({ ...filters, sortBy: event.target.value })
                    }
                  >
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="Relavance"
                      control={<Radio color="primary" size="small" />}
                      label="Relavance"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="Popularity"
                      control={<Radio color="primary" size="small" />}
                      label="Popularity"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="Lowtohigh"
                      control={<Radio color="primary" size="small" />}
                      label="Low to high"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="Hightolow"
                      control={<Radio color="primary" size="small" />}
                      label="High to low"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="Ratings"
                      control={<Radio color="primary" size="small" />}
                      label="Ratings"
                    />
                  </RadioGroup>
                </FormControl>
                <Divider /> */}
                {/* <FormControl
                  component="fieldset"
                  style={{
                    width: '100%',
                    paddingTop: 20,
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                > */}
                {/* <FormLabel component="legend">Filters</FormLabel> */}
                {/* <RadioGroup
                    aria-label="foodType"
                    name="filters"
                    className={classes.radioFilter}
                    value={filters.type}
                    onChange={handleType}
                  > */}
                {/* <FormControlLabel
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
                    /> */}
                {/* <FormControlLabel classes={{ label: classes.radioLabel }} value="containsEgg" control={<Radio color="primary" size="small" />} label="Contains egg" /> */}
                {/* </RadioGroup>
                </FormControl> */}
                {/* <Divider />
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
                </FormControl> */}
                {/* <Divider /> */}
                {/* <FormControl
                  component="fieldset"
                  style={{ width: '100%', marginTop: 20, paddingBottom: 20 }}
                >
                  <FormLabel component="legend">Offers</FormLabel>
                  <FormControlLabel
                    classes={{ label: classes.radioLabel }}
                    checked={filters.offerDiscount === '20'}
                    value="20"
                    control={
                      <Radio
                        onClick={handleOfferClick}
                        color="primary"
                        size="small"
                      />
                    }
                    label="20% off"
                  />
                  <FormControlLabel
                    classes={{ label: classes.radioLabel }}
                    checked={filters.offerDiscount === '50'}
                    value="50"
                    control={
                      <Radio
                        onClick={handleOfferClick}
                        color="primary"
                        size="small"
                      />
                    }
                    label="50% off"
                  />
                </FormControl>
                <Divider /> */}
                {/* <FormControl
                  component="fieldset"
                  style={{
                    width: '100%',
                    marginTop: 30,
                    paddingTop: 10,
                    paddingBottom: 40,
                  }}
                > */}
                {/* <FormLabel component="legend">View</FormLabel> */}
                {/* <Grid item style={{ display: 'flex' }}>
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
                  </Grid> */}
                {/* </FormControl> */}
              </Grid>
            </Grid>
            <Grid className={classes.itemScrollContnr}>
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-1"
                secTitle="Starters"
                temp
                filters={filters}
                searchResult={searchResult}
                addItemToCart={addItemToCart}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <div className={classes.OwlCarousel}>
        <CommonHeading heading="CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHt" />
        <OwlCarousel options={options}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductCard />
          ))}
        </OwlCarousel>
      </div> */}
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default RestaurentItems;
