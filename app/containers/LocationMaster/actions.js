import {
  LOCATION_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_LOCATION,
  // ADD_LOCATION,
  UPDATE_LOCATION,
  ADD_LOCATION,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_BY_STATE_ID,
} from './constants';

export function updateLocationMasterStoreByKeyVal(payload) {
  return {
    type: LOCATION_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteCity = payload => ({
  type: DELETE_LOCATION,
  payload,
});

export const addLocation = payload => {
  return {
    type: ADD_LOCATION,
    payload,
  };
};

export const updateLocation = payload => ({
  type: UPDATE_LOCATION,
  payload,
});

export const getLocationList = () => ({
  type: GET_LOCATION_LIST,
});

export const getLocationListById = payload => ({
  type: GET_LOCATION_LIST_BY_STATE_ID,
  payload,
});
