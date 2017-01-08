import fireBaseApi from '../../firebaseAPI/api';
import {
  ADD_STORY_RECORDS_WITH_META_DATA,
} from './actionTypes';

export function fetchUniversitySideBarStories() {
  return dispatch => fireBaseApi.getUniversitySidebarStories().then((result) => {
    result.reverse();
    const recordIdsArray = [];
    result.map((record) => recordIdsArray.push(record.id));
    dispatch({ type: ADD_STORY_RECORDS_WITH_META_DATA, records: result, recordIdsArray, metaPropName: 'universityPageSideBarStories' });
  }).catch((err) => {
    // TODO error handiling hook with sentry
  });
}
