import {
  mergeStateWithMeta,
  mergeStateWithoutMeta,
  entityReducerIntialState,
} from '../../utils/immutableOperationsUtils';
import {
  ADD_PROFILE_RECORDS_WITH_META_DATA,
  ADD_PROFILE_RECORDS_WITHOUT_META_DATA,
  PROFILE_CONNECT_UPDATE,
} from './actionTypes';
import { reducer as connectStateReducer} from '../connect';

export default function (state = entityReducerIntialState, action) {
  switch (action.type) {
    case ADD_PROFILE_RECORDS_WITH_META_DATA:
      return mergeStateWithMeta(state, action);
    case ADD_PROFILE_RECORDS_WITHOUT_META_DATA:
      return mergeStateWithoutMeta(state, action);
    case PROFILE_CONNECT_UPDATE:
      return connectStateReducer(state, action);
    default:
      return state;
  }
}
