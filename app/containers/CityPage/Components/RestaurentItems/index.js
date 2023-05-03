import React, { useState } from 'react';
import {
  Box,
  Button,
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
import Group184 from '../../../../images/Group184.svg';
import Group185 from '../../../../images/Group185.svg';
import { JMRCard } from '../../../../components';
import RecomendedDishCard from '../../../../components/RecomendedDishCard';
import { ItemSectionScrollSpy } from './Components';

const useStyles = makeStyles(theme => ({
  grid3Sec: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
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
    marginTop: 20,
    background: '#f6f5f4',
    padding: '20px 0 20px 45px',
    borderLeft: '3px solid #B69C72',
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
  background-color: #f5f5f5;
`;

const RestaurentItems = () => {
  const classes = useStyles();

  const [tabs, setTabs] = useState('2');
  const [filters, setFilters] = useState({
    type: '',
    cost: [0, 7000],
    offer: '',
  });

  const handleOfferClick = event => {
    if (filters.offerDiscount === event.target.value) {
      setFilters({ ...filters, offerDiscount: null });
    } else {
      setFilters({ ...filters, offerDiscount: event.target.value });
    }
  };

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <Grid className={classes.cardContainer} container item spacing={6}>
          <Grid item className={classes.grid3Sec}>
            <Grid
              item
              container
              style={{
                flexWrap: 'nowrap',
                overflow: 'auto',
                height: 600,
                paddingTop: 20,
              }}
            >
              <Grid
                item
                style={{ flexWrap: 'nowrap', padding: 15, width: '100%' }}
              >
                <FormControl
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
                <Divider />
                <FormControl
                  component="fieldset"
                  style={{
                    width: '100%',
                    paddingTop: 20,
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <FormLabel component="legend">Filters</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="filters"
                    className={classes.radioFilter}
                    value={filters.type}
                    onChange={event =>
                      setFilters({ ...filters, type: event.target.value })
                    }
                  >
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="all"
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
                      value="nonVeg"
                      control={<Radio color="primary" size="small" />}
                      label="Non-veg"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="containsEgg"
                      control={<Radio color="primary" size="small" />}
                      label="Contains egg"
                    />
                  </RadioGroup>
                </FormControl>
                <Divider />
                <FormControl
                  component="fieldset"
                  style={{ width: '100%', marginTop: 20, paddingBottom: 20 }}
                >
                  <FormLabel component="legend">Cost</FormLabel>
                  <Slider
                    value={filters.cost}
                    onChange={(event, newValue) =>
                      setFilters({ ...filters, cost: newValue })
                    }
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    max={10000}
                    min={0}

                    // getAriaValueText={valuetext}
                  />
                </FormControl>
                <Divider />
                <FormControl
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
            <Grid className={classes.itemScrollContnr}>
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-1"
                secTitle="Starters"
                temp
                filters={filters}
              />
            </Grid>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default RestaurentItems;
