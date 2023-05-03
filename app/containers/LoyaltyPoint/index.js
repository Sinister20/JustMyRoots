import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  makeStyles,
  Divider,
  Grid,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import reducer from './reducer';
import { getLoyaltyPoint } from './actions';
import { selectLoyaltyStoreByKey } from './selectors';
import { selectGlobelStoreByKey } from '../App/selectors';

// import saga from './saga';
// import Profile from './Components/Profile';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1144,
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    padding: '20px 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '50px auto 20px',
      padding: '0 20px',
    },
  },
}));
const key = 'loyaltyPoint';
export function LoyaltyPoint(props) {
  const { getLoyaltyPoint, loyaltyPoint, userDetails } = props;

  const classes = useStyles();
  useInjectReducer({ key, reducer });
  React.useEffect(() => {
    if (userDetails)
      getLoyaltyPoint({ customerId: userDetails ? userDetails._id : '' });
  }, [userDetails]);
  return (
    <div className={classes.appWrapper}>
      <Helmet titleTemplate="loyaltyPoints" defaultTitle="LoyalPoints">
        <meta name="My Loyalty Page" content="Loyalty Points" />
      </Helmet>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3 style={{ fontSize: 30, margin: 0, marginLeft: 5 }}>
              LOYALTY POINT
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {/* {myFavorite.myFavorite.length} */}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {userDetails
                ? `${userDetails.firstName} ${userDetails.lastName}`
                : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Total Loyalty Points-{' '}
              {userDetails ? userDetails.loyaltyPoint : ''}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loyaltyPoint &&
                loyaltyPoint.length > 0 &&
                [...loyaltyPoint].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      {moment(item.createdAt).format('MM.DD.YYYY')}
                    </TableCell>
                    <TableCell>{item.opType}</TableCell>
                    <TableCell>{item.point}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loyaltyPoint: selectLoyaltyStoreByKey('loyaltyPoint'),
  userDetails: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLoyaltyPoint,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(LoyaltyPoint);
