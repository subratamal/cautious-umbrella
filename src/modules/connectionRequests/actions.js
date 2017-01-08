import api from '../../api/api';
import fireBaseApi from '../../firebaseAPI/api';
import {
  SET_CONNECTION_REQUEST_DATA,
  RESET_UNSEEN_COUNT,
} from './actionTypes';
import { actionTypes } from '../profile';
import fetchRecordIds from '../../utils/extractIdsFromRecords';

function setConnectionRequestIds(recordIds, metadata, firstLoad) {
  return {
    type: SET_CONNECTION_REQUEST_DATA,
    recordIds,
    metadata,
    firstLoad,
  };
}

export function fetchConnectionRequests(callback) {
  return (dispatch) => fireBaseApi.fetchConnectionRequests(callback).then((result) => {
    dispatch({ type: actionTypes.ADD_PROFILE_RECORDS_WITHOUT_META_DATA, records: result.records });
    dispatch(setConnectionRequestIds(fetchRecordIds(result.records), result.metadata, true));
  });
}

export function updateRequestsState(actionData) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_PROFILE_RECORDS_WITHOUT_META_DATA, records: actionData.records });
    dispatch(setConnectionRequestIds(fetchRecordIds(actionData.records), actionData.metadata, false));
  };
}

export function resetUnseenCount() {
  return (dispatch) => {
    api.resetUnseenCount();
    dispatch({ type: RESET_UNSEEN_COUNT });
  };
}
