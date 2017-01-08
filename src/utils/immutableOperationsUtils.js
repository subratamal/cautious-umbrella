import { Map, List, fromJS } from 'immutable';

export const mergeStateWithMeta = (state, action) => {
  let newState = state;
  action.records.map(object => {
    newState = newState.setIn(['entities', object.id], fromJS(object));
    return null;
  });
  newState = newState.setIn(['meta', action.metaPropName], action.recordIdsArray);
  return newState;
};

export const mergeStateWithoutMeta = (state, action) => {
  let newState = state;
  action.records.map(object => {
    newState = newState.setIn(['entities', object.id], fromJS(object));
    return null;
  });
  return newState;
};

export const entityReducerIntialState = new Map({
  entities: new Map(),
  meta: new Map(),
});
