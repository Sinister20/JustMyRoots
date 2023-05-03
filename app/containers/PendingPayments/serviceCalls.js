import ApiService from '../../utils/apiService';
import { getConfig } from '../../config/apiConfig';

export const submitPendingPaymentServiceCall = ({
    data,
    resolve,
    reject
}) => {

    try {
        const config = getConfig('PendingPayment.submitPayment');
        config.data = {
            orderCode: data.orderCode,
            payMode: data.payMode,
            type: data.type
        }
        config.headers={
            "Authorization": `Bearer ${data.token}`
        }
        const apiInstance = new ApiService(config);
        const response = apiInstance.call();
        resolve(response)
    } catch (error) {
        reject(error)
    }


}