import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const getInvoiceReportServiceCall = ({ payload: filters }) => {
  const myAccountConfig = getConfig('Reports.invoiceReport');
  myAccountConfig.urlParams = filters;
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getSalesReportServiceCall = ({ payload: filters }) => {
  const myAccountConfig = getConfig('Reports.salesReport');
  myAccountConfig.urlParams = filters;
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};

export const getOrdersReportServiceCall = ({ payload: filters }) => {
  const myAccountConfig = getConfig('Reports.orderReport');
  myAccountConfig.urlParams = filters;
  const apiInstance = new ApiService(myAccountConfig);
  const response = apiInstance.call();
  return response;
};
