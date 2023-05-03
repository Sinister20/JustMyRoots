import React, { useState } from 'react';
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
import Group184 from '../../../../images/Group184.svg';
import Group185 from '../../../../images/Group185.svg';
import { JMRCard } from '../../../../components';
import RecomendedDishCard from '../../../../components/RecomendedDishCard';
import { ItemSectionScrollSpy } from './Components';

const useStyles = makeStyles(theme => ({
  grid3Sec: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '150px 1fr 150px',
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
  padding-top: 40px;
`;

const RestaurentItems = () => {
  const classes = useStyles();

  const [tabs, setTabs] = useState('1');
  const [filters, setFilters] = useState({
    type: '',
    cost: [0, 7000],
    offer: '',
  });

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
              <Tab label="List View" value="1" />
              <Tab label="Tile View" value="2" />
            </Tabs>
          </Box>
        </Grid>
        <Divider />
        <Grid className={classes.cardContainer} container item spacing={6}>
          <Grid item className={classes.grid3Sec}>
            <Grid item container style={{ flexWrap: 'nowrap', paddingTop: 20 }}>
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
                  <RadioGroup
                    aria-label="gender"
                    name="filters"
                    className={classes.radioFilter}
                    value={filters.offerDiscount}
                    onChange={event =>
                      setFilters({
                        ...filters,
                        offerDiscount: event.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="20"
                      control={<Radio color="primary" size="small" />}
                      label="20% off"
                    />
                    <FormControlLabel
                      classes={{ label: classes.radioLabel }}
                      value="50"
                      control={<Radio color="primary" size="small" />}
                      label="50% off"
                    />
                  </RadioGroup>
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
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-2"
                secTitle="Appetizers"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-3"
                secTitle="Soup"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-4"
                secTitle="Salads"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-5"
                secTitle="Main course"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-6"
                secTitle="Bread"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-6"
                secTitle="Rice"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-6"
                secTitle="Continental"
              />
              <ItemSectionScrollSpy
                viewType={tabs}
                id="box-6"
                secTitle="Desserts"
              />
            </Grid>
            <Grid item container style={{ flexWrap: 'nowrap', paddingTop: 20 }}>
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
                <Tab
                  className={classes.restroTabs}
                  label="Appetizers"
                  value="1"
                />
                <Tab className={classes.restroTabs} label="Soup" value="2" />
                <Tab className={classes.restroTabs} label="Salads" value="3" />
                <Tab
                  className={classes.restroTabs}
                  label="Main course"
                  value="4"
                />
                <Tab className={classes.restroTabs} label="Bread" value="5" />
                <Tab className={classes.restroTabs} label="Rice" value="6" />
                <Tab
                  className={classes.restroTabs}
                  label="Continental"
                  value="7"
                />
                <Tab
                  className={classes.restroTabs}
                  label="Desserts"
                  value="8"
                />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default RestaurentItems;
