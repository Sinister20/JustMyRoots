import React from 'react';
import styled from 'styled-components';
import { Grid, makeStyles, Box } from '@material-ui/core';

const AppWrapperContainer = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  topBarWrapper: {
    background: theme.palette.backgroundColor.main,
    height: 40,
    overflow: 'hidden',
    position: 'sticky',
    top: 115,
    zIndex: 1200,
    boxShadow: '0px 1px 4px rgb(70 70 70 / 25%)',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 23,
      top: 77,
    },
  },
  topBarText: {
    color: theme.palette.primary.main,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: 28,
    fontFamily: 'Roboto',
    letterSpacing: 3,
    [theme.breakpoints.down('sm')]: {
      lineHeight: 1,
      fontSize: 10,
    },
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarWrapper} alignItems="center">
      <AppWrapperContainer>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <p className={classes.topBarText}>
              Lalach Ko Pankh Lagao! <br /> Kisi Bhi Shaher Se Apna Manpasand
              Khana Mangwao!
            </p>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </Box>
  );
};

export default TopBar;
