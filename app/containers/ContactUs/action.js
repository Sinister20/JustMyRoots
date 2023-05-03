import { SUBMIT_CONTACT_DETAILS } from "./constants";

export const submitContactDetails = (payload) => {

    return({
    type: SUBMIT_CONTACT_DETAILS,
    payload,
});}