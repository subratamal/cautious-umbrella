import { Map } from 'immutable';
import {
  SET_CONNECTION_REQUEST_DATA,
  RESET_UNSEEN_COUNT,
  EMPTY_EXISTING_RECORDS_FOR_FIRST_LAOD,
} from './actionTypes';

const initialState = new Map({
  recordIds: [],
  unseenCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_REQUEST_DATA: {
      const newState = state.set('unseenCount', action.metadata.unseen);
      return newState.set('recordIds', action.recordIds);
    }
    case RESET_UNSEEN_COUNT:
      return state.set('unseenCount', 0);
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
