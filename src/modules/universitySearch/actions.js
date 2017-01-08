import { each } from 'underscore';
import api from '../../api/api';
import {
  UPDATE_UNIVERSITY_SEARCH_RECORD_IDS,
  SET_SEARCH_MODE_STATUS,
  SET_SEARCH_MODE_LOADER_STATUS,
  RESET_AND_CLOSE_SEARCH,
  BIND_SEARCH_TEXT,
  UNIVERSITY_SEARCH_NO_RECORDS,
} from './actionTypes';
import { ADD_PAGE_RECORDS_WITHOUT_META_DATA } from '../pages/actionTypes';

function setSearchModelLoader(status) {
  return {
    type: SET_SEARCH_MODE_LOADER_STATUS,
    status,
  };
}

export function setSearchMode(status) {
  return {
    type: SET_SEARCH_MODE_STATUS,
    status,
  };
}

export function resetAndCloseSearch() {
  return {
    type: RESET_AND_CLOSE_SEARCH,
  };
}

export function searchTextBind(text) {
  return {
    type: BIND_SEARCH_TEXT,
    text,
  };
}

export function processUniversitySearch(locationFilter, searchText) {
  return (dispatch) => {
    dispatch(setSearchModelLoader(true));
    return api.getUniversityPageSearchResultsFromElastic(locationFilter, searchText).then((result) => {
      const data = result.data;
      if (!data.Message) {
        each(data, (record) => {
          if (!record.following) {
            record.following = '0';
          }
        });
        const recordIdsArray = [];
        result.data.map((record) => recordIdsArray.push(record.id));
        dispatch({ type: UPDATE_UNIVERSITY_SEARCH_RECORD_IDS, recordIds: recordIdsArray });
        dispatch({ type: ADD_PAGE_RECORDS_WITHOUT_META_DATA, records: result.data });
      } else {
        dispatch({ type: UNIVERSITY_SEARCH_NO_RECORDS });
      }
    }).catch((err) => {
      // TODO error handiling hook with sentry
    });
  };
}
