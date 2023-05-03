import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getFeedbackSurveyListServiceCall = () => {
  const myConfig = getConfig('CustomerFeedBack.feedBackSurvey');
  const apiInstance = new ApiService(myConfig);
  const response = apiInstance.call();
  return response;
}
export const saveFeedbackSurveyServiceCall = data => {

  const { payload, resolve, reject } = data;
  try {
    const myConfig = getConfig('CustomerFeedBack.submitFeedBack');
    myConfig.data = {
      ...payload,
    };
    const apiInstance = new ApiService(myConfig);
    const response = apiInstance.call();
    resolve(response);
  }
  catch (err) {
    reject(err);

  }

}

