import { Map } from 'immutable';
import {
  UPDATE_UNIVERSITY_SEARCH_RECORD_IDS,
  SET_SEARCH_MODE_STATUS,
  SET_SEARCH_MODE_LOADER_STATUS,
  RESET_AND_CLOSE_SEARCH,
  BIND_SEARCH_TEXT,
  UNIVERSITY_SEARCH_NO_RECORDS,
} from './actionTypes';

const intitialState = new Map({
  entityIds: [],
  searchMode: false,
  searchLoader: false,
  searchText: '',
  searchQueryExecuted: false,
});

export default function (state = intitialState, action) {
  let newState = state;
  switch (action.type) {
    case UPDATE_UNIVERSITY_SEARCH_RECORD_IDS:
      newState = newState.set('searchQueryExecuted', true);
      newState = newState.set('searchLoader', false);
      return newState.set('entityIds', action.recordIds);
    case SET_SEARCH_MODE_STATUS:
      return state.set('searchMode', action.status);
    case SET_SEARCH_MODE_LOADER_STATUS: {
      newState = state.set('searchLoader', action.status);
      if (action.status) {
        newState = newState.set('entities', []);
      }
      return newState;
    }
    case BIND_SEARCH_TEXT:
      return state.set('searchText', action.text);
    case RESET_AND_CLOSE_SEARCH:
      return intitialState;
    case UNIVERSITY_SEARCH_NO_RECORDS:
      newState = newState.set('searchQueryExecuted', true);
      newState = newState.set('searchLoader', false);
      return newState.set('entityIds', []);
    default:
      return state;
  }
}
