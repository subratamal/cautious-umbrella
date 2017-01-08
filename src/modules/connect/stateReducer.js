
export default function (state, action) {
  switch (action.subType) {
    case 'CONNECT_INPROGRESS': {
      return state.setIn(['entities', action.entityId, 'connectInProgress'], true);
    }
    case 'CONNECT_SUCCESS': {
      let newState = state.setIn(['entities', action.entityId, 'connectInProgress'], false);
      newState = state.setIn(['entities', action.entityId, 'connectionStatus'], 'requested');
      return newState.setIn(['entities', action.entityId, 'connectionId'], action.relationId);
    }
    case 'APPROVE_SUCCESS': {
      let newState = state.setIn(['entities', action.entityId, 'connectInProgress'], false);
      newState = state.setIn(['entities', action.entityId, 'connectionStatus'], 'yes');
      return newState.setIn(['entities', action.entityId, 'connectionId'], action.relationId);
    }
    case 'DECLINE_SUCCESS': {
      let newState = state.setIn(['entities', action.entityId, 'connectInProgress'], false);
      newState = state.setIn(['entities', action.entityId, 'connectionStatus'], 'no');
      return newState.setIn(['entities', action.entityId, 'connectionId'], '0');
    }
    default:
      return state;
  }
}
