import { Map, fromJS, List } from 'immutable';
import { each, isEmpty } from 'underscore';
import { opportunitiesViewPageConfig } from '../defaults';

// Intialization of state with all component variables and parent component variables
function setOpportunitiesViewStore() {
  let intitialState = new Map();
  each(opportunitiesViewPageConfig.pageComponents, function (value, key) {
    const componentMap = new Map({
      'success': false,
      'error': null,
      data: null,
    });
    intitialState = intitialState.set(value, componentMap);
  });
  const opportunitiesPageMap = new Map({
    successComponents: new List(),
    emptyComponents: new Map(),
    pageSuccess: false,
    pageError: false,
  });
  intitialState = intitialState.set(opportunitiesViewPageConfig.parentComponent, opportunitiesPageMap);
  return intitialState;
}

function componentSuccess(state, action) {
  state = state.setIn([action.component, 'data'], fromJS(action.data));
  state = state.setIn([action.component, 'success'], true);
   // push success component into Parent component map
  let successList = state.getIn([opportunitiesViewPageConfig.parentComponent, 'successComponents']);

   // if no data set empty state in parent prop for current component
  if (isEmpty(action.data)) {
    state = state.setIn([opportunitiesViewPageConfig.parentComponent, 'emptyComponents', action.component], true);
  }
   // if success then add it to success list in the parent
  if (!successList.includes(action.component)) {
    successList = successList.push(action.component);
    state = state.setIn([opportunitiesViewPageConfig.parentComponent, 'successComponents'], successList);
  }
   // if all the api calls are complete stop loading
  if (successList.size === opportunitiesViewPageConfig.totalComponents) {
    state = state.setIn([opportunitiesViewPageConfig.parentComponent, 'pageSuccess'], true);
  }
  return state;
}

function componentError(state, action) {
  state = state.setIn([opportunitiesViewPageConfig.parentComponent, 'pageError'], true);
  return state;
}

export default function (state = setOpportunitiesViewStore(), action) {
  switch (action.type) {
    case 'OPPORTUNITIESVIEWPAGE_SET_COMPONENT_STATE_SUCCESS' :
      return componentSuccess(state, action);
    case 'SET_COMPONENT_STATE_ERROR':
      return componentError(state, action);
  }
  return state;
}
