import {
  META_MASTER_STORE_UPDATE_BY_KEY,
  DELETE_META,
  UPDATE_META,
  ADD_META,
  GET_META_LIST,
} from './constants';

export function updateMetaMasterStoreByKeyVal(payload) {
  return {
    type: META_MASTER_STORE_UPDATE_BY_KEY,
    payload,
  };
}

export const deleteMeta = payload => ({
  type: DELETE_META,
  payload,
});

export const addMeta = payload => {
  return {
    type: ADD_META,
    payload,
  };
};

export const updateMeta = payload => ({
  type: UPDATE_META,
  payload,
});

export const getMetaList = () => ({
  type: GET_META_LIST,
});
