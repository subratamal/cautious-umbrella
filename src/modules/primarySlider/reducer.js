import { Map, fromJS } from 'immutable';
import { ADD_UNIVERSITY_SLIDER_DATA_MAP, ADD_OPPORTUNITIES_SLIDER_DATA_MAP } from './actionTypes';

function createStore() {
  return new Map({
    page: new Map(),
    opportunity: new Map(),
  });
}

export default function (state = createStore(), action) {
  switch (action.type) {
    case ADD_UNIVERSITY_SLIDER_DATA_MAP:
      if (action.sliderDataMap) {
        let newState = state;
        newState = newState.setIn(['page'], fromJS(action.sliderDataMap));
        return newState;
      }
      return state;
    case ADD_OPPORTUNITIES_SLIDER_DATA_MAP:
      if (action.sliderDataMap) {
        // return fromJS(action.sliderDataMap);
        let newState = state;
        newState = newState.setIn(['opportunity'], fromJS(action.sliderDataMap));
        return newState;
      }
      return state;
    default:
      return state;
  }
}
