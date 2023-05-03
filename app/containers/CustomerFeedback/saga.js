import { call, put, all, takeLatest } from 'redux-saga/effects';
import { GET_FEEDBACK_SURVEY_LIST ,SUBMIT_FEEDBACK_SURVEY} from './constants';
import { updateCustomerFeedbackStoreByKeyVal } from './actions';
import {getFeedbackSurveyListServiceCall,saveFeedbackSurveyServiceCall} from './serviceCalls';

export function* getFeedbackSurveyList() {

  try {
    const repos = yield call(getFeedbackSurveyListServiceCall);

    if (repos.status === 200) {
      yield put(
        updateCustomerFeedbackStoreByKeyVal({
          key: 'feedbackSurveyList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}
export function* saveCustomerFeedBackSurvey(payload) {
  
  try {
    const repos = yield call(saveFeedbackSurveyServiceCall, payload.payload);

    if (repos.status === 200) {
      yield put(
        updateCustomerFeedbackStoreByKeyVal({
          key: 'feedbackSurveyList',
          value: repos.data.data,
        }),
      );
    }
  } catch (err) {
    //console.log(err);
  }
}
export default function* rootSaga() {
  yield all([
    // takeLatest(GET_ORDER_LIST, getOrdersData),
    takeLatest(SUBMIT_FEEDBACK_SURVEY, saveCustomerFeedBackSurvey),
    takeLatest(GET_FEEDBACK_SURVEY_LIST, getFeedbackSurveyList),
    
  ]);
}
