import fireBaseApi from '../../firebaseAPI/api';
import {
  ADD_PAGE_RECORDS_WITH_META_DATA,
} from './actionTypes';

export function fetchUniversityPrimaryContentPages() {
  return dispatch => fireBaseApi.getUniversityPrimaryContentPages().then((result) => {
    result.reverse();
    const recordIdsArray = [];
    result.map((record) => recordIdsArray.push(record.id));
    dispatch({ type: ADD_PAGE_RECORDS_WITH_META_DATA, records: result, recordIdsArray, metaPropName: 'universityPagePrimaryContentPages' });
  }).catch((err) => {
    // TODO error handiling hook with sentry
  });
}
