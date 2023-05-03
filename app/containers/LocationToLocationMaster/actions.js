import {
  LOCATION_TO_LOCATION_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_DELIVERY_LOCATION,
  GET_DELIVERY_LOCATIONS,
  UPDATE_DELIVERY_LOCATION,
  ADD_DELIVERY_LOCATION,
} from './constants';

export function updateLocationToLocationMasterByKeyVal(payload) {
  return {
    type: LOCATION_TO_LOCATION_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteDeliveryLocation = payload => ({
  type: DELETE_DELIVERY_LOCATION,
  payload,
});

export const addDeliveryloc = payload => {
  return {
    type: ADD_DELIVERY_LOCATION,
    payload,
  };
};

export const updateDeliveryLocation = payload => ({
  type: UPDATE_DELIVERY_LOCATION,
  payload,
});

export const getDeliveryLocations = payload => ({
  type: GET_DELIVERY_LOCATIONS,
  payload,
});
