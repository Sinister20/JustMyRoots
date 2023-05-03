import {
  GET_FEEDBACK_SURVEY_LIST,
  CUSTOMER_FEEDBACK_STORE_UPDATE_BY_KEY,
  SUBMIT_FEEDBACK_SURVEY,
} from './constants';


export const updateCustomerFeedbackStoreByKeyVal = (payload) => {

  return({
    type: CUSTOMER_FEEDBACK_STORE_UPDATE_BY_KEY,
    payload,
  });
}
export const getFeedbackSurveyList = () => {
  return ({
    type: GET_FEEDBACK_SURVEY_LIST,
  })
}
export const submitFeedbackSurvey = (payload) => {
  
  return ({
    type: SUBMIT_FEEDBACK_SURVEY,
    payload,
  })

}