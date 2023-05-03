import produce from 'immer';
import { ORDER_MASTER_STORE_UPDATE_BY_KEY } from './constants';

// The initial state of the App
export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ORDER_MASTER_STORE_UPDATE_BY_KEY:
        draft[action.payload.key] = action.payload.value;
        return draft;
    }
  });

export default appReducer;
