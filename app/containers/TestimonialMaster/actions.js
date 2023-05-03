import {
  TESTIMONIAL_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
  ADD_TESTIMONIAL,
  GET_TESTIMONIAL_LIST,
} from './constants';

export function updateTestimonialMasterStoreByKeyVal(payload) {
  return {
    type: TESTIMONIAL_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteTestimonial = payload => ({
  type: DELETE_TESTIMONIAL,
  payload,
});

export const addTestimonial = payload => {
  return {
    type: ADD_TESTIMONIAL,
    payload,
  };
};

export const updateTestimonial = payload => ({
  type: UPDATE_TESTIMONIAL,
  payload,
});

export const getTestimonialList = () => ({
  type: GET_TESTIMONIAL_LIST,
});
