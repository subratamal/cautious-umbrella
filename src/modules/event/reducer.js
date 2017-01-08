import {
  mergeStateWithMeta,
  mergeStateWithoutMeta,
  entityReducerIntialState,
} from '../../utils/immutableOperationsUtils';
import {
  ADD_EVENT_RECORDS_WITH_META_DATA,
  ADD_EVENT_RECORDS_WITHOUT_META_DATA,
} from './actionTypes';


export default function (state = entityReducerIntialState, action) {
  switch (action.type) {
    case ADD_EVENT_RECORDS_WITH_META_DATA:
      return mergeStateWithMeta(state, action);
    case ADD_EVENT_RECORDS_WITHOUT_META_DATA:
      return mergeStateWithoutMeta(state, action);
    default:
      return state;
  }
}
