import fireBaseApi from '../../firebaseAPI/api';
import {
  ADD_EVENT_RECORDS_WITH_META_DATA,
} from './actionTypes';

export function fetchUniversitySideBarEvents() {
  return dispatch => fireBaseApi.getUniversitySidebarEvents().then((result) => {
    result.reverse();
    const recordIdsArray = [];
    result.map((record) => recordIdsArray.push(record.id));
    dispatch({ type: ADD_EVENT_RECORDS_WITH_META_DATA, records: result, recordIdsArray, metaPropName: 'universityPageSideBarEvents' });
  }).catch((err) => {
    // TODO error handiling hook with sentry
  });
}
