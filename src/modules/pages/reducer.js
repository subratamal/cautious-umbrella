import {
  mergeStateWithMeta,
  mergeStateWithoutMeta,
  entityReducerIntialState,
} from '../../utils/immutableOperationsUtils';
import {
  ADD_PAGE_RECORDS_WITH_META_DATA,
  ADD_PAGE_RECORDS_WITHOUT_META_DATA,
  PAGE_FOLLOW_UPDATE,
  ADD_VIEWPAGE_PAGE_RECORDS,
} from './actionTypes';

function updateFollow(state, action) {
  switch (action.subType) {
    case 'FOLLOW_INPROGRESS': {
      return state.setIn(['entities', action.entityId, 'followInProgress'], true);
    }
    case 'FOLLOW_SUCCESS': {
      const newState = state.setIn(['entities', action.entityId, 'followInProgress'], false);
      return newState.setIn(['entities', action.entityId, 'following'], action.relationId);
    }
    case 'DELETE_FOLLOW': {
      const newState = state.setIn(['entities', action.entityId, 'followInProgress'], false);
      return newState.setIn(['entities', action.entityId, 'following'], '0');
    }
    default:
      return state;
  }
}

function addViewPageData(state, action) {
  let newState = mergeStateWithoutMeta(state, action);
  action.components.map(component => {
    newState = newState.setIn(['meta', component], action.recordIdsArray);
    return newState;
  });
  return newState;
}

export default function (state = entityReducerIntialState, action) {
  switch (action.type) {
    case ADD_PAGE_RECORDS_WITH_META_DATA:
      return mergeStateWithMeta(state, action);
    case ADD_PAGE_RECORDS_WITHOUT_META_DATA:
      return mergeStateWithoutMeta(state, action);
    case PAGE_FOLLOW_UPDATE:
      return updateFollow(state, action);
    case ADD_VIEWPAGE_PAGE_RECORDS:
      return addViewPageData(state, action);
    default:
      return state;
  }
}
