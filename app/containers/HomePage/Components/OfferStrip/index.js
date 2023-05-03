import React from 'react';
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Hidden,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  heroOffer: {
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
  },
  hrVer: {
    height: 20,
    background: '#000000',
    margin: 20,
  },
  mobileOfferHeadline: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    margin: '20px 0 34px 0',
  },
}));

const AppWrapper = styled.div`
  width: 100%;
  padding: ${props => (props.isMobile ? 0 : ' 0 35px')};
  margin: 0 auto;
`;

const AppWrapperContainer = styled.div`
  max-width: 1064px;
  margin: 0 auto;
  overflow: hidden;
`;

const OfferStrip = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <Hidden smDown>
        <AppWrapperContainer>
          <Grid className={classes.heroOffer}>
            <Typography variant="h6" component="p" style={{ lineHeight: 0 }}>
              <b>Up to 50% OFF</b>
            </Typography>
            &nbsp;
            <Typography variant="body1" style={{ fontWeight: 100 }}>
              on party orders
            </Typography>
            <Divider orientation="vertical" className={classes.hrVer} />
            <Typography variant="h6" color="primary" component="div">
              Check Out
            </Typography>
          </Grid>
        </AppWrapperContainer>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.mobileOfferHeadline}>
          <div style={{ fontWeight: 900, marginRight: 5 }}>Up to 50% off </div>
          <div
            style={{
              borderRight: '1px solid #333536',
              marginRight: 5,
              paddingRight: 5,
            }}
          >
            on party orders
          </div>
          <div style={{ color: '#FF7C7C', fontWeight: 900 }}>Checkout</div>
        </div>
      </Hidden>
    </AppWrapper>
  );
};

export default OfferStrip;
