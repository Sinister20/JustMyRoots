import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import Rectangle1160 from 'images/Rectangle1160.jpg';
import { JmrCardType1 } from 'components';

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? '0 5px 10px' : '0 35px 10px')};
  margin: 0 auto;
  background-color: #f5f5f5;
`;

const useStyles = makeStyles(theme => ({
  nostalgiaContr: {
    padding: '60px 0 30px',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 720,
    margin: 'auto',
  },
  diyGrid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: 60,
    gridRowGap: 30,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 10,
      gridRowGap: 10,
    },
  },
}));

const CuisineContainer = ({ imgSrc }) => {
  const classes = useStyles();

  const { history } = useContext(HistoryContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid className={classes.diyGrid3}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
            <JmrCardType1
              history={history}
              filters={{}}
              imgSrc={imgSrc || Rectangle1160}
            />
          ))}
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default CuisineContainer;
