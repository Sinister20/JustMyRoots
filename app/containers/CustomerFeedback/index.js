import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeStyles,
  Divider,
  Grid,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import FeedBackStep1 from './components/FeedBackStep1';
import FeedBackStep2 from './components/FeedBackStep2';
import { getFeedbackSurveyList, submitFeedbackSurvey } from './actions';
import { selectCustomerFeedBackStoreByKey } from './selectors';
import { saveFeedbackSurveyServiceCall } from './serviceCalls';
import reducer from './reducer';
import FeedBackStep3 from './components/FeedBackStep3';
import FeedBackStep4 from './components/FeedBackStep4';
import { updateGlobelStoreByKeyVal } from 'containers/App/actions';
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
const key = 'customerFeedBack';
export function CustomerFeedBack(props) {
  useInjectReducer({ key, reducer });
  const { feedbackSurveyList, getFeedbackSurveyList, updateGlobelStoreByKeyVal } = props;
  const [feedBackStep, setFeedbackStep] = React.useState(1);
  const [feedbackSurvey, setFeedbackSurvey] = React.useState(null);

  const classes = useStyles();
  const location = useLocation();
  const transactionId = location.search.split('=')[1];
  React.useEffect(() => {
    if (!transactionId) {
      props.history.push('/');
    }
  }, []);
  const handleSubmitForm1 = async data => {
    const payload = {
      ...data,
      surveyQA: [],
      transactionId,
    };
    setFeedbackSurvey(payload);
    new Promise((resolve, reject) => submitFeedBackApiCall({ payload, resolve, reject }))
      .then((res) => {

        if (res.status === 200) {
          if (res.data.success) {
            setFeedbackStep(2);
          } else {
            updateGlobelStoreByKeyVal({
              key: 'showSnackbar',
              value: {
                open: true,
                message: "Something went wrong, please try again later.",
                variant: 'warning',
              },
            });

          }
        }
        setFeedbackStep(2);
      })
      .catch(err => {

        console.log(err);
      });

    setFeedbackStep(2)
  };
  const handleSubmitForm2 = async (data = []) => {
    const payload = {
      ...feedbackSurvey,
      surveyQA: data.map(item => ({
        surveyId: item.surveyId,
        rating: item.rating,
      })),
    };
    setFeedbackSurvey(payload);
    new Promise((resolve, reject) => submitFeedBackApiCall({ payload, resolve, reject }))
      .then((res) => {

        if (res.status === 200) {
          if (res.data.success) {
            setFeedbackStep(4);
          } else {
            updateGlobelStoreByKeyVal({
              key: 'showSnackbar',
              value: {
                open: true,
                message: "Something went wrong, please try again later.",
                variant: 'warning',
              },
            });

          }
        }
      })
      .catch(err => {

        console.log(err);
      });
  };
  React.useEffect(() => {
    getFeedbackSurveyList();
  }, []);
  const submitFeedBackApiCall = async feedbackSurvey => {
    await saveFeedbackSurveyServiceCall(feedbackSurvey);
  };
  const handleYesClick = () => {
    setFeedbackStep(3);
  };

  return (
    <div className={classes.appWrapper}>
      <Helmet titleTemplate="customerFeedBack" defaultTitle="Customer FeedBack | Just My Roots">
        <meta name="Customer FeedBack" content="Customer Feedback" />
      </Helmet>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Box component="div">
                <img src={require('../../images/customer-feedback.png')} />
              </Box>

              <Typography
                variant="h1"
                gutterBottom
                style={{
                  marginLeft: '20px',
                }}
              >
                CUSTOMER FEEDBACK
              </Typography>
            </Box>
            <Divider />
          </Grid>
        </Grid>
        {feedBackStep === 1 && (
          <FeedBackStep1 handleSubmit={data => handleSubmitForm1(data)} handleContinue={() => setFeedbackStep(2)} {...props} />
        )}
        {feedBackStep === 2 && (
          <FeedBackStep4 {...props} handleYesClick={handleYesClick} />
        )}
        {feedBackStep === 3 && (
          <FeedBackStep2
            handleSubmit={data => handleSubmitForm2(data)}
            surveyList={feedbackSurveyList || []}
          />
        )}
        {feedBackStep === 4 && <FeedBackStep3 />}
      </Container>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  feedbackSurveyList: selectCustomerFeedBackStoreByKey('feedbackSurveyList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFeedbackSurveyList,
      submitFeedbackSurvey,
      updateGlobelStoreByKeyVal
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
)(CustomerFeedBack);
