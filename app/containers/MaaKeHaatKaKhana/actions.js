import {
    VALIDATE_DFH_CITY,
    UPDATE_MAA_KE_HATH_KA_DATA,
    ADD_TO_DFH_CART,
    VALIDATE_DFH
} from "./constants"
export const getValidateDFHCity =  payload => ({

    type: VALIDATE_DFH_CITY,
    payload
});
export const addToDFHCart = payload => ({
    type: ADD_TO_DFH_CART,
    payload
})

export const updateMaaKeHathKaKhanaKByKeyVal = payload => ({
    type: UPDATE_MAA_KE_HATH_KA_DATA,
    payload
});
export const validateDFH = (payload) => ({
    
    type: VALIDATE_DFH,
    payload
})