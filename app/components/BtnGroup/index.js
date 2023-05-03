import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';

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
    [theme.breakpoints.down('sm')]: {
      padding: '45px 0',
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
  padding: ${props => (props.isMobile ? '0 5px' : '0 35px')};
  margin: 0 auto;
  background-color: #f5f5f5;
`;

const BtnGroup = ({ noDivider }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid item container className={classes.btnContainer}>
          <Button variant="outlined">india</Button>
          <Button variant="outlined">Delhi</Button>
          <Button variant="outlined">gurugram</Button>
          <Button variant="outlined">Bengaluru</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
          <Button variant="outlined">Bengaluru</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
          <Button variant="outlined">Mumbai</Button>
          <Button variant="outlined">hyderabad</Button>
          <Button variant="outlined">lucknow</Button>
          <Button variant="outlined">chenni</Button>
          <Button variant="outlined">kolkata</Button>
        </Grid>
        {!noDivider && <Divider />}
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default BtnGroup;
