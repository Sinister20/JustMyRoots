/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  TEST_ACTION_HOME,
  UPDATE_HOME_APP_BY_KEY
} from './constants';

// The initial state of the App
export const initialState = {
  homeData: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TEST_ACTION_HOME:
        draft.homeData = action.data;
        return draft
      case UPDATE_HOME_APP_BY_KEY:
        draft[action.data.key] = action.data.value;
        return draft
    }
  });

export default homeReducer;
