import { Map, fromJS, List } from 'immutable';
import { homePageConfig } from '../defaults';
import { each, isEmpty } from 'underscore';
import interactivityReducer from './interactivity_reducer';
import reloadComponentReducer from './reload_component_reducer';

function setHomeStore() {
  let intitialState = new Map();
  each(homePageConfig.pageComponents, function (value, key) {
    const componentMap = new Map({
      'success': false,
      'error': null,
      data: null,
    });
    intitialState = intitialState.set(value, componentMap);
  });
  const homePageMap = new Map({
    successComponents: new List(),
    emptyComponents: new Map(),
    pageSuccess: false,
    pageError: false,
  });
  intitialState = intitialState.set(homePageConfig.parentComponent, homePageMap);
  intitialState = intitialState.set('storyCounter', false);
  intitialState = intitialState.set('eventCounter', false);
  intitialState = intitialState.set('shareData', null);
  intitialState = intitialState.set('hasMore', false);
  intitialState = intitialState.set('hasMoreStory', false);
  intitialState = intitialState.set('hasMoreEvent', false);
  return intitialState;
}
// apprnd flag if passed true , will append to the data
function componentSuccess(state, action) {
  if (action.append) {
    if (state.getIn([action.component, 'data']) !== null && !(action.data.Message !== undefined && action.data.Message == 'No records found.')) {
      let dataArray = state.getIn([action.component, 'data']).toJS();
      dataArray = dataArray.concat(action.data);
      state = state.setIn([action.component, 'data'], fromJS(dataArray));
    }
    else if (state.getIn([action.component, 'data']) === null) {
      state = state.setIn([action.component, 'data'], fromJS(action.data));
    }
  }
  else {
    state = state.setIn([action.component, 'data'], fromJS(action.data));
  }

  state = state.setIn([action.component, 'success'], true);
   // push success component into Parent component map
  let successList = state.getIn([homePageConfig.parentComponent, 'successComponents']);
   // if no data set empty state in parent prop for current component
  if (isEmpty(action.data)) {
    state = state.setIn([homePageConfig.parentComponent, 'emptyComponents', action.component], true);
  }

  if (!successList.includes(action.component)) {
    successList = successList.push(action.component);
    state = state.setIn([homePageConfig.parentComponent, 'successComponents'], successList);
  }

  if (successList.size === homePageConfig.totalComponents) {
    state = state.setIn([homePageConfig.parentComponent, 'pageSuccess'], true);
  }
  return state;
}

function componentError(state, action) {
  state = state.setIn([homePageConfig.parentComponent, 'pageError'], true);
  return state;
}

export default function (state = setHomeStore(), action) {
  switch (action.type) {
    case 'HOMEPAGE_SET_COMPONENT_STATE_SUCCESS' :
      return componentSuccess(state, action);
    case 'HOMEPAGE_SET_COMPONENT_STATE_ERROR':
      return componentError(state, action);
    case 'FEED_STORY_TYPE_INCREMENT_COUNTER':
      return state.set('storyCounter', action.status);
    case 'FEED_EVENT_TYPE_INCREMENT_COUNTER':
      return state.set('eventCounter', action.status);
    case 'FEED_SHARE_DATA':
      return state.set('shareData', action.data);
    case 'FEED_MORE_DATA':
      return state.set('hasMore', action.status);
    case 'RESET_HOME_PAGE':
      return setHomeStore();
    case 'STORY_FEED_MORE_DATA':
      return state.set('hasMoreStory', action.status);
    case 'EVENT_FEED_MORE_DATA':
      return state.set('hasMoreEvent', action.status);
    case 'HOMEPAGE_INTERACTIVITY_ACTION' :    // pass current state and action to interactivity reducer
      return interactivityReducer(state, action);
    case 'HOMEPAGE_RELOAD_COMPONENT' :    // pass current state and action to interactivity reducer
      return reloadComponentReducer(state, action);
  }
  return state;
}
