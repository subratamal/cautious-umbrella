import {
  mergeStateWithMeta,
  mergeStateWithoutMeta,
  entityReducerIntialState,
} from '../../utils/immutableOperationsUtils';
import {
  ADD_OPPORTUNITY_RECORDS_WITH_META_DATA,
  ADD_OPPORTUNITY_RECORDS_WITHOUT_META_DATA,
  ADD_OPPORTUNITY_VIEWPAGE_OPPORTUNITY_RECORDS,
  SET_INTERACTIVITY_STATE,
  ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY,
  SET_OPPORTUNITYVIEW_SHARE_DATA,
} from './actionTypes';

function setInteractivityState(state, action) {
  let newState = state;
  newState = newState.setIn(['entities', action.id, action.interactivityKey], action.data);
  return newState;
}

function addViewPageData(state, action) {
  let newState = mergeStateWithoutMeta(state, action);
  action.components.forEach(component => {
    newState = newState.setIn(['meta', component], action.recordIdsArray);
  });
  return newState;
}

export default function (state = entityReducerIntialState, action) {
  switch (action.type) {
    case ADD_OPPORTUNITY_RECORDS_WITH_META_DATA:
      return mergeStateWithMeta(state, action);
    case ADD_OPPORTUNITY_RECORDS_WITHOUT_META_DATA:
      return mergeStateWithoutMeta(state, action);
    case ADD_OPPORTUNITY_VIEWPAGE_OPPORTUNITY_RECORDS:
      return addViewPageData(state, action);
    case SET_INTERACTIVITY_STATE:
      return setInteractivityState(state, action);
    case ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY:
      return mergeStateWithMeta(state, action);
    case SET_OPPORTUNITYVIEW_SHARE_DATA:
      return state.setIn(['shareData'], action.data);
    default:
      return state;
  }
}
