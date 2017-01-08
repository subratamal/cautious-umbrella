import { each } from 'underscore';
import api from '../../api/api';
import fireBaseApi from '../../firebaseAPI/api';
import {
  UPDATE_OPPORTUNITY_SEARCH_RECORD_IDS,
  SET_SEARCH_MODE_STATUS,
  SET_SEARCH_MODE_LOADER_STATUS,
  RESET_AND_CLOSE_SEARCH,
  BIND_SEARCH_TEXT,
  OPPORTUNITY_SEARCH_NO_RECORDS,
} from './actionTypes';
import { ADD_OPPORTUNITY_RECORDS_WITHOUT_META_DATA } from '../opportunities/actionTypes';

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

export function processOpportunitySearch(searchText, subtypeFilter) {
  return (dispatch) => {
    dispatch(setSearchModelLoader(true));
    return api.getOpportunityPageSearchResults(searchText, subtypeFilter).then((result) => {
      const data = result.data;
      if (!data.Message) {
        each(data, (record) => {
          if (!record.following) {
            /* eslint-disable */
            record.following = '0';
            /* eslint-enable */
          }
        });
        fireBaseApi.getOpportunitiesSearchData(data).then((values) => {
          const recordIdsArray = [];
          const ultimateResults = [];
          values.map((record) => recordIdsArray.push(record.id));
          values.map((record) => ultimateResults.push(record));
          dispatch({ type: UPDATE_OPPORTUNITY_SEARCH_RECORD_IDS, recordIds: recordIdsArray });
          dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITHOUT_META_DATA, records: ultimateResults });
        }, err => Promise.reject(err));
      } else {
        dispatch({ type: OPPORTUNITY_SEARCH_NO_RECORDS });
      }
    }).catch((err) => {
      // TODO error handiling hook with sentry
    });
  };
}
