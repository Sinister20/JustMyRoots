import React, { memo } from 'react';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { ListCard } from '../../../../components';
import { selectStoreByKey } from '../../../HomePage/selectors';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    marginTop: 70,
  },
  helpCard: {
    padding: '75px 65px 75px 50px',
    textAlign: 'left',
    minHeight: 400,
  },
  helpCardTitle: {
    fontWeight: '500',
    fontSize: '32px',
    lineHeight: '37px',
    marginBottom: 28,
  },
  helpCardSubTitle: {
    color: '#737373',
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const AppWrapper = styled.div`
  width: 100%;
  padding: 35px 35px 20px;
  margin: 0 auto;
  background-color: #f6f5f4;
`;

const AppWrapperContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  position: relative;
  text-align: center;
`;

const OrderTrackHelp = ({ cartData, addItemToCart }) => {
  const classes = useStyles();

  return (
    <AppWrapper>
      <AppWrapperContainer>
        <div>
          <Grid item style={{ marginBottom: 50 }}>
            <Typography variant="h3" component="div">
              <Typography variant="h4" color="primary" component="span">
                <b>About</b>
              </Typography>
              &nbsp;
              <Typography variant="h4" color="secondary" component="span">
                <b>your recent order</b>
              </Typography>
            </Typography>
          </Grid>
          <Box>
            <Paper className={classes.helpCard}>
              <Grid container spacing={2}>
                <Grid
                  md={6}
                  sm={12}
                  item
                  className={`${classes.sec1Grid} ${classes.borderRight}`}
                >
                  <span>
                    <Typography variant="h5" color="primary">
                      Track your order
                    </Typography>
                    <Typography className={classes.descItem}>
                      Address- lorem ipsum dolor set amet Pincode
                    </Typography>
                  </span>
                </Grid>
                <Grid
                  md={6}
                  sm={12}
                  item
                  className={`${classes.sec1Grid} ${classes.paddingLeft}`}
                >
                  <Typography variant="h5" color="primary">
                    #123456
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{
                      textTransform: 'unset',
                      marginBottom: 20,
                    }}
                  >
                    Cancel Order
                  </Button>
                </Grid>
              </Grid>
              <Divider />
              {cartData &&
                cartData.data &&
                cartData.data.items &&
                cartData.data.items.map(itemData => (
                  <>
                    <ListCard
                      cart
                      productData={itemData}
                      addItemToCart={addItemToCart}
                    />
                    <Divider />
                  </>
                ))}
            </Paper>
          </Box>
        </div>
        <div style={{ marginTop: 187 }}>
          <Grid item>
            <Typography variant="h3" component="div">
              <Typography variant="h4" color="primary" component="span">
                <b>Questions about</b>
              </Typography>
              &nbsp;
              <Typography variant="h4" color="secondary" component="span">
                <b>your order</b>
              </Typography>
            </Typography>
            <Box width="450px" mx="auto" mt={2} mb={5}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                style={{
                  textTransform: 'unset',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.76271"
                    cy="9.76271"
                    r="8.76271"
                    stroke="#B69C72"
                    strokeWidth="2"
                  />
                  <path
                    d="M16.6777 16.2695L24.4065 23.9983"
                    stroke="#B69C72"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ marginLeft: 10 }}>Ask your questions </span>
              </Button>
            </Box>

            <Typography className={classes.cartDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              adipiscing arcu, id non lectus eget at. Phasellus vestibulum nam
              facilisis elit consectetur.
            </Typography>
          </Grid>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gridGap="60px"
            className={classes.cardContainer}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Paper className={classes.helpCard}>
                <Typography className={classes.helpCardTitle} color="primary">
                  Lorem ipsum dolor set amet dolor
                </Typography>
                <Typography className={classes.helpCardSubTitle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  adipiscing arcu, id non lectus eget at. Phasellus vestibulum
                  nam facilisis elit consectetur. Phasellus vestibulum nam
                  facilisis elit consectetur.
                </Typography>
              </Paper>
            ))}
            ;
          </Box>
        </div>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  cartData: selectStoreByKey('cartData'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(OrderTrackHelp);
