import { Map, fromJS, List } from 'immutable';
import { discoverPageConfig } from '../defaults';
import { each, isEmpty } from 'underscore';
import interactivityReducer from './interactivity_reducer';
import reloadComponentReducer from './reload_component_reducer';


// Intialization of state with all component variables and parent component variables
function setDiscvoerStore() {
  let intitialState = new Map();
  each(discoverPageConfig.pageComponents, function (value, key) {
    const componentMap = new Map({
      'success': false,
      'error': null,
      data: null,
    });
    intitialState = intitialState.set(value, componentMap);
  });
  const discoverPageMap = new Map({
    successComponents: new List(),
    emptyComponents: new Map(),
    pageSuccess: false,
    pageError: false,
  });
  intitialState = intitialState.set(discoverPageConfig.parentComponent, discoverPageMap);
  return intitialState;
}

function componentSuccess(state, action) {
  state = state.setIn([action.component, 'data'], fromJS(action.data));
  state = state.setIn([action.component, 'success'], true);
   // push success component into Parent component map
  let successList = state.getIn([discoverPageConfig.parentComponent, 'successComponents']);

   // if no data set empty state in parent prop for current component
  if (isEmpty(action.data)) {
    state = state.setIn([discoverPageConfig.parentComponent, 'emptyComponents', action.component], true);
  }
   // if success then add it to success list in the parent
  if (!successList.includes(action.component)) {
    successList = successList.push(action.component);
    state = state.setIn([discoverPageConfig.parentComponent, 'successComponents'], successList);
  }
   // if all the api calls are complete stop loading
  if (successList.size === discoverPageConfig.totalComponents) {
    state = state.setIn([discoverPageConfig.parentComponent, 'pageSuccess'], true);
  }
  return state;
}

function componentError(state, action) {
  state = state.setIn([discoverPageConfig.parentComponent, 'pageError'], true);
  return state;
}

export default function (state = setDiscvoerStore(), action) {
  switch (action.type) {
    case 'DISCOVERPAGE_SET_COMPONENT_STATE_SUCCESS' :
      return componentSuccess(state, action);
    case 'SET_COMPONENT_STATE_ERROR':
      return componentError(state, action);
    case 'DISCOVERPAGE_INTERACTIVITY_ACTION' :    // pass current state and action to interactivity reducer
      return interactivityReducer(state, action);
    case 'DISCOVERPAGE_RELOAD_COMPONENT' :    // pass current state and action to interactivity reducer
      return reloadComponentReducer(state, action);
  }
  return state;
}
