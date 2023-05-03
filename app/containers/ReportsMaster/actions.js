import {
  GET_ORDERS_REPORT,
  GET_SALES_REPORT,
  GET_INVOICE_REPORT,
  REPORTS_MASTER_STORE_UPDATE_BY_KEY,
} from './constants';

export function updateReportsMasterStoreByKeyVal(payload) {
  return {
    type: REPORTS_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const getInvoiceReport = payload => ({
  type: GET_INVOICE_REPORT,
  payload,
});

export const getSalesReport = payload => ({
  type: GET_SALES_REPORT,
  payload,
});

export const getOrdersReport = payload => ({
  type: GET_ORDERS_REPORT,
  payload,
});
